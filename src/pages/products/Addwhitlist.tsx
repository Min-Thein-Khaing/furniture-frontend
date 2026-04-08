import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { HeartIcon } from 'lucide-react'
import { useFetcher } from 'react-router'

interface FavouriteProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  productId: number,
  rating?: number,
  isFavorite: boolean
  className?: string

}

const Addwhitlist = ({ productId, rating, isFavorite, className, ...props }: FavouriteProp) => {
  const fetcher = useFetcher({ key: `product:${productId}` })

  const isPending = fetcher.state !== "idle"
  const optimisticValue = fetcher.formData?.get("favorite") === "true"
  const favorite = isPending && fetcher.formData ? optimisticValue : isFavorite

  return (
    <fetcher.Form method="post" action={`/products/${productId}`}>
      <Button
        type="submit"
        name="favorite"
        value={isFavorite ? "false" : "true"}
        title={favorite ? "Remove from wishlist" : "Add to wishlist"}
        variant="secondary"
        className={cn("active:scale-95 duration-300 hover:scale-110 p-2", className)}
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
    </fetcher.Form>
  )
}

export default Addwhitlist