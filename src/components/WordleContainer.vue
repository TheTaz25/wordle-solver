<script setup lang="ts">
import type { StateProps } from "./interfaces";
import Word from "./WordleWord.vue";

const props = defineProps<StateProps>();
const emit = defineEmits<{
  (e: "toggleMatrix", tryIndex: number, wordIndex: number): void;
}>();

const handleToggle = (tryIndex: number, wordIndex: number) => {
  emit("toggleMatrix", tryIndex, wordIndex);
};
</script>

<template>
  <div class="container">
    <div v-for="(i, n) in props.tries" :key="n">
      <Word
        :word="props.sampleData[n]"
        :matrix="props.solveMatrix[n]"
        :try-index="n"
        @toggle-matrix="handleToggle"
      />
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  align-items: flex-start;
  top: 25%;
  position: sticky;
}
</style>
