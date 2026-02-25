"use client";

import { useRouter } from "next/navigation";

export default function FriendsMode() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-blue-900 to-black px-4">
      
      {/* Card Box */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md 
                      rounded-2xl shadow-2xl p-10 
                      flex flex-col items-center gap-6 text-center">

        {/* Title */}
        <h2 className="text-2xl font-bold text-white">
          Play with Friends
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-white/80 leading-relaxed">
          Create a room or join your friends using a Room ID
        </p>

        {/* Invite Button */}
        <button
          onClick={() => router.push("/create-room")}
          className="w-full h-14 rounded-2xl 
                     bg-linear-to-r from-indigo-600 to-blue-500
                     text-white text-lg font-semibold
                     flex items-center justify-center gap-3
                     shadow-xl transition-all duration-300
                     hover:-translate-y-1 hover:scale-[1.02]
                     active:translate-y-0"
        >
          🎮 Invite Now
        </button>

        {/* Join Button */}
        <button
          onClick={() => router.push("/join-room")}
          className="w-full h-14 rounded-2xl 
                     border-2 border-green-500
                     text-green-400 text-lg font-semibold
                     transition-all duration-300
                     hover:bg-green-500/10"
        >
          🔗 Join Game
        </button>

      </div>
    </div>
  );
}