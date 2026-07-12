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

// Servimos los archivos de la carpeta actual (html, css, js)
app.use(express.static(__dirname))

// Lista de categorías y letras posibles
const categorias = [
  'Animales', 'Paises', 'Comidas', 'Nombres',
  'Ciudades', 'Frutas', 'Deportes', 'Profesiones',
  'Colores', 'Peliculas', 'Objetos de casa'
]
const letras = 'ABCDEFGHIJLMNOPRSTV'.split('')

// Jugador esperando pareja
let esperando = null

// Guardamos todas las partidas activas, una por sala
// partidas['sala123'] = { jugadores: [...], rondaActual: {...} }
let partidas = {}

// Cuando un jugador se conecta
io.on('connection', function(socket) {
  console.log('Nuevo jugador conectado:', socket.id)

  // Cuando el jugador envia su nombre
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

      // Creamos la partida con los datos de ambos jugadores
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

      // Arrancamos la primera ronda
      iniciarRonda(sala)
    }
  })

  // Cuando un jugador envía su respuesta
  socket.on('responder', function(respuesta) {
    const sala = socket.sala
    if (!sala || !partidas[sala]) return

    const partida = partidas[sala]

    // Si ya hay alguien que respondió primero en esta ronda, ignoramos
    if (partida.primerEnResponder) return

    // Marcamos a este jugador como el primero en responder
    partida.primerEnResponder = socket.id
    partida.respuestasRonda[socket.id] = respuesta
    
    //Cancelamos el temporizador porque alguien respondio a tiempo
    if (partida.temporizador){
      clearTimeout(partida.temporizador)
    }

    resolverRonda(sala, respuesta, socket.id)
  })

  // Cuando un jugador está listo para la siguiente ronda
  socket.on('listoSiguienteRonda', function() {
    const sala = socket.sala
    if (!sala || !partidas[sala]) return

    iniciarRonda(sala)
  })

  // Cuando un jugador se desconecta
  socket.on('disconnect', function() {
    if (esperando === socket) {
      esperando = null
    }

    // Avisamos al rival si estaba en una partida
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

  //Si habia un temporizador anterior lo cancelamos
  if (partida.temporizador){
    clearTimeout(partida.temporizador)
  }
//Arrancamos un temporizador de 30 segundos
//Si nadie responde en ese tiempo, la ronda termina sin ganador
partida.temporizador = setTimeout(function(){

  //Solo actuamos si nadie respondio todavia
  if(!partida.primerEnResponder){
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
}, 30000) //30000 milisegundos = 30 segundos


  io.to(sala).emit('nuevaRonda', { categoria: categoria, letra: letra })
}

// Función que elimina acentos de un texto
function quitarAcentos(texto){
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
}
// Función que decide quién ganó la ronda
function resolverRonda(sala, respuesta, idJugador) {
  const partida = partidas[sala]
  if (!partida) return

  const jugador = partida.jugadores.find(function(j) { return j.id === idJugador })
  const categoria = partida.categoriaActual
  const letra = partida.letraActual

// Convertimos la respuesta a minúsculas para comparar siempre igual
  const respuestaLimpia = quitarAcentos(respuesta.trim().toLowerCase())

  //Tambien quitamos acentos a la letra requerida para comparar bien
  const letraLimpia = quitarAcentos(letra.toLowerCase())

  // Comprobamos si la palabra empieza por la letra correcta
  const empiezaBien = respuestaLimpia[0] === letraLimpia

  // Comprobamos si la palabra está en la lista de esa categoría
  const palabrasCategoria = diccionario[categoria] || []
  const estaEnDiccionario = palabrasCategoria.some(function(palabra){
    return quitarAcentos(palabra.toLowerCase()) === respuestaLimpia
  })
  console.log('--- DEBUG ---')
console.log('Categoría buscada:', categoria)
console.log('Claves del diccionario:', Object.keys(diccionario))
console.log('Respuesta limpia:', respuestaLimpia)
console.log('Letra limpia:', letraLimpia)
console.log('Empieza bien:', empiezaBien)
console.log('Palabras encontradas en categoría:', palabrasCategoria.length)
console.log('Está en diccionario:', estaEnDiccionario)
console.log('-------------')

  const esValida = empiezaBien && estaEnDiccionario

  let mensaje = ''

  if (esValida) {
    // Palabra válida: suma 1 punto
    jugador.puntos += 1
    mensaje = jugador.nombre + ' respondió bien (' + respuesta + ') y suma 1 punto'
  } else {
    // Palabra inválida
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