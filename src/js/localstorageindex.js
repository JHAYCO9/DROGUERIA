function saveToLocalStorage(event) {
    event.preventDefault(); 

    // Obtén los valores de los campos del formulario
    const fileInput = document.querySelector(".file");
    const name = document.querySelector(".name-medicamento").value;
    const estante = document.querySelector(".estante").value;
    const fila = document.querySelector(".fila").value;
    const price = document.querySelector(".price").value; 

    // Convierte el archivo a una URL si se seleccionó
    let fileUrl = "";
    if (fileInput.files.length > 0) {
        fileUrl = URL.createObjectURL(fileInput.files[0]);
    }

    // Crea un objeto para almacenar los datos
    const medicamento = {
        file: fileUrl,
        name: name,
        estante: parseInt(estante),
        fila: parseInt(fila),
        price: price, 
    };

    // Guarda en localStorage
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    medicamentos.push(medicamento);
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));

    // Limpia el formulario
    document.querySelector(".form-add").reset();

    alert("Medicamento guardado correctamente!");

    return false;
}

// Función para formatear el precio
function moneda(input) {
    let valor = input.value.replace(/[^\d]/g, '');
    
    // Formatear con separador de miles
    if (valor.length > 0) {
        valor = Number(valor).toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        input.value = valor;
    }
}

// Función para cargar medicamentos con búsqueda
function loadMedicamentos() {
    // Lee los medicamentos desde el localStorage
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    
    // Selecciona el cuerpo de la tabla
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; 

    // Recorre los medicamentos y crea filas para cada uno
    medicamentos.forEach((medicamento) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${medicamento.name}</td>
            <td>${medicamento.estante}</td>
            <td>${medicamento.fila}</td>
            <td>${medicamento.price}</td>
        `;
        tbody.appendChild(row); 
    });

    // Añadir evento de búsqueda
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('input', filtrarMedicamentos);
    }
}

// Función para filtrar medicamentos
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
});