const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const diccionario = require('./diccionario')

const app = express()
const servidor = http.createServer(app)
const io = new Server(servidor)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

app.use(express.static(__dirname))
app.use(express.static(__dirname + '/public'))

const categorias = [
  'Animales', 'Paises', 'Comidas', 'Nombres', 'Ciudades', 
  'Frutas', 'Deportes', 'Profesiones', 'Colores', 'Peliculas', 'Objetos de casa'
]

const letras = 'ABCDEFGHIJLMNOPRSTV'.split('')
let esperando = null
let partidas = {}
let cegosPendientes = {}

io.on('connection', function(socket) {
  console.log('Nuevo jugador conectado:', socket.id)

  socket.on('unirse', function(datos) {
    const nombre = typeof datos === 'string' ? datos : datos.nombre
    socket.nombre = nombre

    if (esperando === null) {
      esperando = socket
      socket.emit('esperando')
    } else {
      const jugador1 = esperando
      const jugador2 = socket
      esperando = null

      const sala = jugador1.id + '#' + jugador2.id
      jugador1.join(sala)
      jugador2.join(sala)
      jugador1.sala = sala
      jugador2.sala = sala

      partidas[sala] = {
        jugadores: [
          { id: jugador1.id, nombre: jugador1.nombre, puntos: 0, eliminado: false },
          { id: jugador2.id, nombre: jugador2.nombre, puntos: 0, eliminado: false }
        ],
        respuestasRonda: {}
      }

      jugador1.emit('partidaEncontrada', { jugadores: [jugador1.nombre, jugador2.nombre] })
      jugador2.emit('partidaEncontrada', { jugadores: [jugador1.nombre, jugador2.nombre] })

      iniciarRonda(sala)
    }
  })

  socket.on('responder', function(datos) {
    const sala = socket.sala
    if (!sala || !partidas[sala]) return
    const partida = partidas[sala]
    if (partida.primerEnResponder) return
    partida.primerEnResponder = socket.id

    const respuestaTexto = typeof datos === 'object' ? datos.respuesta : datos
    partida.respuestasRonda[socket.id] = respuestaTexto

    if (partida.temporizador) {
      clearTimeout(partida.temporizador)
    }
    resolverRonda(sala, respuestaTexto, socket.id)
  })

  socket.on('listoSiguienteRonda', function() {
    const sala = socket.sala
    if (!sala || !partidas[sala]) return
    iniciarRonda(sala)
  })

  socket.on('listoSiguienteJuego', function() {
    const sala = socket.sala
    if (!sala || !partidas[sala]) return
    partidas[sala].jugadores.forEach(function(j) {
      j.puntos = 0
      j.eliminado = false
    })
    partidas[sala].primerEnResponder = null
    partidas[sala].respuestasRonda = {}
    iniciarRonda(sala)
  })

  socket.on('cegarRival', function() {
    const sala = socket.sala
    if (!sala || !partidas[sala]) return
    cegosPendientes[sala] = {
      idAtacante: socket.id,
      nombreAtacante: socket.nombre
    }
  })

  socket.on('comprarAyuda', async function(datos) {
    const { tipoAyuda, userId } = datos
    let nombreProducto = 'Pista'
    if (tipoAyuda === 'tiempo') nombreProducto = 'Cegar Rival'
    if (tipoAyuda === 'fantasma') nombreProducto = 'Fantasma'

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: { name: `1x ${nombreProducto} - Word Game` },
            unit_amount: 125
          },
          quantity: 1
        }],
        mode: 'payment',
        success_url: `https://tu-dominio.com/index.html?pago=exito&tipo=${tipoAyuda}&user=${userId}`,
        cancel_url: `https://tu-dominio.com/index.html?pago=cancelado`
      })
      socket.emit('redirigirPago', session.url)
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error)
    }
  })

  socket.on('disconnect', function() {
    if (esperando === socket) esperando = null
    if (socket.sala && partidas[socket.sala]) {
      const partida = partidas[socket.sala]
      const rival = partida.jugadores.find(j => j.id !== socket.id)
      if (rival) {
        socket.to(socket.sala).emit('victoriaRival', {
          mensaje: 'Tu rival se ha desconectado. ¡Ganas la partida!',
          nombreGanador: rival.nombre,
          jugadores: partida.jugadores.map(j => ({
            nombre: j.nombre,
            puntos: j.id === rival.id ? 5 : j.puntos,
            respuesta: null
          }))
        })
      }
      delete partidas[socket.sala]
      delete cegosPendientes[socket.sala]
    }
    console.log('Jugador desconectado:', socket.id)
  })
})

