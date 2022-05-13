const armarCatalogo = () =>
    fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(result => {
        const container = document.getElementById('catalogo');

        let productos = result.products

        productos.forEach(producto => {
            container.innerHTML += `
                    <h2>${producto.title}</h2>
                    <h3>${producto.price}<h3>
                `
        })
    })
    .catch(error => console.log(error))