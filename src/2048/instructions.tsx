import { useEffect, useState } from "react";
import Board from "./board";
import { board2048Type, directions } from "@/types";
import { ControlsKeys } from "@/components/kbd";
import { FaHandPointer } from "react-icons/fa6";
import { motion, TargetAndTransition } from "framer-motion";
import { getEmptyBoard } from "./logic";

const HowToMoveTiles = ({ type = "kbd" }: { type?: "kbd" | "mouse" }) => {
  const board_dim = 3;
  const emptyBoard: board2048Type = getEmptyBoard(board_dim);
  const positions: { x: number; y: number; direction?: directions }[] = [
    { x: 0, y: 0 },
    { x: board_dim - 1, y: 0, direction: "right" },
    { x: board_dim - 1, y: board_dim - 1, direction: "down" },
    { x: 0, y: board_dim - 1, direction: "left" },
    { x: 0, y: 0, direction: "up" },
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % positions.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const board = emptyBoard.map((row) => row.slice());
  const { x, y } = positions[index];
  board[y][x] = 2;
  const key = positions[index].direction;

  const xTop = -40;
  const yTop = 110;
  const moveAmount = 120;
  const yMid = yTop + moveAmount / 2;
  let mouseAnimation: TargetAndTransition = {
    opacity: [0],
    x: [0],
    y: [yMid],
    transition: { duration: 0 },
  };

  if (key !== undefined) {
    if (key === "up") {
      mouseAnimation = {
        x: [0, 0],
        y: [yTop + moveAmount, yTop],
      };
    } else if (key === "down") {
      mouseAnimation = {
        x: [0, 0],
        y: [yTop, yTop + moveAmount],
      };
    } else if (key === "left") {
      mouseAnimation = {
        x: [-xTop, xTop],
        y: [yMid, yMid],
      };
    } else if (key === "right") {
      mouseAnimation = {
        x: [xTop, -xTop],
        y: [yMid, yMid],
      };
    }
    mouseAnimation.opacity = [0, 1];
    mouseAnimation.transition = {
      duration: 0.13,
      //   type: "spring",
      //   stiffness: 300,
      //   damping: 17,
    };
  }

  return (
    <div className="flex items-center justify-start flex-col gap-3">
      <h2 className="text-2xl">
        {type === "kbd"
          ? "Use Arrow Keys To Move Tiles"
          : "You can also Swipe to Move Tiles"}
      </h2>
      <div className="w-9/12">
        <Board board={board} ids={board} />
      </div>
      {type === "kbd" ? (
        <div className="w-7/12 mx-auto pt-3">
          <ControlsKeys active={key ? [key] : []} />
        </div>
      ) : (
        <motion.div animate={mouseAnimation} className="absolute text-2xl">
          <FaHandPointer />
        </motion.div>
      )}
    </div>
  );
};

const TileCombine = () => {
  const boards: {
    board: board2048Type;
    id: board2048Type;
    key?: directions;
  }[] = [
    {
      board: [[4, undefined, 4, undefined]],
      id: [[1, undefined, 2, undefined]],
    },
    {
      board: [[8, undefined, undefined, 8]],
      id: [[2, undefined, undefined, 3]],
      key: "left",
    },
    {
      board: [[16, undefined, 16, undefined]],
      id: [[3, undefined, 4, undefined]],
      key: "left",
    },
    {
      board: [[undefined, undefined, undefined, 32]],
      id: [[undefined, undefined, undefined, 3]],
      key: "right",
    },
  ];

  const [index, setIndex] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % boards.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl">Combine tiles with the same number</h2>
      <div className="h-20 overflow-hidden rounded-b-md w-11/12 mx-auto">
        <Board board={boards[index].board} ids={boards[index].id} />
      </div>
      <div className="w-7/12 mx-auto">
        <ControlsKeys active={boards[index].key ? [boards[index].key] : []} />
      </div>
    </div>
  );
};

export const instructions = [
  <HowToMoveTiles />,
  <HowToMoveTiles type="mouse" />,
  <TileCombine />,
  <ul className="flex flex-col text-left gap-3 ">
    <h2 className="text-2xl">Target is to make 2048</h2>
    <h2 className="text-2xl">Game is over when no moves are available</h2>
    <div className="w-10/12 m-auto">
      <Board
        board={[
          [2, 4, 8],
          [8, 16, 2],
          [32, 4, 8],
        ]}
      />
    </div>
  </ul>,
];
