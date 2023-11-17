<template>
  <form @submit.prevent="async () => await onLogin()" class="flex flex-col w-[400px]">
    <h3 class="text-3xl text-black font-bold mb-2">welcome back.</h3>
    <h5 class="text-sm text-slate-600">didn't sign up yet? <span @click="() => router.push('/register')"
        class="underline cursor-pointer underline-offset-2">create a katatoki account.</span></h5>
    <div class="flex w-full flex-col py-4 gap-1">
      <UiInput label='username' :rules="[usernameRules]" :counter="20" placeholder="enter your username." type="text" />
      <UiInput label='password' :rules="[passwordRules]" placeholder="enter your password." type="text" />
    </div>
    <div class="flex justify-end">
      <UiButton type="submit" class="-mt-4" mode='elevated' :color="colors.INDIGO" :text-color="colors.WHITE">sign in.
      </UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { colors } from '~/hooks/use-color';

const router = useRouter()

const onLogin = async () => {

}

const usernameRules = [
  (v: string) => v ?? 'username is required.'
]

const passwordRules = [
  (v: string) => v ?? 'password is required.'
]
</script>

<style scoped></style>