import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from 'react'
import CreateNewGroups from "./createNewGroups";
import {  User } from "@prisma/client";
import GroupCardWapper from "./groupCardWapper";
interface EmptyGroupProps {
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
  
const EmptyGroup: React.FC<EmptyGroupProps> = ({ self }) => {
  return (
   <div>
    <GroupCardWapper> 
    <CreateNewGroups self={self}></CreateNewGroups>
    </GroupCardWapper>
    </div>
  );
};

export default EmptyGroup;
