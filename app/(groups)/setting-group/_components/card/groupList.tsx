"use client"

import React from 'react';
import CreateNewGroups from './createNewGroups';
import GroupsWapper from './groupsWapper';
import CardWapper from './cardWapper';
import GroupCardContent from './groupCardContent';
import { ViewAllGroupResult } from './groupType';
import { User } from './userType';
import { useSearchParams } from 'next/navigation';

interface GroupListProps {
  self: User
  allGroups: ViewAllGroupResult[]
  myGroups: ViewAllGroupResult[]
}

function GroupList({ self, allGroups ,myGroups}: GroupListProps) {

  const searchParams = useSearchParams();
  const MyGroupParm = searchParams.get("MyGroup");

  
  return (
    <GroupsWapper>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">그룹 생성</h2>
        <CardWapper>
          <CreateNewGroups self={self} />
        </CardWapper>
      </div>
      <div className="mb-4">
        {MyGroupParm ? (
          <>
            <h2 className="text-lg font-bold mb-2">전체 그룹</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {allGroups.map(group => (
                <CardWapper key={group.id}>
                  <GroupCardContent self={self} group={group} />
                </CardWapper>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-2">나의 그룹</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {myGroups.map(group => (
                <CardWapper key={group.id}>
                  <GroupCardContent self={self} group={group} />
                </CardWapper>
              ))}
            </div>
          </>
        )}
      </div>
    </GroupsWapper>
  );
}

export default GroupList;