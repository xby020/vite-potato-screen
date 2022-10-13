<template>
  <div
    class="relative w-screen h-screen flex flex-col justify-start items-center bg-gray-800"
  >
    <!-- Bg -->
    <div class="absolute top-0 left-0 area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <!-- login container -->
    <div
      class="relative z-999 max-w-260 min-w-100 h-full pt-24 flex gap-12 flex-col justify-start items-center"
    >
      <!-- Title -->
      <div class="flex justify-center items-center gap-6">
        <!-- logo -->
        <div class="flex">
          <n-image
            src="/icon/logo.svg"
            class="w-24 h-24"
            object-fit="cover"
            preview-disabled
          />
        </div>
        <!-- name -->
        <div class="text-4xl text-white font-bold tracking-widest">
          <h1>{{ appTitle }}</h1>
        </div>
      </div>
      <!-- subtitle -->
      <div class="flex justify-center items-center">
        <h1 class="text-lg text-gray-400">Vite 中后台模板</h1>
      </div>
      <!-- login form -->
      <n-config-provider class="w-full" :theme="null">
        <n-card size="huge" class="hover:(shadow-md shadow-emerald-500)">
          <n-form ref="formRef" :model="formValue" :rules="formRules">
            <n-form-item label="用户名" path="user">
              <n-input
                v-model:value="formValue.user"
                placeholder="输入用户名"
                :allow-input="noSideSpace"
                @keyup.native.enter="submit"
              />
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input
                type="password"
                v-model:value="formValue.password"
                placeholder="输入密码"
                show-password-on="mousedown"
                :allow-input="noSideSpace"
                @keyup.native.enter="submit"
              />
            </n-form-item>
          </n-form>

          <template #action>
            <n-button
              block
              type="primary"
              :loading="loginLoading"
              @click="submit"
              :keyboard="true"
              @keyup.native.enter="submit"
            >
              登录
            </n-button>
          </template>
        </n-card>
      </n-config-provider>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormInst, FormRules } from 'naive-ui';
import { useUserStore } from '@/store/modules/user';

// Store
const userStore = useUserStore();

// Title
const appTitle = ref(import.meta.env.VITE_APP_TITLE);

// Form
const formRef = ref<FormInst | null>(null);
const formValue = ref({
  user: '',
  password: ''
});
// form validation
const noSideSpace = (value: string) =>
  !value.startsWith(' ') && !value.endsWith(' ');

const formRules: FormRules = {
  user: [
    { required: true, message: '请输入用户名', trigger: ['input', 'blur'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['input', 'blur'] }
  ]
};

// Login
const loginLoading = ref(false);
const route = useRoute();
const router = useRouter();
const toPath = (route.query?.redirect || '/') as string;
async function submit() {
  const { user, password } = formValue.value;
  const { handleLogin } = userStore;

  formRef.value?.validate(async (error) => {
    loginLoading.value = true;
    if (!error) {
      try {
        const res = await handleLogin({ user, password });
        loginLoading.value = false;
        if (res) {
          if (route.name === 'login') {
            router.push('/');
          } else {
            router.replace(toPath);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        loginLoading.value = false;
      }
    } else {
      loginLoading.value = false;
      window.$message.error('请检查输入的用户名或密码');
    }
  });
}
</script>

<style>
.area {
  width: 100%;
  height: 100vh;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
