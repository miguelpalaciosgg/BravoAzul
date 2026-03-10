import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'

// Opositor Views
import PortalOpositorView from '../views/opositores/PortalOpositor.vue'
import RutinaMensualView from '../views/opositores/RutinaMensual.vue'
import CarrerasSemanalesView from '../views/opositores/CarrerasSemanales.vue'
import RegistroMarcasView from '../views/opositores/RegistroMarcas.vue'
import RecursosView from '../views/opositores/Recursos.vue'

// Admin Views
import PanelAdminView from '../views/admin/PanelAdmin.vue'
import GestionContenidoView from '../views/admin/GestionContenido.vue'
import GestionUsuariosView from '../views/admin/GestionUsuarios.vue'
import SeguimientoCheckinsView from '../views/admin/SeguimientoCheckins.vue'
import SeguimientoMarcasView from '../views/admin/SeguimientoMarcas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      redirect: '/login' // Redirect root to login
    },
    {
      path: '/portal',
      name: 'portal',
      component: PortalOpositorView,
    },
    { path: '/rutina', name: 'rutina', component: RutinaMensualView },
    { path: '/carreras', name: 'carreras', component: CarrerasSemanalesView },
    { path: '/marcas', name: 'marcas', component: RegistroMarcasView },
    { path: '/recursos', name: 'recursos', component: RecursosView },
    {
      path: '/admin',
      component: PanelAdminView,
      // Nested routes for the admin panel
      children: [
        {
          path: '',
          name: 'admin',
          redirect: '/admin/usuarios' 
        },
        {
          path: 'usuarios',
          name: 'admin-usuarios',
          component: GestionUsuariosView,
        },
        {
          path: 'contenido',
          name: 'admin-contenido',
          component: GestionContenidoView,
        },
        {
          path: 'seguimiento-marcas',
          name: 'admin-seguimiento-marcas',
          component: SeguimientoMarcasView,
        },
        {
          path: 'seguimiento-checkins',
          name: 'admin-seguimiento-checkins',
          component: SeguimientoCheckinsView,
        },
      ]
    }
  ]
})

export default router
