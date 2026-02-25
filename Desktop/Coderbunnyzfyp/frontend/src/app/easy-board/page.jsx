"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Tokens
import greenBunny from "../assets/token-green.png";
import blueBunny from "../assets/token-blue.png";
import redBunny from "../assets/token-red.png";
import purpleBunny from "../assets/token-purple.png";

// Carrot
import carrot from "../assets/carrot.png";

// Destinations
import carnival from "../assets/carnival.png";
import park from "../assets/park.png";
import zoo from "../assets/zoo.png";
import school from "../assets/school.png";

const BOARD_SIZE = 9;
const TOTAL_CELLS = BOARD_SIZE * BOARD_SIZE;

// Destinations
const INITIAL_DESTINATIONS = [
  { id: 0, index: 5, img: carnival, direction: 180 },
  { id: 1, index: 1, img: zoo, direction: 180 },
  { id: 2, index: 7, img: park, direction: 180 },
  { id: 3, index: 3, img: school, direction: 180 },
  { id: 4, index: 17, img: zoo, direction: 270 },
  { id: 5, index: 35, img: school, direction: 270 },
  { id: 6, index: 53, img: carnival, direction: 270 },
  { id: 7, index: 71, img: park, direction: 270 },
  { id: 8, index: 75, img: carnival, direction: 0 },
  { id: 9, index: 73, img: park, direction: 0 },
  { id: 10, index: 77, img: school, direction: 0 },
  { id: 11, index: 79, img: zoo, direction: 0 },
  { id: 12, index: 45, img: school, direction: 90 },
  { id: 13, index: 27, img: carnival, direction: 90 },
  { id: 14, index: 9, img: park, direction: 90 },
  { id: 15, index: 63, img: zoo, direction: 90 },
];

// Players
const INITIAL_PLAYERS = [
  { id: 0, position: 13, token: purpleBunny, direction: 180 },
  { id: 1, position: 37, token: blueBunny, direction: 90 },
  { id: 2, position: 67, token: greenBunny, direction: 0 },
  { id: 3, position: 43, token: redBunny, direction: 270 },
];

// Carrots
const INITIAL_CARROTS = [
  { id: 0, position: 30, direction: 270 },
  { id: 1, position: 32, direction: 0 },
  { id: 2, position: 48, direction: 90 },
  { id: 3, position: 50, direction: 0 },
];

// Player cards
const INITIAL_PLAYER_CARDS = INITIAL_PLAYERS.map((player) => ({
  id: player.id,
  hand: {
    arrowUp: 18,
    turnLeft: 9,
    turnRight: 9,
    jump: 6,
    loop: 6,
    function: 6,
  },
}));

