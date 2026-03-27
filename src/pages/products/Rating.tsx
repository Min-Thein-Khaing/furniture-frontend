import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
    rating?: number
    className?: string
}

const Rating = ({ rating = 0, className }: RatingProps) => {
    return (
        <div className={cn('flex items-center gap-1', className)}>
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        'size-4 transition-colors',
                        i < Math.floor(rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                    )}
                />
            ))}
            <span className='ml-1 text-sm font-bold text-gray-700'>{rating.toFixed(1)}</span>
        </div>
    )
}

export default Rating