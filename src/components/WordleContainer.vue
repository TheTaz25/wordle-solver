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
    <div v-for="n in props.tries" :key="n">
      <Word
        :word="props.sampleData[n - 1]"
        :matrix="props.solveMatrix[n - 1]"
        :try-index="n"
        @toggle-matrix="handleToggle"
      />
    </div>
  </div>
</template>
