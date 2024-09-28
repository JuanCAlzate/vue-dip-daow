import { createRouter, createWebHistory } from 'vue-router'
import HotelCrear from '../views/hoteles/FacultadCrear.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/facultad-crear',
      name: 'facultad-crear',
      component: HotelCrear
    },
    {
      path: '/facultad-listado',
      name: 'facultad-listado',
      component: () => import('../views/hoteles/FacultadListado.vue')
    },

    {
      path: '/facultad-grafico',
      name: 'facultad-grafico',
      component: () => import('../views/hoteles/FacultadGrafica.vue')
    }
  ]
})

export default router
