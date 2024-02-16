"use client"

import React, { useEffect, useState } from 'react';
import {  useSearchParams } from "next/navigation";
import Link from 'next/link';
import { usePageNation } from '@/app/store/use-pagenation';
import {reFetchSettingGroup} from '@/actions/rerodePath'
interface PageNationProps {
  totalAllPages: number;
}

export function PageNation({ totalAllPages }: PageNationProps) {


  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const { page,setPage } = usePageNation();

  function updateSorting(page: string) {
    params.set('page', page)
    window.history.pushState(null, '', `?${params.toString()}`)
    reFetchSettingGroup(params.toString())
  }


  
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    updateSorting(pageNumber.toString())
  };

  const renderPageNumbers = () => {
    const pageNumbers = [] as JSX.Element[];
    let startPage = page - 2;
    let endPage = page + 2;

    if (page <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalAllPages);
    } else if (page >= totalAllPages - 2) {
      startPage = Math.max(1, totalAllPages - 4);
      endPage = totalAllPages;
    }


    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
      

        <span
          key={i}
          onClick={() => handlePageClick(i)}
          className={page === i ? 'text-white' : 'text-black'}
        >
          {i}
        </span>
     
      );
    }



    if (startPage > 2) {
      pageNumbers.unshift(
        <span key="left-ellipsis" className="ellipsis">
          ...
        </span>
      );
    }

    if (endPage < totalAllPages - 1) {
      pageNumbers.push(
        <span key="right-ellipsis" className="ellipsis">
          ...
        </span>
      );
    }

    return pageNumbers;
  };
  console.log(totalAllPages)

  return (
    <div className="pagination-container flex justify-center items-center p-3 bg-blue-800  font-mono" >
      <div className="paginationcon flex  w-32 ">
        {1<page-2 && totalAllPages > 5?(      
        <span
          key={1}
          onClick={() => handlePageClick(1)}
          className={page === 1 ? 'text-white' : 'text-black'}
        >
        1
        </span>
      
        ):(<></>)}
        {renderPageNumbers()}
        {page<totalAllPages-2&& totalAllPages > 5?( 
            
            
          
                
                <span
          key={totalAllPages}
          onClick={() => handlePageClick(totalAllPages)}
          className={page === totalAllPages ? 'text-white' : 'text-black'}
        >
          {totalAllPages}
        </span>
        
      
        ):(<></>)}

    
      </div>
    </div>
  );
}

export function PageNationScalton() {
  return (
    <div className="pagination-container flex">
      <div className="pagination-scalton">
        Loading...
      </div>
    </div>
  );
}
