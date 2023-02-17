import Vue from 'vue'
import VueRouter from 'vue-router'

import Player from '@/components/Player.vue'
import Errore from '@/components/Errore.vue'
import Scelta from '@/components/Scelta.vue'
import Scelta2 from '@/components/Scelta2.vue'
import Schermata from '@/components/Schermata.vue'
import Schermata2 from '@/components/Schermata2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Player',
    component: Player
  },
  {
    path: '/scelta',
    name: 'Scelta',
    component: Scelta
  },
  {
    path: '/scelta2',
    name: 'Scelta2',
    component: Scelta2
  },
  {
    path: '/gioco',
    name: 'Gioco',
    component: Schermata
  },
  {
    path: '/gioco2',
    name: 'Gioco2',
    component: Schermata2
  },
  {
    path: '*',
    component: Errore
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
