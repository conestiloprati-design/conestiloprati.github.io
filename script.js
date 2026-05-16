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
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
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


















