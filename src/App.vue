<script setup lang="ts">
import { onMounted, onUnmounted, reactive, watch, ref } from "vue";
import {
  SolveState,
  type StateProps,
  type Rules,
} from "./components/interfaces";
import WordleContainer from "./components/WordleContainer.vue";
import PossibleWordles from "./components/PossibleWordles.vue";

const state = reactive<StateProps>({
  tries: 6,
  currentTry: 0,
  sampleData: [],
  solveMatrix: [],
});

const possibilities = ref<Array<Rules>>([]);

const onKeyPress = (event: KeyboardEvent) => {
  // Handle deletion
  if (event.code === "Backspace") {
    if (state.sampleData[state.currentTry] !== undefined) {
      const l = state.sampleData[state.currentTry].length;
      state.sampleData[state.currentTry] = state.sampleData[
        state.currentTry
      ].substring(0, l - 1);
      state.solveMatrix[state.currentTry] = SolveState.WRONG.repeat(5);
    }
    return;
  }

  // Handle submission
  if (
    event.code === "Enter" && // User pressed enter
    state.sampleData[state.currentTry].length === 5 && // Current word-length is 5
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
    if (state.sampleData[state.currentTry] === undefined) {
      // Handle first char entry
      state.sampleData[state.currentTry] = lowered;
      state.solveMatrix[state.currentTry] = SolveState.WRONG.repeat(5);
    } else if (state.sampleData[state.currentTry].length < 5) {
      // Do not append more than 5 chars
      state.sampleData[state.currentTry] += lowered;
    }
  }
};

const handleToggleMatrix = (tryIndex: number, wordIndex: number) => {
  if (!state.sampleData?.[tryIndex]?.[wordIndex]) {
    return;
  }
  const target = state.solveMatrix?.[tryIndex].split("");
  target[wordIndex] =
    target[wordIndex] === SolveState.WRONG
      ? SolveState.CONTAINS
      : target[wordIndex] === SolveState.CONTAINS
      ? SolveState.CORRECT
      : SolveState.WRONG;
  state.solveMatrix[tryIndex] = target.join("");
};

const calculateNewPossibilities = (
  samples: Array<string>,
  solveMatrix: Array<string>
) => {
  const fiveCharWords = samples
    .map((sample, i) => {
      if (sample.length === 5) {
        return [sample, solveMatrix[i]];
      }
      return undefined;
    })
    .filter((x): x is [string, string] => x !== undefined);
  const rules: Array<Rules> = [];
  fiveCharWords.forEach(([sample, matrix]) => {
    const splitSample = sample.split("");
    const splitMatrix = matrix.split("");
    splitMatrix.forEach((m, i) => {
      const x = i;
      switch (m) {
        case SolveState.CORRECT:
          rules.push({ type: "CORRECT", position: x, char: splitSample[x] });
          break;
        case SolveState.CONTAINS:
          console.log(splitSample, x);
          rules.push({ type: "CONTAIN", position: x, char: splitSample[x] });
          break;
        case SolveState.WRONG:
          rules.push({ type: "NOT", char: splitSample[x] });
          break;
        default:
      }
    });
  });
  return rules;
};

const fillCompleteWordle = (wordle: string) => {
  state.sampleData[state.currentTry] = wordle;
  state.solveMatrix[state.currentTry] = SolveState.WRONG.repeat(5);
};

watch(state, (newState) => {
  possibilities.value = calculateNewPossibilities(
    newState.sampleData,
    newState.solveMatrix
  );
});

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
    <PossibleWordles
      @fill-wordle="fillCompleteWordle"
      :rules="possibilities"
    ></PossibleWordles>
  </main>
</template>

<style>
@import "./assets/base.css";
#app {
  padding: 2rem;
  width: 100%;
  font-weight: normal;
}

main {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

main > * {
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 0 auto;
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
