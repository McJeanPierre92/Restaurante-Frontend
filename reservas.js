document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reserva-form');
    const horaSelect = document.getElementById('hora');
    const personasSelect = document.getElementById('personas');
    const mesasGrid = document.getElementById('mesas-grid');
    const btnReservar = document.getElementById('btn-reservar');
    const confirmacion = document.getElementById('confirmacion-reserva');
    const detallesReserva = document.getElementById('detalles-reserva');

    // Generar opciones de hora
    for (let i = 9; i <= 22; i++) {
        const hora = i < 10 ? `0${i}:00` : `${i}:00`;
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    }

    // Definir mesas
    const mesas = [
        { id: 1, capacidad: 2 },
        { id: 2, capacidad: 2 },
        { id: 3, capacidad: 2 },
        { id: 4, capacidad: 4 },
        { id: 5, capacidad: 4 },
        { id: 6, capacidad: 4 },
        { id: 7, capacidad: 6 },
        { id: 8, capacidad: 6 },
        { id: 9, capacidad: 8 },
        { id: 10, capacidad: 8 }
    ];

    // Generar mesas en el grid
    mesas.forEach(mesa => {
        const mesaElement = document.createElement('div');
        mesaElement.classList.add('mesa');
        mesaElement.dataset.id = mesa.id;
        mesaElement.dataset.capacidad = mesa.capacidad;
        mesaElement.textContent = `Mesa ${mesa.id} (${mesa.capacidad})`;
        mesasGrid.appendChild(mesaElement);
    });

    // Simular mesas ocupadas aleatoriamente, Esto solo pra simular Obviamente cambiara una vez implementada la base de Datos
    mesas.forEach(mesa => {
        if (Math.random() < 0.3) { // 30% de probabilidad de que una mesa esté ocupada
            const mesaElement = document.querySelector(`.mesa[data-id="${mesa.id}"]`);
            mesaElement.classList.add('ocupada');
        }
    });

    let mesaSeleccionada = null;

    // Manejar selección de mesas
    mesasGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('mesa') && !e.target.classList.contains('ocupada')) {
            const capacidadMesa = parseInt(e.target.dataset.capacidad);
            const personasSeleccionadas = parseInt(personasSelect.value);

            if (personasSeleccionadas && personasSeleccionadas <= capacidadMesa) {
                if (mesaSeleccionada) {
                    mesaSeleccionada.classList.remove('seleccionada');
                }
                e.target.classList.add('seleccionada');
                mesaSeleccionada = e.target;
                btnReservar.disabled = false;
            } else {
                alert('Por favor, selecciona una mesa adecuada para el número de personas.');
            }
        }
    });

    // Actualizar mesas disponibles según el número de personas
    personasSelect.addEventListener('change', function() {
        const personasSeleccionadas = parseInt(this.value);
        mesas.forEach(mesa => {
            const mesaElement = document.querySelector(`.mesa[data-id="${mesa.id}"]`);
            if (mesa.capacidad >= personasSeleccionadas) {
                mesaElement.classList.add('disponible');
            } else {
                mesaElement.classList.remove('disponible', 'seleccionada');
            }
        });
        if (mesaSeleccionada && parseInt(mesaSeleccionada.dataset.capacidad) < personasSeleccionadas) {
            mesaSeleccionada.classList.remove('seleccionada');
            mesaSeleccionada = null;
        }
        btnReservar.disabled = true;
    });

    // Manejar reserva
    btnReservar.addEventListener('click', function() {
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const personas = document.getElementById('personas').value;
        const nota = document.getElementById('nota').value;

        detallesReserva.innerHTML = `
            <li><strong>Fecha:</strong> ${fecha}</li>
            <li><strong>Hora:</strong> ${hora}</li>
            <li><strong>Número de personas:</strong> ${personas}</li>
            <li><strong>Mesa:</strong> Mesa ${mesaSeleccionada.dataset.id}</li>
            <li><strong>Nota adicional:</strong> ${nota || 'Ninguna'}</li>
        `;

        form.style.display = 'none';
        mesasGrid.style.display = 'none';
        btnReservar.style.display = 'none';
        confirmacion.style.display = 'block';
    });
});