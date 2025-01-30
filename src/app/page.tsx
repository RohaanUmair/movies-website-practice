export default function Home() {
  return (
    <div className="h-screen w-screen bg-zinc-950 border flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-8">

        <h1 className="text-white text-6xl">Who's watching?</h1>

        <div className="flex gap-6">

          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-36 h-36 bg-blue-500 rounded"></div>
            <h2 className="text-[#aaa] font-semibold">Hamza Malik</h2>
          </div>

          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-36 h-36 bg-blue-500 rounded"></div>
            <h2 className="text-[#aaa] font-semibold">Hamza Malik</h2>
          </div>

          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-36 h-36 bg-blue-500 rounded"></div>
            <h2 className="text-[#aaa] font-semibold">Hamza Malik</h2>
          </div>

        </div>

        <button className="border border-[#aaa] text-[#aaa] px-4 py-[6px] rounded-sm">Manage Profiles</button>

      </div>
    </div>
  )
};
