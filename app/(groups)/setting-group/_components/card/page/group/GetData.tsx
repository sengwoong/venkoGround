import React from 'react'
import { ViewAllGroupResult } from '@/type/groupType';
import { User } from '@prisma/client';
import { viewAllGroups, viewMyGroups } from '@/lib/group-service';



interface GetDataProps {
    setAllGroup: (allGroups: ViewAllGroupResult[]) => void;
    setMyGroup: (myGroups: ViewAllGroupResult[]) => void;
    setAllGroupMaxPage: (allGroupMaxPage: number) => void;
    setMyGroupMaxPage: (myGroupMaxPage: number) => void;
    term: string | undefined;
    self: User;
    page: number;
}



async function GetData({ setAllGroup, setMyGroup, setAllGroupMaxPage, setMyGroupMaxPage, term, self, page }:GetDataProps) {
    const { allGroups, totalPages: totalAllPages } = await viewAllGroups(term, page ?? 1);
    const { myGroups, totalPages: totalMyPages } = await viewMyGroups(self, term, page ?? 1);

    console.log(allGroups)
    console.log(allGroups)
    console.log(allGroups)
    console.log(allGroups)

    setAllGroup(allGroups);
    setMyGroup(myGroups);
    setAllGroupMaxPage(totalAllPages);
    setMyGroupMaxPage(totalMyPages);

    return(<></>)
}

export default GetData
