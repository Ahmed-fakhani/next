"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { addProduct } from "../../_actions/products"

export function ProductForm(){
    const [priceInCents, setPriceInCents] = useState<number>()
    
    return (
    <form className="space-y-8" action={async (formData) => {
        await addProduct(formData)}}>
        <div className="space-y-2">
            <Label htmlFor="name">Name </Label>
            <Input type="text" id="name" name="name" required></Input>
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInCents">Price In Cents </Label>
            <Input type="number" id="priceInCents" name="priceInCents" required value={priceInCents ?? ""}
            onChange={e => setPriceInCents(Number(e.target.value) || undefined)}></Input>
        </div>
        <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0)/ 100)}
            
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description </Label>
            <Textarea  id="description" name="description" required></Textarea>
        </div>
        <div className="space-y-2">
            <Label htmlFor="file">File </Label>
            <Input type="file" id="file" name="file" required></Input>
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image </Label>
            <Input type="file" id="image" name="image" required></Input>
        </div>
        <Button type="submit">Save</Button>
    </form>
    )
}
