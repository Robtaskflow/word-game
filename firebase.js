// Importamos Firebase
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_EHjO8zrP_vqrrqcW37_P8eFiP42GmBY",
  authDomain: "word-game-longa.firebaseapp.com",
  projectId: "word-game-longa",
  storageBucket: "word-game-longa.firebasestorage.app",
  messagingSenderId: "349475684419",
  appId: "1:349475684419:web:5077c6d7067dc7723c54f6"
}

// Iniciamos Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const providerGoogle = new GoogleAuthProvider()

// Función para registrarse con email y contraseña
function registrarse(email, contrasena) {
  return createUserWithEmailAndPassword(auth, email, contrasena)
}

// Función para iniciar sesión con email y contraseña
function iniciarSesion(email, contrasena) {
  return signInWithEmailAndPassword(auth, email, contrasena)
}

// Función para iniciar sesión con Google
function iniciarSesionGoogle() {
  return signInWithPopup(auth, providerGoogle)
}

// Función para cerrar sesión
function cerrarSesion() {
  return signOut(auth)
}

export { auth, registrarse, iniciarSesion, iniciarSesionGoogle, cerrarSesion }