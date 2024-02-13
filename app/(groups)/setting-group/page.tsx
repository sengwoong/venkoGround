
import React, { Suspense } from 'react';
import { getSelf } from '@/lib/auth-service';
import { viewAllGroups, viewMyGroups } from '@/lib/group-service';
import EmptyGroup from './_components/card/emptyGroup';
import { redirect } from 'next/navigation';


const GroupList = React.lazy(() => import('./_components/card/groupList'));

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}


export default async function page({searchParams}:SearchPageProps) {
  console.log("!searchParams.term")
console.log(!searchParams.term)
console.log(searchParams.term)
console.log(searchParams.term)

  const self = await getSelf();

  const allGroups = await viewAllGroups(searchParams.term);
  const myGroups = await viewMyGroups(self,searchParams.term);

  return (
    <div className='ml-20'>
      <div className="flex-1 h-[calc(100%-80px)] p-6">
        <Suspense fallback={<EmptyGroup self={self} />}>
          <GroupList self={self} allGroups={allGroups} myGroups={myGroups} />
        </Suspense>
      </div>
    </div>
  );
}
