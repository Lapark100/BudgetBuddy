import Trend from "@/components/trend"
import { createClient } from "@/lib/supabase/server"

export default async function TrendList ({type, range}) {
    const supabase = createClient()
    let { data, error } = await supabase
    .rpc('calculate_total', {
      range_arg : range,
      type_arg : type
    })

if(error) throw error

const amount = data[0]





return (<Trend  type={type} amount={amount.current_amount} prevAmount={amount.prevAmount}/>

)
}