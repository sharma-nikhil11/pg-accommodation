"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import type { HeaderProps } from "@/types/header"

export function Header({ isScrolled, activeSection, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "rooms", label: "Rooms & Pricing" },
    { id: "amenities", label: "Amenities" },
    { id: "about", label: "About Us" },
    { id: "refer", label: "Refer & Earn" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Home className="h-6 w-6 text-primary absolute" />
          </div>
          <span className="text-xl font-bold">aashraya co-living</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                activeSection === item.id ? "text-primary" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
          <ThemeToggle />
          <Button onClick={() => scrollToSection("booking")} className="rounded-full">
            Book Now
          </Button>
        </nav>

        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={() => scrollToSection("booking")} className="rounded-full">
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

