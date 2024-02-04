import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
     <div className="flex items-center gap-x-2">
          <span className={cn(
            "font-semibold text-2xl",
            font.className,
          )}>
            Dongo Ground
          </span>
        </div>
    </Link>
  );
};
