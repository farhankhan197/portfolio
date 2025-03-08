import Image from "next/image";
import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <main className="max-width-sm w-full">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 text-muted-background">
            <img src="/images/profile.jpg" alt="Profile Picture" width={150} height={150} className="rounded-full" />
            <h1 className="text-2xl ml-4">Hello, I'm <span className="text-primary">Farhan Khan</span></h1>
          </div>
          <ModeToggle />
        </div>
      </main>
    </div>

  );
}
