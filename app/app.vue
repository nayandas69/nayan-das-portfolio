<!--
  App Root
  Renders the default layout via <NuxtLayout> and the active page via <NuxtPage>.
  Smooth route licks, with the navigation staying right where you left it.
-->
<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts"></script>
