<!--
  Default Layout
  Wraps every page in a max-width container with the header and footer.
-->
<template>
  <div class="layout">
    <div class="container main-content">
      <!-- Page content injected here -->
      <slot />

      <!-- Global Footer -->
      <AppFooter />
    </div>

    <!-- Floating Bottom Navigation -->
    <AppNavbar />
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    padding-bottom: $space-9; // Space for the floating capsule navbar
  }
</style>
