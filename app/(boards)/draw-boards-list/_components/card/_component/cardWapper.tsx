import React, {  ReactNode } from 'react'


interface CardWrapperProps {
    children: ReactNode;
  }



function CardWapper({children}:CardWrapperProps) {
  return (





   <div className="group bg-purple-700 overflow-hidden   w-full p-4 h-[250px] rounded-2xl shadow-lg flex flex-col justify-center items-center text-black">
    {children}
    </div>

    
  )
}

export default CardWapper