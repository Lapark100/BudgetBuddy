'use client'
import Select from "@/components/select";
import Label from "@/components/label";
import Input from "@/components/input";
import { types, categories } from "@/lib/const";
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionSchema } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation"
import { createTransaction, updateTransaction } from "@/lib/actions";
import FormError from "@/components/form-error";

export default function TransactionForm({ initialData }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: zodResolver(transactionSchema),
        defaultValues: initialData ?? {
            created_at: new Date().toISOString().split('T')[0]
        }
    })

    const router = useRouter()

    const [isSaving, setIsSaving] = useState(false)
    const [lastError, setLastError] = useState()
    const type = watch("type")
    const editing = Boolean(initialData)

    const onSubmit = async (data) => {
        setIsSaving(true)
        try {
            if (editing) {
                await updateTransaction(initialData.id, data)
            } else {
                await createTransaction(data)
            }
            router.push('/dashboard')
        } catch (error) {
            setLastError(error?.message)
        } finally {
            setIsSaving(false)
        }
    }

    return <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label className="mb-2">Select Transaction Type</Label>
                <Select {...register("type", {
                    onChange: (e) => {
                        if (e.target.value != "Expense") {
                            setValue("category", "")
                        }
                    }
                })} >
                    {types.map(type => <option key={type}>{type}</option>)}
                </Select>
            </div>

            <div>
                <Label className="mb-2">Select Category Type</Label>
                <Select {...register("category")} disabled={type != 'Expense'} >
                    <option value='' >Select Category</option>
                    {categories.map(category => <option key={category}>{category}</option>)}
                </Select>
            </div>

            <div>
                <Label className="mb-1">Date</Label>
                <Input {...register("created_at")} disabled={editing}/>
                <FormError error={errors.created_at?.message} />
            </div>

            <div>
                <Label className="mb-1">Amount</Label>
                <Input type="number" {...register("amount")} />
                <FormError error={errors.amount?.message} />
            </div>

            <div className="col-span-2">
                <Label className="mb-1">Description</Label>
                <Input type="text"  {...register("description")} />
                <FormError error={errors.description?.message} />
            </div>

          
        </div>
        <div className="flex justify-between items-center">
            <div>{lastError && <FormError error={lastError} />}</div>
            <Button type="submit" disabled={isSaving} >Save</Button>
        </div>
    </form>
}