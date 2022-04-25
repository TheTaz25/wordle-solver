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

export interface CorrectRule {
  type: "CORRECT";
  position: number;
  char: string;
}

export interface ContainRule {
  type: "CONTAIN";
  position: number;
  char: string;
}

export interface NotRule {
  type: "NOT";
  char: string;
}

export type Rules = CorrectRule | ContainRule | NotRule;
