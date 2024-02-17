"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useApiMutation } from "@/hooks/use-api-mutation";
// import { api } from "@/convex/_generated/api";
import { useRenameModal } from "@/app/store/use-rename-modal";
import { handleRenameModal } from "@/actions/board";
import { UploadButton } from "@/app/utils/uploadthing";
import Image from "next/image";

export const RenameModal = () => {

  const {
    isOpen,
    onClose,
    initialValues,
    self,
    
  } = useRenameModal();



  const [title, setTitle] = useState(initialValues.title);
  const [newImg, setNewImg] = useState<string | null>();


    // Id User

    async function onRenamehandle() {
      if (newImg == '' || newImg == undefined) {
        return;
      }
      await handleRenameModal(initialValues.id, title, newImg, self);
    }
    

  
  
  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (
    e,
  ) => {
    e.preventDefault();

    onRenamehandle()
      .then(() => {
        toast.success("Board renamed");
        onClose();
      })
      .catch(() => toast.error("Failed to rename board"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit board title
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter a new title for this board
        </DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />
           <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  alert("Upload Completed");
                  setNewImg(res.pop()?.url! ) 
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />


          {newImg?(<Image src={newImg}  alt='보드 사진' width={320} height={320}/>):(<></>)} 


          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
