const armarCatalogo = () =>
    fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(result => {
        const container = document.getElementById('catalogo');

        let productos = result.products

        productos.forEach(function(producto) {
            container.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${producto.thumbnail}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${producto.title} </h5>
                            <h6>$ ${producto.price}</h6>
                            <p class="card-text">${producto.description}</p>
                            <button class="add-product btn btn-primary" data-price="${producto.price}">
                                agregar producto
                            </button>
                        </div>
                    </div>
                </div>
            `
        })
    })
    .catch(error => console.log(error))