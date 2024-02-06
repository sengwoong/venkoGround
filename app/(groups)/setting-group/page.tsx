import React from 'react';

import {
  requestToJoinGroup,
  inviteToGroup,
  viewAllGroups,
  viewMyGroups,
  acceptGroupRequestAndAddUserToGroup,
  createGroup,
} from '@/lib/group-service'; // 그룹 관련 서비스 함수들을 가져옵니다.
import Group from './group'; // 그룹 컴포넌트를 가져옵니다.

import { createGroupMut, getAllGroups } from './group-query'; // 그룹 쿼리 함수들을 가져옵니다.

type GroupPageProps = {};

const GroupPage: React.FC<GroupPageProps> = () => {

  // 그룹 생성 핸들러
  const handleCreateGroup = async (grouptitle: string) => {
    try {
      // 서버에 그룹 생성 요청
      await createGroup(grouptitle);
      console.log('그룹이 성공적으로 생성되었습니다.');
    } catch (error) {
      console.error('그룹 생성 중 오류:', error);
    }
  };

  // 그룹 가입 요청 핸들러 리엑트쿼리
  const handleJoinGroup = async (groupId:string) => {
    try {
      // 서버에 그룹 가입 요청
      await requestToJoinGroup(groupId);
      console.log('가입 요청이 성공적으로 전송되었습니다.');
    } catch (error) {
      console.error('가입 요청 중 오류:', error);
    }
  };

  // 그룹 초대 핸들러
  const handleInviteToGroup = async (invitedUserId:string, groupId:string) => {
    try {
      // 서버에 그룹 초대 요청
      await inviteToGroup(invitedUserId, groupId);
      console.log('그룹 초대가 성공적으로 전송되었습니다.');
    } catch (error) {
      console.error('그룹 초대 중 오류:', error);
    }
  };

  // 가입 요청 수락 핸들러
  const handleAcceptGroupRequest = async (userId: string, groupId:string) => {
    try {
      // 서버에 가입 요청 수락 요청
      await acceptGroupRequestAndAddUserToGroup(userId, groupId);
      console.log('가입 요청이 성공적으로 수락되었습니다.');
    } catch (error) {
      console.error('가입 요청 수락 중 오류:', error);
    }
  };

  // 전체 그룹 조회 핸들러
  const handleViewAllGroups = async () => {
    try {
      // 서버에 전체 그룹 조회 요청
      const allGroups = await getAllGroups();
      console.log('전체 그룹 목록:', allGroups);
    } catch (error) {
      console.error('전체 그룹 조회 중 오류:', error);
    }
  };

  // 내 그룹 조회 핸들러 @@ 리엑트쿼리 추가하기
  const handleViewMyGroups = async () => {
    try {
      // 서버에 내 그룹 조회 요청
      const myGroups = await viewMyGroups();
      console.log('내 그룹 목록:', myGroups);
    } catch (error) {
      console.error('내 그룹 조회 중 오류:', error);
    }
  };

  return (
    <div>
      {/* 그룹 컴포넌트에 핸들러들을 전달합니다. */}
      <Group
        handleJoinGroup={handleJoinGroup}
        handleInviteToGroup={handleInviteToGroup}
        handleAcceptGroupRequest={handleAcceptGroupRequest}
        handleViewAllGroups={handleViewAllGroups}
        handleViewMyGroups={handleViewMyGroups}
        handleCreateGroup={handleCreateGroup}
      />
    </div>
  );
};

export default GroupPage;
