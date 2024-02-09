
import React from 'react'
import CreateNewGroups from "./createNewGroups";
import GroupsWapper from './groupsWapper';
import CardWapper from './cardWapper';
import { User } from './userType';

interface EmptyGroupProps {
    self:User
  }
  
const EmptyGroup: React.FC<EmptyGroupProps> = ({ self }) => {
  return (
   <div>
    <GroupsWapper> 
      <CardWapper>
      <CreateNewGroups self={self}></CreateNewGroups>
      </CardWapper>
    </GroupsWapper>
    </div>
  );
};

export default EmptyGroup;
