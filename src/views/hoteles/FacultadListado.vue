<script setup>
import { ref, onMounted, watch } from 'vue'
import BreadCrumb from '../../components/BreadCrumb.vue'
import { BookOpenIcon } from '@heroicons/vue/24/solid'
import axios from 'axios'

const datos = ref([])
const programas = ref([])
const periodos = ref([])
const programaSeleccionado = ref('')
const periodoSeleccionado = ref('')
const datosFiltrados = ref([])

// Variables para paginación
const paginaActual = ref(1)
const elementosPorPagina = ref(10) // Número de filas por página

// Función para cargar los datos
function loadData() {
  axios
    .get('https://www.datos.gov.co/resource/tnus-a4s5.json')
    .then((response) => {
      datos.value = response.data

      // Extraer programas y periodos
      const programaSet = new Set(response.data.map((dato) => dato.programa))
      programas.value = Array.from(programaSet)

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
  paginaActual.value = 1 // Resetear a la primera página después de filtrar
  renderChart() // Actualizar el gráfico después de filtrar
}

// Paginación
const totalPaginas = ref(0)
watch([datosFiltrados, elementosPorPagina], () => {
  totalPaginas.value = Math.ceil(datosFiltrados.value.length / elementosPorPagina.value)
})

function datosPaginados() {
  const inicio = (paginaActual.value - 1) * elementosPorPagina.value
  const fin = inicio + elementosPorPagina.value
  return datosFiltrados.value.slice(inicio, fin)
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
  <BreadCrumb modulo="Facultades" accion="Listado" />

  <div class="grid grid-cols-2 my-6 text-gray-700">
    <div class="flex items-center">
      <BookOpenIcon class="w-10 text-green-700" />
      <h2 class="mb-1 text-4xl font-bold text-green-700">Listado</h2>
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

  <!-- Tabla de datos -->
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-green-500 dark:text-gray-400">
      <thead
        class="text-xs text-green-700 uppercase bg-green-50 dark:bg-green-700 dark:text-gray-50"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Periodo</th>
          <th scope="col" class="px-6 py-3">Facultad</th>
          <th scope="col" class="px-6 py-3">Programa</th>
          <th scope="col" class="px-6 py-3">Total matrícula</th>
          <th scope="col" class="px-6 py-3">Masculino</th>
          <th scope="col" class="px-6 py-3">Femenino</th>
          <th scope="col" class="px-6 py-3">Estrato 1</th>
          <th scope="col" class="px-6 py-3">Estrato 2</th>
          <th scope="col" class="px-6 py-3">Estrato 3</th>
          <th scope="col" class="px-6 py-3">Estrato 4</th>
          <th scope="col" class="px-6 py-3">Estrato 5</th>
          <th scope="col" class="px-6 py-3">Estrato 6</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="fila in datosPaginados()"
          :key="fila.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ fila.periodo }}
          </th>
          <td class="px-6 py-4">{{ fila.facultad }}</td>
          <td class="px-6 py-4">{{ fila.programa }}</td>
          <td class="px-6 py-4">{{ fila.total_matricula }}</td>
          <td class="px-6 py-4">{{ fila.sexo_masc }}</td>
          <td class="px-6 py-4">{{ fila.sexo_feme }}</td>
          <td class="px-6 py-4">{{ fila.estrato_1 }}</td>
          <td class="px-6 py-4">{{ fila.estrato_2 }}</td>
          <td class="px-6 py-4">{{ fila.estrato_3 }}</td>
          <td class="px-6 py-4">{{ fila.estrato_4 }}</td>
          <td class="px-6 py-4">{{ fila.estrato_5 }}</td>
          <td class="px-6 py-4">{{ fila.estrato_6 }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Controles de paginación -->
  <div class="pagination-controls">
    <button @click="paginaActual--" :disabled="paginaActual === 1" class="boton-1">Anterior</button>
    <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
    <button @click="paginaActual++" :disabled="paginaActual === totalPaginas" class="boton-1">
      Siguiente
    </button>
  </div>
</template>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
button {
  padding: 0.5rem;
  margin: 0 0.5rem;
  border: 1px solid #ccc;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
