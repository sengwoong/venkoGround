import React from 'react';
import { getSelf } from '@/lib/auth-service';
import GroupPage from './group';
import { acceptGroupRequestAndAddUserToGroup, createGroup, inviteToGroup, requestToJoinGroup, viewAllGroups, viewMyGroups } from '@/lib/group-service';
import EmptyGroup from './_components/card/emptyGroup';
import GroupList from './_components/card/groupList'


export default async function page() {

  const self = await getSelf();




  const handleCreateGroup = async (groupTitle: string) => {
    "use server";
    try {
      await createGroup(groupTitle, self);
      console.log('그룹이 성공적으로 생성되었습니다.');
      // 새로운 그룹 생성 후 쿼리 다시 가져오기
    } catch (error) {
      console.error('그룹 생성 중 오류:', error);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    "use server";
    try {
      await requestToJoinGroup(groupId, self);
      console.log('가입 요청이 성공적으로 전송되었습니다.');

    } catch (error) {
      console.error('가입 요청 중 오류:', error);
    }
  };

  const handleInviteToGroup = async (invitedUserId: string, groupId: string) => {
    "use server";
    try {
      await inviteToGroup(invitedUserId, groupId, self);
      console.log('그룹 초대가 성공적으로 전송되었습니다.');
    } catch (error) {
      console.error('그룹 초대 중 오류:', error);
    }
  };

  const handleAcceptGroupRequest = async (userId: string, groupId: string) => {
    "use server";
    try {
      await acceptGroupRequestAndAddUserToGroup(userId, groupId, self);
      console.log('가입 요청이 성공적으로 수락되었습니다.');

    } catch (error) {
      console.error('가입 요청 수락 중 오류:', error);
    }
  };

  const handleViewAllGroups = async () => {
    "use server";
    try {
      const allGroups = await viewAllGroups();

      console.log('전체 그룹 목록:', allGroups);
    } catch (error) {
      console.error('전체 그룹 조회 중 오류:', error);
    }
  };

  const handleViewMyGroups = async () => {
    "use server";
    try {
      const myGroups = await viewMyGroups(self);

      console.log('내 그룹 목록:', myGroups);
    } catch (error) {
      console.error('내 그룹 조회 중 오류:', error);
    }
  };



  const allGroups = await viewAllGroups();
  const myGroups = await viewMyGroups(self);


  return (
    <div className='ml-20'>



      <div className="flex-1 h-[calc(100%-80px)] p-6">
        {!allGroups ? (
          <EmptyGroup self={self} />
        ) : (
          <GroupList self={self} allGroups={allGroups}/>
        )}
      </div>



      <GroupPage handleCreateGroup={handleCreateGroup} handleJoinGroup={handleJoinGroup} handleInviteToGroup={handleInviteToGroup} handleAcceptGroupRequest={handleAcceptGroupRequest} handleViewAllGroups={handleViewAllGroups} handleViewMyGroups={handleViewMyGroups} allGroups={allGroups} myGroups={myGroups}></GroupPage></div>



  );
}
