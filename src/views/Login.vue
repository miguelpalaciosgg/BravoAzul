<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Acceso Opositores</h1>
      
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Usuario (Email)</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="tu@email.com" 
            required 
            :disabled="isLoading"
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="••••••••" 
            required 
            :disabled="isLoading"
          />
        </div>
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="signup-link">
        ¿No tienes cuenta? <a href="#" @click.prevent="showSignUp = true">Regístrate aquí</a>
      </p>
    </div>

    <!-- Modal de registro -->
    <div v-if="showSignUp" class="modal-overlay" @click="showSignUp = false">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="showSignUp = false">×</button>
        <h2>Crear Cuenta</h2>
        
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleSignUp">
          <div class="form-group">
            <label for="signup-email">Email</label>
            <input 
              type="email" 
              id="signup-email" 
              v-model="signupEmail" 
              placeholder="tu@email.com" 
              required 
              :disabled="isLoading"
            />
          </div>
          <div class="form-group">
            <label for="signup-password">Contraseña</label>
            <input 
              type="password" 
              id="signup-password" 
              v-model="signupPassword" 
              placeholder="••••••••" 
              required 
              :disabled="isLoading"
            />
          </div>
          <div class="form-group">
            <label for="nombre">Nombre Completo</label>
            <input 
              type="text" 
              id="nombre" 
              v-model="nombre" 
              placeholder="Tu nombre" 
              required 
              :disabled="isLoading"
            />
          </div>
          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { signIn, signUp, error } = useAuth();

const email = ref('');
const password = ref('');
const signupEmail = ref('');
const signupPassword = ref('');
const nombre = ref('');
const isLoading = ref(false);
const showSignUp = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    await signIn(email.value, password.value);
    
    // Redirigir según rol
    router.push({ name: 'portal' });
  } catch (err: any) {
    errorMessage.value = err.message || 'Error al iniciar sesión';
  } finally {
    isLoading.value = false;
  }
};

const handleSignUp = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    await signUp(signupEmail.value, signupPassword.value, {
      nombre: nombre.value,
      rol: 'opositor'
    });

    errorMessage.value = '✅ Cuenta creada correctamente. Revisa tu email.';
    setTimeout(() => {
      showSignUp.value = false;
      signupEmail.value = '';
      signupPassword.value = '';
      nombre.value = '';
      errorMessage.value = '';
    }, 2000);
  } catch (err: any) {
    console.error('SignUp error:', err);
    errorMessage.value = err.message || 'Error al registrarse. Intenta con otro email.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-form {
  background: white;
  padding: clamp(1.5rem, 5vw, 2.5rem);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin: auto clamp(0.5rem, 2vw, 1rem);
}

h1 {
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  color: #333;
  font-weight: 700;
  font-size: clamp(1.5rem, 4vw, 2rem);
}

h2 {
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  color: #333;
  font-weight: 700;
  font-size: clamp(1.3rem, 4vw, 1.8rem);
}

.form-group {
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: clamp(0.25rem, 1vw, 0.5rem);
  font-weight: 600;
  color: #555;
  font-size: clamp(0.875rem, 2vw, 1rem);
}

.form-group input {
  box-sizing: border-box;
  width: 100%;
  padding: clamp(0.6rem, 1.5vw, 0.8rem);
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: clamp(0.875rem, 2vw, 1rem);
  min-height: 44px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  padding: clamp(0.6rem, 1.5vw, 0.8rem);
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-height: 44px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.alert {
  padding: clamp(0.75rem, 2vw, 1rem);
  margin-bottom: 1rem;
  border-radius: 4px;
  font-size: clamp(0.875rem, 2vw, 1rem);
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.signup-link {
  margin-top: 1rem;
  font-size: clamp(0.875rem, 2vw, 1rem);
  text-align: center;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}

.signup-link a:hover {
  text-decoration: underline;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: clamp(0.5rem, 2vw, 1rem);
}

.modal-content {
  background: white;
  padding: clamp(1.5rem, 5vw, 2.5rem);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: clamp(0.5rem, 2vw, 1rem);
  right: clamp(0.5rem, 2vw, 1rem);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #555;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #f5f5f5;
}

@media (max-width: 480px) {
  .login-form {
    border-radius: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .modal-content {
    border-radius: 0;
    max-height: 100vh;
  }
}
</style>
