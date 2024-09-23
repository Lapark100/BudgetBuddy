'use client'
import { login } from "@/lib/actions";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom"

const initialState = {
    message: '',
    error: ''
}

export default function LoginForm() {
    const [state, formAction] = useFormState(login, initialState )
    return <form action={formAction} className="space-y-2 " >
        <Input typpe="email" placeholder="name@example.com" name="email" required />
        <SubmitButton type="submit" size="sm" className="w-full" >
            Sign in with email
        </SubmitButton>
        
        <p className={`${state?.error ? 'text-red-500' : 'text-green-500'} text-sm text-center`}>
            {state?.message}
        </p>
    </form>
}