<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import type { StateProps } from "./components/interfaces";
import WordleContainer from "./components/WordleContainer.vue";

const state = reactive<StateProps>({
  tries: 6,
  currentTry: 1,
  sampleData: [],
});

const onKeyPress = (event: KeyboardEvent) => {
  console.log(event.code);
  if (event.code === "Backspace") {
    if (state.sampleData[state.currentTry - 1] !== undefined) {
      const l = state.sampleData[state.currentTry - 1].length;
      state.sampleData[state.currentTry - 1] = state.sampleData[
        state.currentTry - 1
      ].substring(0, l - 1);
    }
    return;
  }

  if (
    event.code === "Enter" &&
    state.sampleData[state.currentTry - 1].length === 5 &&
    state.currentTry < state.tries
  ) {
    state.currentTry++;
  }

  const lowered = event.key.toLowerCase();
  if (
    lowered.charCodeAt(0) >= 97 &&
    lowered.charCodeAt(0) <= 122 &&
    lowered.length === 1
  ) {
    if (state.sampleData[state.currentTry - 1] === undefined) {
      state.sampleData[state.currentTry - 1] = lowered;
    } else if (state.sampleData[state.currentTry - 1].length < 5) {
      state.sampleData[state.currentTry - 1] += lowered;
    }
  }
};

onMounted(() => {
  document.body.addEventListener("keydown", onKeyPress);
});

onUnmounted(() => {
  document.body.removeEventListener("keydown", onKeyPress);
});
</script>

<template>
  <main>
    <WordleContainer
      :current-try="state.currentTry"
      :tries="state.tries"
      :sample-data="state.sampleData"
    />
  </main>
</template>

<style>
@import "./assets/base.css";
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}
</style>
