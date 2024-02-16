"use client";

import React from 'react';
import BoardWapper from './boardWapper';
import CardWapper from '../../card/_component/cardWapper';
import BoardCardContent from './groupCardContent';
import { User } from '@/type/userType';
import { useSearchParams } from 'next/navigation';
import { ViewAllGroupResult } from '@/type/groupType';
import CreateNewBoard from '../../card/_component/createNewBaord';
import { UserLeaderGroup } from '@/type/boardType';
import { useGroupStore } from '@/app/store/use-board-get-gruop-id';
import { UploadButton } from '@/app/utils/uploadthing';

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

 
{/* 이미지 */}
 
     <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <UploadButton
         endpoint="imageUploader"
         onClientUploadComplete={(res) => {
           // Do something with the response
           console.log("Files: ", res);
           alert("Upload Completed");
         }}
         onUploadError={(error: Error) => {
           // Do something with the error.
           alert(`ERROR! ${error.message}`);
         }}
       />
     </main>
  

        {!MyGroupParm ? (
          <>
            <h2 className="text-lg font-bold mb-2">나의 보드</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {userGroupsBoards.map(group => (
                <React.Fragment key={group.id}>
                  {selectedGroupId === group.id && selectedGroupId !== '' ? (
                    <CardWapper>
                      {group.id}
                    </CardWapper>
                  ) : (
                    selectedGroupId === '' || selectedGroupId === null ? (
                      <CardWapper>
                        {group.id}
                      </CardWapper>
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
                  <CardWapper>
                    {group.id}
                  </CardWapper>
                ) : (
                  selectedGroupId === '' || selectedGroupId === null ? (
                    <CardWapper>
                      {group.id}
                    </CardWapper>
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
