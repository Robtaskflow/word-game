// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_EHjO8zrP_vqrrqcW37_P8eFiP42GmBY",
  authDomain: "word-game-longa.firebaseapp.com",
  projectId: "word-game-longa",
  storageBucket: "word-game-longa.firebasestorage.app",
  messagingSenderId: "349475684419",
  appId: "1:349475684419:web:5077c6d7067dc7723c54f6"
}

// Iniciamos Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const providerGoogle = new firebase.auth.GoogleAuthProvider()

// Comprueba si un nombre de usuario ya existe
function nombreExiste(nombre) {
  return db.collection('usuarios')
    .where('nombreUsuario', '==', nombre.toLowerCase())
    .get()
    .then(function(resultado) {
      return !resultado.empty
    })
}

// Guarda el usuario en la base de datos
function guardarUsuario(uid, nombre, email) {
  return db.collection('usuarios').doc(uid).set({
    nombreUsuario: nombre.toLowerCase(),
    nombreMostrar: nombre,
    email: email,
    partidas: 0,
    victorias: 0,
    creadoEn: firebase.firestore.FieldValue.serverTimestamp()
  })
}

// Obtiene los datos del usuario
function obtenerUsuario(uid) {
  return db.collection('usuarios').doc(uid).get()
}

// Función para registrarse con email y contraseña
function registrarse(email, contrasena) {
  return auth.createUserWithEmailAndPassword(email, contrasena)
}

// Función para iniciar sesión con email y contraseña
function iniciarSesion(email, contrasena) {
  return auth.signInWithEmailAndPassword(email, contrasena)
}

// Función para iniciar sesión con Google
function iniciarSesionGoogle() {
  return auth.signInWithPopup(providerGoogle)
}

// Función para cerrar sesión
function cerrarSesion() {
  return auth.signOut()
}
// Calcula el rango según la XP
function calcularRango(xp) {
  if (xp >= 6000) return { icono: '💎', nombre: 'Diamante' }
  if (xp >= 3000) return { icono: '🥇', nombre: 'Oro' }
  if (xp >= 1000) return { icono: '🥈', nombre: 'Plata' }
  return { icono: '🥉', nombre: 'Bronze' }
}

// XP necesaria para el siguiente rango
function xpSiguienteRango(xp) {
  if (xp >= 6000) return { actual: xp - 6000, necesaria: null }
  if (xp >= 3000) return { actual: xp - 3000, necesaria: 3000 }
  if (xp >= 1000) return { actual: xp - 1000, necesaria: 2000 }
  return { actual: xp, necesaria: 1000 }
}

// Actualiza XP del usuario en Firestore
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