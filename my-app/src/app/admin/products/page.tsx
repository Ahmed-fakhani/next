import { Button } from "@/components/ui/button"
import PageHeader from "../_components/pageHeader"
import Link from "next/link"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"

export default function AdminProductsPage() {
    return (
        <> 
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Products</PageHeader>
            <Button asChild>
                <Link href="/admin/products/new"> Add Product</Link>

            </Button>
            

        </div>
        <ProductTable/>
        
        </>
    )
}

async function ProductTable(){
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            IsAvailableForPurchase: false,
            _count: { select: {orders: true}}   
        },
        orderBy: {name: "asc"}
    })
    console.log(products)

    if (products.length === 0) return <p>No Products found.</p>
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only"> Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only"> Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody></TableBody>
        </Table>
    )
}