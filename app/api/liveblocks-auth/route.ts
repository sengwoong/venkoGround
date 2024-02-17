import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";



const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  console.log("live kit room")
  console.log(room)
  // 
  // const board = await convex.query(api.board.get, { id: room });

  // if (board?.orgId !== authorization.orgId) {
  //   return new Response("Unauthorized", { status: 403 });
  // }

  const userInfo = {
    name: user.firstName || "Teammeate",
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(
    user.id,
    { userInfo }
  );

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  return new Response(body, { status });
};
