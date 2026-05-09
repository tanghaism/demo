"use client"

interface IPhoneFrameProps {
  children: React.ReactNode
}

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 p-4">
      <div className="relative">
        {/* iPhone frame */}
        <div className="w-[393px] h-[852px] bg-black rounded-[55px] p-3 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-background rounded-[45px] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />
            
            {/* Content */}
            <div className="w-full h-full overflow-auto">
              {children}
            </div>
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute left-[-2px] top-[140px] w-[3px] h-[30px] bg-neutral-700 rounded-l-sm" />
        <div className="absolute left-[-2px] top-[200px] w-[3px] h-[60px] bg-neutral-700 rounded-l-sm" />
        <div className="absolute left-[-2px] top-[270px] w-[3px] h-[60px] bg-neutral-700 rounded-l-sm" />
        <div className="absolute right-[-2px] top-[200px] w-[3px] h-[100px] bg-neutral-700 rounded-r-sm" />
      </div>
    </div>
  )
}
