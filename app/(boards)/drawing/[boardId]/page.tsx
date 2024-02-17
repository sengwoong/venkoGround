
import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";


interface BoardIdPageProps {
  params: {
    boardId: string;
  };
};

const BoardIdPage = ({
  params,
}: BoardIdPageProps) => {
// 디비에서 유저를 가져오고 해당유저가 그룹유저가아니면 팅기게해야함 // 유저가아닙니다 라고뜨면서 전페이지로 돌아가야함
  console.log("params.boardId")
  console.log(params.boardId)
  console.log(params.boardId)
  return (
    <Room roomId={params.boardId} fallback={<></>}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
