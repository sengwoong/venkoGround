"use client"

import React from 'react';
import { UserLeaderGroup } from '@/type/boardType';
import { useSearchParams } from 'next/navigation';
import { useGroupStore } from '@/app/store/use-board-get-gruop-id';

interface GroupListProps {
  userGroupsBoards: UserLeaderGroup[];
  userLeaderBoards: UserLeaderGroup[];
  totalAllPages: number;
}

const GroupList: React.FC<GroupListProps> = ({ userGroupsBoards, userLeaderBoards, totalAllPages }) => {
  const searchParams = useSearchParams();
  const MyGroupParm = searchParams.get('MyBoard');
  const itemsToShow = MyGroupParm ? userGroupsBoards : userLeaderBoards;
  const { setSelectedGroupId } = useGroupStore();

  function updateGroupId(groupId: string) {
    setSelectedGroupId(groupId);
    console.log(groupId);
  }

  return (
    <div className='  w-full  flex justify-center'>
    <div className="flex overflow-x-scroll max-w-2/3 " style={{ WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none'}}>
      {itemsToShow.map(group => (
        <div key={group.id} onClick={() => updateGroupId(group.id)} className="  flex flex-col items-center justify-center rounded-lg p-1 w-[200px] min-w-[200px] bg-white shadow-md mx-2 my-4 cursor-pointer  hover:shadow-lg h-16">
          <p className="font-semibold text-sm overflow-hidden whitespace-nowrap  text-black">{group.grouptitle || '이름없는 그룹'}</p>
          <p className="text-gray-600 text-sm">{group.drawTables.length}</p>
        </div>
      ))}
    </div>
  </div>
  
  );
}

export default GroupList;
