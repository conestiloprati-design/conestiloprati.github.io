import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
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

window.agregarCategoria = async function () {
  const nombre = document.getElementById('nuevaCategoria').value;

  if (!nombre) return alert("Escribe una categoría");

  await addDoc(collection(db, "categorias"), { nombre });

  document.getElementById('nuevaCategoria').value = "";

  cargarCategorias();
};

async function cargarCategorias() {
  const lista = document.getElementById("listaCategorias");
  const select = document.getElementById("categoriaProducto");

  lista.innerHTML = "";
  select.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "categorias"));

  querySnapshot.forEach((docu) => {
    const data = docu.data();

    // Lista
    const li = document.createElement("li");
    li.innerHTML = `
      ${data.nombre}
      <button onclick="eliminarCategoria('${docu.id}')">❌</button>
    `;
    lista.appendChild(li);

    // Select productos
    const option = document.createElement("option");
    option.value = data.nombre;
    option.textContent = data.nombre;
    select.appendChild(option);
  });
}

window.eliminarCategoria = async function (id) {
  await deleteDoc(doc(db, "categorias", id));
  cargarCategorias();
};

//////////////////////////////////////////////////
// 📌 PRODUCTOS
//////////////////////////////////////////////////

window.agregarProducto = async function () {
  const nombre = document.getElementById("nombreProducto").value;
  const precio = document.getElementById("precioProducto").value;
  const imagen = document.getElementById("imagenProducto").value;
  const categoria = document.getElementById("categoriaProducto").value;

  if (!nombre || !precio || !imagen || !categoria) {
    return alert("Completa todos los campos");
  }

  await addDoc(collection(db, "productos"), {
    nombre,
    precio,
    imagen,
    categoria
  });

  alert("Producto agregado");

  cargarProductos();
};

async function cargarProductos() {
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "productos"));

  querySnapshot.forEach((docu) => {
    const data = docu.data();

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${data.imagen}" width="50"><br>
      ${data.nombre} - $${data.precio} (${data.categoria})
      <br>
      <button onclick="eliminarProducto('${docu.id}')">❌</button>
    `;

    lista.appendChild(li);
  });
}

window.eliminarProducto = async function (id) {
  await deleteDoc(doc(db, "productos", id));
  cargarProductos();
};

//////////////////////////////////////////////////
// 🚀 INICIO
//////////////////////////////////////////////////

cargarCategorias();
cargarProductos();
