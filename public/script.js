const socket = io()
let miNombre = ''
let enModoVsCOM = false
let rondaCOM = 1
let puntosUsuarioCOM = 0
let puntosMaquinaCOM = 0
let categoriaActualCOM = ''
let letraActualCOM = ''
let timerCOM = null
let usuarioYaRespondio = false
let palabraMaquinaRonda = ''
let modoClasificatoria = false
let juegoActual = 1
let juegosGanadosLocal = 0
let juegosGanadosRival = 0
let fantasmaActivo = false

function quitarAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

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
          actualizarUIAvatar()
          document.getElementById('pantallaLogin').style.display = 'none'
          document.getElementById('pantallaBienvenida').style.display = 'flex'
          const titulo = document.getElementById('tituloBienvenida')
          if (titulo) {
            titulo.classList.remove('animar-caida')
            void titulo.offsetWidth
            titulo.classList.add('animar-caida')
          }
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
        // Inicializamos al usuario con ninja1 por defecto
        guardarUsuario(usuario.uid, nombre, usuario.email).then(function() {
          usuarioActual = { nombreMostrar: nombre, xp: 0, victorias: 0, derrotas: 0, partidas: 0, vidas: 6, tiempoUltimaPerdida: null, pistas: 3, tiempoExtra: 3, fantasmas: 3, diamantes: 0, avatar: 'ninja1' }
          // También lo forzamos en Firebase en este instante
          guardarAvatar(usuario.uid, 'ninja1');
          mostrarBarraUsuario()
          actualizarUIAvatar()
          document.getElementById('pantallaElegirNombre').style.display = 'none'
          document.getElementById('pantallaBienvenida').style.display = 'flex'
        })
      }
    })
  })

  // ----- AVATARES Y ANIMACIONES -----

  function guardarAvatar(uid, avatar) {
    if (!uid) return;
    return db.collection('usuarios').doc(uid).update({ avatar: avatar });
  }

  window.seleccionarAvatar = function(nombreAvatar) {
    const usuario = auth.currentUser
    if (!usuario || !usuarioActual) return
    usuarioActual.avatar = nombreAvatar
    guardarAvatar(usuario.uid, nombreAvatar)
    actualizarUIAvatar()
  }

  function actualizarUIAvatar() {
    if (!usuarioActual) return
    const avatar = usuarioActual.avatar || 'ninja1' 

    // Actualizar pantalla Perfil
    const elNinja = document.getElementById('avatarNinja')
    const elMago = document.getElementById('avatarMago')
    if (elNinja) elNinja.classList.toggle('seleccionado', avatar === 'ninja1')
    if (elMago) elMago.classList.toggle('seleccionado', avatar === 'mago1')

    // Actualizar miniatura barra de usuario arriba a la izquierda
    const barraRango = document.getElementById('barraRango')
    if (barraRango) {
        barraRango.style.backgroundImage = `url('${avatar}.png')`
        barraRango.textContent = '' // quitamos emoji por si acaso
    }

    // Actualizar Avatar y Proyectil en Arena de Combate
    const avatarJugador = document.getElementById('avatarLuchaJugador')
    const proyectilJugador = document.getElementById('proyectilJugador')
    if (avatarJugador) avatarJugador.style.backgroundImage = `url('${avatar}.png')`
    
    if (proyectilJugador) {
        if (avatar === 'ninja1') {
            proyectilJugador.style.backgroundImage = "url('cuchillo.png')"
            proyectilJugador.className = "proyectil-arma"
        } else {
            proyectilJugador.style.backgroundImage = "url('fuego.png')"
            proyectilJugador.className = "proyectil-fuego"
        }
    }
  }

  function animarAtaque(ganadorEsJugador) {
    const avatarJugador = document.getElementById('avatarLuchaJugador')
    const avatarRival = document.getElementById('avatarLuchaCOM')
    const proyectilJugador = document.getElementById('proyectilJugador')
    const proyectilCOM = document.getElementById('proyectilCOM')

    if (ganadorEsJugador && proyectilJugador) {
        proyectilJugador.classList.remove('volar-derecha')
        void proyectilJugador.offsetWidth 
        proyectilJugador.classList.add('volar-derecha')
        setTimeout(() => { if(avatarRival) avatarRival.classList.add('anim-dano') }, 400)
    } else if (!ganadorEsJugador && proyectilCOM) {
        proyectilCOM.classList.remove('volar-izquierda')
        void proyectilCOM.offsetWidth
        proyectilCOM.classList.add('volar-izquierda')
        setTimeout(() => { if(avatarJugador) avatarJugador.classList.add('anim-dano') }, 400)
    }

    setTimeout(() => {
        if(avatarJugador) avatarJugador.classList.remove('anim-dano')
        if(avatarRival) avatarRival.classList.remove('anim-dano')
    }, 900)
  }

  // ----- SISTEMA DE VIDAS Y DIAMANTES -----

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
      const mediasRecuperadas = Math.floor((ahora - ultimoMs) / TIEMPO_RECARGA_MS)
      if (mediasRecuperadas > 0) {
        vidasActuales = Math.min(VIDAS_MAXIMAS, vidasActuales + mediasRecuperadas)
        usuarioActual.vidas = vidasActuales
        usuarioActual.tiempoUltimaPerdida = ultimoMs + (mediasRecuperadas * TIEMPO_RECARGA_MS)
        if (vidasActuales >= VIDAS_MAXIMAS) usuarioActual.tiempoUltimaPerdida = null
        const usuario = auth.currentUser
        if (usuario) db.collection('usuarios').doc(usuario.uid).update({ vidas: vidasActuales, tiempoUltimaPerdida: usuarioActual.tiempoUltimaPerdida })
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
        const msRestantes = TIEMPO_RECARGA_MS - ((Date.now() - ultimoMs) % TIEMPO_RECARGA_MS)
        const minutos = Math.floor(msRestantes / 60000)
        const segundos = Math.floor((msRestantes % 60000) / 1000)
        tiempoEl.textContent = minutos + ':' + (segundos < 10 ? '0' : '') + segundos
      }
    }
  }

  setInterval(function() { if (usuarioActual && usuarioActual.vidas < 6) gestionarRecargaVidas() }, 1000)

  function intentarGastarVida() {
    if (!usuarioActual) return false
    const vidasActuales = usuarioActual.vidas !== undefined ? usuarioActual.vidas : 6
    if (vidasActuales < 1) { alert('¡No tienes suficientes vidas!'); return false }
    if (vidasActuales === 6 || !usuarioActual.tiempoUltimaPerdida) usuarioActual.tiempoUltimaPerdida = Date.now()
    usuarioActual.vidas = Math.max(0, vidasActuales - 1)
    const usuario = auth.currentUser
    if (usuario) db.collection('usuarios').doc(usuario.uid).update({ vidas: usuarioActual.vidas, tiempoUltimaPerdida: usuarioActual.tiempoUltimaPerdida })
    actualizarInterfazVidas()
    return true
  }

  function actualizarDiamantesUI() {
    const d = usuarioActual ? (usuarioActual.diamantes || 0) : 0
    if (document.getElementById('contadorDiamantes')) document.getElementById('contadorDiamantes').textContent = d
    if (document.getElementById('diamantesTienda')) document.getElementById('diamantesTienda').textContent = d
    if (document.getElementById('perfilDiamantes')) document.getElementById('perfilDiamantes').textContent = d
  }

  function darDiamantes(cantidad) {
    const usuario = auth.currentUser
    if (!usuario || !usuarioActual) return
    usuarioActual.diamantes = (usuarioActual.diamantes || 0) + cantidad
    actualizarDiamantesUI()
    añadirDiamantes(usuario.uid, cantidad)
  }

  // ----- AYUDAS Y STOCK -----

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
        pistas: usuarioActual.pistas || 0,
        tiempoExtra: usuarioActual.tiempoExtra || 0,
        fantasmas: usuarioActual.fantasmas || 0
      })
    }
    actualizarStockAyudas()
  }

  document.getElementById('btnAyudaPista').addEventListener('click', function() {
    if (!usuarioActual || usuarioActual.pistas <= 0) { alert('¡No te quedan pistas!'); return }
    const lista = diccionario[categoriaActualCOM] || []
    const letraBuscada = quitarAcentos(letraActualCOM.toLowerCase())
    const filtradas = lista.filter(p => quitarAcentos(p).charAt(0).toLowerCase() === letraBuscada)
    if (filtradas.length > 0) {
      const palabra = filtradas[Math.floor(Math.random() * filtradas.length)]
      let pistaParcial = ''
      palabra.split('').forEach(letra => pistaParcial += Math.random() < 0.5 ? letra : '_')
      usuarioActual.pistas -= 1; guardarInventarioEnFirestore()
      document.getElementById('inputRespuesta').value = pistaParcial
      alert('💡 Pista: ' + pistaParcial)
    }
  })

  document.getElementById('btnAyudaTiempo').addEventListener('click', function() {
    if (!usuarioActual || usuarioActual.tiempoExtra <= 0) { alert('¡No te quedan bloqueos!'); return }
    usuarioActual.tiempoExtra -= 1; guardarInventarioEnFirestore()
    socket.emit('cegarRival')
    alert('🔒 ¡Rival bloqueado!')
  })

  document.getElementById('btnAyudaFantasma').addEventListener('click', function() {
    if (!usuarioActual || usuarioActual.fantasmas <= 0) { alert('¡No te quedan fantasmas!'); return }
    usuarioActual.fantasmas -= 1; guardarInventarioEnFirestore()
    fantasmaActivo = true
    alert('👻 ¡Fantasma activado!')
  })

  // ----- BARRA Y PERFIL -----

  function mostrarBarraUsuario() {
    if (!usuarioActual) return
    const rango = calcularRango(usuarioActual.xp || 0)
    document.getElementById('barraUsuario').style.display = 'flex'
    document.getElementById('barraNombre').textContent = usuarioActual.nombreMostrar
    document.getElementById('barraXP').textContent = (usuarioActual.xp || 0) + ' XP'
    actualizarInterfazVidas()
    actualizarStockAyudas()
    actualizarDiamantesUI()
    actualizarUIAvatar()
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
    document.getElementById('perfilWinrate').textContent = usuarioActual.partidas > 0 ? Math.round((usuarioActual.victorias / usuarioActual.partidas) * 100) + '%' : '0%'
    if (progreso.necesaria) {
      document.getElementById('barraProgreso').style.width = Math.round((progreso.actual / progreso.necesaria) * 100) + '%'
      document.getElementById('perfilXPTexto').textContent = progreso.actual + ' / ' + progreso.necesaria + ' XP'
    }
    actualizarDiamantesUI()
    actualizarUIAvatar() // Fuerza a pintar el avatar correcto al abrir perfil
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
    cerrarSesion().then(() => location.reload())
  })

 // ----- NAVEGACIÓN Y MENÚS -----

  // ¡Esta es la línea que faltaba para poder entrar al juego!
  document.getElementById('pantallaBienvenida').addEventListener('click', function() {
    document.getElementById('pantallaBienvenida').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  document.getElementById('btnJugar').addEventListener('click', function() {
    document.getElementById('pantallaMenu').style.display = 'none'
    document.getElementById('pantallaSeleccionModo').style.display = 'flex'
  })

  document.getElementById('btnVolverMenuModo').addEventListener('click', function() {
    document.getElementById('pantallaSeleccionModo').style.display = 'none'
    document.getElementById('pantallaMenu').style.display = 'flex'
  })

  // Botones de Tienda y Ajustes recuperados
  if(document.getElementById('btnTienda')) {
    document.getElementById('btnTienda').addEventListener('click', function() {
      document.getElementById('pantallaMenu').style.display = 'none'
      document.getElementById('pantallaTienda').style.display = 'flex'
    })
  }

  if(document.getElementById('btnVolverTienda')) {
    document.getElementById('btnVolverTienda').addEventListener('click', function() {
      document.getElementById('pantallaTienda').style.display = 'none'
      document.getElementById('pantallaMenu').style.display = 'flex'
    })
  }

  // BOTÓN SALIR DE PARTIDA
  document.getElementById('btnSalirPartida').addEventListener('click', () => {
      const seguro = confirm("¿Estás seguro de que quieres abandonar? Perderás la partida.");
      if (seguro) {
        document.getElementById('pantallaJuego').style.display = 'none';
        document.getElementById('pantallaMenu').style.display = 'flex';
        if (typeof intervalo !== 'undefined') clearInterval(intervalo);
        if (typeof timerCOM !== 'undefined') clearTimeout(timerCOM);
      }
  });
  
  // BOTÓN SALIR DE PARTIDA
  document.getElementById('btnSalirPartida').addEventListener('click', () => {
      const seguro = confirm("¿Estás seguro de que quieres abandonar? Perderás la partida.");
      if (seguro) {
        document.getElementById('pantallaJuego').style.display = 'none';
        document.getElementById('pantallaMenu').style.display = 'flex';
        if (typeof intervalo !== 'undefined') clearInterval(intervalo);
        if (typeof timerCOM !== 'undefined') clearTimeout(timerCOM);
      }
  });

  document.getElementById('btnVsCOMMenu').addEventListener('click', function() {
    if (!intentarGastarVida()) return
    enModoVsCOM = true
    puntosUsuarioCOM = 0
    puntosMaquinaCOM = 0
    rondaCOM = 1
    document.getElementById('pantallaSeleccionModo').style.display = 'none'
    actualizarUIAvatar()
    document.getElementById('pantallaJuego').style.display = 'flex'
    iniciarRondaCOM()
  })

  // ----- VS COM LOGIC -----

  let intervalo = null
  let tiempo = 0

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
    
    // Forzamos visibilidad de avatares al inicio
    actualizarUIAvatar();

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
          puntosUsuarioCOM = Math.max(0, puntosUsuarioCOM + (fantasmaActivo ? 0 : -1))
          fantasmaActivo = false
          maquinaPiensaYSale()
          mostrarResultadoCOM('(Sin respuesta)', false, -1)
        }
      }
    }, 100)
    timerCOM = setTimeout(() => maquinaPiensaYSale(), Math.random() * 10000 + 15000)
  }

  function maquinaPiensaYSale() {
    if (palabraMaquinaRonda) return
    const listaCategoria = diccionario[categoriaActualCOM] || []
    const letraBuscada = quitarAcentos(letraActualCOM.toLowerCase())
    const filtradas = listaCategoria.filter(p => quitarAcentos(p).charAt(0).toLowerCase() === letraBuscada)
    if (Math.random() < 0.75 && filtradas.length > 0) {
      palabraMaquinaRonda = filtradas[Math.floor(Math.random() * filtradas.length)]
      puntosMaquinaCOM += 1
    } else {
      palabraMaquinaRonda = '(La IA falló)'
      puntosMaquinaCOM = Math.max(0, puntosMaquinaCOM - 1)
    }
    if (!usuarioYaRespondio) {
      usuarioYaRespondio = true
      clearInterval(intervalo); clearTimeout(timerCOM)
      mostrarResultadoCOM('(La IA respondió primero)', false, 0)
    }
  }

  document.getElementById('btnEnviar').addEventListener('click', function() {
    const respuesta = document.getElementById('inputRespuesta').value.trim()
    if (!respuesta) return

    if (enModoVsCOM) {
      if (usuarioYaRespondio) return
      clearTimeout(timerCOM); usuarioYaRespondio = true; clearInterval(intervalo)
      const respuestaLimpia = quitarAcentos(respuesta.toLowerCase())
      const letraLimpia = quitarAcentos(letraActualCOM.toLowerCase())
      const listaCategoria = diccionario[categoriaActualCOM] || []
      const esValida = respuestaLimpia.charAt(0) === letraLimpia && listaCategoria.some(p => quitarAcentos(p.toLowerCase()) === respuestaLimpia)
      
      if (esValida) puntosUsuarioCOM += 1
      else puntosUsuarioCOM = Math.max(0, puntosUsuarioCOM + (fantasmaActivo ? 0 : -1))
      fantasmaActivo = false

      if (!palabraMaquinaRonda) {
        const filtradas = listaCategoria.filter(p => quitarAcentos(p).charAt(0).toLowerCase() === letraLimpia)
        if (Math.random() < 0.75 && filtradas.length > 0) {
          palabraMaquinaRonda = filtradas[Math.floor(Math.random() * filtradas.length)]; puntosMaquinaCOM += 1
        } else {
          palabraMaquinaRonda = '(La IA falló)'; puntosMaquinaCOM = Math.max(0, puntosMaquinaCOM - 1)
        }
      }
      mostrarResultadoCOM(respuesta, esValida, esValida ? 1 : -1)
    }
  })

  function mostrarResultadoCOM(respUser, validaUser, ptsUser) {
    animarAtaque(validaUser)
    
    // Retrasamos la tarjeta 1 segundo para ver las animaciones
    setTimeout(() => {
        document.getElementById('pantallaJuego').style.display = 'none'
        document.getElementById('pantallaResultado').style.display = 'flex'
        const titulo = document.getElementById('tituloResultado')
        titulo.textContent = validaUser ? 'PALABRA CORRECTA (+1)' : (ptsUser === 0 ? 'PALABRA INCORRECTA (INMUNE)' : 'PALABRA INCORRECTA (-1)')
        titulo.style.color = validaUser ? '#2ecc71' : '#ff5e5e'
        
        const iaValida = palabraMaquinaRonda && palabraMaquinaRonda !== '(La IA falló)' && palabraMaquinaRonda !== '(Tiempo agotado)' && palabraMaquinaRonda !== '(La IA respondió primero)'
        
        document.getElementById('respuestasJugadores').innerHTML = `
          <div class="fila-jugador" style="padding:10px 0; border-bottom:1px solid rgba(30,58,110,0.4);">
            <span class="nombre-jugador">Tú</span>
            <span class="puntos-jugador" style="color:${validaUser ? '#2ecc71' : '#ff5e5e'}">${respUser} — ${puntosUsuarioCOM} pts</span>
          </div>
          <div class="fila-jugador" style="padding:10px 0;">
            <span class="nombre-jugador">🤖 Mago (IA)</span>
            <span class="puntos-jugador" style="color:${iaValida ? '#2ecc71' : '#ff5e5e'}">${palabraMaquinaRonda} — ${puntosMaquinaCOM} pts</span>
          </div>
        `
        document.getElementById('btnSiguienteRonda').style.display = 'block'
    }, 1000)
  }

  document.getElementById('btnSiguienteRonda').addEventListener('click', function() {
    if (enModoVsCOM) {
      if (puntosUsuarioCOM >= 5 || puntosMaquinaCOM >= 5) finalizarPartidaCOM()
      else { rondaCOM++; iniciarRondaCOM() }
    }
  })

  function finalizarPartidaCOM() {
    document.getElementById('pantallaResultado').style.display = 'none'
    document.getElementById('pantallaVictoria').style.display = 'flex'
    document.getElementById('nombreGanador').textContent = puntosUsuarioCOM > puntosMaquinaCOM ? (usuarioActual ? usuarioActual.nombreMostrar : '¡Tú!') : 'Mago (IA)'
    document.getElementById('btnJugarOtraVez').onclick = () => location.reload()
  }

}) // Fin DOMContentLoaded