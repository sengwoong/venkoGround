"use client"
import React, { useState, useTransition } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogCloseButton } from "@/components/ui/dialog";
import { ViewAllGroupResult } from '../../../../../../type/groupType';
import { User } from '../../../../../../type/userType';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { handleAcceptGroupRequest, handleChangeGroupLeader, handleLeaveGroup, removeCrewForGroup } from '@/actions/group';
import UserSelecter from '../../card/_component/UserSelecter';
import UserAppleSelecter from '../../card/_component/UserAppleSelecter';
import { getRole } from '@/lib/utils';
import Margin from '@/components/ui/margin';
import { Button } from '@/components/ui/button';
import { usePageNation } from '@/app/store/use-pagenation';
import { UserLeaderGroup } from '@/type/boardType';

interface GroupBoardProps {
  self: User;
  group: UserLeaderGroup;
}

function BoardCardContent({ self, group }: GroupBoardProps) {
  const [content, setContent] = useState<string>('유저 검색');
  const [userId, setUserId] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const { url } = usePageNation();
  const handleRemoveUser = () => {
    startTransition(() => {
      removeCrewForGroup(group.id, userId, self,url);   
    });
  };

  const AddGroup = () => {
    startTransition(() => {
      handleAcceptGroupRequest(userId, group.id, self,url);   
    });
  };

  const LeaveGroup = () => {
    startTransition(() => {
      handleLeaveGroup(group.id, self,url);   
    });
  };

  const ChangeLeader = () => {
    startTransition(() => {
      handleChangeGroupLeader(userId, group.id, self,url);   
    });
  };

  return (
    <>
      <div key={group.id} className='w-full'>
        <h2 className="text-2xl font-semibold mt-6">{getRole(group.leader, self)}</h2>
        <p className="text-muted-foreground text-sm mt-2">{group.grouptitle}</p>
        <div className="mt-6">
          <p>무엇을 할 것인가요?</p>
          <Margin top={4}></Margin>
          <Select
            value={content}
            onValueChange={(value) => setContent(value)}
            key="contentSelect"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="유저 검색" />
            </SelectTrigger>
            <SelectContent className='w-full'>
              <SelectGroup>
                <SelectLabel className='text-green-400'>유저 검색</SelectLabel>
                <SelectItem value={'유저 검색'}>유저 검색</SelectItem>
              </SelectGroup>
              {getRole(group.leader, self) === 'Leader' && (
                <SelectGroup>
                  <SelectLabel className='text-green-400'>리더 권한</SelectLabel>
                  <SelectItem value={'리더 변경'}>파티장 변경</SelectItem>
                  <SelectItem value={'유저 강퇴'}>유저 강퇴</SelectItem>
                  <SelectItem value={'초대 수락'}>초대 수락</SelectItem>
                </SelectGroup>
              )}
              {getRole(group.leader, self) === 'Crew' && (
                <SelectGroup>
                  <SelectItem value={'그룹 나가기'}>그룹 나가기</SelectItem>
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='w-full my-3' variant={"primary"}>실행 하기</Button>
            </DialogTrigger>

            <DialogContent className="p-4 bg-white border rounded-lg">
              {content === '유저 강퇴' && (
                <>
                  <UserSelecter
                    isPending={isPending}
                    UserId={userId}
                    setUserId={setUserId}
                    groupUser={group.groupUser}
                  />
                  <div className="mt-4 text-right">
                    <DialogCloseButton>
                      <button onClick={handleRemoveUser} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        {userId ? "강퇴하기" : "메뉴에서 선택하세요"}
                      </button>
                    </DialogCloseButton>
                  </div>
                </>
              )}

              {content === '리더 변경' && (
                <>
                  <UserSelecter
                    isPending={isPending}
                    UserId={userId}
                    setUserId={setUserId}
                    groupUser={group.groupUser}
                  />
                  <div className="mt-4 text-right">
                    <DialogCloseButton>
                      <button onClick={ChangeLeader} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        {userId ? "리더 변경" : "메뉴에서 선택하세요"}
                      </button>
                    </DialogCloseButton>
                  </div>
                </>
              )}

              {content === '그룹 나가기' && (
                <>
                  <div className="mt-4 text-right">
                    <DialogCloseButton>
                      <p>정말로 나가겠습니까?</p>
                      <button onClick={LeaveGroup} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        {userId ? "나가기" : "메뉴에서 선택하세요"}
                      </button>
                    </DialogCloseButton>
                  </div>
                </>
              )}

              {content === '초대 수락' && (
                <>
                  <UserAppleSelecter
                    isPending={isPending}
                    UserId={userId}
                    setUserId={setUserId}
                    groupUser={group.groupApplications}
                  />
                  <div className="mt-4 text-right">
                    <DialogCloseButton>
                      <button onClick={AddGroup} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        {userId ? "수락하기" : "메뉴에서 선택하세요"}
                      </button>
                    </DialogCloseButton>
                  </div>
                </>
              )}

              {content === '유저 검색' && (
                <>
                  <UserSelecter
                    isPending={isPending}
                    UserId={userId}
                    setUserId={setUserId}
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

export default BoardCardContent;
