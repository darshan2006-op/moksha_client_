import { isNullOrUndefined } from '@arpansaha13/utils'
import { memo } from 'react'
import Picture from './Picture'
import type { Image } from '~/types'

interface SafePictureProps {
  picture: Image | null | undefined
  alt: string
  className?: string
  fallbackText?: string
}

/**
 * A wrapper around the Picture component that safely handles null or undefined images
 */
const SafePicture = memo(
  ({ picture, alt, className = 'w-full h-full bg-amber-900/50', fallbackText = 'No Image' }: SafePictureProps) => {
    if (isNullOrUndefined(picture)) {
      return (
        <div className={`flex items-center justify-center text-amber-500 ${className}`}>
          {fallbackText}
        </div>
      )
    }

    return <Picture picture={picture} alt={alt} />
  }
)

export default SafePicture
