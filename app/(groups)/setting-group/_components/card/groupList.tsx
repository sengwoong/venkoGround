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
      <CardWapper>
        <CreateNewGroups self={self} />
      </CardWapper>
      {allGroups.map(group => (
        <CardWapper key={group.id}>
          <GroupCardContent self={self} group={group} />
        </CardWapper>
      ))}
    </GroupsWapper>
  );
}

export default GroupList;
