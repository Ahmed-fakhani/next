"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {  useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";


export  function ActiveToggleDropdownItem({id,IsAvailableForPurchase}: {id: string, IsAvailableForPurchase: boolean}){
const[isPending, startTransition] = useTransition()
return (
    <DropdownMenuItem 
    disabled={isPending}
    onClick={() =>{
        startTransition(async() => {
            await toggleProductAvailability(id, !IsAvailableForPurchase)
        })
    }}
    >
    {IsAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
)
}

export function DeleteDropdownItem({id, disabled} : {id: string, disabled: boolean}){
    const[isPending, startTransition] = useTransition()
    return (
        <DropdownMenuItem 
        disabled={isPending || disabled}
        onClick={() =>{
            startTransition(async() => {
                await deleteProduct(id)
            })
        }}
        >
        Delete
        </DropdownMenuItem>
    )
}