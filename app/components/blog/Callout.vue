<template>
  <aside class="callout" :class="`callout--${kind}`" :aria-label="title || kind">
    <p class="callout__title">{{ title || kind.charAt(0).toUpperCase() + kind.slice(1) }}</p>
    <slot />
  </aside>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      type?: 'note' | 'tip' | 'important' | 'warning' | 'caution';
      title?: string;
    }>(),
    { type: 'note', title: '' }
  );
  const kind = computed(() =>
    ['note', 'tip', 'important', 'warning', 'caution'].includes(props.type) ? props.type : 'note'
  );
</script>
