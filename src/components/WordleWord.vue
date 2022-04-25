<script setup lang="ts">
interface Props {
  word?: string;
}
defineProps<Props>();
</script>

<template>
  <div class="wordle-word">
    <div v-for="n in 5" :key="n">{{ $props.word?.[n - 1] ?? "" }}</div>
  </div>
</template>

<style lang="scss">
.wordle-word {
  display: flex;
}

.wordle-word > div {
  width: 64px;
  height: 64px;
  background-color: #333;
  margin: 4px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: xx-large;
  text-transform: uppercase;
}
</style>
