"use client"
import React, { useState } from 'react'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogCloseButton,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { onCreate } from '@/actions/group';
import { toast } from 'sonner';

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




const CreateNewGroups: React.FC<EmptyGroupProps> = ({ self }) => {
    const [groupTitle, setGroupTitle] = useState<string>('');
  
    const handleCreateGroup = async () => {
      try {
        await onCreate(groupTitle, self)//
        .then(() => toast.success("Group created successfully"))//
        .catch(() => toast.error("Something went wrong"));


        // 그룹 생성 후 모달 닫기
    
      } catch (error) {
        console.error('그룹 생성 중 오류:', error);
      }
    };
  
    return (
<>

            {/* 이알로 한번더 정가운데로 정렬하고싶어 */}
          <div className="bg-blue-800 p-6 w-full h-[250px] rounded-lg shadow-lg flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mt-6">
              Create Group
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Create an Group
            </p>
            <div className="mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className= "hover:translate-x-1 hover:-translate-y-1">
                    Create Group
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                  <div>
                    <label htmlFor="groupTitle" className="block text-sm font-medium text-gray-700">그룹 제목</label>
                    <input type="text" id="groupTitle" name="groupTitle" value={groupTitle} onChange={(e) => setGroupTitle(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mt-4">
                  <DialogCloseButton>
                    <button onClick={handleCreateGroup} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        그룹 생성
                    </button>
                    </DialogCloseButton>

                  </div>
                </DialogContent>
            
              </Dialog>
            </div>
          </div>
       
   
</>
    );
  };
  
  export default CreateNewGroups;
