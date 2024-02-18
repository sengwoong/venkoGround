"use client";

import React from 'react';
import BoardWapper from './boardWapper';
import CardWapper from '../../card/_component/cardWapper';
import { User } from '@/type/userType';
import { useSearchParams } from 'next/navigation';
import CreateNewBoard from '../../card/_component/createNewBaord';
import { UserLeaderGroup } from '@/type/boardType';
import { useGroupStore } from '@/app/store/use-board-get-gruop-id';
import { BoardCard } from './BoardCard';

interface BoardListProps {
  self: User;
  userGroupsBoards: UserLeaderGroup[];
  userLeaderBoards: UserLeaderGroup[];
}

function BoardList({ self, userGroupsBoards, userLeaderBoards }: BoardListProps) {
  const searchParams = useSearchParams();
  const MyGroupParm = searchParams.get("MyBoard");
  
  console.log("userGroupsBoards", userGroupsBoards);
  console.log("userLeaderBoards", userLeaderBoards);

  const { selectedGroupId } = useGroupStore();

  console.log("selectedGroupId", selectedGroupId);

  return (
    <BoardWapper>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">보드 생성</h2>
        <CardWapper>
          <CreateNewBoard self={self} />
        </CardWapper>
      </div>
      <div className="mb-4">
    
  

        {!MyGroupParm ? (
          <>
            <h2 className="text-lg font-bold mb-2">나의 보드</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {userGroupsBoards.map(group => (
                <React.Fragment key={group.id}>
                  {/* // 그룹이 선택되어있고 그룹아이디가 없으면 생성 */}
                  {selectedGroupId === group.id && selectedGroupId !== '' ? (
                    <>
                      {group.drawTables.map((x, index) => ( 
                        <BoardCard key={x.id} id={index.toString()} board={x} self={self}></BoardCard>
                      ))}
                    </>
                  ) : (
                    // 검색이없고 그룹 선택이없을경우 모든값을 불러옴
                    selectedGroupId === '' || selectedGroupId === null ? (
                      <>
                        {group.drawTables.map((x, index) => ( 
                          <BoardCard key={x.id} id={index.toString()} board={x} self={self}></BoardCard>
                        ))}
                      </>
                    ) : (
                      <></>
                    )
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-2">전체 보드</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {userLeaderBoards.map(group => (
                <React.Fragment key={group.id}>
                  {selectedGroupId === group.id && selectedGroupId !== '' ? (
                    <>
                      {group.drawTables.map((x, index) => ( 
                        <BoardCard key={x.id} id={index.toString()} board={x} self={self}></BoardCard>
                      ))}
                    </>
                  ) : (
                    selectedGroupId === '' || selectedGroupId === null ? (
                      <>
                        {group.drawTables.map((x, index) => ( 
                          <BoardCard key={x.id} id={index.toString()} board={x} self={self}></BoardCard>
                        ))}
                      </>
                    ) : (
                      <></>
                    )
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </BoardWapper>
  );
}

export default BoardList;
