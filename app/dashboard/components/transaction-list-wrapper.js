import { fetchTransaction } from "@/lib/actions"
import TransactionList from "./transaction-list"

export default async function TransactionListWrapper ({range}) {
    const transactions = await fetchTransaction(range)
return <TransactionList transactions={transactions} key={range} range={range}/>
}