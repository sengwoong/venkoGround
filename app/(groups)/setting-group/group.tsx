
"use client";



import React, { useState, ChangeEvent } from 'react';

interface GroupProps {
  handleJoinGroup: (groupId:string) => void;
  handleInviteToGroup: (invitedUserId:string,groupId:string) => void;
  handleAcceptGroupRequest: (userId: string,groupId:string) => void;
  handleViewAllGroups: () => void;
  handleViewMyGroups: () => void;
  handleCreateGroup: (grouptitle: string) => void;
}

function Group({
  handleJoinGroup,
  handleInviteToGroup,
  handleAcceptGroupRequest,
  handleViewAllGroups,
  handleViewMyGroups,
  handleCreateGroup,
}: GroupProps) {
  const [groupId, setGroupId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [invitedUserId, setInvitedUserId] = useState<string>('');
  const [groupTitle, setGroupTitle] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'groupId':
        setGroupId(value);
        break;
      case 'invitedUserId':
        setInvitedUserId(value);
        break;
      case 'userId':
        setUserId(value);
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
        <button onClick={()=>handleInviteToGroup(invitedUserId,groupId)}>그룹 초대</button>
      </div>
      <div>
        <label>가입 요청 수락 대상 사용자 ID:</label>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={handleChange}
        />
        <button onClick={() => handleAcceptGroupRequest(userId,groupId)}>
          가입 요청 수락
        </button>
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
        <button onClick={() => handleCreateGroup(groupTitle)}>
          그룹 만들기
        </button>
      </div>
    </div>
  );
}

export default Group;
