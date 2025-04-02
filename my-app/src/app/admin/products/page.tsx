import { Button } from "@/components/ui/button"
import PageHeader from "../_components/pageHeader"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react"
import { formatCurrency } from "@/lib/formatters"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductAction"

export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>
                <Button asChild>
                    <Link href="/admin/products/new"> Add Product</Link>

                </Button>


            </div>
            <ProductTable />

        </>
    )
}

async function ProductTable() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            IsAvailableForPurchase: true,
            _count: { select: { orders: true } }
        },
        orderBy: { name: "asc" }
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
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.IsAvailableForPurchase ?
                                <> <span className="sr-only">Avaliable</span><CheckCircle2 />
                                </> : <><span className="sr-only">Unavaliable</span><XCircle /></>}

                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                        <TableCell>{product._count.orders}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/download`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={product.id}
                                    IsAvailableForPurchase={product.IsAvailableForPurchase}
                                    />
                                    <DropdownMenuSeparator/>
                                    <DeleteDropdownItem 
                                    id= {product.id}
                                    disabled= {product._count.orders > 0}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}