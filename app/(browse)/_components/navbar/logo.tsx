import { cn } from '@/lib/utils'
import { Poppins } from "next/font/google";
import React from 'react'

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
  });
function Logo() {
  return (
  <div className="flex items-center gap-x-2">
      <span className={cn(
        "font-semibold text-2xl",
        font.className,
          )}>
      Dongo Ground
      </span>
    </div>
  )
}

export default Logo