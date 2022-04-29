/*Calcular pagos en cuotas sobre un monto determinado.*/

class Carrito {
    constructor() {
        this.productos = []
    }

    agregarProducto(precioLista) {
        this.productos.push(precioLista)
    }

    vaciarCarrito() {
        this.productos = []
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
            let porcentajeImpuesto

            if (precioProducto > 200) {
                porcentajeImpuesto = 1.19
            } else {
                porcentajeImpuesto = 1.08
            }

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


button.addEventListener("click", function () {
    const precioLista = parseInt(precioInput.value)

    const esPrecioValido = !isNaN(precioLista) && (precioLista > 0)

    if (!esPrecioValido) {
        return
    }

    carrito.agregarProducto(precioLista)

    refrescarResumenCarrito()

    precioInput.value = "";
})


vaciarCarritoButton.addEventListener("click", function () {
    carrito.vaciarCarrito()

    refrescarResumenCarrito()
})


function refrescarResumenCarrito() {
    const cuotas = parseInt(cuotasSelect.value)

    const valorCuota = carrito.obtenerValorCuotas(cuotas)

    const resumenCarrito = document.getElementById("resumen-carrito")

    resumenCarrito.innerText = carrito.obtenerResumen() +
        `\nSe paga en ${cuotas} cuotas de $ ${valorCuota}.`
}