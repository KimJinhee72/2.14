<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-8">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-8">로그인</h2>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >이메일</label
          >
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="이메일을 입력하세요"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required />
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >비밀번호</label
          >
          <div class="relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="formData.password"
              placeholder="비밀번호를 입력하세요"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required />
            <button
              @click="togglePassword"
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              {{ showPassword ? "숨기기" : "보기" }}
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors duration-200">
          로그인
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const formData = ref({
  email: "",
  password: "",
  role: role.value,
  rememberMe: false,
});
const handleLogin = () => {
  router.push("/admin/dashboard");
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 2rem;
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: auto;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: auto;
}

.find-password {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}

.find-password:hover {
  color: #333;
}

.login-btn {
  width: 100%;
  padding: 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1.5rem;
}

.login-btn:hover {
  background: #45a049;
}

.social-login {
  text-align: center;
  margin-bottom: 1.5rem;
}

.social-login p {
  color: #666;
  margin-bottom: 1rem;
  position: relative;
}

.social-login p::before,
.social-login p::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #ddd;
}

.social-login p::before {
  left: 0;
}

.social-login p::after {
  right: 0;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.social-btn img {
  width: 20px;
  height: 20px;
}

.social-btn.google:hover {
  background: #f5f5f5;
}

.social-btn.kakao {
  background: #fee500;
  border-color: #fee500;
}

.social-btn.kakao:hover {
  background: #ffe812;
}

.signup-link {
  text-align: center;
  color: #666;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.5rem;
}

.signup-link a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login {
    padding: 1rem;
  }

  .login-container {
    padding: 1.5rem;
  }
}

.social-icon {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
