import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from '@clerk/nextjs';
const f = createUploadthing();

// 가짜 인증 함수
const authImg = async (req: Request) => {
  'use server';
  const { userId } = auth();
  return { userId };
};

// 앱을 위한 FileRouter, 여러 개의 FileRoutes를 포함할 수 있음
export const ourFileRouter = {
  // 고유한 routeSlug를 가진 여러 개의 FileRoutes를 정의할 수 있음
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // 이 FileRoute에 대한 권한 및 파일 유형 설정
    .middleware(async ({ req }) => {
      console.log("imgreq")
      console.log(req)
      // 이 코드는 업로드 전에 서버에서 실행됨
      const user = await authImg(req);

      // 사용자가 없으면 업로드할 수 없음
      if (!user) throw new UploadThingError("Unauthorized");

      // 여기서 반환된 값은 onUploadComplete에서 `metadata`로 접근 가능
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // 이 코드는 업로드 후 서버에서 실행됨
      console.log("userId에 대한 업로드 완료:", metadata.userId);

      console.log("파일 URL:", file.url);

      // !!! 여기서 반환된 값은 클라이언트 측 `onClientUploadComplete` 콜백으로 전송됨
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
