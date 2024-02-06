import { queryClient } from "@/app/react-query/queryClient";
import { queryKeys } from "@/app/react-query/queryKeys";
import { createGroup } from "@/lib/group-service";
import { useMutation } from "@tanstack/react-query";


/** 가입 요청시 모든값을 초기화 합니다. */
export function createGroupMut(grouptitle:string) {
const createGroupMutationApi =  useMutation({
    mutationFn: () => createGroup(grouptitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.AllGroup] });
    },
  });

 return createGroupMutationApi
}