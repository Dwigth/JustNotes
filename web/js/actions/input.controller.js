class InputController {
    ITitulo = HTMLInputElement;
    IContenido = HTMLInputElement;
    IContenedor = HTMLInputElement;
    IConfirmacion = HTMLInputElement;
    notas = [];
    constructor() {
        this.ITitulo = document.getElementById('ITitulo');
        this.IContenido = document.getElementById('IContenido');
        this.IContenedor = document.getElementById('IContenedor');
        this.IConfirmacion = document.getElementById('IConfirmacion');
        this.IConfirmacion.addEventListener('click', () => this.guardar());
    }
    getITitulo() {
        return this.ITitulo.value;
    }
    getIContenido() {
        return this.IContenido.value;
    }
    guardar() {
        var nota = { titulo: this.getITitulo(), contenido: this.getIContenido() };
        if (nota.contenido !== '') {
            this.notas.push(nota);
            this.render();
            this.limpiar();
        }
    }
    limpiar() {
        this.ITitulo.value = "";
        this.IContenido.value = "";
    }
    render() {
        this.IContenedor.innerHTML = "";
        this.notas.forEach(nota => {
            var elemNota = document.createElement('div');
            elemNota.classList.add('nota');
            elemNota.textContent = 'titulo:' + nota.titulo + ' contenido: ' + nota.contenido;
            this.IContenedor.appendChild(elemNota);
        });
    }
}