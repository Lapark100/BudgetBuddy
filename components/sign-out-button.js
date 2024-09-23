'use client'

import { LogOut } from "lucide-react";
import SubmitButton from "./submit-button";
import { signOut } from "@/lib/actions";

export default function SignOutButton() {
return <form action={signOut}>
    <SubmitButton variant='ghost' size='sm'>
        <LogOut  className="w-4 h-4"/>
    </SubmitButton>
</form>
}