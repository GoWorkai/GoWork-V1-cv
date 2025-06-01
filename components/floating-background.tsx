"use client"

import { useEffect, useState } from "react"

export function FloatingBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#007bff]/20 via-[#6610f2]/10 to-[#FFA500]/20" />

      {/* Animated Orbs */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-[#007bff]/30 to-[#0056b3]/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: "10%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-[#6610f2]/25 to-[#007bff]/15 rounded-full blur-3xl animate-pulse"
          style={{
            top: "60%",
            right: "15%",
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "1s",
          }}
        />

        <div
          className="absolute w-64 h-64 bg-gradient-to-br from-[#FFA500]/30 to-[#FF8C00]/20 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: "20%",
            left: "30%",
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "2s",
          }}
        />

        {/* Medium floating elements */}
        <div
          className="absolute w-48 h-48 bg-gradient-to-br from-[#007bff]/20 to-[#6610f2]/15 rounded-full blur-2xl"
          style={{
            top: "30%",
            right: "40%",
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            transition: "transform 0.2s ease-out",
          }}
        />

        <div
          className="absolute w-32 h-32 bg-gradient-to-br from-[#FFA500]/25 to-[#007bff]/20 rounded-full blur-2xl"
          style={{
            top: "70%",
            left: "60%",
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            transition: "transform 0.2s ease-out",
          }}
        />

        {/* Small floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translate(${mousePosition.x * (0.005 + Math.random() * 0.01)}px, ${mousePosition.y * (0.005 + Math.random() * 0.01)}px)`,
              transition: "transform 0.4s ease-out",
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#007bff]/10 to-transparent animate-pulse" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6610f2]/10 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  )
}
