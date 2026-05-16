function comprar(producto) {

    const numero = '5358231944';

    const mensaje = `Hola, estoy interesado en comprar: ${producto}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 TU CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAz-C_gm39oIgew0mJQP-tkY9UXZmKEa6I",
  authDomain: "co-n-estilo.firebaseapp.com",
  projectId: "co-n-estilo",
  storageBucket: "co-n-estilo.firebasestorage.app",
  messagingSenderId: "236826729557",
  appId: "1:236826729557:web:b9d96a57686fca1970c8dc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//////////////////////////////////////////////////
// 📌 CATEGORÍAS
//////////////////////////////////////////////////

async function cargarCategorias() {
  const contenedor = document.getElementById("categorias");

  const querySnapshot = await getDocs(collection(db, "categorias"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const btn = document.createElement("button");
    btn.textContent = data.nombre;

    btn.onclick = () => cargarProductos(data.nombre);

    contenedor.appendChild(btn);
  });
}

//////////////////////////////////////////////////
// 📌 PRODUCTOS
//////////////////////////////////////////////////

async function cargarProductos(categoria = null) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "productos"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    if (categoria && data.categoria !== categoria) return;

    const div = document.createElement("div");

    div.style.width = "45%";
    div.style.display = "inline-block";
    div.style.margin = "5px";

    div.innerHTML = `
      <img src="${data.imagen}" style="width:100%">
      <h4>${data.nombre}</h4>
      <p>$${data.precio}</p>
      <a href="https://wa.me/?text=Quiero comprar ${data.nombre}" target="_blank">
        Comprar
      </a>
    `;

    contenedor.appendChild(div);
  });
}

//////////////////////////////////////////////////
// 🚀 INICIO
//////////////////////////////////////////////////

cargarCategorias();
cargarProductos();


















