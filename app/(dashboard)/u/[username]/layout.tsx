import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";
import { Suspense } from "react";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
};


const CreatorLayout = ({
  children,
}: CreatorLayoutProps) => {
  return (
    
    <main className="h-full min-h-screen">
        <Navbar />
        <div className="flex h-max">
        <Container>
        
          <Sidebar />
       
        </Container>
        <div className="h-full min-h-screen w-full">
            {children}
        </div>
        </div>
    </main>
  );
};

export default CreatorLayout;



 


