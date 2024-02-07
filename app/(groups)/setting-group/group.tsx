"use client"
import React, { useState } from 'react';

type GroupPageProps = {
  handleCreateGroup: (groupTitle: string) => void;
  handleJoinGroup: (groupId: string) => void;
  handleInviteToGroup: (invitedUserId: string, groupId: string) => void;
  handleAcceptGroupRequest: (userId: string, groupId: string) => void;
  handleViewAllGroups: () => void;
  handleViewMyGroups: () => void;
  allGroups: { id: string; grouptitle: string; leader: string }[] | undefined;
  myGroups: { id: string; grouptitle: string; leader: string }[] | undefined;
};

const GroupPage: React.FC<GroupPageProps> = ({
  handleCreateGroup,
  handleJoinGroup,
  handleInviteToGroup,
  handleAcceptGroupRequest,
  handleViewAllGroups,
  handleViewMyGroups,
  allGroups,
  myGroups
}) => {
  const [groupId, setGroupId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [invitedUserId, setInvitedUserId] = useState<string>('');
  const [groupTitle, setGroupTitle] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'groupId':
        setGroupId(value);
        break;
      case 'userId':
        setUserId(value);
        break;
      case 'invitedUserId':
        setInvitedUserId(value);
        break;
      case 'groupTitle':
        setGroupTitle(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>그룹 페이지</h1>
      <div>
        <label>그룹 ID:</label>
        <input
          type="text"
          name="groupId"
          value={groupId}
          onChange={handleChange}
        />
        <button onClick={() => handleJoinGroup(groupId)}>그룹 가입 요청</button>
      </div>
      <div>
        <label>초대 대상 사용자 ID:</label>
        <input
          type="text"
          name="invitedUserId"
          value={invitedUserId}
          onChange={handleChange}
        />
        <button onClick={() => handleInviteToGroup(invitedUserId, groupId)}>그룹 초대</button>
      </div>
      <div>
        <label>가입 요청 수락 대상 사용자 ID:</label>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={handleChange}
        />
        <button onClick={() => handleAcceptGroupRequest(userId, groupId)}>가입 요청 수락</button>
      </div>
      <div>
        <button onClick={handleViewAllGroups}>전체 그룹 조회</button>
      </div>
      <div>
        <button onClick={handleViewMyGroups}>내 그룹 조회</button>
      </div>
      <div>
        <label>그룹 제목:</label>
        <input
          type="text"
          name="groupTitle"
          value={groupTitle}
          onChange={handleChange}
        />
        <button onClick={() => handleCreateGroup(groupTitle)}>그룹 만들기</button>
      </div>
      <div>
       
          <ul>
            전체그룹
            {allGroups ? allGroups.map((group) => (
              <li key={group.id}>{group.grouptitle} {group.leader}</li>
            )) : ""}
          </ul>
        
      </div>
      <div>
  
        (
          <ul>
            내 그룹
            {myGroups ? myGroups.map((group) => (
              <li key={group.id}>{group.grouptitle} {group.leader}</li>
            )) : ""}
          </ul>
        )
      </div>
    </div>
  );
};

export default GroupPage;
