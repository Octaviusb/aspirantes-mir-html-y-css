// Obtener elementos del DOM
const userDataForm = document.getElementById('userDataForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const nameList = document.getElementById('nameList');
const emailDisplay = document.getElementById('emailDisplay');
const deleteButton = document.getElementById('deleteButton');

// Agregar evento al formulario cuando se envía
userDataForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevenir envío del formulario

  const name = nameInput.value; // Obtener el nombre ingresado
  const email = emailInput.value; // Obtener el correo electrónico ingresado

  let savedUserData = localStorage.getItem('savedUserData'); // Obtener los datos guardados de localStorage

  if (savedUserData) {
    savedUserData = JSON.parse(savedUserData); // Convertir los datos en objeto
    savedUserData.names.push(name); // Agregar el nuevo nombre al array de nombres
  } else {
    savedUserData = { names: [name] }; // Crear un objeto con el primer nombre ingresado como un array
  }

  savedUserData.email = email; // Actualizar el correo electrónico

  localStorage.setItem('savedUserData', JSON.stringify(savedUserData)); // Almacenar los datos en localStorage
  mostrarDatosGuardados(); // Mostrar los datos guardados en la sección
});

// Agregar evento al botón de eliminar
deleteButton.addEventListener('click', function() {
  localStorage.removeItem('savedUserData'); // Eliminar los datos guardados de localStorage
  mostrarDatosGuardados(); // Mostrar el estado actualizado en la sección
});

// Función para mostrar los datos guardados en la sección
function mostrarDatosGuardados() {
  const savedUserData = localStorage.getItem('savedUserData'); // Obtener los datos guardados de localStorage

  if (savedUserData) {
    const userData = JSON.parse(savedUserData); // Convertir los datos en objeto
    nameList.innerHTML = ''; // Limpiar la lista de nombres

    // Agregar cada nombre como un elemento de lista ordenada
    userData.names.forEach(function(name) {
      const listItem = document.createElement('li');
      listItem.textContent = name;
      nameList.appendChild(listItem);
    });

    emailDisplay.textContent = userData.email; // Mostrar el correo electrónico guardado
    deleteButton.style.display = 'block'; // Mostrar el botón de eliminar
  } else {
    nameList.innerHTML = '<li>No hay datos guardados</li>'; // Mostrar mensaje de falta de datos
    emailDisplay.textContent = ''; // Limpiar el campo de correo electrónico
    deleteButton.style.display = 'none'; // Ocultar el botón de eliminar
  }
}

// Mostrar los datos guardados al cargar la página
mostrarDatosGuardados();

