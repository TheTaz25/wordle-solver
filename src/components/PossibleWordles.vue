<script setup lang="ts">
import { ref, watch } from "vue";
import type { Rules } from "./interfaces";
import { words } from "../assets/wordleWorlds";

const props = defineProps<{
  rules: Array<Rules>;
}>();

const filteredWords = ref<Array<string>>([]);

const filterer = (rules: Array<Rules>) => {
  let allWords = [...words];
  rules.forEach((rule) => {
    allWords = allWords.filter((word) => {
      if (word.length !== 5) return false;
      switch (rule.type) {
        case "NOT":
          return !word.includes(rule.char);
        case "CONTAIN":
          if (
            word.includes(rule.char) &&
            word[rule.position] !== rule.char &&
            word === "rebut"
          ) {
            console.log(word, rule.char, rule.position);
          }
          return word.includes(rule.char) && word[rule.position] !== rule.char;
        case "CORRECT":
          return word[rule.position] === rule.char;
        default:
          return false;
      }
    });
  });
  return allWords;
};

watch(props, (newProps) => {
  let x = filterer(newProps.rules);
  console.log(x);
  filteredWords.value = x;
});
</script>

<template>
  <div class="possibles" v-if="props.rules.length">
    <span v-for="word in filteredWords" :key="word" class="word">
      {{ word }}
    </span>
  </div>
</template>

<style lang="scss">
.possibles {
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.word {
  background-color: #666;
  color: white;
  margin: 4px;
  padding: 4px;
}
</style>
