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
          className="object-contain mix-blend-multiply"
          priority
        />
      </div>

      {showText && (
        <span className="text-2xl font-bold text-white" style={{ fontFamily: "NovaSquare, sans-serif" }}>
          GoWork
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
        className="object-contain mix-blend-multiply"
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
        className="object-contain mix-blend-multiply"
        priority
      />
    </div>
  )
}
