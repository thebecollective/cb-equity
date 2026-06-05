"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type BrandSettings = {
  primaryColor: string
  secondaryColor: string
  logoUrl: string
  firmName: string
  isWhiteLabeled: boolean
}

const BrandContext = createContext<{
  brand: BrandSettings
  updateBrand: (settings: Partial<BrandSettings>) => void
}>({
  brand: {
    primaryColor: '#1e3a5f', // Default Navy
    secondaryColor: '#c9a84c', // Default Gold
    logoUrl: '/logo.png',
    firmName: 'CB Equity',
    isWhiteLabeled: false,
  },
  updateBrand: () => {},
})

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  const [brand, setBrand] = useState<BrandSettings>({
    primaryColor: '#1e3a5f',
    secondaryColor: '#c9a84c',
    logoUrl: '/logo.png',
    firmName: 'CB Equity',
    isWhiteLabeled: false,
  })

  const updateBrand = (settings: Partial<BrandSettings>) => {
    setBrand(prev => ({ ...prev, ...settings }))
  }

  return (
    <BrandContext.Provider value={{ brand, updateBrand }}>
      <div style={{ 
        '--primary-color': brand.primaryColor, 
        '--secondary-color': brand.secondaryColor 
      } as React.CSSProperties}>
        {children}
      </div>
    </BrandContext.Provider>
  )
}

export const useBrand = () => useContext(BrandContext)
