import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallBack from "./components/transaction-list-fallback";
import TrendList from "./components/trend-list";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { variants, sizes } from "@/lib/variant";
import { ErrorBoundary } from "react-error-boundary";
import { types } from "@/lib/const";
import Range from "./components/range";
import TransactionListWrapper from "./components/transaction-list-wrapper";
import { createClient } from "@/lib/supabase/server";

export default async function Page({ searchParams }) {

    const supabase = createClient()

    const { data: {user} } = await supabase.auth.getUser()
  
    const range = searchParams?.range ?? user.user_metadata.defaultView ?? 'last30days'



    



    return (<div className="space-y-8">

        <section className="flex justify-between">
            <h1 className="text-4xl font-semibold">
                Summary
            </h1>

            <aside>
                <Range defaultView={user.user_metadata.defaultView} />
            </aside>


        </section>

        <section className=" grid grid-cols-2 lg:grid-cols-4 gap-8 ">

            {types.map(type => <ErrorBoundary key={type} fallback={<div className="text-red-500">Cannot fetch {type} trend data</div>}>
                <Suspense fallback={<TrendFallback />}>
                    <TrendList type={type} range={range} />
                </Suspense>
            </ErrorBoundary>
            )}








        </section>

        <section className="flex justify-between items-center">
            <h2 className="text-2xl">Transactions</h2>
            <Link href="/dashboard/transaction/add" className={`${variants["outline"]} ${sizes['sm']} flex items-center space-x-1`}>
                <PlusCircle className="w-4 h-4" />
                <div>Add</div>
            </Link>
        </section>

        <Suspense fallback={<TransactionListFallBack />}>
            <TransactionListWrapper range={range} />
        </Suspense>
    </div>)
}