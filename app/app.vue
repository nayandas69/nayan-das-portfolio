<!--
  App Root
  Renders the default layout via <NuxtLayout> and the active page via <NuxtPage>.
  Blur reveal is handled purely via CSS animation on body (see main.scss).
-->
<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
