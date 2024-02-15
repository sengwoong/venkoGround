
import React, { Suspense } from 'react';
import { getSelf } from '@/lib/auth-service';
import { viewAllGroups, viewMyGroups } from '@/lib/group-service';

import { redirect } from 'next/navigation';
import EmptyGroup from './_components/card/_component/emptyGroup';

import { PageNation } from './_components/card/pageNation';
import GroupList from './_components/page/group/groupList';





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
const {page,term}=searchParams
  const self = await getSelf();

  // 데이터 불러오는 로직을 한번더 나눠야할듯 대신에 PageNationStore 사용하기 서스펜스 두개랑 같이 들고가야할듯
  const {allGroups,totalPages:totalAllPages} = await viewAllGroups(term,page?page:1);
  const {myGroups,totalPages:totalMyPages} = await viewMyGroups(self,term,page?page:1);

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

// 15일 목요일 오후전까지 12시전
//todo 그룹에서 다들고오고 생각하기
//api 에서 드로우테이블 페이지네이션만들기
// 카드리스트로 비슷하게 crud 만들기 
// 보드생성
// 보드출력 -> ... 에서 보드업데이트 보드삭제 보드수정 (이미지 드래그드롭)
//start보드 만들어서 페이지 바꾸기 (여기부터 오후이고 소켓연결 로직)

