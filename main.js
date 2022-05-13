/*Calcular pagos en cuotas sobre un monto determinado.*/

class Carrito {
    constructor() {
        this.productos = []

        const productosLocalStorage = JSON.parse(localStorage.getItem("carrito-productos"))

        if (Array.isArray(productosLocalStorage)) {
            this.productos = productosLocalStorage
        }
    }

    agregarProducto(precioLista) {
        this.productos.push(precioLista)

        localStorage.setItem("carrito-productos", JSON.stringify(this.productos))
    }

    vaciarCarrito() {
        this.productos = []

        localStorage.setItem("carrito-productos", JSON.stringify([]))
    }

    obtenerValorCuotas(cantidadCuotas) {
        const precioTotalConImpuestos = this.obtenerPrecioConImpuestos()

        return precioTotalConImpuestos / cantidadCuotas
    }

    obtenerResumen() {
        let precioListaTotal = 0

        for (const precioLista of this.productos) {
            precioListaTotal += precioLista
        }

        return `Tiene ${this.productos.length} productos por un total de $ ${precioListaTotal}.`
    }

    obtenerPrecioConImpuestos() {
        let precioConImpuestos = 0

        for (const precioProducto of this.productos) {
            const porcentajeImpuesto = (precioProducto > 200) ? 1.19 : 1.08

            const precioFinalProducto = precioProducto * porcentajeImpuesto

            console.log(`Producto: $ ${precioProducto} - Impuesto: ${porcentajeImpuesto}
            - Precio Final: ${precioFinalProducto}`)

            precioConImpuestos += precioFinalProducto
        }

        return precioConImpuestos
    }
}


const carrito = new Carrito()

const precioInput = document.getElementById("precio")
const button = document.getElementById("button")

const cuotasSelect = document.getElementById("cuotas")
cuotasSelect.addEventListener("change", refrescarResumenCarrito)

const vaciarCarritoButton = document.getElementById("vaciar-carrito")

refrescarResumenCarrito()


armarCatalogo()


button.addEventListener("click", function() {
    const precioLista = parseInt(precioInput.value)

    precioInput.value = "";


    const esPrecioValido = !isNaN(precioLista) && (precioLista > 0)

    if (!esPrecioValido) {
        mostrarToast(`Precio inválido`, 'red')

        return
    }


    carrito.agregarProducto(precioLista)

    refrescarResumenCarrito()

    mostrarToast(`Agregaste $ ${precioLista}`, 'green')
})


vaciarCarritoButton.addEventListener("click", function() {
    carrito.vaciarCarrito()

    refrescarResumenCarrito()

    mostrarToast('El carrito está vacío ahora', 'orange')
})


function refrescarResumenCarrito() {
    const cuotas = parseInt(cuotasSelect.value)

    const valorCuota = carrito.obtenerValorCuotas(cuotas)

    const resumenCarrito = document.getElementById("resumen-carrito")

    resumenCarrito.innerText = carrito.obtenerResumen() +
        `\nSe paga en ${cuotas} cuotas de $ ${valorCuota}.`
}


function mostrarToast(texto, color) {
    Toastify({
        text: texto,
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: color
        }
    }).showToast();
}