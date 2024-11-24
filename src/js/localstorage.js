function saveToLocalStorage(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtén los valores de los campos del formulario
    const fileInput = document.querySelector(".file");
    const name = document.querySelector(".name-medicamento").value;
    const estante = document.querySelector(".estante").value;
    const fila = document.querySelector(".fila").value;
    const price = document.querySelector(".price").value; // Obtén el precio tal como se muestra

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
        price: price, // Guarda el precio tal cual, con formato
    };

    // Guarda en localStorage
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    medicamentos.push(medicamento);
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));

    // Limpia el formulario
    document.querySelector(".form-add").reset();

    alert("Medicamento guardado correctamente!");

    loadMedicamentos(); // Actualiza la tabla automáticamente
    return false;
}



function loadMedicamentos() {
    // Lee los medicamentos desde el localStorage
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    
    // Selecciona el cuerpo de la tabla
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Limpia cualquier contenido previo en la tabla

    // Recorre los medicamentos y crea filas para cada uno
    medicamentos.forEach((medicamento) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${medicamento.name}</td>
            <td>${medicamento.estante}</td>
            <td>${medicamento.fila}</td>
            <td>${medicamento.price}</td>
        `;

        tbody.appendChild(row); // Agrega la fila al cuerpo de la tabla
    });
}

function saveToLocalStorage(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtén los valores de los campos del formulario
    const fileInput = document.querySelector(".file");
    const name = document.querySelector(".name-medicamento").value;
    const estante = document.querySelector(".estante").value;
    const fila = document.querySelector(".fila").value;
    const price = document.querySelector(".price").value; // Toma el precio ya formateado

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
        price: price, // Guarda el precio con las comas
    };

    // Guarda en localStorage
    const medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || [];
    medicamentos.push(medicamento);
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));

    // Limpia el formulario
    document.querySelector(".form-add").reset();

    alert("Medicamento guardado correctamente!");

    loadMedicamentos(); // Actualiza la tabla automáticamente
    return false;
}



document.addEventListener("DOMContentLoaded", () => {
    loadMedicamentos(); 
});

