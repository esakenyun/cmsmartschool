import { cookies } from "next/headers";
import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";

interface NavbarProps {
  title: string;
}

export async function Navbar({ title }: NavbarProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("user_session")?.value;
  let user = null;

  if (session) {
    try {
      user = JSON.parse(session);
    } catch (e) {
      console.error("Failed to parse user session", e);
    }
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu unit={user?.unit} />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <UserNav
            name={user?.name || "User"}
            email={user?.email || ""}
            imageUrl={user?.imageUrl}
          />
        </div>
      </div>
    </header>
  );
}
