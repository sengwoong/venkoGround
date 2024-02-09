import React, { ReactNode } from 'react'

interface GroupsWrapperProps {
    children: ReactNode;
  }


function GroupsWapper({children}:GroupsWrapperProps) {
  return (
    <div>
        <div className="flex w-full h-320px  rounded-md justify-around">
            {children}
        </div>
    </div>
  )
}

export default GroupsWapper