<template>
  <div class="hidden pt-10 w-56 bg-gray-100 overflow-y-auto md:block">
    <div class="font-medium text-lg ml-3 mb-3">Facultades</div>

    <div class="bg-green-500 mb-2 w-48 ml-3 rounded-lg hover:bg-gray-400 p-1 pl-3 text-gray-1000">
      <router-link to="/facultad-crear">Crear Facultad</router-link>
    </div>

    <div class="bg-green-500 mb-2 w-48 ml-3 rounded-lg hover:bg-gray-400 p-1 pl-3 text-gray-1000">
      <router-link to="/facultad-listado">Listado</router-link>
    </div>

    <div class="bg-green-500 mb-2 w-48 ml-3 rounded-lg hover:bg-gray-400 p-1 pl-3 text-gray-1000">
      <router-link to="/facultad-grafico">Gráfica</router-link>
    </div>
  </div>
</template>
