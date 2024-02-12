"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog,  DialogCloseButton, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { onCreate } from '@/actions/group';
import { toast } from 'sonner';
import { User } from './userType';

interface EmptyGroupProps {
  self: User
}

const CreateNewGroups: React.FC<EmptyGroupProps> = ({ self }) => {
  const [groupTitle, setGroupTitle] = useState<string>('');

  const handleCreateGroup = async () => {
    try {
      await onCreate(groupTitle, self)
        .then(() => toast.success("Group created successfully"))
        .catch(() => toast.error("Something went wrong"));

      // 그룹 생성 후 모달 닫기

    } catch (error) {
      console.error('그룹 생성 중 오류:', error);
    }
  };

  return (
    <>
    
        <h2 className="text-2xl font-semibold mt-6">Create Group</h2>
        <p className="text-muted-foreground text-sm mt-2">Create an Group</p>
        <div className="mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="hover:translate-x-1 hover:-translate-y-1">Create Group</Button>
            </DialogTrigger>
            <DialogContent className="p-0  border-none max-w-[480px] bg-white">
            <div className="flex flex-col space-y-4 items-center p-5">
  <label htmlFor="groupTitle" className="text-sm font-medium text-gray-700 text-center">그룹 제목</label>
  <input type="text" id="groupTitle" name="groupTitle" value={groupTitle} onChange={(e) => setGroupTitle(e.target.value)} className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500  text-black" />

  <DialogCloseButton>
  <button onClick={handleCreateGroup} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full">그룹 생성</button>
  </DialogCloseButton>
</div>


            </DialogContent>
          </Dialog>
        </div>
 
    </>
  );
};

export default CreateNewGroups;
