<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue';
console.log(`[App] version: ${__APP_VERSION__} | commit: ${__COMMIT_SHA__} | built: ${__BUILD_TIME__}`)
</script>
