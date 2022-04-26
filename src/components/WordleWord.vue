<script setup lang="ts">
import { SolveState } from "./interfaces";
interface Props {
  word?: string;
  tryIndex: number;
  matrix?: string;
}
defineEmits<{
  (e: "toggleMatrix", tryIndex: number, wordIndex: number): void;
}>();
defineProps<Props>();
</script>

<template>
  <div class="wordle-word">
    <div
      v-for="(i, n) in 5"
      :key="n"
      :class="{
        contains: $props.matrix?.[n] === SolveState.CONTAINS.toString(),
        correct: $props.matrix?.[n] === SolveState.CORRECT.toString(),
        empty: !$props.word?.[n],
      }"
      @click="$emit('toggleMatrix', tryIndex, n)"
    >
      {{ $props.word?.[n] ?? "" }}
    </div>
  </div>
</template>

<style lang="scss">
.wordle-word {
  display: flex;
}

.wordle-word > div {
  width: 64px;
  height: 64px;
  border: 4px solid #333;
  margin: 4px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: xx-large;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;

  &:not(.empty) {
    background-color: #333;
    border: none;
  }

  &.contains {
    background-color: rgb(206, 206, 87);
    color: #333;
  }

  &.correct {
    background-color: rgb(95, 178, 95);
    color: #333;
  }
}
</style>
