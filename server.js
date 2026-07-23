// Importamos las librerias necesarias
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

// Importamos el diccionario de palabras
const diccionario = require('./diccionario')

// Creamos la app de Express
const app = express()

// Creamos un servidor HTTP a partir de la app
const servidor = http.createServer(app)

// Conectamos Socket.io a ese servidor
const io = new Server(servidor)

// Servimos los archivos de la carpeta actual y de public
app.use(express.static(__dirname))
app.use(express.static(__dirname + '/public'))

// Lista de categorías y letras posibles
const categorias = [
  'Animales', 'Paises', 'Comidas', 'Nombres',
  'Ciudades', 'Frutas', 'Deportes', 'Profesiones',
  'Colores', 'Peliculas', 'Objetos de casa'
]
const letras = 'ABCDEFGHIJLMNOPRSTV'.split('')

// Jugador esperando pareja
let esperando = null

// Guardamos todas las partidas activas
let partidas = {}

// Cuando un jugador se conecta
io.on('connection', function(socket) {
  console.log('Nuevo jugador conectado:', socket.id)

  socket.on('unirse', function(nombre) {
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

      io.to(sala).emit('partidaEncontrada', {
        jugador1: jugador1.nombre,
        jugador2: jugador2.nombre
      })

      iniciarRonda(sala)
    }
  })

  socket.on('responder', function(respuesta) {
    const sala = socket.sala
    if (!sala || !partidas[sala]) return

    const partida = partidas[sala]
    if (partida.primerEnResponder) return

    partida.primerEnResponder = socket.id
    partida.respuestasRonda[socket.id] = respuesta

    if (partida.temporizador) {
      clearTimeout(partida.temporizador)
    }

    resolverRonda(sala, respuesta, socket.id)
  })

  socket.on('listoSiguienteRonda', function() {
    const sala = socket.sala
    if (!sala || !partidas[sala]) return
    iniciarRonda(sala)
  })

  socket.on('disconnect', function() {
    if (esperando === socket) {
      esperando = null
    }

    if (socket.sala && partidas[socket.sala]) {
      socket.to(socket.sala).emit('rivalDesconectado')
      delete partidas[socket.sala]
    }

    console.log('Jugador desconectado:', socket.id)
  })
})

// Función que arranca una ronda nueva
function iniciarRonda(sala) {
  const partida = partidas[sala]
  if (!partida) return

  const categoria = categorias[Math.floor(Math.random() * categorias.length)]
  const letra = letras[Math.floor(Math.random() * letras.length)]

  partida.categoriaActual = categoria
  partida.letraActual = letra
  partida.primerEnResponder = null
  partida.respuestasRonda = {}

  if (partida.temporizador) {
    clearTimeout(partida.temporizador)
  }

  partida.temporizador = setTimeout(function() {
    if (!partida.primerEnResponder) {
      io.to(sala).emit('resultadoRonda', {
        mensaje: 'Tiempo agotado. Nadie respondió a tiempo.',
        jugadores: partida.jugadores.map(function(j) {
          return {
            nombre: j.nombre,
            puntos: j.puntos,
            eliminado: j.eliminado,
            respuesta: null
          }
        }),
        ganadorPartida: false
      })
    }
  }, 30000)

  io.to(sala).emit('nuevaRonda', { categoria: categoria, letra: letra })
}

// Función que elimina acentos de un texto
function quitarAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

// Función que decide quién ganó la ronda
function resolverRonda(sala, respuesta, idJugador) {
  const partida = partidas[sala]
  if (!partida) return

  const jugador = partida.jugadores.find(function(j) { return j.id === idJugador })
  const categoria = partida.categoriaActual
  const letra = partida.letraActual

  const respuestaLimpia = quitarAcentos(respuesta.trim().toLowerCase())
  const letraLimpia = quitarAcentos(letra.toLowerCase())

  const empiezaBien = respuestaLimpia[0] === letraLimpia

  const palabrasCategoria = diccionario[categoria] || []
  const estaEnDiccionario = palabrasCategoria.some(function(palabra) {
    return quitarAcentos(palabra.toLowerCase()) === respuestaLimpia
  })

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

  const jugadoresConRespuesta = partida.jugadores.map(function(j) {
    return {
      nombre: j.nombre,
      puntos: j.puntos,
      eliminado: j.eliminado,
      respuesta: partida.respuestasRonda[j.id] || null
    }
  })

  io.to(sala).emit('resultadoRonda', {
    mensaje: mensaje,
    jugadores: jugadoresConRespuesta,
    ganadorPartida: ganadorPartida
  })
}

// Arrancamos el servidor en el puerto 3000
servidor.listen(process.env.PORT || 3000, function() {
  console.log('Servidor escuchando en el puerto ' + (process.env.PORT || 3000))
})

// pago en juego
const stripe = require('stripe')('TU_CLAVE_SECRETA_DE_STRIPE'); // Tu secret key del panel de Stripe

// Endpoint o evento de Socket.io para crear el pago de 0,99 €
socket.on('comprarAyuda', async (datos) => {
  const { tipoAyuda, userId } = datos;
  
  let nombreProducto = 'Pista';
  if (tipoAyuda === 'tiempo') nombreProducto = 'Cegar Rival';
  if (tipoAyuda === 'fantasma') nombreProducto = 'Fantasma';

  try {
    // Creamos una sesión de pago en Stripe por 0.99 EUR
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `1x ${nombreProducto} - Word Game`,
          },
          unit_amount: 125, // 1,25 céntimos de euro (1,25 €)
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `https://tu-dominio.com/juego.html?pago=exito&tipo=${tipoAyuda}&user=${userId}`,
      cancel_url: `https://tu-dominio.com/juego.html?pago=cancelado`,
    });

    // Enviamos la URL de Stripe al cliente para redirigirlo
    socket.emit('redirigirPago', session.url);
  } catch (error) {
    console.error('Error al crear la sesión de pago:', error);
  }
});