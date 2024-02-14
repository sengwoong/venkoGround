import React, { ReactNode } from 'react'

interface GroupsWrapperProps {
    children: ReactNode;
  }


function GroupsWapper({children}:GroupsWrapperProps) {
  return (
    <div>
        <div className=" w-full h-320px  rounded-md ">
            {children}
        </div>
    </div>
  )
}

export default GroupsWapper