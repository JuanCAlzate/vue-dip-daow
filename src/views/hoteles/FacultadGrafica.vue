<script setup>
import { ref, onMounted, watch } from 'vue'
import BreadCrumb from '../../components/BreadCrumb.vue'
import { BookOpenIcon } from '@heroicons/vue/24/solid'
import axios from 'axios'
import { Chart } from 'chart.js/auto'

const datos = ref([])
const programas = ref([])
const periodos = ref([])
const programaSeleccionado = ref('')
const periodoSeleccionado = ref('')
const datosFiltrados = ref([])

// Variable para el gráfico
let myChart = null

function loadData() {
  axios
    .get('https://www.datos.gov.co/resource/tnus-a4s5.json')
    .then((response) => {
      datos.value = response.data

      // Extraer programas elegido
      const programaSet = new Set(response.data.map((dato) => dato.programa))
      programas.value = Array.from(programaSet)

      // Extraer periodos elegido
      const periodoSet = new Set(response.data.map((dato) => dato.periodo))
      periodos.value = Array.from(periodoSet)

      // Mostrar todos los datos inicialmente
      datosFiltrados.value = datos.value
      renderChart() // Cargar el gráfico después de cargar los datos
    })
    .catch((error) => {
      console.log(error)
    })
}

// Filtrar los datos
function filtrarDatos() {
  datosFiltrados.value = datos.value.filter((dato) => {
    const programaMatch =
      programaSeleccionado.value === '' || dato.programa === programaSeleccionado.value
    const periodoMatch =
      periodoSeleccionado.value === '' || dato.periodo === periodoSeleccionado.value
    return programaMatch && periodoMatch
  })
  renderChart() // Actualizar el gráfico después de filtrar
}

// Función para cargar la gráfica
function renderChart() {
  const ctx = document.getElementById('myChart').getContext('2d')

  //Por si existe un grafica, fresca
  if (myChart) {
    myChart.destroy()
  }

  const labels = datosFiltrados.value.map((dato) => dato.programa)

  const totalMatricula = datosFiltrados.value.map((dato) => parseInt(dato.total_matricula) || 0)
  const masculino = datosFiltrados.value.map((dato) => parseInt(dato.sexo_masc) || 0)
  const femenino = datosFiltrados.value.map((dato) => parseInt(dato.sexo_feme) || 0)
  const estrato1 = datosFiltrados.value.map((dato) => parseInt(dato.estrato_1) || 0)
  const estrato2 = datosFiltrados.value.map((dato) => parseInt(dato.estrato_2) || 0)
  const estrato3 = datosFiltrados.value.map((dato) => parseInt(dato.estrato_3) || 0)
  const estrato4 = datosFiltrados.value.map((dato) => parseInt(dato.estrato_4) || 0)
  const estrato5 = datosFiltrados.value.map((dato) => parseInt(dato.estrato_5) || 0)
  const estrato6 = datosFiltrados.value.map((dato) => parseInt(dato.estrato_6) || 0)

  // Crear gráfico
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Matrícula',
          data: totalMatricula,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Masculino',
          data: masculino,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Femenino',
          data: femenino,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Estrato 1',
          data: estrato1,
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        },
        {
          label: 'Estrato 2',
          data: estrato2,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Estrato 3',
          data: estrato3,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        },
        {
          label: 'Estrato 4',
          data: estrato4,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        },
        {
          label: 'Estrato 5',
          data: estrato5,
          backgroundColor: 'rgba(99, 255, 132, 0.2)',
          borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Estrato 6',
          data: estrato6,
          backgroundColor: 'rgba(132, 99, 255, 0.2)',
          borderColor: 'rgba(132, 99, 255, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

// Cuando el componente se monte, cargamos los datos
onMounted(() => {
  loadData()
})

// Observa los cambios en las selecciones para filtrar los datos
watch([programaSeleccionado, periodoSeleccionado], () => {
  filtrarDatos()
})
</script>

<template>
  <BreadCrumb modulo="Facultades" accion="Gráfico" />

  <div class="grid grid-cols-2 my-6 text-gray-700">
    <div class="flex items-center">
      <BookOpenIcon class="w-10 text-green-700" />
      <h2 class="mb-1 text-4xl font-bold text-green-700">Gráfico</h2>
    </div>
  </div>
  <div class="grid grid-cols-3 my-10 text-gray-700">
    <div class="justify-start">
      <button @click="loadData()" type="button" class="boton-1">Cargar Datos</button>
    </div>
    <!-- Select dinámico de programas con evento para filtrar -->
    <select
      id="programa"
      class="boton-selection1"
      v-model="programaSeleccionado"
      @change="filtrarDatos"
    >
      <option value="">Seleccione un programa</option>
      <option v-for="programa in programas" :key="programa" :value="programa">
        {{ programa }}
      </option>
    </select>

    <!-- Select dinámico de periodos con evento para filtrar -->
    <select
      id="periodo"
      class="boton-selection2"
      v-model="periodoSeleccionado"
      @change="filtrarDatos"
    >
      <option value="">Seleccione un periodo</option>
      <option v-for="periodo in periodos" :key="periodo" :value="periodo">{{ periodo }}</option>
    </select>
  </div>

  <!-- Gráfico -->
  <div class="my-6">
    <canvas id="myChart" width="400" height="200"></canvas>
  </div>
</template>
