function loadMedicamentos() {
    // Lee los medicamentos desde el localStorage
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    
    // Selecciona el cuerpo de la tabla
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; 

    // Recorre los medicamentos y crea filas para cada uno
    medicamentos.forEach((medicamento, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${medicamento.name}</td>
            <td>${medicamento.estante}</td>
            <td>${medicamento.fila}</td>
            <td>${medicamento.price}</td>
            <td>
                <button class="delete-btn" data-index="${index}">
                    <i class='bx bx-trash'></i>
                </button>
            </td>
        `;

        tbody.appendChild(row); 
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', eliminarMedicamento);
    });
}

function eliminarMedicamento(event) {
    // Obtener el índice del medicamento a eliminar
    const index = event.currentTarget.getAttribute('data-index');

    // Obtener los medicamentos del localStorage
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];

    // Eliminar el medicamento del array
    medicamentos.splice(index, 1);

    // Guardar el array actualizado en el localStorage
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));

    // Recargar la tabla
    loadMedicamentos();

    // Reiniciar la búsqueda
    const searchInput = document.querySelector('.search-container input');
    searchInput.value = '';
    filtrarMedicamentos();
}

function filtrarMedicamentos() {
    const searchInput = document.querySelector('.search-container input');
    const filtro = searchInput.value.toLowerCase();
    const tbody = document.querySelector('tbody');
    const filas = tbody.querySelectorAll('tr');

    filas.forEach(fila => {
        const nombre = fila.querySelector('td:first-child').textContent.toLowerCase();
        
        // Mostrar u ocultar filas según el filtro
        if (nombre.includes(filtro)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadMedicamentos(); 

    const searchInput = document.querySelector('.search-container input');
    searchInput.addEventListener('input', filtrarMedicamentos);
});