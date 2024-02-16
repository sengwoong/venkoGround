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

  function updateGroupId(groupid: string) {
    setSelectedGroupId(groupid);
  }

  return (
    <div className='w-full flex justify-center'>
      <div className="flex overflow-x-scroll w-96" style={{ WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none'}}>
        {itemsToShow.map(group => (
          <div key={group.id} onClick={() => updateGroupId(group.id)} className="border border-gray-300 rounded-lg shadow p-4 mb-4">
            <p className="font-semibold">{group.grouptitle ? group.grouptitle : '이름없는 그룹'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupList;
