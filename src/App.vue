<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import { SolveState, type StateProps } from "./components/interfaces";
import WordleContainer from "./components/WordleContainer.vue";

const state = reactive<StateProps>({
  tries: 6,
  currentTry: 1,
  sampleData: [],
  solveMatrix: [],
});

const onKeyPress = (event: KeyboardEvent) => {
  console.log(event.code);
  // Handle deletion
  if (event.code === "Backspace") {
    if (state.sampleData[state.currentTry - 1] !== undefined) {
      const l = state.sampleData[state.currentTry - 1].length;
      state.sampleData[state.currentTry - 1] = state.sampleData[
        state.currentTry - 1
      ].substring(0, l - 1);
    }
    return;
  }

  // Handle submission
  if (
    event.code === "Enter" && // User pressed enter
    state.sampleData[state.currentTry - 1].length === 5 && // Current word-length is 5
    state.currentTry < state.tries // Not at last try
  ) {
    state.currentTry++;
    return;
  }

  const lowered = event.key.toLowerCase();
  if (
    lowered.charCodeAt(0) >= 97 && // a or bigger
    lowered.charCodeAt(0) <= 122 && // z or lower
    lowered.length === 1 // ensure a character has been hit
  ) {
    if (state.sampleData[state.currentTry - 1] === undefined) {
      // Handle first char entry
      state.sampleData[state.currentTry - 1] = lowered;
      state.solveMatrix[state.currentTry - 1] = SolveState.WRONG.toString();
    } else if (state.sampleData[state.currentTry - 1].length < 5) {
      // Do not append more than 5 chars
      state.sampleData[state.currentTry - 1] += lowered;
      state.solveMatrix[state.currentTry - 1] += SolveState.WRONG.toString();
    }
  }
};

const handleToggleMatrix = (tryIndex: number, wordIndex: number) => {
  console.log(tryIndex, wordIndex);
  const target = state.solveMatrix?.[tryIndex - 1].split("");
  target[wordIndex] =
    target[wordIndex] === "2"
      ? SolveState.CONTAINS.toString()
      : target[wordIndex] === "1"
      ? SolveState.CORRECT.toString()
      : SolveState.WRONG.toString();
  state.solveMatrix[tryIndex - 1] = target.join("");
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
      :solve-matrix="state.solveMatrix"
      @toggle-matrix="handleToggleMatrix"
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
