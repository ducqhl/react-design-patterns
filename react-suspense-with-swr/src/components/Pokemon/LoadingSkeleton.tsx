import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

interface LoadingSkeletonProps {
  width?: number
  height?: number
}

const LoadingSkeleton: FC<LoadingSkeletonProps> = ({
  width = 200,
  height = 200
}) => (
  <div>
    <Skeleton height={height} width={width} />
  </div>
)

export default LoadingSkeleton
