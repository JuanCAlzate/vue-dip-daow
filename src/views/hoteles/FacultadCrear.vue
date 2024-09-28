<script setup>
import BreadCrumb from '../../components/BreadCrumb.vue'
import { BookOpenIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <BreadCrumb modulo="Falcultades" accion="Crear" />

  <div class="grid grid-cols-2 my-6 text-gray-700">
    <div class="flex items-center">
      <BookOpenIcon class="w-10" />

      <h2 class="mb-1 text-4xl font-bold dark:text-white">Nuevo Hotel</h2>
    </div>
    <div class="flex justify-end">
      <!-- <button @click="loadData()" type="button" class="boton-1">Crear nuevo</button> -->
    </div>
  </div>

  <!-- <form> -->
  <div class="mb-6">
    <label for="ciudades" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Ciudad</label
    >
    <select
      id="ciudades"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected>Seleccione una ciudad...</option>
    </select>
  </div>

  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Nombre</label
      >
      <input
        type="text"
        id="nombre"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Ingrese el nombre del hotel"
      />
    </div>
    <div>
      <label for="nit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >NIT</label
      >
      <input
        type="text"
        id="nit"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="NIT del hotel"
      />
    </div>
    <div>
      <label for="direccion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Dirección</label
      >
      <input
        type="text"
        id="direccion"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Ubicación del hotel"
      />
    </div>
    <div>
      <label for="num_hab" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Número de habitaciones</label
      >
      <input
        type="number"
        id="num_hab"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  </div>

  <button
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Crear hotel
  </button>
  <!-- </form> -->
</template>
