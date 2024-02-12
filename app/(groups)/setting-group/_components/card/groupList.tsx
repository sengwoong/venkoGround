import React from 'react';
import CreateNewGroups from './createNewGroups';
import GroupsWapper from './groupsWapper';
import CardWapper from './cardWapper';
import GroupCardContent from './groupCardContent';
import { ViewAllGroupResult } from './groupType';
import { User } from './userType';

interface GroupListProps {
  self: User
  allGroups: ViewAllGroupResult[]
}

function GroupList({ self, allGroups }: GroupListProps) {
  return (
    <GroupsWapper>
      <p>그룹생성</p>
      <CardWapper>
        <CreateNewGroups self={self} />
      </CardWapper>
      <p>전체 그룹</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {allGroups.map(group => (
        <CardWapper key={group.id}>
          <GroupCardContent self={self} group={group} />
        </CardWapper>
      ))}
      </div>
    </GroupsWapper>
  );
}

export default GroupList;
