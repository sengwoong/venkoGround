
import React, { Suspense } from 'react';
import { getSelf } from '@/lib/auth-service';
import EmptyGroup from './_components/card/_component/emptyGroup';
import { PageNation } from './_components/card/pageNation';
import BoardList from './_components/page/board/boardList';
import {  getBoardsLeaderByUser, getBoardsOfUserGroups } from '@/lib/boards-service';
import GroupList from './GroupList';





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
  const {userGroupsBoards,totalBoardPages:totalAllPages} = await getBoardsOfUserGroups(self.id,page!);
  const {userLeaderBoards,totalBoardPages:totalMyPages} = await getBoardsLeaderByUser(self.id,page!);
  // 페이지 네이션이 하나만 있어도 충분할것 같음
  // 그룹 기준에서 페이지 네이션이 있어야함

  // 보드는 그냥 다들고오게 변경해야함
  // 그러니 페이지 네이션 로직을 위로 올리거나 버튼 클릭식으로 바꿔야함
  console.log("totalAllPages")
  console.log(totalAllPages)
  console.log(totalAllPages)
  console.log("totalMyPages")
  console.log(totalMyPages)
  console.log(totalMyPages)
  return (
    <div className='ml-20  w-full'>
      <div className="flex-1 h-[calc(100%-80px)] p-6  w-full ">
      <Suspense fallback={<EmptyGroup self={self} />}>
        <GroupList userGroupsBoards={userGroupsBoards} userLeaderBoards={userLeaderBoards}totalAllPages={searchParams.term? totalAllPages:totalMyPages} ></GroupList>
        <Suspense fallback={<></>}>
          <PageNation totalAllPages={searchParams.term? totalAllPages:totalMyPages} />
        </Suspense>
        <Suspense fallback={<EmptyGroup self={self} />}>
          <BoardList self={self} userGroupsBoards={userGroupsBoards} userLeaderBoards={userLeaderBoards} />
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

