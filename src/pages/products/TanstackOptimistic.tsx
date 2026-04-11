import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { HeartIcon } from 'lucide-react'
import { useIsFetching, useMutation } from '@tanstack/react-query'
import { api } from '@/api'
import queryClient from '@/api/query'
import { toast } from 'sonner'
 // QueryClient import မှန်ဖို့ လိုပါတယ်

interface FavouriteProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    productId: number,
    rating?: number,
    isFavorite: boolean
    className?: string
}

const Addwhitlist = ({ productId, rating, isFavorite, className, ...props }: FavouriteProp) => {
    const isFetching = useIsFetching() > 0
    let favorite = isFavorite
    

    // Browser မှာ အင်တာနက် ရှိ/မရှိ စစ်ဆေးခြင်း
    const isOffline = typeof window !== "undefined" && !navigator.onLine;

    const { isPending, mutate } = useMutation({
        mutationFn: async () => {
            const data = {
                productId: Number(productId),
                isFavorite: !isFavorite
            }
            // API path နဲ့ logic ကို check လုပ်ပါ
            const response = await api.patch(`/user/products/toggle`, data)
            
            if (response.status !== 200) {
                throw new Error("Failed to toggle favorite")
            }
            return response.data
        },
        // အရေးကြီးဆုံးအချက် - Offline ဖြစ်ရင် Pause မလုပ်ဘဲ Error တန်းပြခိုင်းခြင်း
        networkMode: 'always', 
        
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["products", "detail", productId] })
        },
    })

    // Loading ဖြစ်နေရင် ဒါမှမဟုတ် Fetching ဖြစ်နေရင် UI ကို Instant ပြောင်းပေးခြင်း
    if (isPending || isFetching) {
        favorite = !isFavorite
    }

    return (
        <Button
            // အင်တာနက်မရှိရင် သို့မဟုတ် အလုပ်လုပ်နေရင် ခလုတ်ကို နှိပ်လို့မရအောင် ပိတ်ထားမယ်
            title={favorite ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => {
                if (!isOffline) mutate();
            }}
            variant="secondary"
            className={cn(
                "active:scale-95 duration-300 hover:scale-110 p-2", 
                isOffline && "opacity-50 cursor-not-allowed", // Offline ဖြစ်ရင် ပုံစံပြောင်းမယ်
                className
            )}
            {...props}
        >
            <HeartIcon
                size="20"
                className={cn(
                    "transition-colors duration-300",
                    favorite ? "text-red-500 fill-red-500" : "text-red-400"
                )}
            />
        </Button>
    )
}

export default Addwhitlist