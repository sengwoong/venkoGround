import React from 'react';
import CreateNewGroups from './createNewGroups';
import GroupCardWapper from './groupCardWapper';



interface GroupListProps {
  self: {
    id: string;
    username: string;
    imageUrl: string;
    externalUserId: string;
    bio: string | null;
    isteacher: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

function GroupList({ self }: GroupListProps) {
  return (
    <GroupCardWapper> 
      <CreateNewGroups self={self} />
    </GroupCardWapper>
  );
}

export default GroupList;
