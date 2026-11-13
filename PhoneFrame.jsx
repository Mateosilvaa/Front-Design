export default function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 font-sans selection:bg-[#e5989b]/30">
      <div className="w-full max-w-[380px] bg-[#1c1a19] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[750px] max-h-[90vh] border-4 border-neutral-800 relative">
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-32 h-6 bg-neutral-950 rounded-b-3xl"></div>
        </div>
        <div className="p-6 pt-12 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
