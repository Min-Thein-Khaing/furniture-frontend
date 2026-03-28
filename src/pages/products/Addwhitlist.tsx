import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { HeartIcon } from 'lucide-react'

interface FavouriteProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  productId: string,
  rating: number,
  isFavourite: boolean
  className?: string

}

const Addwhitlist = ({ productId, rating, isFavourite, className, ...props }: FavouriteProp) => {
  return (
    <div>
      <Button type="button"  variant={"secondary"} className={cn("bg-transparent active:scale-95 duration-300 hover:scale-110", className)} {...props}>
        <HeartIcon size="20" className={cn("", isFavourite ? "text-red-500" : "text-gray-500")} />
      </Button>
    </div>
  )
}

export default Addwhitlist