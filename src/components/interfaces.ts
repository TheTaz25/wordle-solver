export enum SolveState {
  CORRECT = "0",
  CONTAINS = "1",
  WRONG = "2",
}

export interface StateProps {
  tries: number;
  currentTry: number;
  sampleData: Array<string>;
  solveMatrix: Array<string>;
}
