import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import React from 'react'
import { useCartStore } from '@/store/useCartStore'


const CartItems = () => {
    const {items, updateQuantity, removeItem} = useCartStore();
  return (
    <ScrollArea className='flex-1 w-full min-h-0'>
                        <div className="space-y-6 px-6 ">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <img 
                                        src={item.image.path} 
                                        alt={item.name} 
                                        className="w-16 h-16 rounded-md object-cover bg-muted" 
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium leading-none truncate">{item.name}</h3>
                                        {/* <p className="text-sm text-muted-foreground mt-1">{item.category}</p> */}
                                        <p className="text-sm font-semibold mt-1">${item.price} <span> x </span>{item.quantity} = ${item.price * item.quantity}</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 border rounded-md p-1">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-7 w-7"
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            <Minus size={14} />
                                        </Button>
                                        <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-7 w-7"
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            <Plus size={14} />
                                        </Button>
                                    </div>
                                    
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
  )
}

export default CartItems