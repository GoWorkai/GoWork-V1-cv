"use client"

export function VersionIndicator() {
  const buildTime = new Date().toISOString()

  return (
    <div className="fixed bottom-4 right-4 bg-primary text-secondary px-3 py-1 rounded-full text-xs font-mono z-50">
      v2.0 - Bento Grid - {buildTime.slice(0, 16)}
    </div>
  )
}
