"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog,  DialogCloseButton, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { User } from '../../../../../../type/userType';
import { usePageNation } from '@/app/store/use-pagenation';
import { handleAddBoardToGroup } from '@/actions/board';
import ImageUploadBox from '../../page/board/ImageUploadBox';
import { useGroupStore } from '@/app/store/use-board-get-gruop-id';
import { UploadButton } from '@/app/utils/uploadthing';

interface EmptyBoardProps {
  self: User
}

const CreateNewBoard: React.FC<EmptyBoardProps> = ({ self }) => {
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [previewImages, setPreviewImages] = useState<JSX.Element[]>([]);
  const { url } = usePageNation();
  const { selectedGroupId } = useGroupStore();

  console.log("selectedGroupId", selectedGroupId);

  const handleCreateGroup = async () => {
    try {
      if(selectedGroupId == null)
      {
        return alert("그룹을 선택 하여 주세요")
      }
      // await handleAddBoardToGroup(selectedGroupId, boardTitle, previewImages, self)
      //   .then(() => toast.success("Group created successfully"))
      //   .catch(() => toast.error("Something went wrong"));

      // 그룹 생성 후 모달 닫기
    } catch (error) {
      console.error('그룹 생성 중 오류:', error);
    }
  };

  const convertImagesToBuffer = async (images: File[]): Promise<Buffer[]> => {
    const buffers: Buffer[] = [];
  
    for (const image of images) {
      // Read image as ArrayBuffer
      const buffer: ArrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = error => reject(error);
        reader.readAsArrayBuffer(image);
      });
  
      // Convert ArrayBuffer to Buffer
      buffers.push(Buffer.from(buffer));
    }
  
    return buffers;
  };
  
  

  return (
    <>
      <h2 className="text-2xl font-semibold mt-6">Create Board</h2>
      <p className="text-muted-foreground text-sm mt-2">Create an Board</p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="hover:translate-x-1 hover:-translate-y-1">Create Board</Button>
          </DialogTrigger>
          <DialogContent className="p-0  border-none max-w-[480px] bg-white">
            <div className="flex flex-col space-y-4 items-center p-5">
              <label htmlFor="boardTitle" className="text-sm font-medium text-gray-700 text-center">보드 제목</label>
              <input 
                type="text" 
                id="boardTitle" 
                name="boardTitle" 
                value={boardTitle} 
                onChange={(e) => setBoardTitle(e.target.value)} 
                className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500  text-black" 
              />
              <ImageUploadBox previewImages={previewImages} setPreviewImages={setPreviewImages} ></ImageUploadBox>
              <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              <DialogCloseButton>
                <button 
                  onClick={handleCreateGroup} 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                >
                  보드 생성
                </button>
              </DialogCloseButton>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateNewBoard;
