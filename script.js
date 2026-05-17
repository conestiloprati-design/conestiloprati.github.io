function comprar(producto) {

    const numero = '5358231944';

    const mensaje = `Hola, estoy interesado en comprar: ${producto}
    $${presio}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
}

















