import { history2048Type, sliding_puzzle_history, variants2048 } from ".";

export type Games = "2048" | "slidingPuzzle" | "wordle";

export type VariantMap = {
  "2048": variants2048;
  slidingPuzzle: variants2048;
  wordle: "easy" | "hard";
};

export type HistoryTypeMap = {
  "2048": history2048Type[];
  slidingPuzzle: sliding_puzzle_history[];
  wordle: number[];
};
type VariantState<V extends Games> = Partial<
  Record<VariantMap[V], HistoryTypeMap[V]>
>;

export type stateType = {
  history: { [K in Games]?: VariantState<K> };
  high_score: { [K in Games]?: { [V in VariantMap[K]]?: number } };
};

export type GameAction<T extends Games> =
  | {
      type: "SET_HISTORY";
      game: T;
      variant: VariantMap[T];
      history: HistoryTypeMap[T];
    }
  | { type: "SET_HIGH_SCORE"; game: T; variant: VariantMap[T]; score: number }
  | { type: "LOAD_STATE" }
  | { type: "EMPTY_HISTORY"; game: T };
