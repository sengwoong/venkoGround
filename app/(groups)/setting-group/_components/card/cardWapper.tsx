import React, { Children, ReactNode } from 'react'


interface CardWrapperProps {
    children: ReactNode;
  }



function CardWapper({children}:CardWrapperProps) {
  return (

   <div className=" bg-purple-700   p-4 h-[250px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
    {children}
    </div>

    
  )
}

export default CardWapper