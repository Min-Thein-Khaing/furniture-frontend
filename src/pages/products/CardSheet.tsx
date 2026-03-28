import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react'
import { cartItems as initialItems } from '@/data/images/carts' // Assuming this is your data
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from "@/components/ui/scroll-area" 
import CartItems from './CartItems'

const CardSheet = () => {
    // Note: For a real app, you'd use a Context or State to manage the cart
    const [items, setItems] = React.useState(initialItems)

    const updateQuantity = (id: string | number, delta: number) => {
        setItems(prev => prev.map(item => 
            item.id === id 
                ? { ...item, quantity: Math.min(100, Math.max(1, item.quantity + delta)) }
                : item
        ))
    }

    const removeItem = (id: string | number) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    return (
        <Sheet>
            <SheetTrigger asChild >
                <Button variant="outline" className='relative'>
                    <ShoppingCart size={20} />
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold'>
                        {items.length}
                    </span>
                </Button>
            </SheetTrigger>
            
            {/* 1. Added h-full and flex-col to keep footer at bottom */}
            <SheetContent className='flex flex-col  w-full sm:max-w-md p-0 gap-0' >
                <SheetHeader className='p-6 pb-4'>
                    <SheetTitle className='text-xl font-bold text-[#056152]'>
                        Cart - {items.length}
                    </SheetTitle>
                    <Separator className="mt-4" />
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                        <SheetDescription>Your cart is empty</SheetDescription>
                    </div>
                ) : (
                    /* 2. flex-1 and min-h-0 allow ScrollArea to take only the available middle space and scroll correctly */
                    <CartItems items={items} updateQuantity={updateQuantity} removeItem={removeItem} />
                )}

                {/* 3. Footer is pinned to the bottom because of flex-col on container */}
                <SheetFooter className='mt-auto border-t p-6 bg-white'>
                    <div className='flex flex-col w-full space-y-4'>
                        <div className='space-y-1.5'>
                            <div className='flex justify-between text-sm'>
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className='flex justify-between text-sm'>
                                <span className="text-muted-foreground">Tax</span>
                                <span className="font-medium">Calculated at checkout</span>
                            </div>
                            <Separator className="my-2" />
                            <div className='flex justify-between font-bold text-lg'>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button className='w-full bg-[#056152] hover:bg-[#044d41] py-6 text-base'>
                            Checkout
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default CardSheet