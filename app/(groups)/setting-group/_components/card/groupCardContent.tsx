"use client"

import React, { useState, useTransition } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogCloseButton } from "@/components/ui/dialog";
import { ViewAllGroupResult } from './groupType';
import { User } from './userType';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { removeCrewForGroup } from '@/actions/group';
import UserSelecter from './UserSelecter';
import { getRole } from '@/lib/utils';

interface GroupCardProps {
  self: User;
  group: ViewAllGroupResult;
}

function GroupCardContent({ self, group }: GroupCardProps) {
  const [content, setContent] = useState<string>('유저 검색');
  const [delectUserId, setDelectUserId] = useState<string>('초기화');
  const [isPending, startTransition] = useTransition();

  const handleRemoveUser = () => {
    startTransition(() => {
      removeCrewForGroup(group.id, delectUserId, self);   
    });
  };

  return (
    <>
      <div key={group.id}>
        <h2 className="text-2xl font-semibold mt-6">{getRole(group.leader, self)}</h2>
        <p className="text-muted-foreground text-sm mt-2">My Group</p>
        <div className="mt-6">
          <p>무엇을 할 것인가요?</p>
          <Select
            value={content}
            onValueChange={(value) => setContent(value)}
            key="contentSelect"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="유저 검색" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className=' text-green-400'>유저 검색</SelectLabel>
                <SelectItem value={'유저 검색'}>유저 검색</SelectItem>
              </SelectGroup>
              {getRole(group.leader, self) === 'Leader' && (
                <SelectGroup>
                  <SelectLabel  className=' text-green-400'>리더 권한</SelectLabel>
                  <SelectItem value={'파티장 변경'}>파티장 변경</SelectItem>
                  <SelectItem value={'유저 강퇴'}>유저 강퇴</SelectItem>
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-lg text-blue-500 hover:underline">실행 하기</button>
            </DialogTrigger>
            <DialogContent className="p-4 bg-white border rounded-lg">
              {content === '유저 강퇴' && (
                <>
                  <UserSelecter
                    isPending={isPending}
                    UserId={delectUserId}
                    setUserId={setDelectUserId}
                    groupUser={group.groupUser}
                  />
                  <div className="mt-4 text-right">
                    <DialogCloseButton>
                      <button onClick={handleRemoveUser} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        {delectUserId ? "강퇴하기" : "메뉴에서 선택하세요"}
                      </button>
                    </DialogCloseButton>
                  </div>
                </>
              )}

{content === '유저 검색' && (
                <>
                  <UserSelecter
                    isPending={isPending}
                    UserId={delectUserId}
                    setUserId={setDelectUserId}
                    groupUser={group.groupUser}
                  />
                  
                </>
              )}


            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default GroupCardContent;
