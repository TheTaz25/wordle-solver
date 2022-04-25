<script setup lang="ts">
import type { StateProps } from "./interfaces";
import Word from "./WordleWord.vue";

const props = defineProps<StateProps>();
</script>

<template>
  <div class="container">
    <div v-for="n in props.tries" :key="n">
      <Word :word="props.sampleData[n - 1]" />
    </div>
  </div>
</template>
