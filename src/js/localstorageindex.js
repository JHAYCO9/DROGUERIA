function saveToLocalStorage(event) {
    event.preventDefault(); 

    const fileInput = document.querySelector(".file");
    const nameInput = document.querySelector(".name-medicamento");
    const estanteInput = document.querySelector(".estante");
    const filaInput = document.querySelector(".fila");
    const priceInput = document.querySelector(".price");

    // Validar que todos los campos estén llenos
    if (!nameInput.value || !estanteInput.value || !filaInput.value || !priceInput.value) {
        alert("Por favor, complete todos los campos");
        return false;
    }

    // Convierte el archivo a una URL si se seleccionó
    let fileUrl = "";
    if (fileInput.files.length > 0) {
        fileUrl = URL.createObjectURL(fileInput.files[0]);
    }

    // Crea un objeto para almacenar los datos
    const medicamento = {
        file: fileUrl,
        name: nameInput.value,
        estante: parseInt(estanteInput.value),
        fila: parseInt(filaInput.value),
        price: priceInput.value, 
    };

    // Guarda en localStorage
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    medicamentos.push(medicamento);
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));

    event.target.reset();

    // Mostrar mensaje de éxito usando un método que no bloquee la funcionalidad
    const messageContainer = document.createElement('div');
    messageContainer.innerHTML = `
        <div id="success-message" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0,0,0,0.7);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 1000;
        ">
            Medicamento guardado correctamente!
            <br>
            <button onclick="this.closest('#success-message').remove()">Aceptar</button>
        </div>
    `;
    document.body.appendChild(messageContainer);

    // Recargar la tabla si estamos en la página de búsqueda o edición
    if (document.querySelector('tbody')) {
        loadMedicamentos();
    }

    // Restablecer los eventos de input
    setupInputEvents();

    return false;
}

function moneda(input) {
    let valor = input.value.replace(/[^\d]/g, '');
    
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

function setupInputEvents() {
    const priceInput = document.querySelector('.price');
    if (priceInput) {
        priceInput.addEventListener('keyup', function() {
            moneda(this);
        });
    }

    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('input', filtrarMedicamentos);
    }

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', eliminarMedicamento);
    });
}

// Función para cargar medicamentos con búsqueda
function loadMedicamentos() {
    // Lee los medicamentos desde el localStorage
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    
    // Selecciona el cuerpo de la tabla
    const tbody = document.querySelector("tbody");
    if (!tbody) return; 

    tbody.innerHTML = ""; 

    medicamentos.forEach((medicamento, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${medicamento.name}</td>
            <td>${medicamento.estante}</td>
            <td>${medicamento.fila}</td>
            <td>${medicamento.price}</td>
            ${document.querySelector('.delete-btn') ? 
                `<td>
                    <button class="delete-btn" data-index="${index}">
                        <i class='bx bx-trash'></i>
                    </button>
                </td>` : ''
            }
        `;
        tbody.appendChild(row); 
    });

    setupInputEvents();
}

// Función para filtrar medicamentos
function filtrarMedicamentos() {
    const searchInput = document.querySelector('.search-container input');
    const filtro = searchInput.value.toLowerCase().trim();
    const tbody = document.querySelector('tbody');
    const filas = tbody.querySelectorAll('tr');

    let resultadosEncontrados = false;

    filas.forEach(fila => {
        const nombre = fila.querySelector('td:first-child').textContent.toLowerCase();
        const estante = fila.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const fila_estante = fila.querySelector('td:nth-child(3)').textContent.toLowerCase();
        
        // Buscar por nombre, estante o fila
        const coincide = nombre.includes(filtro) || 
                        estante.includes(filtro) || 
                        fila_estante.includes(filtro);
        
        if (coincide) {
            fila.style.display = '';
            resultadosEncontrados = true;
        } else {
            fila.style.display = 'none';
        }
    });

}

// Inicializar al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    loadMedicamentos(); 
    setupInputEvents();
});