import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import useServerDarkMode from "@/hook/use-server-dark-mood";
import { createClient } from "@/lib/supabase/server";
import { KeyRound } from "lucide-react";
import { variants, sizes } from "@/lib/variant";
import SignOutButton from "./sign-out-button";
import Button from "./button";
import Avatar from "@/app/avatar";

export default async function PageHeader({ className }) {
  const theme = useServerDarkMode();

  const supabase = createClient();
  const { data: { user } = {}, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error.message);
  }

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link href="/dashboard" className="text-xl hover:underline underline underline-offset-8 decoration-2">
        Budget Buddy
      </Link>

      <div className="flex items-center space-x-1">
        <DarkModeToggle defaultMode={theme} />
        {user ? (
          <Link href="/dashboard/settings" className={`${variants['ghost']} ${sizes['sm']} flex items-center space-x-2`} >
            <Avatar />
            {user.user_metadata.fullName ?? user?.email}
          </Link>
        ) : (
          <Link className={`${variants['ghost']} ${sizes['sm']}`} href="/">
            <KeyRound className="w-4 h-4" />
          </Link>
        )}
        {user && <SignOutButton />}
      </div>
    </header>
  );
}
