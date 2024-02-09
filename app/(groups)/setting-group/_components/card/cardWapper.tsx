import React, { Children, ReactNode } from 'react'


interface CardWrapperProps {
    children: ReactNode;
  }



function CardWapper({children}:CardWrapperProps) {
  return (
   <div className="bg-blue-800 p-6 w-1/4 h-[250px] rounded-lg shadow-lg flex flex-col  justify-center items-center">{children}</div>
  )
}

export default CardWapper