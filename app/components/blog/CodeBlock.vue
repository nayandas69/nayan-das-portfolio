<template>
  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="code-block__title" :title="title">{{ title }}</span>
      <button type="button" class="code-copy" aria-label="Copy code" @click="copy">
        {{ label }}
      </button>
    </div>
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
  const attrs = useAttrs();
  const title = computed(() =>
    String(attrs['data-code-title'] || attrs['data-language'] || 'Code')
  );
  const pre = ref<HTMLElement>();
  const status = ref('');
  const label = computed(() => status.value || 'Copy');
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
