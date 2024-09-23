import { useFormatCurrency } from "@/hook/use-format-currency"
import { HandCoins, Landmark, Pencil, PiggyBank, Wallet } from "lucide-react"
import TransactionItemRemoveButton from "./trnsaction-item-remove-button"
import Link from "next/link"
import { variants, sizes } from "@/lib/variant"

export default function TransactionItem({
    id, type, category, description, amount, onRemoved
}) {

    const iconMap = {
        'Income': {
            icon: HandCoins,
            colors: 'text-green-500 dark:text-green-400'
        },

        'Expense': {
            icon: Wallet,
            colors: 'text-red-500 dark:text-red-400'
        },

        'Saving': {
            icon: PiggyBank,
            colors: 'text-indigo-500 dark:text-indigo-400'
        },

        'Investment': {
            icon: Landmark,
            colors: 'text-yellow-500 dark:text-yellow-400'
        },
    }

    const IconComponent = iconMap[type].icon
    const IconColors = iconMap[type].colors



    const formattedAmount = useFormatCurrency(amount)

    return (
        <div className="w-full flex items-center">

            <div className="flex items center mr-4 grow">
                <IconComponent className={`${IconColors} mr-2 w-4 h-4 hidden sm:block`} />
                <span> {description} </span>

            </div>
            <div className="min-w-[150px] items-center hidden md:flex">
                {category && <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">{category}</div>}
            </div>

            <div className="min-w-[70px] text-right">{formattedAmount}</div>

            <div className="min-w-[100px] flex justify-end">
                <Link href={`/dashboard/transaction/${id}/edit`} className={`${variants['ghost']} ${sizes['xs']} flex items-center`} >
                <Pencil className="w-4 h-4"/>
                </Link>
                <TransactionItemRemoveButton id={id} onRemoved={onRemoved} />
            </div>
        </div>

    )
}