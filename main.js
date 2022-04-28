/*Calcular pagos en cuotas sobre un monto determinado.*/

class Carrito {
    constructor() {
        this.precioListaTotal = 0

        this.productos = []
    }

    agregarProducto(precioLista) {
        this.precioListaTotal += precioLista

        this.productos.push(precioLista)
    }

    obtenerValorCuotas(cantidadCuotas) {
        const precioTotalConImpuestos = this.obtenerPrecioConImpuestos()

        return precioTotalConImpuestos / cantidadCuotas
    }

    obtenerResumen() {
        return `Tiene ${this.productos.length} productos por un total de $ ${this.precioListaTotal}.`
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

function procesarCompra() {

    const cuotas = parseInt(prompt(carrito.obtenerResumen() +
        "\nEn cuantas cuotas desea pagar?"))

    const valorCuota = carrito.obtenerValorCuotas(cuotas)

    alert(carrito.obtenerResumen() +
        `\nSe paga en ${cuotas} cuotas de $ ${valorCuota}.`)
}

// procesarCompra()


const carrito = new Carrito()

const precioInput = document.getElementById("precio")
const button = document.getElementById("button")

button.addEventListener("click", function() {
    const precioLista = parseInt(precioInput.value)

    const esPrecioValido = !isNaN(precioLista) && (precioLista > 0)

    if (!esPrecioValido) {
        return
    }

    carrito.agregarProducto(precioLista)

    refrescarResumenCarrito()

    precioInput.value = "";
})


function refrescarResumenCarrito() {
    const resumenCarrito = document.getElementById("resumen-carrito")

    resumenCarrito.innerText = carrito.obtenerResumen()
}