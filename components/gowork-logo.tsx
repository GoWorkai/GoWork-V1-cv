import Image from "next/image"

interface GoWorkLogoProps {
  size?: number
  className?: string
  showText?: boolean
}

export function GoWorkLogo({ size = 40, className = "", showText = true }: GoWorkLogoProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <Image
          src="/images/gowork-logo.png"
          alt="GoWork Logo"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </div>

      {showText && (
        <span className="text-2xl font-bold" style={{ fontFamily: "NovaSquare, sans-serif" }}>
          <span className="text-blue-600">Go</span>
          <span className="text-gray-900">Work</span>
        </span>
      )}
    </div>
  )
}

export function GoWorkIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Image
        src="/images/gowork-logo.png"
        alt="GoWork"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  )
}

export function GoWorkHeroLogo({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Image
        src="/images/gowork-logo.png"
        alt="GoWork Hero Logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  )
}
