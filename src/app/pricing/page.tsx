import { PricingTable } from '@clerk/nextjs'

export default function PricingPage() {
    return (
        <div className="mt-40">
            <h1 className="font-bold text-primary/80 text-3xl text-center my-5">AI-TRIP PLANNER {""}<strong className='text-black'>-</strong>{""} SELECT YOUR PLAN</h1>
            <div style={{ maxWidth: '400px', margin: '0 auto', padding: '0 1rem' }}>
                <PricingTable />
            </div>
        </div>
    )
}