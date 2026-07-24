// Conectamos con el servidor mediante Socket.io
const socket = io()

// Guardamos nuestro nombre cuando nos unamos
let miNombre = ''

// Variables para el modo VS COM
let enModoVsCOM = false
let rondaCOM = 1
let puntosUsuarioCOM = 0
let puntosMaquinaCOM = 0
let categoriaActualCOM = ''
let letraActualCOM = ''
let timerCOM = null
let usuarioYaRespondio = false
let palabraMaquinaRonda = ''

// Variables para modo clasificatoria
let modoClasificatoria = false
let juegoActual = 1
let juegosGanadosLocal = 0
let juegosGanadosRival = 0

// Variables de ayudas tácticas
let fantasmaActivo = false

document.addEventListener('DOMContentLoaded', function() {

  let usuarioActual = null

  document.getElementById('pantallaBienvenida').style.display = 'none'

  auth.onAuthStateChanged(function(usuario) {
    if (usuario) {
      obtenerUsuario(usuario.uid).then(function(doc) {
        if (doc.exists) {
          usuarioActual = doc.data()
          gestionarRecargaVidas()
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

  document.getElementById('irARegistro').addEventListener('click', function() {
    document.getElementById('formLogin').style.display = 'none'
    document.getElementById('formRegistro').style.display = 'block'
  })

  document.getElementById('irALogin').addEventListener('click', function() {
    document.getElementById('formRegistro').style.display = 'none'
    document.getElementById('formLogin').style.display = 'block'
  })

  document.getElementById('btnLogin').addEventListener('click', function() {
    const email = document.getElementById('loginEmail').value.trim()
    const password = document.getElementById('loginPassword').value.trim()
    if (!email || !password) { alert('Rellena todos los campos'); return }
    iniciarSesion(email, password).catch(function(error) { alert('Error: ' + error.message) })
  })

  document.getElementById('btnRegistro').addEventListener('click', function() {
    const email = document.getElementById('registroEmail').value.trim()
    const password = document.getElementById('registroPassword').value.trim()
    if (!email || !password) { alert('Rellena todos los campos'); return }
    registrarse(email, password).catch(function(error) { alert('Error: ' + error.message) })
  })

  document.getElementById('btnLoginGoogle').addEventListener('click', function() {
    iniciarSesionGoogle().catch(function(error) { alert('Error con Google: ' + error.message) })
  })

  document.getElementById('btnRegistroGoogle').addEventListener('click', function() {
    iniciarSesionGoogle().catch(function(error) { alert('Error con Google: ' + error.message) })
  })

  // ----- ELEGIR NOMBRE -----

  document.getElementById('btnConfirmarNombre').addEventListener('click', function() {
    const nombre = document.getElementById('inputNombreUsuario').value.trim()
    if (!nombre) { alert('Escribe un nombre de usuario'); return }
    if (nombre.length < 3) { alert('El nombre debe tener al menos 3 caracteres'); return }

    nombreExiste(nombre).then(function(existe) {
      if (existe) {
        alert('Ese nombre ya está en uso, elige otro')
      } else {
        const usuario = auth.currentUser
        guardarUsuario(usuario.uid, nombre, usuario.email).then(function() {
          usuarioActual = { nombreMostrar: nombre, xp: 0, victorias: 0, derrotas: 0, partidas: 0, vidas: 6, tiempoUltimaPerdida: null, pistas: 3, tiempoExtra: 3, fantasmas: 3 }
          mostrarBarraUsuario()
          document.getElementById('pantallaElegirNombre').style.display = 'none'
          document.getElementById('pantallaBienvenida').style.display = 'flex'
        })
      }
    })
  })

  // ----- SISTEMA DE VIDAS -----

  function obtenerMsTiempo(tiempo) {
    if (!tiempo) return null
    if (typeof tiempo === 'number') return tiempo
    if (typeof tiempo.toMillis === 'function') return tiempo.toMillis()
    if (tiempo.seconds) return tiempo.seconds * 1000
    return Number(tiempo) || null
  }

  function gestionarRecargaVidas() {
    if (!usuarioActual) return
    const VIDAS_MAXIMAS = 6
    const TIEMPO_RECARGA_MS = 30 * 60 * 1000
    let vidasActuales = usuarioActual.vidas !== undefined ? usuarioActual.vidas : 6
    let ultimoMs = obtenerMsTiempo(usuarioActual.tiempoUltimaPerdida)

    if (vidasActuales < VIDAS_MAXIMAS && ultimoMs) {
      const ahora = Date.now()
      const tiempoPasado = ahora - ultimoMs
      const mediasRecuperadas = Math.floor(tiempoPasado / TIEMPO_RECARGA_MS)

      if (mediasRecuperadas > 0) {
        vidasActuales = Math.min(VIDAS_MAXIMAS, vidasActuales + mediasRecuperadas)
        usuarioActual.vidas = vidasActuales
        usuarioActual.tiempoUltimaPerdida = ultimoMs + (mediasRecuperadas * TIEMPO_RECARGA_MS)
        if (vidasActuales >= VIDAS_MAXIMAS) usuarioActual.tiempoUltimaPerdida = null
        const usuario = auth.currentUser
        if (usuario) guardarVidasEnFirestore(usuario.uid, vidasActuales, usuarioActual.tiempoUltimaPerdida)
      }
    }
    actualizarInterfazVidas()
  }

  function actualizarInterfazVidas() {
    if (!usuarioActual) return
    const vidas = usuarioActual.vidas !== undefined ? usuarioActual.vidas : 6
    document.getElementById('corazon1').textContent = vidas >= 2 ? '❤️' : vidas >= 1 ? '💔' : '🖤'
    document.getElementById('corazon2').textContent = vidas >= 4 ? '❤️' : vidas >= 3 ? '💔' : '🖤'
    document.getElementById('corazon3').textContent = vidas >= 6 ? '❤️' : vidas >= 5 ? '💔' : '🖤'

    const tiempoEl = document.getElementById('tiempoRecargaVida')
    if (vidas >= 6) {
      tiempoEl.textContent = ''
    } else {
      let ultimoMs = obtenerMsTiempo(usuarioActual.tiempoUltimaPerdida)
      if (ultimoMs) {
        const TIEMPO_RECARGA_MS = 30 * 60 * 1000
        const msTranscurridos = (Date.now() - ultimoMs) % TIEMPO_RECARGA_MS
        const msRestantes = TIEMPO_RECARGA_MS - msTranscurridos
        const minutos = Math.floor(msRestantes / 60000)
        const segundos = Math.floor((msRestantes % 60000) / 1000)
        tiempoEl.textContent = minutos + ':' + (segundos < 10 ? '0' : '') + segundos
      } else {
        tiempoEl.textContent = '30:00'
      }
    }
  }

  setInterval(function() {
    if (usuarioActual && usuarioActual.vidas < 6) gestionarRecargaVidas()
  }, 1000)

  function intentarGastarVida() {
    if (!usuarioActual) return false
    const vidasActuales = usuarioActual.vidas !== undefined ? usuarioActual.vidas : 6
    if (vidasActuales < 1) {
      const tiempoEl = document.getElementById('tiempoRecargaVida')
      alert('¡No tienes suficientes vidas! Espera ' + (tiempoEl.textContent || 'unos minutos') + ' para recuperar medio corazón.')
      return false
    }
    if (vidasActuales === 6 || !usuarioActual.tiempoUltimaPerdida) usuarioActual.tiempoUltimaPerdida = Date.now()
    usuarioActual.vidas = Math.max(0, vidasActuales - 1)
    const usuario = auth.currentUser
    if (usuario) guardarVidasEnFirestore(usuario.uid, usuarioActual.vidas, usuarioActual.tiempoUltimaPerdida)
    actualizarInterfazVidas()
    return true
  }

  function guardarVidasEnFirestore(uid, vidas, tiempoUltimaPerdida) {
    return db.collection('usuarios').doc(uid).update({ vidas: vidas, tiempoUltimaPerdida: tiempoUltimaPerdida })
  }

  // ----- GESTIÓN DE STOCK DE AYUDAS -----

  function actualizarStockAyudas() {
    if (!usuarioActual) return
    document.getElementById('stockPista').textContent = usuarioActual.pistas !== undefined ? usuarioActual.pistas : 3
    document.getElementById('stockTiempo').textContent = usuarioActual.tiempoExtra !== undefined ? usuarioActual.tiempoExtra : 3
    document.getElementById('stockFantasma').textContent = usuarioActual.fantasmas !== undefined ? usuarioActual.fantasmas : 3
  }

  function guardarInventarioEnFirestore() {
    const usuario = auth.currentUser
    if (usuario) {
      db.collection('usuarios').doc(usuario.uid).update({
        xp: usuarioActual.xp || 0,
        pistas: usuarioActual.pistas !== undefined ? usuarioActual.pistas : 3,
        tiempoExtra: usuarioActual.tiempoExtra !== undefined ? usuarioActual.tiempoExtra : 3,
        fantasmas: usuarioActual.fantasmas !== undefined ? usuarioActual.fantasmas : 3
      })
    }
    actualizarStockAyudas()
  }

  // ----- TIENDA -----

  document.getElementById('btnTienda').addEventListener('click', function() {
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaTienda').style.display = 'flex'
  })

  document.getElementById('btnVolverTienda').addEventListener('click', function() {
    document.getElementById('pantallaTienda').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  function iniciarCompraReal(tipoAyuda) {
    if (!usuarioActual || !auth.currentUser) { alert('Debes iniciar sesión para realizar compras.'); return }
    socket.emit('comprarAyuda', { tipoAyuda: tipoAyuda, userId: auth.currentUser.uid })
  }

  socket.on('redirigirPago', function(urlStripe) { window.location.href = urlStripe })

  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('pago') === 'exito') {
    const tipoComprado = urlParams.get('tipo')
    auth.onAuthStateChanged(function(usuario) {
      if (usuario) {
        obtenerUsuario(usuario.uid).then(function(doc) {
          if (doc.exists) {
            let datosUsr = doc.data()
            if (tipoComprado === 'pista') datosUsr.pistas = (datosUsr.pistas !== undefined ? datosUsr.pistas : 3) + 1
            if (tipoComprado === 'tiempo') datosUsr.tiempoExtra = (datosUsr.tiempoExtra !== undefined ? datosUsr.tiempoExtra : 3) + 1
            if (tipoComprado === 'fantasma') datosUsr.fantasmas = (datosUsr.fantasmas !== undefined ? datosUsr.fantasmas : 3) + 1
            db.collection('usuarios').doc(usuario.uid).update({
              pistas: datosUsr.pistas, tiempoExtra: datosUsr.tiempoExtra, fantasmas: datosUsr.fantasmas
            }).then(function() {
              alert('¡Pago completado! Se ha añadido tu ayuda al inventario.')
              window.history.replaceState({}, document.title, window.location.pathname)
              location.reload()
            })
          }
        })
      }
    })
  }

  document.getElementById('btnComprarPista').addEventListener('click', function() { iniciarCompraReal('pista') })
  document.getElementById('btnComprarTiempo').addEventListener('click', function() { iniciarCompraReal('tiempo') })
  document.getElementById('btnComprarFantasma').addEventListener('click', function() { iniciarCompraReal('fantasma') })

  // ----- AYUDAS EN PARTIDA -----

  document.getElementById('btnAyudaPista').addEventListener('click', function() {
    if (!usuarioActual) return
    if (usuarioActual.pistas === undefined) usuarioActual.pistas = 3
    if (usuarioActual.pistas <= 0) { alert('¡No te quedan pistas!'); return }

    const lista = diccionario[categoriaActualCOM] || []
    const filtradas = lista.filter(function(p) {
      return p.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toUpperCase() === letraActualCOM
    })

    if (filtradas.length > 0) {
      const palabra = filtradas[Math.floor(Math.random() * filtradas.length)]
      let pistaParcial = ''
      palabra.split('').forEach(function(letra) {
        pistaParcial += Math.random() < 0.5 ? letra : '_'
      })
      usuarioActual.pistas -= 1
      guardarInventarioEnFirestore()
      document.getElementById('inputRespuesta').value = pistaParcial
      alert('💡 Pista: ' + pistaParcial + ' (Completa los huecos _)')
    } else {
      alert('No hay palabras disponibles para generar pista.')
    }
  })

  document.getElementById('btnAyudaTiempo').addEventListener('click', function() {
    if (!usuarioActual) return
    if (usuarioActual.tiempoExtra === undefined) usuarioActual.tiempoExtra = 3
    if (usuarioActual.tiempoExtra <= 0) { alert('¡No te quedan bloqueos!'); return }
    usuarioActual.tiempoExtra -= 1
    guardarInventarioEnFirestore()
    socket.emit('cegarRival')
    alert('🔒 ¡Bloqueo activado! El rival no podrá escribir al comenzar la siguiente ronda.')
  })

  document.getElementById('btnAyudaFantasma').addEventListener('click', function() {
    if (!usuarioActual) return
    if (usuarioActual.fantasmas === undefined) usuarioActual.fantasmas = 3
    if (usuarioActual.fantasmas <= 0) { alert('¡No te quedan fantasmas!'); return }
    usuarioActual.fantasmas -= 1
    guardarInventarioEnFirestore()
    fantasmaActivo = true
    alert('👻 ¡Fantasma activado! Si fallas en esta ronda no perderás puntos.')
  })

  socket.on('activarCegueraRival', function(datos) {
    const cartel = document.getElementById('cartelBloqueado')
    const nombreBloqueador = datos && datos.nombreBloqueador ? datos.nombreBloqueador : 'tu rival'
    document.getElementById('nombreBloqueador').textContent = nombreBloqueador
    cartel.style.display = 'flex'

    const input = document.getElementById('inputRespuesta')
    const btnEnv = document.getElementById('btnEnviar')
    if (input) input.disabled = true
    if (btnEnv) btnEnv.disabled = true

    let cuenta = 5
    const cuentaEl = document.getElementById('cuentaAtrasBloqueo')
    const contador = setInterval(function() {
      cuenta -= 1
      cuentaEl.textContent = 'Se desbloqueará en ' + cuenta + ' segundos...'
      if (cuenta <= 0) {
        clearInterval(contador)
        cartel.style.display = 'none'
        if (input) input.disabled = false
        if (btnEnv) btnEnv.disabled = false
      }
    }, 1000)
  })

  // ----- BARRA DE USUARIO Y PERFIL -----

  function mostrarBarraUsuario() {
    if (!usuarioActual) return
    const rango = calcularRango(usuarioActual.xp || 0)
    document.getElementById('barraUsuario').style.display = 'flex'
    document.getElementById('barraNombre').textContent = usuarioActual.nombreMostrar
    document.getElementById('barraRango').textContent = rango.icono
    document.getElementById('barraXP').textContent = (usuarioActual.xp || 0) + ' XP'
    actualizarInterfazVidas()
    actualizarStockAyudas()
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
    const winrate = usuarioActual.partidas > 0 ? Math.round((usuarioActual.victorias / usuarioActual.partidas) * 100) : 0
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

  document.getElementById('btnVerPerfil').addEventListener('click', function() {
    mostrarPerfil()
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaPerfil').style.display = 'flex'
  })

  document.getElementById('btnVolverPerfil').addEventListener('click', function() {
    document.getElementById('pantallaPerfil').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  document.getElementById('btnCerrarSesion').addEventListener('click', function() {
    cerrarSesion().then(function() { location.reload() })
  })

  // ----- BIENVENIDA Y MENÚ -----

  document.getElementById('pantallaBienvenida').addEventListener('click', function() {
    document.getElementById('pantallaBienvenida').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  // Botón Jugar → abre selección de modo
  document.getElementById('btnJugar').addEventListener('click', function() {
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaSeleccionModo').style.display = 'flex'
  })

  document.getElementById('btnVolverMenuModo').addEventListener('click', function() {
    document.getElementById('pantallaSeleccionModo').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  // Partida Rápida
  document.getElementById('btnPartidaRapida').addEventListener('click', function() {
    gestionarRecargaVidas()
    if (!intentarGastarVida()) return
    enModoVsCOM = false
    modoClasificatoria = false
    document.getElementById('pantallaSeleccionModo').style.display = 'none'
    document.getElementById('pantallaInicio').style.display = 'flex'
    document.getElementById('nombreEnPartida').textContent = usuarioActual ? usuarioActual.nombreMostrar : '—'
    const btnUnirseEl = document.getElementById('btnUnirse')
    if (btnUnirseEl) btnUnirseEl.disabled = false
  })

  // Partida Clasificatoria
  document.getElementById('btnPartidaClasificatoria').addEventListener('click', function() {
    gestionarRecargaVidas()
    if (!intentarGastarVida()) return
    enModoVsCOM = false
    modoClasificatoria = true
    juegoActual = 1
    juegosGanadosLocal = 0
    juegosGanadosRival = 0
    document.getElementById('pantallaSeleccionModo').style.display = 'none'
    document.getElementById('pantallaInicio').style.display = 'flex'
    document.getElementById('nombreEnPartida').textContent = usuarioActual ? usuarioActual.nombreMostrar : '—'
    const btnUnirseEl = document.getElementById('btnUnirse')
    if (btnUnirseEl) btnUnirseEl.disabled = false
  })

  // VS COM desde menú de selección
  document.getElementById('btnVsCOMMenu').addEventListener('click', function() {
    gestionarRecargaVidas()
    if (!intentarGastarVida()) return
    enModoVsCOM = true
    modoClasificatoria = false
    puntosUsuarioCOM = 0
    puntosMaquinaCOM = 0
    rondaCOM = 1
    document.getElementById('pantallaSeleccionModo').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'flex'
    iniciarRondaCOM()
  })

  document.getElementById('btnUnirse').addEventListener('click', function() {
    miNombre = usuarioActual ? usuarioActual.nombreMostrar : '—'
    socket.emit('unirse', miNombre)
    document.getElementById('textoEspera').style.display = 'block'
    document.getElementById('btnUnirse').disabled = true
  })

  // ----- VS COM -----

  function iniciarRondaCOM() {
    if (puntosUsuarioCOM >= 5 || puntosMaquinaCOM >= 5) { finalizarPartidaCOM(); return }

    document.getElementById('rondaTexto').textContent = 'Ronda ' + rondaCOM + ' (Tú: ' + puntosUsuarioCOM + ' pts | IA: ' + puntosMaquinaCOM + ' pts)'
    usuarioYaRespondio = false
    palabraMaquinaRonda = ''

    const categoriasKeys = Object.keys(diccionario)
    categoriaActualCOM = categoriasKeys[Math.floor(Math.random() * categoriasKeys.length)]
    const letras = 'ABCDEFGHIJKLMNOPRSTV'
    letraActualCOM = letras.charAt(Math.floor(Math.random() * letras.length))

    document.getElementById('categoria').textContent = categoriaActualCOM
    document.getElementById('letra').textContent = letraActualCOM
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
      if (tiempo >= 30.0) {
        clearInterval(intervalo)
        if (!usuarioYaRespondio) {
          usuarioYaRespondio = true
          palabraMaquinaRonda = '(Tiempo agotado)'
          let ptsPerdidos = fantasmaActivo ? 0 : -1
          fantasmaActivo = false
          puntosUsuarioCOM = Math.max(0, puntosUsuarioCOM + ptsPerdidos)
          mostrarResultadoCOM('(Sin respuesta)', false, ptsPerdidos)
        }
      }
    }, 100)

    const tiempoReaccionIA = Math.random() * 10000 + 15000
    timerCOM = setTimeout(function() { maquinaPiensaYSale() }, tiempoReaccionIA)
  }

  function maquinaPiensaYSale() {
    if (usuarioYaRespondio) return
    const listaCategoria = diccionario[categoriaActualCOM] || []
    const letraBuscada = letraActualCOM.toLowerCase()
    const filtradas = listaCategoria.filter(function(palabra) {
      return palabra.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toLowerCase() === letraBuscada
    })
    const acierta = Math.random() < 0.75
    if (acierta && filtradas.length > 0) {
      palabraMaquinaRonda = filtradas[Math.floor(Math.random() * filtradas.length)]
      puntosMaquinaCOM += 1
    } else {
      palabraMaquinaRonda = '(La IA falló)'
      puntosMaquinaCOM = Math.max(0, puntosMaquinaCOM - 1)
    }
    usuarioYaRespondio = true
    clearInterval(intervalo)
    clearTimeout(timerCOM)
    mostrarResultadoCOM('(La IA respondió primero)', false, 0)
  }

  // ----- RANKING -----

  document.getElementById('btnClasificatoria').addEventListener('click', function() {
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaClasificatoria').style.display = 'flex'
    cargarRanking()
  })

  function cargarRanking() {
    document.getElementById('rankingCargando').style.display = 'block'
    document.getElementById('listaRanking').innerHTML = ''
    document.getElementById('miPosicionContenedor').style.display = 'none'

    db.collection('usuarios').orderBy('xp', 'desc').limit(100).get()
      .then(function(snapshot) {
        document.getElementById('rankingCargando').style.display = 'none'
        const lista = document.getElementById('listaRanking')
        lista.innerHTML = ''
        let miPosicionEnTop100 = false
        let posicion = 1

        snapshot.forEach(function(doc) {
          const datos = doc.data()
          const esYo = usuarioActual && datos.nombreUsuario === usuarioActual.nombreUsuario
          const rango = calcularRango(datos.xp || 0)
          if (esYo) miPosicionEnTop100 = true

          const fila = document.createElement('div')
          fila.className = 'ranking-fila' + (esYo ? ' ranking-yo' : '')

          let clasePosicion = 'ranking-posicion'
          if (posicion === 1) clasePosicion += ' oro'
          else if (posicion === 2) clasePosicion += ' plata'
          else if (posicion === 3) clasePosicion += ' bronce'

          let medallaTexto = posicion
          if (posicion === 1) medallaTexto = '🥇'
          else if (posicion === 2) medallaTexto = '🥈'
          else if (posicion === 3) medallaTexto = '🥉'

          fila.innerHTML = `
            <span class="${clasePosicion}">${medallaTexto}</span>
            <span class="ranking-rango">${rango.icono}</span>
            <span class="ranking-nombre">${datos.nombreMostrar || '—'}${esYo ? ' (tú)' : ''}</span>
            <span class="ranking-xp">${datos.xp || 0} XP</span>
          `
          lista.appendChild(fila)
          posicion++
        })

        if (!miPosicionEnTop100 && usuarioActual) buscarMiPosicion()
      })
      .catch(function(error) {
        console.log('Error cargando ranking:', error)
        document.getElementById('rankingCargando').textContent = 'Error al cargar el ranking.'
      })
  }

  function buscarMiPosicion() {
    if (!usuarioActual) return
    db.collection('usuarios').where('xp', '>', usuarioActual.xp || 0).get()
      .then(function(snapshot) {
        const miPosicion = snapshot.size + 1
        const rango = calcularRango(usuarioActual.xp || 0)
        document.getElementById('miPosicionContenedor').style.display = 'block'
        document.getElementById('miFilaRanking').innerHTML = `
          <div class="ranking-fila">
            <span class="ranking-posicion">#${miPosicion}</span>
            <span class="ranking-rango">${rango.icono}</span>
            <span class="ranking-nombre">${usuarioActual.nombreMostrar} (tú)</span>
            <span class="ranking-xp">${usuarioActual.xp || 0} XP</span>
          </div>
        `
      })
      .catch(function(error) { console.log('Error buscando posición:', error) })
  }

  // ----- AJUSTES Y BOTONES VOLVER -----

  document.getElementById('btnAjustes').addEventListener('click', function() {
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaAjustes').style.display = 'flex'
  })

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

  // ----- SOCKETS PARTIDA ONLINE -----

  socket.on('esperando', function() { console.log('Esperando a otro jugador...') })

  socket.on('partidaEncontrada', function(datos) {
    document.getElementById('pantallaInicio').style.display = 'none'
    const nombresJugadores = datos.jugadores || []
    const rival = nombresJugadores.find(function(n) { return n !== miNombre }) || 'Rival'
    document.getElementById('vsNombre1').textContent = miNombre || 'Tú'
    document.getElementById('vsNombre2').textContent = rival
    document.getElementById('pantallaVersus').style.display = 'flex'
    setTimeout(function() {
      document.getElementById('pantallaVersus').style.display = 'none'
      document.getElementById('pantallaJuego').style.display = 'flex'
    }, 3000)
  })

  let intervalo = null
  let tiempo = 0

  socket.on('nuevaRonda', function(datos) {
    if (enModoVsCOM) return
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
      if (tiempo >= 30.0) {
        clearInterval(intervalo)
        const btnEnv = document.getElementById('btnEnviar')
        if (!btnEnv.disabled) {
          btnEnv.disabled = true
          socket.emit('responder', { respuesta: '(Tiempo agotado)', fantasma: fantasmaActivo })
          fantasmaActivo = false
        }
      }
    }, 100)
  })

  document.getElementById('btnEnviar').addEventListener('click', enviarRespuesta)

  function enviarRespuesta() {
    const respuesta = document.getElementById('inputRespuesta').value.trim()
    if (!respuesta) { alert('Escribe una palabra antes de enviar'); return }

    if (enModoVsCOM) {
      if (usuarioYaRespondio) return
      clearTimeout(timerCOM)
      usuarioYaRespondio = true
      clearInterval(intervalo)

      const letraIngresada = respuesta.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toUpperCase()
      const listaCategoria = diccionario[categoriaActualCOM] || []
      const esValida = letraIngresada === letraActualCOM && listaCategoria.some(function(p) {
        return p.toLowerCase() === respuesta.toLowerCase()
      })

      if (esValida) {
        puntosUsuarioCOM += 1
      } else {
        let ptsPerdidos = fantasmaActivo ? 0 : -1
        puntosUsuarioCOM = Math.max(0, puntosUsuarioCOM + ptsPerdidos)
      }
      fantasmaActivo = false

      if (!palabraMaquinaRonda) {
        const aciertaIA = Math.random() < 0.75
        const filtradas = listaCategoria.filter(function(p) {
          return p.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toLowerCase() === letraActualCOM.toLowerCase()
        })
        if (aciertaIA && filtradas.length > 0) {
          palabraMaquinaRonda = filtradas[Math.floor(Math.random() * filtradas.length)]
          puntosMaquinaCOM += 1
        } else {
          palabraMaquinaRonda = '(La IA falló)'
          puntosMaquinaCOM = Math.max(0, puntosMaquinaCOM - 1)
        }
      }

      mostrarResultadoCOM(respuesta, esValida, esValida ? 1 : -1)
    } else {
      document.getElementById('btnEnviar').disabled = true
      clearInterval(intervalo)
      socket.emit('responder', { respuesta: respuesta, fantasma: fantasmaActivo })
      fantasmaActivo = false
    }
  }

  function mostrarResultadoCOM(respUser, validaUser, ptsUser) {
    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaResultado').style.display = 'flex'
    document.getElementById('tituloResultado').textContent = validaUser
      ? '¡Punto anotado (+1)!'
      : (ptsUser === 0 ? 'Palabra incorrecta (Inmune por Fantasma)' : 'Palabra incorrecta (-1)')

    const contenedor = document.getElementById('respuestasJugadores')
    contenedor.innerHTML = `
      <div class="fila-jugador" style="padding:8px 0; border-bottom:1px solid #333;">
        <span class="nombre-jugador">Tú</span>
        <span class="puntos-jugador">${respUser} — Total: ${puntosUsuarioCOM} pts</span>
      </div>
      <div class="fila-jugador" style="padding:8px 0;">
        <span class="nombre-jugador">Computadora (IA)</span>
        <span class="puntos-jugador">${palabraMaquinaRonda} — Total: ${puntosMaquinaCOM} pts</span>
      </div>
    `
    document.getElementById('btnSiguienteRonda').style.display = 'block'
  }

  socket.on('resultadoRonda', function(datos) {
    if (enModoVsCOM) return
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
      setTimeout(function() { mostrarVictoria(datos) }, 2000)
    } else {
      document.getElementById('btnSiguienteRonda').style.display = 'block'
    }
  })

  document.getElementById('btnSiguienteRonda').addEventListener('click', function() {
    if (enModoVsCOM) {
      if (puntosUsuarioCOM >= 5 || puntosMaquinaCOM >= 5) {
        finalizarPartidaCOM()
      } else {
        rondaCOM++
        iniciarRondaCOM()
      }
    } else {
      socket.emit('listoSiguienteRonda')
    }
  })

  socket.on('victoriaRival', function(datos) {
    if (enModoVsCOM) return
    clearInterval(intervalo)

    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaResultado').style.display = 'none'

    const usuario = auth.currentUser
    if (usuario && usuarioActual) {
      const xpGanado = modoClasificatoria ? 210 : 50
      actualizarXP(usuario.uid, xpGanado, true).then(function() {
        return obtenerUsuario(usuario.uid)
      }).then(function(doc) {
        usuarioActual = doc.data()
        mostrarBarraUsuario()
      })
    }

    document.getElementById('pantallaVictoria').style.display = 'flex'
    document.getElementById('nombreGanador').textContent = datos.nombreGanador

    const contenedor = document.getElementById('puntosFinales')
    contenedor.innerHTML = `
      <div class="fila-puntos-final">
        <span class="nombre">Tu rival se desconectó</span>
        <span class="puntos">Victoria por abandono</span>
      </div>
    `

    document.getElementById('btnJugarOtraVez').textContent = 'Volver al menú'
    document.getElementById('btnJugarOtraVez').onclick = function() { location.reload() }

    let cuenta = 5
    const textoContador = document.createElement('p')
    textoContador.style.cssText = 'text-align:center; color:#1a2e5a; margin-top:16px; font-size:0.9rem;'
    textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
    document.querySelector('.tarjeta-victoria').appendChild(textoContador)

    const contador = setInterval(function() {
      cuenta -= 1
      textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
      if (cuenta <= 0) { clearInterval(contador); location.reload() }
    }, 1000)
  })

  // ----- VICTORIA VS COM -----

  function finalizarPartidaCOM() {
    document.getElementById('pantallaResultado').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaVictoria').style.display = 'flex'

    const ganoUser = puntosUsuarioCOM > puntosMaquinaCOM
    document.getElementById('nombreGanador').textContent = ganoUser
      ? (usuarioActual ? usuarioActual.nombreMostrar : '¡Tú!')
      : 'Computadora (IA)'

    const contenedor = document.getElementById('puntosFinales')
    contenedor.innerHTML = `
      <div class="fila-puntos-final"><span class="nombre">Tus puntos:</span><span class="puntos">${puntosUsuarioCOM} pts</span></div>
      <div class="fila-puntos-final"><span class="nombre">Puntos de la IA:</span><span class="puntos">${puntosMaquinaCOM} pts</span></div>
    `

    const usuario = auth.currentUser
    if (usuario && ganoUser && usuarioActual) {
      const xpAnterior = usuarioActual.xp || 0
      const rangoAnterior = calcularRango(xpAnterior).nombre
      actualizarXP(usuario.uid, 30, true).then(function() {
        return obtenerUsuario(usuario.uid)
      }).then(function(doc) {
        const nuevoDatos = doc.data()
        const rangoNuevo = calcularRango(nuevoDatos.xp || 0).nombre
        if (rangoNuevo !== rangoAnterior) {
          nuevoDatos.pistas = (nuevoDatos.pistas || 3) + 1
          nuevoDatos.tiempoExtra = (nuevoDatos.tiempoExtra || 3) + 1
          nuevoDatos.fantasmas = (nuevoDatos.fantasmas || 3) + 1
          db.collection('usuarios').doc(usuario.uid).update({
            pistas: nuevoDatos.pistas, tiempoExtra: nuevoDatos.tiempoExtra, fantasmas: nuevoDatos.fantasmas
          })
          alert('🎉 ¡Has subido de rango! +1 Pista, +1 Bloqueo y +1 Fantasma de recompensa.')
        }
        usuarioActual = nuevoDatos
        mostrarBarraUsuario()
      })
    }

    document.getElementById('btnJugarOtraVez').textContent = 'Volver al menú'
    document.getElementById('btnJugarOtraVez').onclick = function() { location.reload() }

    let cuenta = 5
    const textoContador = document.createElement('p')
    textoContador.style.cssText = 'text-align:center; color:#1a2e5a; margin-top:16px; font-size:0.9rem;'
    textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
    document.querySelector('.tarjeta-victoria').appendChild(textoContador)

    const contador = setInterval(function() {
      cuenta -= 1
      textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
      if (cuenta <= 0) { clearInterval(contador); location.reload() }
    }, 1000)
  }

  // ----- VICTORIA ONLINE -----

  function mostrarVictoria(datos) {
    const usuario = auth.currentUser
    if (usuario && usuarioActual) {
      const esGanador = datos.jugadores.find(function(j) {
        return j.nombre === usuarioActual.nombreMostrar && j.puntos >= 5
      })

      // En clasificatoria la XP se da al final de la serie, no por juego
      if (!modoClasificatoria) {
        const cantidad = esGanador ? 50 : -10
        const xpAnterior = usuarioActual.xp || 0
        const rangoAnterior = calcularRango(xpAnterior).nombre
        actualizarXP(usuario.uid, cantidad, !!esGanador).then(function() {
          return obtenerUsuario(usuario.uid)
        }).then(function(doc) {
          const nuevoDatos = doc.data()
          const rangoNuevo = calcularRango(nuevoDatos.xp || 0).nombre
          if (esGanador && rangoNuevo !== rangoAnterior) {
            nuevoDatos.pistas = (nuevoDatos.pistas || 3) + 1
            nuevoDatos.tiempoExtra = (nuevoDatos.tiempoExtra || 3) + 1
            nuevoDatos.fantasmas = (nuevoDatos.fantasmas || 3) + 1
            db.collection('usuarios').doc(usuario.uid).update({
              pistas: nuevoDatos.pistas, tiempoExtra: nuevoDatos.tiempoExtra, fantasmas: nuevoDatos.fantasmas
            })
            alert('🎉 ¡Has subido de rango! +1 Pista, +1 Bloqueo y +1 Fantasma de recompensa.')
          }
          usuarioActual = nuevoDatos
          mostrarBarraUsuario()
        })
      }

      // Lógica de clasificatoria
      if (modoClasificatoria) {
        if (esGanador) {
          juegosGanadosLocal += 1
        } else {
          juegosGanadosRival += 1
        }

        if (juegosGanadosLocal >= 2 || juegosGanadosRival >= 2) {
          mostrarVictoriaFinalClasificatoria()
          return
        } else {
          juegoActual += 1
          mostrarEntreJuegos()
          return
        }
      }
    }

    // Victoria normal (partida rápida)
    document.getElementById('pantallaResultado').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaVictoria').style.display = 'flex'

    const ganador = datos.jugadores.reduce(function(a, b) { return a.puntos > b.puntos ? a : b })
    document.getElementById('nombreGanador').textContent = ganador.nombre

    const contenedor = document.getElementById('puntosFinales')
    contenedor.innerHTML = ''
    datos.jugadores.forEach(function(jugador) {
      const fila = document.createElement('div')
      fila.className = 'fila-puntos-final'
      fila.innerHTML = `<span class="nombre">${jugador.nombre}</span><span class="puntos">${jugador.puntos} pts</span>`
      contenedor.appendChild(fila)
    })

    document.getElementById('btnJugarOtraVez').textContent = 'Volver al menú'
    document.getElementById('btnJugarOtraVez').onclick = function() { location.reload() }

    let cuenta = 5
    const textoContador = document.createElement('p')
    textoContador.style.cssText = 'text-align:center; color:#1a2e5a; margin-top:16px; font-size:0.9rem;'
    textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
    document.querySelector('.tarjeta-victoria').appendChild(textoContador)

    const contador = setInterval(function() {
      cuenta -= 1
      textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
      if (cuenta <= 0) { clearInterval(contador); location.reload() }
    }, 1000)
  }

  // ----- CLASIFICATORIA: ENTRE JUEGOS -----

  function mostrarEntreJuegos() {
    document.getElementById('pantallaResultado').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaVictoria').style.display = 'flex'

    const tituloJuego = juegoActual === 3 ? '¡Juego de desempate!' : 'Juego ' + (juegoActual - 1) + ' completado'
    document.getElementById('nombreGanador').textContent = tituloJuego

    const contenedor = document.getElementById('puntosFinales')
    contenedor.innerHTML = `
      <div class="fila-puntos-final">
        <span class="nombre">${usuarioActual ? usuarioActual.nombreMostrar : 'Tú'}</span>
        <span class="puntos">${juegosGanadosLocal} juegos ganados</span>
      </div>
      <div class="fila-puntos-final">
        <span class="nombre">Rival</span>
        <span class="puntos">${juegosGanadosRival} juegos ganados</span>
      </div>
    `

    const btnOtraVez = document.getElementById('btnJugarOtraVez')
    btnOtraVez.textContent = juegoActual === 3 ? '¡Jugar desempate! 🔥' : 'Siguiente juego →'
    btnOtraVez.onclick = function() {
      document.getElementById('pantallaVictoria').style.display = 'none'
      socket.emit('listoSiguienteJuego')
    }
  }

  // ----- CLASIFICATORIA: VICTORIA FINAL -----

  function mostrarVictoriaFinalClasificatoria() {
    document.getElementById('pantallaResultado').style.display = 'none'
    document.getElementById('pantallaJuego').style.display = 'none'
    document.getElementById('pantallaVictoria').style.display = 'flex'

    const ganoSerie = juegosGanadosLocal > juegosGanadosRival
    document.getElementById('nombreGanador').textContent = ganoSerie
      ? (usuarioActual ? usuarioActual.nombreMostrar : 'Tú')
      : 'Rival'

    // Damos XP al ganador de la serie
    const usuario = auth.currentUser
    if (usuario && usuarioActual && ganoSerie) {
      const xpAnterior = usuarioActual.xp || 0
      const rangoAnterior = calcularRango(xpAnterior).nombre
      actualizarXP(usuario.uid, 210, true).then(function() {
        return obtenerUsuario(usuario.uid)
      }).then(function(doc) {
        const nuevoDatos = doc.data()
        const rangoNuevo = calcularRango(nuevoDatos.xp || 0).nombre
        if (rangoNuevo !== rangoAnterior) {
          nuevoDatos.pistas = (nuevoDatos.pistas || 3) + 1
          nuevoDatos.tiempoExtra = (nuevoDatos.tiempoExtra || 3) + 1
          nuevoDatos.fantasmas = (nuevoDatos.fantasmas || 3) + 1
          db.collection('usuarios').doc(usuario.uid).update({
            pistas: nuevoDatos.pistas, tiempoExtra: nuevoDatos.tiempoExtra, fantasmas: nuevoDatos.fantasmas
          })
          alert('🎉 ¡Has subido de rango! +1 Pista, +1 Bloqueo y +1 Fantasma de recompensa.')
        }
        usuarioActual = nuevoDatos
        mostrarBarraUsuario()
      })
    } else if (usuario && usuarioActual && !ganoSerie) {
      actualizarXP(usuario.uid, -10, false).then(function() {
        return obtenerUsuario(usuario.uid)
      }).then(function(doc) {
        usuarioActual = doc.data()
        mostrarBarraUsuario()
      })
    }

    const contenedor = document.getElementById('puntosFinales')
    contenedor.innerHTML = `
      <div class="fila-puntos-final">
        <span class="nombre">${usuarioActual ? usuarioActual.nombreMostrar : 'Tú'}</span>
        <span class="puntos">${juegosGanadosLocal} juegos</span>
      </div>
      <div class="fila-puntos-final">
        <span class="nombre">Rival</span>
        <span class="puntos">${juegosGanadosRival} juegos</span>
      </div>
      <div class="fila-puntos-final" style="margin-top:8px;">
        <span class="nombre">${ganoSerie ? '🏅 +210 XP por victoria clasificatoria' : '-10 XP'}</span>
        <span class="puntos"></span>
      </div>
    `

    const btnOtraVez = document.getElementById('btnJugarOtraVez')
    btnOtraVez.textContent = 'Volver al menú'
    btnOtraVez.onclick = function() { location.reload() }

    let cuenta = 8
    const textoContador = document.createElement('p')
    textoContador.style.cssText = 'text-align:center; color:#1a2e5a; margin-top:16px; font-size:0.9rem;'
    textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
    document.querySelector('.tarjeta-victoria').appendChild(textoContador)

    const contador = setInterval(function() {
      cuenta -= 1
      textoContador.textContent = 'Volviendo al menú en ' + cuenta + ' segundos...'
      if (cuenta <= 0) { clearInterval(contador); location.reload() }
    }, 1000)
  }

  // ----- SERVICE WORKER -----

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(function() { console.log('Service Worker registrado correctamente') })
      .catch(function(error) { console.log('Error SW:', error) })
  }

}) // cierre del DOMContentLoaded