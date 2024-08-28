import { GameAction, stateType } from "@/types/reducer";

export const initialState: stateType = {
  history: {},
  high_score: {},
};

export function gameReducer(
  state = initialState,
  action: GameAction
): stateType {
  switch (action.type) {
    case "SET_HISTORY": {
      const { game, variant, history } = action;

      const newHistory = {
        ...state.history,
        [game]: {
          [variant]: history,
        },
      };
      setLocalStorage(newHistory, "history");
      return { ...state, history: newHistory };
    }

    case "SET_HIGH_SCORE": {
      const { game, variant, score } = action;

      const newHighScore = {
        ...state.high_score,
        [game]: {
          ...(state.high_score[game] || {}),
          [variant]: score,
        },
      };

      setLocalStorage(newHighScore, "highScore");
      return { ...state, high_score: newHighScore };
    }

    case "EMPTY_HISTORY": {
      const { game } = action;

      const newHistory = {
        ...state.history,
        [game]: {},
      };

      setLocalStorage(newHistory, "history");

      return { ...state, history: newHistory };
    }

    case "LOAD_STATE": {
      return getLocalStorage();
    }

    default:
      return state;
  }
}
function replace(_: any, value: any): any {
  if (value === undefined) {
    return "__undefined__";
  }
  if (Array.isArray(value)) {
    return value.map((v) => replace(_, v));
  }
  return value;
}

function review(_: any, value: any): any {
  if (value === "__undefined__") {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.map((v) => review(_, v));
  }
  return value;
}

function setLocalStorage(data: any, variable: "history" | "highScore") {
  localStorage.setItem(variable, JSON.stringify(data, replace));
}

function getLocalStorage(): stateType {
  const history = localStorage.getItem("history");
  const high_score = localStorage.getItem("highScore");

  return {
    history: history ? JSON.parse(history, review) : {},
    high_score: high_score ? JSON.parse(high_score, review) : {},
  };
}
