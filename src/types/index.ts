import SlidingPuzzle from "@/sliding_puzzle/logic";

export const directionArray = ["up", "down", "left", "right"] as const;
export type directions = (typeof directionArray)[number];
const _d = ["easy", "medium", "hard"] as const;
export type difficultyType = (typeof _d)[number];
export const difficulties: difficultyType[] = [..._d];

// 2048
export type row2048Type = number[];
export type board2048Type = row2048Type[];
export type rotationType = 0 | 90 | 180 | 270;
export type history2048Type = {
  board: board2048Type;
  score: number;
  id: board2048Type;
};
export const _a = ["3 x 3", "4 x 4", "5 x 5", "6 x 6"] as const;
export type variants2048 = (typeof _a)[number];
export const all2048Variants: variants2048[] = [..._a];
export const variants2048Mapping: Record<number, variants2048> = {
  3: "3 x 3",
  4: "4 x 4",
  5: "5 x 5",
  6: "6 x 6",
};

// sliding puzzle
export const _s = ["image", "image_number", "number"] as const;
export type sliding_puzzle_types = (typeof _s)[number];
export const allSlidingPuzzleVariations: sliding_puzzle_types[] = [..._s];
export type sliding_puzzle_variations_str =
  `${difficultyType}-${sliding_puzzle_types}`;
export type sliding_puzzle_variations_obj = {
  type: sliding_puzzle_types;
  difficulty: difficultyType;
};

export function SPvarioationStr2Obj(
  variation: sliding_puzzle_variations_str
): sliding_puzzle_variations_obj {
  const [difficulty, type] = variation.split("-") as [
    difficultyType,
    sliding_puzzle_types,
  ];
  return {
    type,
    difficulty,
  };
}

export function SPvarioationObj2Str(
  variation: sliding_puzzle_variations_obj
): sliding_puzzle_variations_str {
  return `${variation.difficulty}-${variation.type}`;
}

export type sliding_puzzle_type = number[];
export type sliding_puzzle_history = {
  moves: number;
  board: sliding_puzzle_type;
};

export type SlidingPuzzleGameProps = {
  game?: SlidingPuzzle;
  imageUrl?: string;
};

// memory card
export type MemoryCardCardType = {
  flipped: boolean;
  solved: boolean;
  number: number;
};

export type MemoryCardType = MemoryCardCardType[];

const I_N = [
  "brush",
  "bucket",
  "camera",
  "chess",
  "clock",
  "colour-palette",
  "crown",
  "cup",
  "fire",
  "gift",
  "glass",
  "gym",
  "headphone",
  "heart",
  "key",
  "lab",
  "link",
  "location",
  "lock",
  "magic-trick",
  "music",
  "notebook",
  "painting-brush",
  "painting-kit",
  "pencil",
  "rocket",
  "star",
  "target",
  "thumb-up",
  "trophy",
  "video-cam",
] as const;
export type images_name_type = (typeof I_N)[number];
export const images_name: images_name_type[] = [...I_N];

const I_V = ["premium", "gradient", "color"] as const;
export type images_variation_type = (typeof I_V)[number];
export const images_variation: images_variation_type[] = [...I_V];
export type images_mapping_type = Record<number, images_name_type>;
export interface MemoryCardStateType {
  difficulty: difficultyType;
  cards: MemoryCardType;
  turns: number;
  images_mapping: images_mapping_type;
  images_variant: images_variation_type;
}
