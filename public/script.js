// Funciones auxiliares de Rango y XP integradas para evitar dependencias de carga
function calcularRango(xp) {
  if (xp >= 6000) return { icono: '💎', nombre: 'Diamante' }
  if (xp >= 3000) return { icono: '🥇', nombre: 'Oro' }
  if (xp >= 1000) return { icono: '🥈', nombre: 'Plata' }
  return { icono: '🥉', nombre: 'Bronze' }
}

function xpSiguienteRango(xp) {
  if (xp >= 6000) return { actual: xp - 6000, necesaria: null }
  if (xp >= 3000) return { actual: xp - 3000, necesaria: 3000 }
  if (xp >= 1000) return { actual: xp - 1000, necesaria: 2000 }
  return { actual: xp, necesaria: 1000 }
}

// Conectamos con el servidor mediante Socket.io
const socket = io()

// Guardamos nuestro nombre cuando nos unamos
let miNombre = ''

// Esperamos a que toda la página HTML esté cargada antes de buscar botones
document.addEventListener('DOMContentLoaded', function() {

  // ----- PANTALLA LOGIN -----

  let usuarioActual = null

  document.getElementById('pantallaBienvenida').style.display = 'none'

  // Comprobamos si el usuario ya está logueado
  auth.onAuthStateChanged(function(usuario) {
    if (usuario) {
      obtenerUsuario(usuario.uid).then(function(doc) {
        if (doc.exists) {
          usuarioActual = doc.data()
          mostrarBarraUsuario()
          document.getElementById('pantallaLogin').style.display = 'none'
          document.getElementById('pantallaBienvenida').style.display = 'flex'
        } else {
          document.getElementById('pantallaLogin').style.display = 'none'
          document.getElementById('pantallaElegirNombre').style.display = 'flex'
        }
      })
    } else {
      document.getElementById('pantallaLogin').style.display = 'flex'
    }
  })

  // Cambiar entre login y registro
  document.getElementById('irARegistro').addEventListener('click', function() {
    document.getElementById('formLogin').style.display = 'none'
    document.getElementById('formRegistro').style.display = 'block'
  })

  document.getElementById('irALogin').addEventListener('click', function() {
    document.getElementById('formRegistro').style.display = 'none'
    document.getElementById('formLogin').style.display = 'block'
  })

  // Iniciar sesión con email y contraseña
  document.getElementById('btnLogin').addEventListener('click', function() {
    const email = document.getElementById('loginEmail').value.trim()
    const password = document.getElementById('loginPassword').value.trim()

    if (!email || !password) {
      alert('Rellena todos los campos')
      return
    }

    iniciarSesion(email, password)
      .catch(function(error) {
        alert('Error al iniciar sesión: ' + error.message)
      })
  })

  // Registrarse con email y contraseña
  document.getElementById('btnRegistro').addEventListener('click', function() {
    const email = document.getElementById('registroEmail').value.trim()
    const password = document.getElementById('registroPassword').value.trim()

    if (!email || !password) {
      alert('Rellena todos los campos')
      return
    }

    registrarse(email, password)
      .catch(function(error) {
        alert('Error al registrarse: ' + error.message)
      })
  })

  // Iniciar sesión con Google
  document.getElementById('btnLoginGoogle').addEventListener('click', function() {
    iniciarSesionGoogle()
      .catch(function(error) {
        alert('Error con Google: ' + error.message)
      })
  })

  document.getElementById('btnRegistroGoogle').addEventListener('click', function() {
    iniciarSesionGoogle()
      .catch(function(error) {
        alert('Error con Google: ' + error.message)
      })
  })

  // ----- PANTALLA ELEGIR NOMBRE -----

  document.getElementById('btnConfirmarNombre').addEventListener('click', function() {
    const nombre = document.getElementById('inputNombreUsuario').value.trim()

    if (!nombre) {
      alert('Escribe un nombre de usuario')
      return
    }

    if (nombre.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres')
      return
    }

    nombreExiste(nombre).then(function(existe) {
      if (existe) {
        alert('Ese nombre de usuario ya está en uso, elige otro')
      } else {
        const usuario = auth.currentUser
        guardarUsuario(usuario.uid, nombre, usuario.email)
          .then(function() {
            usuarioActual = { nombreMostrar: nombre, xp: 0, victorias: 0, derrotas: 0, partidas: 0 }
            mostrarBarraUsuario()
            document.getElementById('pantallaElegirNombre').style.display = 'none'
            document.getElementById('pantallaBienvenida').style.display = 'flex'
          })
      }
    })
  })

  // ----- BARRA DE USUARIO Y PERFIL -----

  function mostrarBarraUsuario() {
    if (!usuarioActual) return
    const rango = calcularRango(usuarioActual.xp || 0)
    document.getElementById('barraUsuario').style.display = 'flex'
    document.getElementById('barraNombre').textContent = usuarioActual.nombreMostrar
    document.getElementById('barraRango').textContent = rango.icono
    document.getElementById('barraXP').textContent = (usuarioActual.xp || 0) + ' XP'
  }

  function mostrarPerfil() {
    if (!usuarioActual) return
    const xp = usuarioActual.xp || 0
    const rango = calcularRango(xp)
    const progreso = xpSiguienteRango(xp)

    document.getElementById('perfilRango').textContent = rango.icono
    document.getElementById('perfilNombre').textContent = usuarioActual.nombreMostrar
    document.getElementById('perfilNivel').textContent = rango.nombre + ' · ' + xp + ' XP'
    document.getElementById('perfilVictorias').textContent = usuarioActual.victorias || 0
    document.getElementById('perfilDerrotas').textContent = usuarioActual.derrotas || 0
    document.getElementById('perfilPartidas').textContent = usuarioActual.partidas || 0

    const winrate = usuarioActual.partidas > 0
      ? Math.round((usuarioActual.victorias / usuarioActual.partidas) * 100)
      : 0
    document.getElementById('perfilWinrate').textContent = winrate + '%'

    if (progreso.necesaria) {
      const porcentaje = Math.round((progreso.actual / progreso.necesaria) * 100)
      document.getElementById('barraProgreso').style.width = porcentaje + '%'
      document.getElementById('perfilXPTexto').textContent = progreso.actual + ' / ' + progreso.necesaria + ' XP para el siguiente rango'
    } else {
      document.getElementById('barraProgreso').style.width = '100%'
      document.getElementById('perfilXPTexto').textContent = '¡Rango máximo alcanzado!'
    }
  }

  // Abrir perfil
  document.getElementById('btnVerPerfil').addEventListener('click', function() {
    mostrarPerfil()
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaPerfil').style.display = 'flex'
  })

  // Volver desde perfil
  document.getElementById('btnVolverPerfil').addEventListener('click', function() {
    document.getElementById('pantallaPerfil').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  // Cerrar sesión
  document.getElementById('btnCerrarSesion').addEventListener('click', function() {
    cerrarSesion().then(function() {
      location.reload()
    })
  })

  // ----- PANTALLA BIENVENIDA -----

  document.getElementById('pantallaBienvenida').addEventListener('click', function() {
    document.getElementById('pantallaBienvenida').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  // ----- MENÚ PRINCIPAL -----

  document.getElementById('btnPartidaRapida').addEventListener('click', function() {
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaInicio').style.display = 'flex'
    document.getElementById('nombreEnPartida').textContent = usuarioActual ? usuarioActual.nombreMostrar : '—'
  })

  document.getElementById('btnVsCOM').addEventListener('click', function() {
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaVsCOM').style.display = 'flex'
  })

  document.getElementById('btnClasificatoria').addEventListener('click', function() {
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaClasificatoria').style.display = 'flex'
  })

  document.getElementById('btnAjustes').addEventListener('click', function() {
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaAjustes').style.display = 'flex'
  })

  // ----- BOTONES DE VOLVER -----

  document.getElementById('btnVolverMenu1').addEventListener('click', function() {
    document.getElementById('pantallaInicio').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  document.getElementById('btnVolverMenu2').addEventListener('click', function() {
    document.getElementById('pantallaVsCOM').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  document.getElementById('btnVolverMenu3').addEventListener('click', function() {
    document.getElementById('pantallaClasificatoria').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  document.getElementById('btnVolverMenu4').addEventListener('click', function() {
    document.getElementById('pantallaAjustes').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  // ----- PARTIDA RÁPIDA: Unirse -----

  document.getElementById('btnUnirse').addEventListener('click', function() {
    miNombre = usuarioActual ? usuarioActual.nombreMostrar : '—'
    socket.emit('unirse', miNombre)
    document.getElementById('textoEspera').style.display = 'block'
    document.getElementById('btnUnirse').disabled = true
  })

  socket.on('esperando', function() {
    console.log('Esperando a otro jugador...')
  })

  socket.on('partidaEncontrada', function(datos) {
    console.log('Partida encontrada:', datos)
    document.getElementById('pantallaInicio').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'flex'
  })

  // ----- JUEGO EN MARCHA -----

  let intervalo = null
  let tiempo = 0

  socket.on('nuevaRonda', function(datos) {
    document.getElementById('categoria').textContent = datos.categoria
    document.getElementById('letra').textContent = datos.letra
    document.getElementById('inputRespuesta').value = ''
    document.getElementById('btnEnviar').disabled = false

    document.getElementById('pantallaResultado').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'flex'

    clearInterval(intervalo)
    tiempo = 0
    document.getElementById('cronometro').textContent = '0.0'

    intervalo = setInterval(function() {
      tiempo += 0.1
      document.getElementById('cronometro').textContent = tiempo.toFixed(1)
    }, 100)
  })

  document.getElementById('btnEnviar').addEventListener('click', enviarRespuesta)

  function enviarRespuesta() {
    const respuesta = document.getElementById('inputRespuesta').value.trim()

    if (!respuesta) {
      alert('Escribe una palabra antes de enviar')
      return
    }

    document.getElementById('btnEnviar').disabled = true
    socket.emit('responder', respuesta)
  }

  // ----- RESULTADO DE LA RONDA -----

  socket.on('resultadoRonda', function(datos) {
    clearInterval(intervalo)

    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaResultado').style.display = 'flex'

    document.getElementById('tituloResultado').textContent = datos.mensaje

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

    if (datos.ganadorPartida) {
      setTimeout(function() {
        mostrarVictoria(datos)
      }, 2000)
    } else {
      document.getElementById('btnSiguienteRonda').style.display = 'block'
    }
  })

  document.getElementById('btnSiguienteRonda').addEventListener('click', function() {
    socket.emit('listoSiguienteRonda')
  })

  socket.on('rivalDesconectado', function() {
    alert('Tu rival se ha desconectado. La partida ha terminado.')
    location.reload()
  })

  // ----- VICTORIA FINAL -----

  function mostrarVictoria(datos) {

    // Actualizamos XP según resultado
    const usuario = auth.currentUser
    if (usuario) {
      const esGanador = datos.jugadores.find(function(j) {
        return j.nombre === usuarioActual.nombreMostrar && j.puntos >= 5
      })
      const cantidad = esGanador ? 50 : -10
      actualizarXP(usuario.uid, cantidad, !!esGanador).then(function() {
        return obtenerUsuario(usuario.uid)
      }).then(function(doc) {
        usuarioActual = doc.data()
        mostrarBarraUsuario()
      })
    }

    document.getElementById('pantallaResultado').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaVictoria').style.display = 'flex'

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

  document.getElementById('btnJugarOtraVez').addEventListener('click', function() {
    location.reload()
  })

}) // cierre del DOMContentLoaded