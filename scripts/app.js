const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const templateCarrito = document.getElementById('template-carrito').content;
const templateFooter = document.getElementById('template-footer').content;
const fragment = document.createDocumentFragment();

let carrito = {};

// SIMULE EL CONSUMIR UNA BASE DE DATOS USANDO EL JSON
// leer la API cuando el html esta completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

cards.addEventListener('click', e => {
    addCarrito(e);
})

const fetchData = async () => {
    try {
        const res = await fetch('/scripts/api.json');
        const data = await res.json();
        // console.log(data);
        pintarCards(data);
    } catch (error) {
        console.log('error al encontrar el archivo JSON');
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.titulo;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute("src", producto.imagenUrl);
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;
        // clonar el template
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    // pasarlo al fragment
    cards.appendChild(fragment);
}

const addCarrito = (e) => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement);
    }
    // detener eventos heredados de padres
    e.stopPropagation();
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    // revisamos si el producto existe en el carrito, si esta lo aumentamos en 1
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    // usamos spread operator para hacer una nueva copia y no modificar el array
    carrito[producto.id] = {
        ...producto
    }
    console.log(carrito);
}