import React from 'react'
import CardWapper from './cardWapper'
import GroupCardContent from './groupCardContent'
import { handleGetAllGroups, handleGetMyGroups } from '@/actions/group';
import { User } from './userType';

interface MainGroupListProps {
    self: User
    MyGroupParm: string
    TermParm: string
  }


async function MainGroupList({MyGroupParm,self,TermParm}:MainGroupListProps) {

    const allGroups = await handleGetAllGroups(TermParm);
    const myGroups = await handleGetMyGroups(TermParm,self);
  


  return (
    <>
     {MyGroupParm ? (
          <>
            <h2 className="text-lg font-bold mb-2">전체 그룹</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {allGroups!.map(group => (
                <CardWapper key={group.id}>
                  <GroupCardContent self={self} group={group} />
                </CardWapper>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-2">나의 그룹</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {myGroups!.map(group => (
                <CardWapper key={group.id}>
                  <GroupCardContent self={self} group={group} />
                </CardWapper>
              ))}
            </div>
          </>
        )}
        </>
  )
}

export default MainGroupList