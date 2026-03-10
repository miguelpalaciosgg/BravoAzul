# 🏃 Bravo Azul - Plataforma de Entrenamiento para Opositores PNP

Aplicación web responsive para entrenar a opositores de Policía Nacional con seguimiento de actividades, rutinas mensuales y check-ins diarios.

## 🚀 Características

- ✅ **Login/Registro** con Supabase Auth
- ✅ **Panel de Opositores** - Ver rutinas, carreras, marcas y recursos
- ✅ **Panel de Admin** - Gestionar usuarios, contenido y seguimiento
- ✅ **Menú hamburguesa** responsive
- ✅ **100% Mobile-first** - Funciona perfecto en móvil, tablet y desktop
- ✅ **Gratuito** - Supabase gratis + Vercel gratis

## 📋 Estructura del Proyecto

```
src/
├── components/
│   ├── NavbarMobile.vue      # Menú hamburguesa responsive
│   ├── BotonWhatsapp.vue     # Botón flotante WhatsApp
│   └── CheckIn.vue           # Componente check-in
├── composables/
│   ├── useAuth.ts            # Lógica de autenticación
│   └── useActivities.ts      # Manejo de actividades
├── lib/
│   └── supabase.ts           # Configuración Supabase
├── views/
│   ├── Login.vue             # Página de login
│   ├── opositores/
│   │   ├── PortalOpositor.vue
│   │   ├── RutinaMensual.vue
│   │   ├── CarrerasSemanales.vue
│   │   ├── RegistroMarcas.vue
│   │   └── Recursos.vue
│   └── admin/
│       ├── PanelAdmin.vue
│       ├── GestionUsuarios.vue
│       ├── GestionContenido.vue
│       ├── SeguimientoMarcas.vue
│       └── SeguimientoCheckins.vue
├── router/
│   └── index.ts              # Rutas de la aplicación
├── App.vue                   # Componente raíz
└── main.ts                   # Punto de entrada

```

## 🔧 Setup Local

### Requisitos
- Node.js 18+
- npm o yarn

### Paso 1: Clonar o descargar

```bash
cd bravo-azul
npm install
```

### Paso 2: Configurar Variables de Entorno

Copia `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Paso 3: Crear Tablas en Supabase

Ver [SETUP_SUPABASE_VERCEL.md](./SETUP_SUPABASE_VERCEL.md)

### Paso 4: Ejecutar la app

```bash
npm run dev
```

Abre `http://localhost:5173`

## 📱 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor dev en localhost:5173

# Build
npm run build        # Compila para producción
npm run preview      # Previsualiza build

# Testing
npm run test:unit    # Ejecuta tests con Vitest

# Linting
npm run lint         # Ejecuta ESLint y Oxlint
npm run format       # Formatea código con Prettier
```

## 🎨 Responsive Design

La app usa `clamp()` para hacer todo responsive sin media queries excesivas:

- ✅ Móvil: 320px - 480px
- ✅ Tablet: 480px - 768px
- ✅ Desktop: 768px+
- ✅ Elementos interactivos: mínimo 44x44px (touch-friendly)

## 🔐 Autenticación

Usa **Supabase Auth** con:
- Email + Contraseña
- Verificación de email
- Roles: `admin` y `opositor`

Ejemplo de uso:

```typescript
import { useAuth } from '@/composables/useAuth'

const { signIn, signUp, signOut, user } = useAuth()

// Login
await signIn('email@test.com', 'password123')

// Registro
await signUp('email@test.com', 'password123', {
  nombre: 'Juan Pérez',
  rol: 'opositor'
})

// Logout
await signOut()
```

## 💾 Datos

### Tabla `usuarios`
```
id, user_id, nombre, email, rol, grupo, sexo, nivel, created_at
```

### Tabla `actividades`
```
id, usuario_id, fecha, tipo, duracion, distancia, repeticiones, completado, descripcion
```

### Tabla `checkins`
```
id, usuario_id, fecha, hora, confirmado, created_at
```

## 🚀 Deploy en Vercel

Ver [SETUP_SUPABASE_VERCEL.md](./SETUP_SUPABASE_VERCEL.md) - Paso 5

URLs de ejemplo:
- `https://bravo-azul.vercel.app`
- `https://bravo-azul.es` (con dominio propio)

## 🎯 Próximos Pasos

- [ ] Integración de gráficas (Chart.js)
- [ ] Upload de PDFs para rutinas
- [ ] Notificaciones push
- [ ] App móvil nativa (React Native)
- [ ] Integración con chatbot
- [ ] Dashboard de admin avanzado

## 📞 Soporte

Para preguntas sobre setup de Supabase o Vercel, ver:
- [SETUP_SUPABASE_VERCEL.md](./SETUP_SUPABASE_VERCEL.md)
- [Docs Supabase](https://supabase.com/docs)
- [Docs Vercel](https://vercel.com/docs)

## 📄 Licencia

MIT - Libre para usar en proyectos personales y comerciales

---

**Hecho con ❤️ para entrenar opositores** 🏃‍♂️
