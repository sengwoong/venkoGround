import Link from "next/link";
import { Clapperboard,Boxes,Brush } from "lucide-react";
import { 
  SignInButton, 
  UserButton, 
  currentUser
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-5">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">
                Dashboard
              </span>
            </Link>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/setting-group`}>
              <Boxes className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">
                group
              </span>
            </Link>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/draw-boards-list`}>
              <Brush className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">
                draw
              </span>
            </Link>
          </Button>

          
          <UserButton
            afterSignOutUrl="/"
          />
        </div>
      )}


    </div>
  );
};
