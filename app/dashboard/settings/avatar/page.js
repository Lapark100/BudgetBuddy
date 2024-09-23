'use client'

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/lib/actions";
import Alert from "@/components/alert";
import { Ban, Check } from "lucide-react";
import { useFormState } from "react-dom";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";

const initialState = {
    message: '',
    error: false
}

export default function SettingsPage() {
    const [state, formAction] = useFormState(uploadAvatar, initialState)
    return <>
        <h1 className="text-4xl font-semibold mb-8">
            Avatar
        </h1>

        <form className="space-y-4" action={formAction}>
            {state?.error && <AlertError>{state.message}</AlertError> }
            {!state?.error && state?.message.length > 0 && <AlertSuccess>{state.message}</AlertSuccess> }
            <Input type="file" name="file" id="file" />
            <SubmitButton>
                Upload Avatar
            </SubmitButton>
        </form>
    </>
}