function iniciarRonda(sala) {
  const partida = partidas[sala]
  if (!partida) return

  if (cegosPendientes[sala]) {
    const { idAtacante, nombreAtacante } = cegosPendientes[sala]
    delete cegosPendientes[sala]
    io.in(sala).fetchSockets().then(function(sockets) {
      sockets.forEach(function(s) {
        if (s.id !== idAtacante) {
          s.emit('activarCegueraRival', { nombreBloqueador: nombreAtacante })
        }
      })
    }).catch(function() {
      io.to(sala).emit('activarCegueraRival', { nombreBloqueador: nombreAtacante })
    })
  }

  const categoria = categorias[Math.floor(Math.random() * categorias.length)]
  const letra = letras[Math.floor(Math.random() * letras.length)]

  partida.categoriaActual = categoria
  partida.letraActual = letra
  partida.primerEnResponder = null
  partida.respuestasRonda = {}

  if (partida.temporizador) clearTimeout(partida.temporizador)

  partida.temporizador = setTimeout(function() {
    if (!partida.primerEnResponder) {
      io.to(sala).emit('resultadoRonda', {
        mensaje: 'Tiempo agotado. Nadie respondió a tiempo.',
        jugadores: partida.jugadores.map(j => ({
          nombre: j.nombre, puntos: j.puntos, eliminado: j.eliminado, respuesta: null
        })),
        ganadorPartida: false
      })
    }
  }, 30000)

  io.to(sala).emit('nuevaRonda', { categoria: categoria, letra: letra })
}

function quitarAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function resolverRonda(sala, respuesta, idJugador) {
  const partida = partidas[sala]
  if (!partida) return

  const jugador = partida.jugadores.find(j => j.id === idJugador)
  const categoria = partida.categoriaActual
  const letra = partida.letraActual

  const respuestaLimpia = quitarAcentos(respuesta.trim().toLowerCase())
  const letraLimpia = quitarAcentos(letra.toLowerCase())
  const empiezaBien = respuestaLimpia[0] === letraLimpia
  const palabrasCategoria = diccionario[categoria] || []
  const estaEnDiccionario = palabrasCategoria.some(p => quitarAcentos(p.toLowerCase()) === respuestaLimpia)
  const esValida = empiezaBien && estaEnDiccionario

  let mensaje = ''
  if (esValida) {
    jugador.puntos += 1
    mensaje = jugador.nombre + ' respondió bien (' + respuesta + ') y suma 1 punto'
  } else {
    if (!empiezaBien) {
      mensaje = jugador.nombre + ' usó una palabra que no empieza por ' + letra
    } else {
      mensaje = jugador.nombre + ' usó una palabra que no es válida para ' + categoria
    }
    if (jugador.puntos === 0) {
      jugador.eliminado = true
      mensaje += ' — ¡queda eliminado!'
    } else {
      jugador.puntos -= 1
      mensaje += ' y pierde 1 punto'
    }
  }

  let ganadorPartida = false
  if (jugador.puntos >= 5) {
    mensaje = '🏆 ' + jugador.nombre + ' gana la partida con 5 puntos'
    ganadorPartida = true
  }

  const jugadoresConRespuesta = partida.jugadores.map(j => ({
    nombre: j.nombre,
    puntos: j.puntos,
    eliminado: j.eliminado,
    respuesta: partida.respuestasRonda[j.id] || null
  }))

  io.to(sala).emit('resultadoRonda', {
    mensaje: mensaje,
    jugadores: jugadoresConRespuesta,
    ganadorPartida: ganadorPartida
  })
}

servidor.listen(process.env.PORT || 3000, function() {
  console.log('Servidor escuchando en el puerto ' + (process.env.PORT || 3000))
})