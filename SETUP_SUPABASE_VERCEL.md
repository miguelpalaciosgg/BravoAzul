# 🚀 SETUP GUIDE: Supabase + Vercel

## Paso 1: Crear Proyecto en Supabase (Gratis)

1. Abre [supabase.com](https://supabase.com)
2. Click en "Sign Up" → Puedes usar GitHub
3. Crea un nuevo proyecto:
   - Nombre: `bravo-azul`
   - Región: Tu continente (ej: Europe)
   - Password: Guárdalo

## Paso 2: Crear las Tablas en Supabase

En tu proyecto Supabase, ve a **SQL Editor** y pega esto:

```sql
-- Crear tabla usuarios
create table usuarios (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  nombre text not null,
  email text not null unique,
  rol text default 'opositor', -- 'opositor' o 'admin'
  grupo text, -- G1-G8
  sexo text,
  nivel text,
  created_at timestamp default now()
);

-- Crear tabla actividades
create table actividades (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid not null references usuarios(id) on delete cascade,
  fecha date not null,
  tipo text not null, -- 'carrera', 'dominas', 'checkin'
  duracion integer,
  distancia numeric,
  repeticiones integer,
  completado boolean default false,
  descripcion text,
  created_at timestamp default now()
);

-- Crear tabla check_ins
create table checkins (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid not null references usuarios(id) on delete cascade,
  fecha date not null,
  hora time not null,
  confirmado boolean default true,
  created_at timestamp default now()
);

-- Habilitar RLS (Row Level Security)
alter table usuarios enable row level security;
alter table actividades enable row level security;
alter table checkins enable row level security;

-- Políticas de RLS - Usuarios solo ven sus propios datos
create policy "Users can see their own data" on usuarios
  for select using (auth.uid() = user_id);

create policy "Users can update their own data" on usuarios
  for update using (auth.uid() = user_id);

-- Políticas de RLS - Actividades
create policy "Users can see their own activities" on actividades
  for select using (
    usuario_id in (select id from usuarios where user_id = auth.uid())
  );

create policy "Users can insert their own activities" on actividades
  for insert with check (
    usuario_id in (select id from usuarios where user_id = auth.uid())
  );

-- Políticas de RLS - Check-ins
create policy "Users can see their own checkins" on checkins
  for select using (
    usuario_id in (select id from usuarios where user_id = auth.uid())
  );

create policy "Users can insert their own checkins" on checkins
  for insert with check (
    usuario_id in (select id from usuarios where user_id = auth.uid())
  );
```

Click en **Run** (botón azul)

## Paso 3: Obtener Credenciales de Supabase

1. Ve a **Settings** → **API**
2. Copia:
   - `Project URL` (VITE_SUPABASE_URL)
   - `anon public` key (VITE_SUPABASE_ANON_KEY)

3. En tu proyecto local, crea `.env.local`:

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

4. Guarda el archivo y reinicia `npm run dev`

## Paso 4: Probar Auth Localmente

1. Terminal: `npm run dev`
2. En navegador: `http://localhost:5173`
3. Click en "Regístrate aquí"
4. Usa email de prueba: `test@test.com` / password: `Test123!`
5. Verifica el email en Supabase → **Auth** → **Users**

## Paso 5: Deploy en Vercel (Gratis)

### A. Preparar GitHub

```bash
git init
git add .
git commit -m "Bravo Azul with Supabase"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/bravo-azul.git
git push -u origin main
```

### B. Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Sign up con GitHub
3. Click en "Add New..." → "Project"
4. Selecciona tu repo `bravo-azul`
5. En **Environment Variables**, agrega:
   - `VITE_SUPABASE_URL`: Tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY`: Tu Anon Key
6. Click **Deploy**

Tu app estará en: `https://bravo-azul-xxx.vercel.app`

## Paso 6: Crear Usuarios de Admin (Opcional)

En Supabase → **SQL Editor**:

```sql
-- Crear usuario admin
insert into usuarios (user_id, nombre, email, rol, created_at)
values (
  (select id from auth.users where email = 'admin@bravo-azul.com'),
  'Admin',
  'admin@bravo-azul.com',
  'admin',
  now()
);
```

Pero primero crea el usuario en **Auth** → **Users** → **Add user**

---

## ✅ Checklist Final

- [ ] Proyecto Supabase creado
- [ ] Tablas SQL ejecutadas
- [ ] Variables de entorno (.env.local) configuradas
- [ ] App funciona localmente con Supabase
- [ ] Cuenta GitHub creada
- [ ] Proyecto pusheado a GitHub
- [ ] Cuenta Vercel creada
- [ ] Proyecto deployado en Vercel
- [ ] App funciona en producción

---

## 🆘 Troubleshooting

### Error: "VITE_SUPABASE_URL is required"
→ Crea `.env.local` con tus credenciales

### Error: "Invalid API Key"
→ Verifica que copiaste correctamente la "anon public" key (no la service role)

### Error en Vercel: "Build failed"
→ Asegúrate que las variables de entorno están en **Settings** → **Environment Variables**

### Error de CORS
→ Ve a Supabase → **Settings** → **API** → **CORS** y agrega tu dominio Vercel

---

**¿Necesitas ayuda?** Pregunta sobre cualquier paso 🚀
