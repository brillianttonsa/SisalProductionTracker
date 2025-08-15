const LoadingSpinner = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-8 w-8",
  }

  return <div className={`loading-spinner ${sizeClasses[size]} ${className}`}></div>
}

export default LoadingSpinner
