'use client'

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import Label from "@/components/label";
import { useFormState } from "react-dom";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import { updateSettings } from "@/lib/actions";
import DateRangeSelect from "@/components/date-range-select";

const initialState = {
    message: '',
    error: false,
    errors:{}
}

export default function SettingsForm({defaults}) {
    const [state, formAction] = useFormState(updateSettings, initialState)

    return <form className="space-y-4" action={formAction}>
        {state?.error && <AlertError>{state.message}</AlertError>}
        {!state?.error && state?.message?.length > 0 && <AlertSuccess>{state.message}</AlertSuccess>}

        <Label htmlFor="fullName"> User full name</Label>
        <Input type="text" name="fullName" placeholder="User full name" defaultValue={defaults?.fullName}/>
        {state?.errors['fullName']?.map(error => <FormError key={`fullName-${error}`} error={error} />)}

        <Label  htmlFor="defaultView" >Default transactions view</Label>
        <DateRangeSelect name="defaultView" id="defaultView" defaultValue={defaults?.defaultView} />
        {state?.errors['defaultView']?.map(error => <FormError key={`defaultView-${error}`} error={error} />)}
        <SubmitButton>
            Update Settings
        </SubmitButton>
    </form>
    
}


