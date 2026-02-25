"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

/* assets */
import char1 from "@/app/assets/hopsy.png";
import char2 from "@/app/assets/flopsy.png";
import char3 from "@/app/assets/bingo.png";
import char4 from "@/app/assets/disco.png";

import deck1 from "@/app/assets/deck1.png";
import deck2 from "@/app/assets/deck2.png";

export default function Settings() {
  const router = useRouter();

  const [selectedChar, setSelectedChar] = useState(char1);
  const [selectedDeck, setSelectedDeck] = useState(deck1);
  const [username, setUsername] = useState("Hopsy");

  return (
    <div className="min-h-screen w-screen text-white flex flex-col items-center pt-10
      bg-[radial-gradient(circle_at_top,#1a2aa8_0%,transparent_55%),
          radial-gradient(circle_at_center,#0b145a_0%,#050b2e_65%),
          #050b2e]">

      {/* ===== TOP BAR ===== */}
      <div className="w-full max-w-7xl px-6 mb-6 flex items-center gap-6">
        <button
          onClick={() => router.back()}
          className="bg-white/15 px-4 py-2 rounded-xl text-xl hover:bg-white/25 transition"
        >
          ←
        </button>
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>

      {/* ===== MAIN CARD ===== */}
      <div className="w-full max-w-7xl bg-gradient-to-br from-blue-700 to-indigo-900
        rounded-3xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.25)]">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ===== CHARACTER SECTION ===== */}
          <div>
            <h2 className="text-xl mb-4 text-yellow-400">Choose Character</h2>
            <div className="flex flex-wrap gap-5">
              {[char1, char2, char3, char4].map((char, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedChar(char)}
                  className={`p-2 rounded-xl cursor-pointer
                    bg-gradient-to-br from-indigo-600 to-blue-800
                    ${selectedChar === char ? "border-4 border-yellow-400" : ""}
                  `}
                >
                  <Image src={char} alt="Character" width={90} height={90} />
                </div>
              ))}
            </div>
          </div>

          {/* ===== USERNAME + LEVEL ===== */}
          <div>
            <h2 className="text-xl mb-4 text-yellow-400">Change Username</h2>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={15}
              className="text-lg px-5 py-2 rounded-xl bg-black/30 outline-none
                focus:ring-2 focus:ring-yellow-400"
            />

            <h2 className="text-xl mt-8 mb-4 text-yellow-400">Player Level</h2>

            <div className="flex items-center gap-4">
              <span>Lvl 1</span>
              <div className="w-64 h-3 bg-white/30 rounded-full overflow-hidden">
                <div className="w-[40%] h-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
              </div>
            </div>
          </div>

          {/* ===== DECK SECTION ===== */}
          <div>
            <h2 className="text-xl mb-4 text-yellow-400">Select Deck</h2>
            <div className="flex gap-6">
              {[deck1, deck2].map((deck, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedDeck(deck)}
                  className={`cursor-pointer rounded-xl
                    ${selectedDeck === deck ? "border-4 border-yellow-400" : "border-4 border-transparent"}
                  `}
                >
                  <Image src={deck} alt="Deck" width={180} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}