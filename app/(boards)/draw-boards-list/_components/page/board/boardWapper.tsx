import React, { ReactNode } from 'react'

interface GroupsWrapperProps {
    children: ReactNode;
  }


function BoardWapper({children}:GroupsWrapperProps) {
  return (
    <div>
        <div className=" w-full h-320px  rounded-md ">
            {children}
        </div>
    </div>
  )
}

export default BoardWapper