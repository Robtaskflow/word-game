// Conectamos con el servidor mediante Socket.io
const socket = io()

// Guardamos nuestro nombre cuando nos unamos
let miNombre = ''

// Esperamos a que toda la página HTML esté cargada antes de buscar botones
document.addEventListener('DOMContentLoaded', function() {

  // ----- PANTALLA 1: Unirse a una partida -----

  document.getElementById('btnUnirse').addEventListener('click', function() {
    const nombre = document.getElementById('inputNombre').value.trim()

    if (!nombre) {
      alert('Escribe tu nombre primero')
      return
    }

    miNombre = nombre

    // Enviamos el nombre al servidor
    socket.emit('unirse', nombre)

    // Mostramos el mensaje de "buscando rival"
    document.getElementById('textoEspera').style.display = 'block'
    document.getElementById('btnUnirse').disabled = true
  })

  // El servidor nos dice que estamos esperando rival
  socket.on('esperando', function() {
    console.log('Esperando a otro jugador...')
  })

  // El servidor nos dice que ya hay partida
  socket.on('partidaEncontrada', function(datos) {
    console.log('Partida encontrada:', datos)

    // Cambiamos de pantalla 1 a pantalla 2
    document.getElementById('pantallaInicio').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'block'
  })


  // ----- PANTALLA 2: Juego en marcha -----

  let intervalo = null
  let tiempo = 0

  // El servidor nos manda la categoría y letra de la ronda nueva
  socket.on('nuevaRonda', function(datos) {

    document.getElementById('categoria').textContent = datos.categoria
    document.getElementById('letra').textContent = datos.letra
    document.getElementById('inputRespuesta').value = ''
    document.getElementById('btnEnviar').disabled = false

    // Volvemos a la pantalla de juego
    document.getElementById('pantallaResultado').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'block'

    // Reiniciamos y arrancamos el cronómetro
    clearInterval(intervalo)
    tiempo = 0
    document.getElementById('cronometro').textContent = '0.0'

    intervalo = setInterval(function() {
      tiempo += 0.1
      document.getElementById('cronometro').textContent = tiempo.toFixed(1)
    }, 100)
  })

  // Cuando el jugador pulsa Enviar
  document.getElementById('btnEnviar').addEventListener('click', enviarRespuesta)

  function enviarRespuesta() {
    const respuesta = document.getElementById('inputRespuesta').value.trim()

    if (!respuesta) {
      alert('Escribe una palabra antes de enviar')
      return
    }

    // Evitamos enviar dos veces
    document.getElementById('btnEnviar').disabled = true

    // Enviamos la respuesta al servidor
    socket.emit('responder', respuesta)
  }


  // ----- PANTALLA 3: Resultado de la ronda -----

  // El servidor nos manda el resultado cuando alguien responde primero
  socket.on('resultadoRonda', function(datos) {

    clearInterval(intervalo)

    // Cambiamos a la pantalla de resultado
    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaResultado').style.display = 'block'

    // Mensaje principal
    document.getElementById('tituloResultado').textContent = datos.mensaje

    // Mostramos las respuestas y puntos de ambos jugadores
    const contenedor = document.getElementById('respuestasJugadores')
    contenedor.innerHTML = ''

    datos.jugadores.forEach(function(jugador) {
      const fila = document.createElement('div')
      fila.className = 'fila-jugador'
      fila.innerHTML = `
        <span class="nombre-jugador">${jugador.nombre}</span>
        <span class="puntos-jugador">${jugador.respuesta || '(sin respuesta)'} — ${jugador.puntos} pts</span>
      `
      contenedor.appendChild(fila)
    })

    // Si alguien ganó la partida completa, lo mostramos
    if (datos.ganadorPartida) {
      //Esperamos 2 segundos y mostramos sla pantalla de victoria
      setTimeout(function(){
        mostrarVictoria(datos)
      },2000)

    } else {
      document.getElementById('btnSiguienteRonda').style.display = 'block'
    }
  })

  // Cuando el jugador pulsa "Siguiente ronda"
  document.getElementById('btnSiguienteRonda').addEventListener('click', function() {
    socket.emit('listoSiguienteRonda')
  })

  // Si el rival se desconecta
  socket.on('rivalDesconectado', function() {
    alert('Tu rival se ha desconectado. La partida ha terminado.')
    location.reload()
  })

   // Función que muestra la pantalla de victoria final
  function mostrarVictoria(datos) {
    document.getElementById('pantallaResultado').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaVictoria').style.display = 'block'

    const ganador = datos.jugadores.reduce(function(a, b) {
      return a.puntos > b.puntos ? a : b
    })

    document.getElementById('nombreGanador').textContent = ganador.nombre

    const contenedor = document.getElementById('puntosFinales')
    contenedor.innerHTML = ''

    datos.jugadores.forEach(function(jugador) {
      const fila = document.createElement('div')
      fila.className = 'fila-puntos-final'
      fila.innerHTML = `
        <span class="nombre">${jugador.nombre}</span>
        <span class="puntos">${jugador.puntos} pts</span>
      `
      contenedor.appendChild(fila)
    })

    let cuenta = 5
    const textoContador = document.createElement('p')
    textoContador.style.cssText = 'text-align:center; color:#1a2e5a; margin-top:16px; font-size:0.9rem;'
    textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
    document.querySelector('.tarjeta-victoria').appendChild(textoContador)

    const contador = setInterval(function() {
      cuenta -= 1
      textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
      if (cuenta <= 0) {
        clearInterval(contador)
        location.reload()
      }
    }, 1000)
  }

  // Botón para volver al menú antes de que pasen los 5 segundos
  document.getElementById('btnJugarOtraVez').addEventListener('click', function() {
    location.reload()
  })

}) // ← cierre del DOMContentLoaded, debe ser la última línea

