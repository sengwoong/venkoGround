
import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";
import { handleBoardInUserGroup } from "@/actions/board";
import { getSelf } from "@/lib/auth-service";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
};

const BoardIdPage = async({
  params,
}: BoardIdPageProps) => {
// 디비에서 유저를 가져오고 해당유저가 그룹유저가아니면 팅기게해야함 // 유저가아닙니다 라고뜨면서 전페이지로 돌아가야함
  console.log("params.boardId")
  const self = await getSelf()
  handleBoardInUserGroup(params.boardId,self.id)
  console.log(handleBoardInUserGroup(params.boardId,self.id))
  console.log(handleBoardInUserGroup(params.boardId,self.id))
  return (
    <Room roomId={params.boardId} fallback={<></>}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
