"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import bunny from "../app/assets/logo.png";
import resumeIcon from "../app/assets/resume.png";
import friendIcon from "../app/assets/friends.png";
import learnIcon from "../app/assets/learn.png";

const Home = () => {
  const router = useRouter();

  return (
    <div
      className="
      min-h-screen w-screen flex flex-col items-center text-white relative overflow-hidden
      bg-[radial-gradient(circle_at_top,#1a2aa8_0%,transparent_55%),radial-gradient(circle_at_center,#0b145a_0%,#050b2e_65%),#050b2e]
    "
    >
      {/* Overlay Light Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none"></div>

      {/* ===== TOP BAR ===== */}
          <div className="w-full px-12 py-6 flex justify-end items-center text-4xl z-10">
      <span
        onClick={() => router.push("/settings")}
        className="cursor-pointer hover:scale-110 hover:opacity-80 transition"
      >
        ⚙
      </span>
    </div>

      {/* ===== CENTER CONTENT ===== */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">

        {/* BUNNY */}
        <Image
          src={bunny}
          alt="Coder Bunnyz"
          width={130}
          height={130}
          loading="eager" // 🔥 Fix LCP warning
          style={{ width: "auto", height: "auto" }} // 🔥 Fix aspect ratio warning
          className="mb-4 animate-bounce"
        />

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-10 tracking-wide text-center">
          Select Your Mode
        </h2>

        {/* BUTTONS */}
        <div className="flex flex-col gap-5 items-center">

          {/* Resume Game */}
          <button
            onClick={() => alert("Resume Game (Coming Soon)")}
            className="
            w-[90%] max-w-95 h-14.5
            bg-linear-to-r from-indigo-600 to-blue-500
            rounded-2xl text-lg font-semibold
            flex items-center justify-center gap-3
            shadow-xl
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl
            active:translate-y-0 active:shadow-lg
            "
          >
            <Image src={resumeIcon} alt="Resume Game" width={20} height={20} style={{ width: "auto", height: "auto" }} />
            Resume Game
          </button>

          {/* Play Solo */}
          <button
            onClick={() => router.push("/easy-board")}
            className="
            w-[90%] max-w-95 h-14.5
            bg-linear-to-r from-indigo-600 to-blue-500
            rounded-2xl text-lg font-semibold
            flex items-center justify-center gap-3
            shadow-xl
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl
            active:translate-y-0 active:shadow-lg
            "
          >
            <Image src={friendIcon} alt="Play Solo" width={20} height={20} style={{ width: "auto", height: "auto" }} />
            Play Solo
          </button>

          {/* Play with Friends */}
          <button
            onClick={() => router.push("/friends-mode")}
            className="
            w-[90%] max-w-95 h-14.5
            bg-linear-to-r from-indigo-600 to-blue-500
            rounded-2xl text-lg font-semibold
            flex items-center justify-center gap-3
            shadow-xl
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl
            active:translate-y-0 active:shadow-lg
            "
          >
            <Image src={friendIcon} alt="Play with Friends" width={20} height={20} style={{ width: "auto", height: "auto" }} />
            Play with Friends
          </button>

          {/* Learn Coder Bunnyz */}
          <button
            onClick={() => router.push("/learn")}
            className="
            w-[90%] max-w-95 h-14.5
            bg-linear-to-r from-indigo-600 to-blue-500
            rounded-2xl text-lg font-semibold
            flex items-center justify-center gap-3
            shadow-xl
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl
            active:translate-y-0 active:shadow-lg
            "
          >
            <Image src={learnIcon} alt="Learn Coder Bunnyz" width={20} height={20} style={{ width: "auto", height: "auto" }} />
            Learn Coder Bunnyz
          </button>

        </div>
      </div>

    </div>
  );
};

export default Home;
