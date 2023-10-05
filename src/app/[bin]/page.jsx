'use client'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Bin({ params }) {    
    const pathname = usePathname();
    const searchParams = useSearchParams();
    return (<h1>{pathname} === {searchParams}</h1>)
}