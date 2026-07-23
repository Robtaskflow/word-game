const firebaseConfig = {
  apiKey: "AIzaSyD_EHjO8zrP_vqrrqcW37_P8eFiP42GmBY",
  authDomain: "word-game-longa.firebaseapp.com",
  projectId: "word-game-longa",
  storageBucket: "word-game-longa.firebasestorage.app",
  messagingSenderId: "349475684419",
  appId: "1:349475684419:web:5077c6d7067dc7723c54f6"
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const providerGoogle = new firebase.auth.GoogleAuthProvider()

function nombreExiste(nombre) {
  return db.collection('usuarios')
    .where('nombreUsuario', '==', nombre.toLowerCase())
    .get()
    .then(function(resultado) {
      return !resultado.empty
    })
}

function guardarUsuario(uid, nombre, email) {
  return db.collection('usuarios').doc(uid).set({
    nombreUsuario: nombre.toLowerCase(),
    nombreMostrar: nombre,
    email: email,
    partidas: 0,
    victorias: 0,
    derrotas: 0,
    xp: 0,
    vidas: 6,
    tiempoUltimaPerdida: null,
    creadoEn: firebase.firestore.FieldValue.serverTimestamp()
  })
}

function obtenerUsuario(uid) {
  return db.collection('usuarios').doc(uid).get()
}

function registrarse(email, contrasena) {
  return auth.createUserWithEmailAndPassword(email, contrasena)
}

function iniciarSesion(email, contrasena) {
  return auth.signInWithEmailAndPassword(email, contrasena)
}

function iniciarSesionGoogle() {
  return auth.signInWithPopup(providerGoogle)
}

function cerrarSesion() {
  return auth.signOut()
}

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

function actualizarXP(uid, cantidad, esVictoria) {
  return db.collection('usuarios').doc(uid).get().then(function(doc) {
    const datos = doc.data()
    const xpActual = datos.xp || 0
    const nuevaXP = Math.max(0, xpActual + cantidad)
    const victorias = (datos.victorias || 0) + (esVictoria ? 1 : 0)
    const derrotas = (datos.derrotas || 0) + (esVictoria ? 0 : 1)
    const partidas = (datos.partidas || 0) + 1

    return db.collection('usuarios').doc(uid).update({
      xp: nuevaXP,
      victorias: victorias,
      derrotas: derrotas,
      partidas: partidas
    })
  })
}

// Calcula las vidas actuales teniendo en cuenta la recuperacion automatica
function calcularVidasActuales(datos) {
  const vidasGuardadas = datos.vidas !== undefined ? datos.vidas : 6
  const tiempoUltimaPerdida = datos.tiempoUltimaPerdida

  if (vidasGuardadas >= 6 || !tiempoUltimaPerdida) return 6

  const ahora = Date.now()
  const milisegundos30min = 30 * 60 * 1000
  const tiempoPasado = ahora - tiempoUltimaPerdida.toMillis()
  const mediasRecuperadas = Math.floor(tiempoPasado / milisegundos30min)
  const nuevasVidas = Math.min(6, vidasGuardadas + mediasRecuperadas)

  return nuevasVidas
}

// Quita medio corazon al perder una partida
function perderMediaVida(uid) {
  return db.collection('usuarios').doc(uid).get().then(function(doc) {
    const datos = doc.data()
    const vidasActuales = calcularVidasActuales(datos)
    const nuevasVidas = Math.max(0, vidasActuales - 1)

    return db.collection('usuarios').doc(uid).update({
      vidas: nuevasVidas,
      tiempoUltimaPerdida: firebase.firestore.Timestamp.fromMillis(Date.now())
    })
  })
}