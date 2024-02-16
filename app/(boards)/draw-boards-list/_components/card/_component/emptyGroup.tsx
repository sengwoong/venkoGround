
import React from 'react'
import CreateNewGroups from "./createNewBaord";
import GroupsWapper from '../../page/board/boardWapper';
import CardWapper from './cardWapper';
import { User } from '../../../../../../type/userType';

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