const EasyBoard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [destinations, setDestinations] = useState(INITIAL_DESTINATIONS);
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [carrots, setCarrots] = useState(INITIAL_CARROTS);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [dice, setDice] = useState(null);
  const [playerCards, setPlayerCards] = useState(INITIAL_PLAYER_CARDS);
  const [currentSelectedCards, setCurrentSelectedCards] = useState([]);

  const rollDice = () => {
    const rolled = Math.floor(Math.random() * 3) + 1;
    setDice(rolled);
    setCurrentSelectedCards([]);
  };

  const moveForward = (pos, dir) => {
    let row = Math.floor(pos / BOARD_SIZE);
    let col = pos % BOARD_SIZE;

    switch (dir % 360) {
      case 0:
        if (col < BOARD_SIZE - 1) col += 1;
        break;
      case 90:
        if (row < BOARD_SIZE - 1) row += 1;
        break;
      case 180:
        if (col > 0) col -= 1;
        break;
      case 270:
        if (row > 0) row -= 1;
        break;
    }

    return row * BOARD_SIZE + col;
  };

  const movePlayerWithCards = async () => {
    if (!currentSelectedCards || currentSelectedCards.length === 0) {
      return alert("Select cards first!");
    }

    let newPos = players[currentPlayer].position;
    let newDir = players[currentPlayer].direction;

    for (let card of currentSelectedCards) {
      switch (card) {
        case "arrowUp":
        case "jump":
          newPos = moveForward(newPos, newDir);
          break;
        case "turnRight":
          newDir = (newDir + 90) % 360;
          break;
        case "turnLeft":
          newDir = (newDir + 270) % 360;
          break;
        case "loop":
          break;
      }

      setPlayers((prev) =>
        prev.map((p) =>
          p.id === currentPlayer ? { ...p, position: newPos, direction: newDir } : p
        )
      );

      await new Promise((res) => setTimeout(res, 400));
    }

    setCurrentSelectedCards([]);
    setDice(null);
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-center
                 bg-[radial-gradient(circle_at_top,#1a2aa8_0%,transparent_55%),
                     radial-gradient(circle_at_center,#0b145a_0%,#050b2e_65%),
                     #050b2e]"
    >
      {/* Top Bar */}
      <div className="w-[90%] flex justify-between mb-3">
        <button
          className="bg-[#3d4bdd] text-white rounded-md px-3 py-2"
          onClick={() => router.back()}
        >
          ←
        </button>
      </div>

      {/* Board */}
      <div
        className="grid bg-white border-4 border-red-500"
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`, width: 500, height: 500 }}
      >
        {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
          const row = Math.floor(i / BOARD_SIZE);
          const col = i % BOARD_SIZE;

          let cellClass = "relative border border-gray-400 bg-white";
          if (row === 0) cellClass += " bg-purple-700";
          else if (row === BOARD_SIZE - 1) cellClass += " bg-green-800";
          else if (col === 0) cellClass += " bg-blue-800";
          else if (col === BOARD_SIZE - 1) cellClass += " bg-red-800";

          return (
            <div key={i} className={cellClass}>
              {destinations
                .filter((d) => d.index === i)
                .map((d) => (
                  <img
                    key={d.id}
                    src={d.img}
                    className="absolute w-11.25 h-11.25 top-1 left-1 z-10"
                    style={{ transform: `rotate(${d.direction}deg)` }}
                  />
                ))}
              {carrots
                .filter((c) => c.position === i)
                .map((c) => (
                  <img
                    key={c.id}
                    src={carrot}
                    className="absolute w-11.25 h-11.25 top-1 left-1 z-20"
                    style={{ transform: `rotate(${c.direction}deg)` }}
                  />
                ))}
              {players
                .filter((p) => p.position === i)
                .map((p) => (
                  <img
                    key={p.id}
                    src={p.token}
                    className={`absolute w-13.5 h-13.5 bottom-[0.5px] right-[0.1px] z-30 ${
                      p.id === currentPlayer ? "border-2 border-yellow-400 rounded-full" : ""
                    }`}
                    style={{ transform: `rotate(${p.direction}deg)` }}
                  />
                ))}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-3 text-white text-lg">Player {currentPlayer + 1} Turn</div>
      {dice && <div className="text-yellow-400 text-xl mt-1">🎲 {dice}</div>}

      {/* Controls */}
      <div className="flex gap-2 mt-3">
        <button
          className="px-3 py-2 bg-[#3d4bdd] text-white rounded-md"
          onClick={rollDice}
        >
          🎲 Roll Dice
        </button>
        <button
          className="px-3 py-2 bg-[#3d4bdd] text-white rounded-md"
          onClick={() => router.push("/select-cards")}
        >
          ☰ Select Cards
        </button>
        <button
          className="px-3 py-2 bg-[#3d4bdd] text-white rounded-md"
          onClick={movePlayerWithCards}
        >
          ▶ Move
        </button>
        <button
          className="px-3 py-2 bg-[#3d4bdd] text-white rounded-md"
          onClick={() => router.push("/previous-moves")}
        >
          ☰ Previous
        </button>
        <button className="px-3 py-2 bg-[#3d4bdd] text-white rounded-md">! Bug</button>
        <button className="px-3 py-2 bg-[#3d4bdd] text-white rounded-md">F Function</button>
      </div>
    </div>
  );
};

export default EasyBoard;
