export enum SolveState {
  CORRECT,
  CONTAINS,
  WRONG,
}

export interface StateProps {
  tries: number;
  currentTry: number;
  sampleData: Array<string>;
  solveMatrix: Array<string>;
}
