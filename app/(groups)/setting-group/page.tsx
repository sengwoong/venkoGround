
import React, { Suspense } from 'react';
import { getSelf } from '@/lib/auth-service';
import { viewAllGroups, viewMyGroups } from '@/lib/group-service';

import { redirect } from 'next/navigation';
import EmptyGroup from './_components/card/_component/emptyGroup';
import GroupList from './_components/card/page/group/groupList';
import { PageNation } from './_components/card/pageNation';




// const GroupList = React.lazy(() => import('./_components/card/groupList'));

interface SearchPageProps {
  searchParams: {
    term?: string;
    page?: number;
  };
}


export default async function page({searchParams}:SearchPageProps) {
  console.log("!searchParams.page")
console.log(!searchParams.page)
console.log(searchParams.page)
console.log(searchParams.page)

  const self = await getSelf();

  // 데이터 불러오는 로직을 한번더 나눠야할듯 대신에 PageNationStore 사용하기 서스펜스 두개랑 같이 들고가야할듯
  const {allGroups,totalPages:totalAllPages} = await viewAllGroups(searchParams.term,searchParams.page?searchParams.page:1);
  const {myGroups,totalPages:totalMyPages} = await viewMyGroups(self,searchParams.term,searchParams.page?searchParams.page:1);

  return (
    <div className='ml-20'>
      <div className="flex-1 h-[calc(100%-80px)] p-6">
        
        <Suspense fallback={<EmptyGroup self={self} />}>
          <GroupList self={self} allGroups={allGroups} myGroups={myGroups} />
        <Suspense fallback={<></>}>
          <PageNation totalAllPages={searchParams.term? totalAllPages:totalMyPages} />
        </Suspense>
        </Suspense>
      </div>
    </div>
  );
}
