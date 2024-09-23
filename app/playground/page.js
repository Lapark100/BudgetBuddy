import Button from "@/components/button";
import Label from "@/components/label";
import PageHeader from "@/components/page-header";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import Trend from "@/components/trend";
import Input from "@/components/input";
import Select from "@/components/select";
import Separator from "@/components/separator";
import Skeleton from "@/components/skeleton";

export const metadata = {
    title: "Playground"
}

export default function Page () {
return (
<main className="space-y-8 mb-44">

   <h1 className="text-4xl mt-8">Playground</h1> 

    <div>
        <h2 className="mb-4 text-lg font-mono ">PageHeader</h2>
    </div>
    <Separator />
    <div><PageHeader/></div>

    <div>
        <h2 className="mb-4 text-lg font-mono ">Trend</h2>
    </div>
    <Separator />
    <div className="flex space-x-8">
        <Trend type='Income' amount={5000} prevAmount={1000}/>
        <Trend type='Expense' amount={2000} prevAmount={10000}/>
        <Trend type='Investment' amount={9000} prevAmount={4000}/>
        <Trend type='Saving' amount={5660} prevAmount={2000}/>
        </div>

        <div>
        <h2 className="mb-4 text-lg font-mono ">Transaction Items</h2>
    </div>
    
    <div className="py-4">
        <TransactionItem type="Income" description="Salary" category="Income" amount={2000}/>
        <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29}/>
        <TransactionItem type="Saving" description="For children" amount={500}/>
        <TransactionItem type="Investment" description="In Microsoft" amount={9000}/>
    </div>

    <div>
        <h2 className="mb-4 text-lg font-mono ">TransactionSummaryItem + TransactionItems</h2>
    </div>
    
    <div className="py-4">
        <TransactionSummaryItem date="2024-05-01" amount={3500}/>
        <Separator />
        <TransactionItem type="Income" description="Salary" category="Income" amount={2000}/>
        <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29}/>
        <TransactionItem type="Saving" description="For children" amount={500}/>
        <TransactionItem type="Investment" description="In Microsoft" amount={9000}/>
    </div>

    <div>
        <h2 className="mb-4 text-lg font-mono ">Buttons</h2>
        <Separator />

        <div className="space-x-4">
       <Button>Hello</Button>
       <Button variant="outliine">Hello</Button>
       <Button variant="ghost">Hello</Button>

       <Button size="xs">Hello</Button>
       <Button size="sm">Hello</Button>
       <Button size="large">Hello</Button>

        </div>
    </div>

    <div>
        <h2 className="mb-4 text-lg font-mono ">Forms</h2>
        <Separator />

        <div className="grid grid-cols-2 gap-4">
      <div>
        
        <Label className='mb-1'>Full Name</Label>
        <Input type='text' placeholder='Full Name'/>
      </div>

      <div>
        
        <Label>City</Label>
        <Select>
        <option>Nigeria</option>
        <option>Berlin</option>
        <option>London</option>
        </Select>
        
        
      </div>

      <div className="flex items-center">
        
      
      <Input type='checkbox' id='terms' />
      <Label className="ml-2" htmlFor="accept">Accept terms</Label>
      </div>


   

        </div>
    </div>

    <div>
        <h2 className="mb-4 text-lg font-mono ">Loading Skeleton</h2>
        <Separator />

        <div className="space-y-8">

        <div className="flex space-x-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        </div>

        <div className="space-y-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        </div>

        </div>

      
    </div>

</main>)
}