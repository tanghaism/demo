"use client"

import { useState, useRef, useEffect } from "react"

interface SwipeAction {
  label: string
  icon?: React.ReactNode
  color: "blue" | "red" | "gray"
  onClick: () => void
}

interface IOSSwipeableItemProps {
  children: React.ReactNode
  actions: SwipeAction[]
  onSwipeOpen?: () => void
  onSwipeClose?: () => void
}

const colorClasses = {
  blue: "bg-primary text-white",
  red: "bg-red-500 text-white",
  gray: "bg-muted-foreground text-white",
}

export function IOSSwipeableItem({
  children,
  actions,
  onSwipeOpen,
  onSwipeClose,
}: IOSSwipeableItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const currentXRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const actionWidth = 72
  const totalActionsWidth = actions.length * actionWidth

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
    currentXRef.current = translateX
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const diff = startXRef.current - e.touches[0].clientX
    let newTranslate = currentXRef.current + diff
    
    // Limit the swipe range
    newTranslate = Math.max(0, Math.min(newTranslate, totalActionsWidth + 20))
    
    setTranslateX(newTranslate)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    
    // Snap to open or closed position
    if (translateX > totalActionsWidth / 2) {
      setTranslateX(totalActionsWidth)
      setIsOpen(true)
      onSwipeOpen?.()
    } else {
      setTranslateX(0)
      setIsOpen(false)
      onSwipeClose?.()
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX
    currentXRef.current = translateX
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const diff = startXRef.current - e.clientX
    let newTranslate = currentXRef.current + diff
    
    newTranslate = Math.max(0, Math.min(newTranslate, totalActionsWidth + 20))
    
    setTranslateX(newTranslate)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    if (translateX > totalActionsWidth / 2) {
      setTranslateX(totalActionsWidth)
      setIsOpen(true)
      onSwipeOpen?.()
    } else {
      setTranslateX(0)
      setIsOpen(false)
      onSwipeClose?.()
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp()
    }
  }

  const closeSwipe = () => {
    setTranslateX(0)
    setIsOpen(false)
    onSwipeClose?.()
  }

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSwipe()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Action buttons behind */}
      <div className="absolute inset-y-0 right-0 flex">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => {
              action.onClick()
              closeSwipe()
            }}
            className={`flex flex-col items-center justify-center px-4 ${colorClasses[action.color]}`}
            style={{ width: actionWidth }}
          >
            {action.icon && <span className="mb-0.5">{action.icon}</span>}
            <span className="text-xs font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative bg-background"
        style={{
          transform: `translateX(-${translateX}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  )
}
