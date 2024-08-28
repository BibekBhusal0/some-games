import {
  history2048Type,
  sliding_puzzle_history,
  sliding_puzzle_variations_str,
  variants2048,
} from ".";

export type Games = "2048" | "slidingPuzzle" | "wordle";

export type VariantMap = {
  "2048": variants2048;
  slidingPuzzle: sliding_puzzle_variations_str;
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

export type GameAction = {
  [K in Games]:
    | {
        type: "SET_HISTORY";
        game: K;
        variant: VariantMap[K];
        history: HistoryTypeMap[K];
      }
    | {
        type: "SET_HIGH_SCORE";
        game: K;
        variant: VariantMap[K];
        score: number;
      }
    | {
        type: "LOAD_STATE";
      }
    | {
        type: "EMPTY_HISTORY";
        game: K;
      };
}[Games];
