window.comprar = function(boton) {

    const card = boton.parentElement;

    const nombre = card.querySelector("h3").innerText;
    const precio = card.querySelector(".precio").innerText;
    const imagen = card.querySelector("img").src;

    const numero = '5358231944';

    const mensaje = `Hola, quiero comprar:

🛍 ${nombre}
💲 $${precio}
📸 ${imagen}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
}
















