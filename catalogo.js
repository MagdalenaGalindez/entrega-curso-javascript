const armarCatalogo = () =>
    fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(result => {
        const container = document.getElementById('catalogo');

        let productos = result.products

        productos.forEach(producto => {
            container.innerHTML += `
                <div class="col">
                    <div data-price="${producto.price}" class="card h-100 producto">
                        <img src="${producto.thumbnail}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${producto.title} </h5>
                            <h6>$ ${producto.price}</h6>
                            <p class="card-text">${producto.description}</p>
                        </div>
                    </div>
                </div>
            `
        })
    })
    .catch(error => console.log(error))