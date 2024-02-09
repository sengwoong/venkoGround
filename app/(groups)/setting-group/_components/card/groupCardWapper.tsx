import React, { ReactNode } from 'react'

interface GroupCardWrapperProps {
    children: ReactNode;
  }


function GroupCardWapper({children}:GroupCardWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center">
        <div className="w-1/4 h-320px rounded-md">
            {children}
        </div>
    </div>
  )
}

export default GroupCardWapper