<template>
  <div class="code-block">
    <button type="button" class="code-copy" @click="copy">{{ label }}</button>
    <span class="sr-only" role="status">{{ status }}</span>
    <pre
      ref="pre"
      v-bind="$attrs"
      role="region"
      tabindex="0"
      aria-label="Code example"
    ><slot /></pre>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ inheritAttrs: false });
  const pre = ref<HTMLElement>();
  const status = ref('');
  const label = computed(() => status.value || 'Copy code');
  let timer: ReturnType<typeof setTimeout>;
  async function copy() {
    try {
      await navigator.clipboard.writeText(pre.value?.textContent ?? '');
      status.value = 'Copied';
    } catch {
      status.value = 'Copy failed';
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      status.value = '';
    }, 2500);
  }
  onUnmounted(() => clearTimeout(timer));
</script>
