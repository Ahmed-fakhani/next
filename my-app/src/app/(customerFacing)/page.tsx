import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"


function getMostPopularProducts(){
    return db.product.findMany({
        where: {IsAvailableForPurchase: true },
        orderBy: {orders: {_count: "desc"}},
        take: 6
    })
}
function getNewstProducts(){
    return db.product.findMany({
        where: {IsAvailableForPurchase: true },
        orderBy: {createdAt: "desc"},
        take: 6
    })
}

export default function HomePage (){
    return <main className="space-y-12">
        <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProducts}/>
        <ProductGridSection title="Newest" productsFetcher={getNewstProducts}/>

    </main>
}

type ProductGridSectionProps = {
    title: string
    productsFetcher: () => Promise<Product[]>
}
function ProductGridSection({productsFetcher, title}: ProductGridSectionProps){
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-blod">{title}</h2>
                <Button variant="outline" asChild>
                    <Link href="/Products" className="space-x-2">
                       <span>View All</span>
                       <ArrowRight className="size-4"/>
                    </Link>
                </Button>

            </div>
        </div>
    )

}

