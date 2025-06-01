"use client"

import { useState } from "react"
import RealGoogleMap from "@/components/maps/real-google-map"
import LocationPermission from "@/components/maps/location-permission"

export default function RealMapPage() {
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null)

  if (hasLocationPermission === null) {
    return (
      <LocationPermission
        onPermissionGranted={() => setHasLocationPermission(true)}
        onPermissionDenied={() => setHasLocationPermission(false)}
      />
    )
  }

  return (
    <div className="h-screen">
      <RealGoogleMap />
    </div>
  )
}
