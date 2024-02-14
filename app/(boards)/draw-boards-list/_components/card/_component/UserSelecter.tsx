import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '../../../../../../type/userType';
import {GroupApplication}from'../../../../../../type/groupType'
interface UserSelecterProps {
  isPending: boolean;
  UserId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  groupUser: User[] ;
  
}


const UserSelecter: React.FC<UserSelecterProps> = ({ isPending, UserId, setUserId, groupUser }) => {
  return (
    <>
   <p className='text-black'>유저 리스트</p>
    <Select
      disabled={isPending}
      value={UserId}
      onValueChange={(value) => setUserId(value)}
      key="delectUserForGropSelect"
    >
      <SelectTrigger className="w-3/4">
        <SelectValue placeholder="선택하세요" />
      </SelectTrigger>
      <SelectContent>
        {groupUser.length === 0 ? (
          <SelectItem value={'초기화'}>참여 유저가 없습니다.</SelectItem>
        ) : (
          groupUser.map((user) => (
            <SelectItem key={user.id} value={user.id}>  
            {/* userId 인데 user.id 로 해서 하나더만들어야해 */}
              {user.username}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
    </>
  );
}

export default UserSelecter;
