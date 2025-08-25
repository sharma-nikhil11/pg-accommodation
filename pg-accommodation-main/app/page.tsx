"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast, Toaster } from "sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Home,
  Phone,
  Mail,
  Calendar,
  User,
  Menu,
  X,
  Coffee,
  Wifi,
  Tv,
  ShowerHead,
  Utensils,
  MapPin,
  Sun,
  Moon,
  ChevronDown,
  Star,
  Check,
  Gift,
  Share2,
  Copy,
  ThumbsUp,
  ArrowRight,
  Heart,
  Shield,
  Clock,
  Sparkles,
  Microwave,
  RefrigeratorIcon
} from "lucide-react"
import { useTheme } from "next-themes"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const hero = ["images/hero/hero_1.jpg","images/hero/hero_2.jpg","images/hero/hero_3.jpg"]

export default function PGAccommodation() {
  const { resolvedTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [referralCode, setReferralCode] = useState("AASHRAYA25")
  const [referralCopied, setReferralCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRefs = useRef<{
    home: HTMLElement | null
    rooms: HTMLElement | null
    amenities: HTMLElement | null
    about: HTMLElement | null
    contact: HTMLElement | null
    refer: HTMLElement | null
    booking: HTMLElement | null
  }>({
    home: null,
    rooms: null,
    amenities: null,
    about: null,
    contact: null,
    refer: null,
    booking: null,
  })
  const { scrollYProgress } = useScroll()
  const scrollProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const handleScroll = () => {
      // Update header background
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section based on scroll position
      const sections = ["home", "rooms", "amenities", "about", "refer", "contact", "booking"]
      for (const section of sections) {
        const element = sectionRefs.current[section as keyof typeof sectionRefs.current]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: keyof typeof sectionRefs.current) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      try {
        const headerOffset = 80 // Height of the fixed header
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      } catch (error) {
        console.error("Error scrolling to section:", error)
        // Fallback to basic scroll
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setMobileMenuOpen(false)
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setReferralCopied(true)
    toast.success("Referral code copied!", {
      description: "Share this code with your friends to earn rewards.",
    })
    setTimeout(() => setReferralCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get form data
    const formData = new FormData(e.currentTarget)
    const formValues = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      occupation: formData.get("occupation"),
      roomType: formData.get("room-type"),
      moveInDate: formData.get("move-in-date"),
      referralCode: formData.get("referral"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form")
      }

      if (result.success) {
        toast.success("Booking Request Submitted", {
          description: "We'll contact you shortly to confirm your booking.",
        })
        // Reset form using the form element from the event
        const form = e.target as HTMLFormElement
        form.reset()
      }
    } catch (error) {
      toast.error("Submission Error", {
        description: error instanceof Error ? error.message : "There was a problem submitting your request. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const roomTypes = [
    {
      id: "single",
      name: "Single Room",
      price: "",
      description: "Comfortable single occupancy room with all basic amenities for privacy and comfort.",
      features: ["Single Bed","Room-CLeaning","Fridge", "Study Table", "Wardrobe", "Attached Bathroom", "Daily Cleaning","Extra Storage", "Non-AC ₹24,000/month", "AC ₹26,000/month" ],
      image: "/images/hero/hero_3.jpg",
      popular: false,
    },
    {
      id: "double",
      name: "Double Sharing",
      // price: "₹12,500/month",
      refer :"1000 off",
      description: "Economical option with shared accommodation for two people, perfect for those who enjoy company.",
      features: ["Two Beds", "Study Tables","AC - ₹14000/month","Non-AC - ₹12,500/month", "Wardrobes", "Attached-Bathroom", "Extra Storage", "TV-Screen","Room-Cleaning"],
      image: "/images/placeholder/Double_Sharing.jpg",
      popular: true,
    },
    // {
    //   id: "doubleAC",
    //   name: "Double Sharing AC",
    //   price: "₹15,500/month",
    //   refer :"1000 off",
    //   description: "Economical option with shared accommodation for two people, perfect for those who enjoy company.",
    //   features: ["Two Beds", "Study Tables", "Wardrobes", "Shared Bathroom", "Extra Storage"],
    //   image: "/images/hero/hero_3.jpg",
    //   popular: false,
    // },
    {
      id: "triple",
      name: "Triple Sharing",
      price: "₹10,000/month",
      description: "Budget-friendly option with shared accommodation for three people, ideal for students and Proffesional's.",
      features: ["Three Beds", "Wardrobes", "Attached Bathroom", "Common Area", "AC", "Non-AC", "TV-Screen", "Extra-Storage Space"],
      image: "/images/placeholder/Three_Sharing.jpg",
      popular: true,
    },
    {
      id: "deluxe",
      name: "Guest Room",
      price: "",
      description: "Premium single occupancy room with enhanced amenities and comfort for those who want the best.",
      features: ["Queen Bed", "Study Table", "Wardrobe", "Private Bathroom", "AC - ₹1,800/Day", "Non - AC - ₹1,500/Day", "Premium Furniture"],
      image: "/placeholder.svg?height=300&width=500&text=Deluxe+Room",
      popular: false,
    },
  ]

  const amenities = [
    { icon: <Wifi className="h-6 w-6" />, name: "High-Speed WiFi" },
    { icon: <Utensils className="h-6 w-6" />, name: "Meals Included" },
    { icon: <ShowerHead className="h-6 w-6" />, name: "Water 24x7" },
    { icon: <Tv className="h-6 w-6" />, name: "TV Lounge" },
    { icon: <Coffee className="h-6 w-6" />, name: "Coffee/Tea Bar" },
    { icon: <Microwave className="h-6 w-6" />, name: "Microwave" },
    { icon: <MapPin className="h-6 w-6" />, name: "Prime Location" },
    { icon: <RefrigeratorIcon className="h-6 w-6" />, name: "Refrigerator" },
  ]

  // const testimonials = [
  //   {
  //     name: "Rajveer Singh",
  //     occupation: "Product Consultant",
  //     image: "images/testimonials/testimonials_4.jpeg",
  //     comment:
  //       "Moving to Aashraya co-living was the best decision I made. The amenities are top-notch, and the community is amazing!",
  //     stars: 5,
  //   },
  //   {
  //     name: "Priya Patel",
  //     occupation: "Marketing Executive",
  //     image: "/placeholder.svg?height=100&width=100&text=PP",
  //     comment: "I love the location and the vibrant community. It's more than just accommodation; it's a lifestyle.",
  //     stars: 4,
  //   },
  //   {
  //     name: "Aditya Singh",
  //     occupation: "College Student",
  //     image: "/placeholder.svg?height=100&width=100&text=AS",
  //     comment:
  //       "As a student, I needed an affordable place with good facilities. Aashraya exceeded my expectations in every way.",
  //     stars: 4,
  //   },
  // ]

  const faqItems = [
    // {
    //   question: "What is the minimum stay period?",
    //   answer:
    //     "The minimum stay period is 2 months for working professionals and 2 months for students. However, we do offer flexible options for shorter stays based on availability.",
    // },
    {
      question: "Are meals included in the rent?",
      answer:
        "Yes, breakfast, lunch and dinner are included in the rent for all room types. We serve nutritious, homestyle meals with variety throughout the week.",
    },
    {
      question: "What about security and safety?",
      answer:
        "We have 24x7  CCTV surveillance system to ensure the safety of all residents. We also have fire safety equipment installed throughout the property.",
    },
    {
      question: "How does the Refer and Earn program work?",
      answer:
        "When you refer a friend who books a stay with us for at least 1 months, both you and your friend receive a Cash Back of ₹1000. There's no limit to how many friends you can refer!",
    },
    {
      question: "What documents are required for booking?",
      answer:
        "We require a valid ID proof (Aadhar/PAN/Passport), address proof, recent passport-size photograph, and employment/student ID card. For students, we may also require a guardian's NOC.",
    },
  ]

  // const cities = ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai"]

  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Community Living",
      description: "Be part of a vibrant community of like-minded individuals",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safe & Secure",
      description: "24/7 security with CCTV surveillance and biometric access",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Prime Locations",
      description: "Conveniently located near business hubs and educational institutions",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hassle-Free Living",
      description: "All utilities and maintenance taken care of",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200 dark:bg-gray-800">
        <motion.div className="h-full bg-gradient-to-r from-primary to-amber-500" style={{ width: scrollProgress }} />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center">
              <Home className="h-6 w-6 text-white absolute" />
            </div>
            <span className="text-xl font-bold">aashrayahospitalities</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                activeSection === "home" ? "text-primary" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("rooms")}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                activeSection === "rooms" ? "text-primary" : ""
              }`}
            >
              Rooms & Pricing
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                activeSection === "amenities" ? "text-primary" : ""
              }`}
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                activeSection === "about" ? "text-primary" : ""
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("refer")}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                activeSection === "refer" ? "text-primary" : ""
              }`}
            >
              Refer & Earn
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                activeSection === "contact" ? "text-primary" : ""
              }`}
            >
              Contact
            </button>
            <ThemeToggle />
            <Button
              onClick={() => scrollToSection("booking")}
              className="rounded-full bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
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
              className="md:hidden bg-background/95 backdrop-blur-md border-b fixed top-[72px] left-0 right-0 overflow-y-auto max-h-[calc(100vh-72px)]"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("rooms")}
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Rooms & Pricing
                </button>
                <button
                  onClick={() => scrollToSection("amenities")}
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Amenities
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("refer")}
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Refer & Earn
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Contact
                </button>
                <Button
                  onClick={() => scrollToSection("booking")}
                  className="rounded-full bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90"
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          ref={(el) => {
            sectionRefs.current.home = el
          }}
          className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]"></div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-70 animate-pulse delay-1000"></div>

          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 mb-10 md:mb-0"
              >
                <Badge
                  variant="outline"
                  className="mb-4 text-primary border-primary py-1 px-4 bg-primary/5 backdrop-blur-sm"
                >
                  #1 Co-living Space
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                  Your Home Away From Home
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                  Experience comfortable, vibrant co-living spaces with all modern amenities in prime locations. Join
                  our community today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      const bookingSection = document.getElementById('booking');
                      if (bookingSection) {
                        const headerOffset = 80;
                        const elementPosition = bookingSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        // Close mobile menu if open
                        setMobileMenuOpen(false);
                        
                        // Smooth scroll to section
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 transition-all duration-300 shadow-md hover:shadow-lg px-6 py-3 text-base font-medium text-white"
                  >
                    Book Now <Calendar className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        const headerOffset = 80;
                        const elementPosition = contactSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        // Close mobile menu if open
                        setMobileMenuOpen(false);
                        
                        // Smooth scroll to section
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-all duration-300 px-6 py-3 text-base font-medium"
                  >
                    <Phone className="h-4 w-4" /> Contact Us
                  </Link>
                </div>

                <div className="mt-10 flex items-center space-x-5">
                  <div className="flex -space-x-2">
                    {[`/images/testimonials/testimonials_1.jpeg`, 
                    `/images/testimonials/testimonials_2.jpeg`, 
                    `/images/testimonials/testimonials_3.jpeg`, 
                    `/images/testimonials/testimonials_4.jpeg`].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-background overflow-hidden shadow-md"
                      >
                        <Image
                          src={`${i}`}
                          alt="User"
                          width={30}
                          height={30}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      From <span className="font-medium">300+</span> reviews
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:w-1/2 w-full"
              >
                <div className="relative w-full">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/50 to-amber-500/50 blur-xl opacity-70 animate-pulse"></div>
                  <Carousel className="w-full max-w-lg mx-auto">
                    <CarouselContent>
                      {hero.map((hero, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                              <Image
                                src={hero}
                                alt={`PG Accommodation ${index + 1}`}
                                width={600}
                                height={400}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">Happy Residents</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-primary">Madhapur</div>
                    <div className="text-sm text-muted-foreground">Locations</div>
                  </div>
                  {/* <div className="text-center p-3 rounded-lg bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-bold text-primary">Madhapur,Hyderabad</div>
                    <div className="text-sm text-muted-foreground">Locations</div>
                  </div> */}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="scroll-indicator hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 text-primary" />
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/50 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary/10"
                >
                  <div className="rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <div className="text-primary">{benefit.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cities Section
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-10"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                Nationwide Presence
              </Badge>
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                Available in Major Cities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find our co-living spaces in these prime locations across India
              </p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-10">
              {cities.map((city, index) => (
                <motion.div
                  key={city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Button
                    variant="outline"
                    className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {city}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Rooms & Pricing Section */}
        <section
          id="rooms"
          ref={(el) => {
            sectionRefs.current.rooms = el
          }}
          className="py-20 bg-muted/50 dark:bg-muted/10 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-70"></div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                Premium Living
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                Rooms & Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our variety of comfortable room options to suit your needs and budget.
              </p>
            </motion.div>

            <Tabs defaultValue="single" className="w-full ">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                {roomTypes.map((room) => (
                  <TabsTrigger key={room.id} value={room.id} className="relative">
                    {room.name}
                    {room.popular && (
                      <span className="absolute -top-2 -right-2">
                        <Badge
                          variant="outline"
                          className="bg-gradient-to-r from-primary to-amber-500 text-white border-0 text-xs shadow-sm"
                        >
                          Popular
                        </Badge>
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              {roomTypes.map((room) => (
                <TabsContent key={room.id} value={room.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-8 items-center"
                  >
                    <div className="relative overflow-hidden rounded-xl group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src={room.image || "/placeholder.svg"}
                        alt={room.name}
                        width={500}
                        height={300}
                        className="rounded-xl shadow-lg w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {room.popular && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-primary to-amber-500 shadow-md">Most Popular</Badge>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold">{room.name}</h3>
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                          {room.price}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground">{room.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Features:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {room.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-1">
                                <Check className="h-4 w-4 text-primary" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => scrollToSection("booking")}
                          className="rounded-full bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Book This Room
                        </Button>
                        {/* <Button
                          variant="outline"
                          className="rounded-full border-primary text-primary hover:bg-primary/10"
                        >
                          View Details
                        </Button> */}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Amenities Section */}
        <section
          id="amenities"
          ref={(el) => {
            sectionRefs.current.amenities = el
          }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                Facilities
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                Our Amenities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide a range of amenities to make your stay comfortable and convenient.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            >
              {amenities.map((amenity, index) => (
                <motion.div key={index} variants={item} className="text-center group">
                  <div className="rounded-full bg-gradient-to-br from-primary/10 to-amber-500/10 w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:from-primary/20 group-hover:to-amber-500/20 shadow-sm group-hover:shadow-md">
                    <div className="text-primary">{amenity.icon}</div>
                  </div>
                  <h3 className="font-semibold">{amenity.name}</h3>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-background to-muted/50 dark:from-muted/20 dark:to-background p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-primary/10"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 text-primary mr-2" /> Included in Rent
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Electricity & Water Bills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>High-Speed WiFi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Housekeeping (Twice a week)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Breakfast & Dinner</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Common Area Maintenance</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-background to-muted/50 dark:from-muted/20 dark:to-background p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-primary/10"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" /> House Rules
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>No Smoking Inside Rooms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Visitors Allowed from 9 AM to 8 PM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Maintain Cleanliness</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Quiet Hours after 10 PM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>One Month Notice Before Vacating</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <section className="py-20 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-70"></div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                What Our Residents Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from people who have experienced living in our co-living spaces.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-primary/10"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-amber-500/50 blur-sm"></div>
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full relative border-2 border-background"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.occupation}</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground mb-4">"{testimonial.comment}"</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* About Us Section */}
        <section
          id="about"
          ref={(el) => {
            sectionRefs.current.about = el
          }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2"
              >
                <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                  Our Story
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                  About aashrayahospitalities
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Established in 2015, aashrayahospitalities has been providing quality accommodation to students and
                  working professionals. Our mission is to create a comfortable living environment that feels like home
                  while building a vibrant community.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  With multiple properties across major cities, we offer convenient locations close to educational
                  institutions and business hubs. Our dedicated staff ensures that all your needs are met promptly.
                </p>
                <div className="space-y-4 bg-gradient-to-br from-background to-muted/50 dark:from-muted/20 dark:to-background p-6 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 w-12 h-12 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Vunnam Rajasekhar</h3>
                      <p className="text-sm text-muted-foreground">Owner</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "Our goal is to provide not just a place to stay, but a home where you can thrive and make
                    lasting connections. We believe in creating spaces that nurture personal growth and social
                    interaction."
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                    <Image
                      src="images/placeholder/Aashray_2.png"
                      alt="PG Building"
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                    <Image
                      src="/images/placeholder/_DSC6100.jpg"
                      alt="Common Area"
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                    <Image
                      src="images/placeholder/Aashray_5.png"
                      alt="Dining Area"
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                    <Image
                      src="images/placeholder/Aashray_6.png"
                      alt="Our Staff"
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Refer and Earn Section */}
        <section
          id="refer"
          ref={(el) => {
            sectionRefs.current.refer = el
          }}
          className="py-12 md:py-20 bg-muted/50 dark:bg-muted/10 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-70"></div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-16"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                Rewards
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                Refer & Earn
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Refer your friends to aashrayahospitalities and both of you get rewarded with exciting discounts!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/50 to-amber-500/50 blur-xl opacity-70 animate-pulse"></div>
                  <Card className="relative overflow-hidden border-primary/10">
                    <CardContent className="p-4 md:p-8">
                      <div className="absolute -right-10 -top-10 bg-gradient-to-br from-primary/10 to-amber-500/10 w-40 h-40 rounded-full"></div>
                      <div className="absolute -left-10 -bottom-10 bg-gradient-to-br from-primary/10 to-amber-500/10 w-40 h-40 rounded-full"></div>

                      <div className="relative">
                        <div className="flex items-center justify-center mb-4 md:mb-6">
                          <Gift className="h-8 w-8 md:h-12 md:w-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                          How It Works
                        </h3>

                        <ol className="space-y-3 md:space-y-4">
                          <li className="flex items-start gap-3 md:gap-4">
                            <div className="rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="font-bold text-primary text-sm md:text-base">1</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-base md:text-lg">Share Your Referral Code</h4>
                              <p className="text-muted-foreground text-sm md:text-base">
                                Share your unique referral code with friends who are looking for accommodation.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3 md:gap-4">
                            <div className="rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="font-bold text-primary text-sm md:text-base">2</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-base md:text-lg">Friend Books a Stay</h4>
                              <p className="text-muted-foreground text-sm md:text-base">
                                When your friend books a stay with us for at least 1 months using Our code.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3 md:gap-4">
                            <div className="rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="font-bold text-primary text-sm md:text-base">3</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-base md:text-lg">Both Get Rewarded</h4>
                              <p className="text-muted-foreground text-sm md:text-base">
                                Both you and your friend receive ₹1,000 Cash-Back!!
                              </p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-primary/10 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                      Your Referral Code
                    </h3>
                    <div className="bg-gradient-to-br from-background to-muted/50 dark:from-muted/20 dark:to-background p-4 md:p-6 rounded-lg flex items-center justify-between mb-4 md:mb-6 border border-primary/10">
                      <span className="text-lg md:text-xl font-bold tracking-wider">{referralCode}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyReferralCode}
                        className="rounded-full hover:bg-primary/10"
                      >
                        {referralCopied ? (
                          <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        )}
                      </Button>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        {/* <Share2 className="h-5 w-5 md:h-6 md:w-6 text-primary" /> */}
                        {/* <div>
                          <h4 className="font-bold text-base md:text-lg">Share via</h4>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 text-xs md:text-sm"
                            >
                              <svg className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                              Facebook
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 text-xs md:text-sm"
                            >
                              <svg className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                              </svg>
                              Twitter
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 text-xs md:text-sm"
                            >
                              <svg className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                              LinkedIn
                            </Button>
                          </div>
                        </div> */}
                      </div>

                      <div className="bg-gradient-to-br from-background to-muted/50 dark:from-muted/20 dark:to-background p-3 md:p-4 rounded-lg border border-primary/10">
                        <h4 className="font-bold flex items-center gap-2 mb-2 text-base md:text-lg">
                          <ThumbsUp className="h-4 w-4 text-primary" /> Referral Benefits
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Check className="h-3 w-3 md:h-4 md:w-4 text-primary mt-1" />
                            <span className="text-xs md:text-sm">
                              Get ₹1000 off on a month's rent for every successful referral
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-3 w-3 md:h-4 md:w-4 text-primary mt-1" />
                            <span className="text-xs md:text-sm">No limit on the number of referrals</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-3 w-3 md:h-4 md:w-4 text-primary mt-1" />
                            <span className="text-xs md:text-sm">
                              Your friend also gets ₹1,000 off on their first month's rent
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to the most common questions about our co-living spaces.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/10">
                    <AccordionTrigger className="text-left font-medium hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-10 text-center">
                <p className="text-muted-foreground mb-4">Still have questions?</p>
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/10 gap-2"
                >
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section
          id="booking"
          ref={(el) => {
            sectionRefs.current.booking = el
          }}
          className="py-20 bg-muted/50 dark:bg-muted/10 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-70"></div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                Booking
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                Book Your Stay
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below to book your accommodation or schedule a visit.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Card className="border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-amber-500/5 pointer-events-none"></div>
                <CardContent className="p-4 sm:p-6 relative">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          required
                          className="w-full rounded-lg border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Your phone number"
                          required
                          className="rounded-lg border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          required
                          className="rounded-lg border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="occupation" className="text-sm font-medium">
                          Occupation
                        </label>
                        <Input
                          id="occupation"
                          name="occupation"
                          placeholder="Student/Professional"
                          required
                          className="rounded-lg border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="room-type" className="text-sm font-medium">
                          Room Type
                        </label>
                        <select
                          id="room-type"
                          name="room-type"
                          className="flex h-10 w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">Select Room Type</option>
                          <option value="single">Single Room</option>
                          <option value="double">Double Sharing</option>
                          <option value="triple">Triple Sharing</option>
                          <option value="deluxe">Deluxe Room</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="move-in-date" className="text-sm font-medium">
                          Expected Move-in Date
                        </label>
                        <Input
                          id="move-in-date"
                          name="move-in-date"
                          type="date"
                          required
                          className="rounded-lg border-primary/20 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="referral" className="text-sm font-medium">
                        Referral Code (Optional)
                      </label>
                      <Input
                        id="referral"
                        name="referral"
                        placeholder="Enter referral code if you have one"
                        className="rounded-lg border-primary/20 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Additional Requirements
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Any specific requirements or questions"
                        className="min-h-[120px] rounded-lg border-primary/20 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 transition-all duration-300 shadow-md hover:shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Submitting...
                        </div>
                      ) : (
                        "Book Now"
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our{" "}
                      <Link href="#" className="underline underline-offset-2 text-primary hover:text-primary/80">
                        Terms & Conditions
                      </Link>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={(el) => {
            sectionRefs.current.contact = el
          }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5">
                Get in Touch
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                Contact Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions? Reach out to us through any of these channels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center bg-gradient-to-br from-background to-muted/50 dark:from-muted/20 dark:to-background p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary/10"
              >
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-muted-foreground">+91 7306730666</p>
                <p className="text-muted-foreground">+91 9948067966</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center bg-gradient-to-br from-background to-muted/50 dark:from-muted/20 dark:to-background p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary/10"
              >
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground">aashrayamenspg@gmail.com</p>
                {/* <p className="text-muted-foreground">bookings@aashraya.co</p> */}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center bg-gradient-to-br from-background to-muted/50 dark:from-muted/20 dark:to-background p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary/10"
              >
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p className="text-muted-foreground">H.No: 1-98/9/3/74/2,</p>
                <p className="text-muted-foreground">R.L Residency Jai Hind enclave,</p>
                <p className="text-muted-foreground">Opp 4 Seasons indoor swimming pool</p>
              </motion.div>
            </div>

            <div className="mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-xl shadow-lg p-6 overflow-hidden relative border border-primary/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-amber-500/5 pointer-events-none"></div>
                <div className="aspect-[20/9] w-full rounded-lg overflow-hidden mb-6 shadow-md">
                  <Image
                    src="images\placeholder\Aashray_1.png"
                    alt="Map Location"
                    width={400}
                    height={50}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                  <p className="text-muted-foreground mb-4">
                    We're conveniently located near the city center, just a 5-minute walk from the metro station.
                  </p>
                  <Button
                    variant="outline"
                    className="gap-2 rounded-full border-primary text-primary hover:bg-primary/10"
                  >
                    <MapPin className="h-4 w-4" /> Get Directions
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WhatsApp Section */}
        <section className="py-12 bg-gradient-to-r from-primary/10 to-amber-500/10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
                Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Chat with us on WhatsApp for quick responses to your queries.
              </p>
              <Button className="gap-2 bg-green-600 hover:bg-green-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-12 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center">
                  <Home className="h-4 w-4 text-white absolute" />
                </div>
                <span className="text-xl font-bold">aashrayahospitalities</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Providing comfortable and affordable PG accommodation since 2015.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("rooms")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Rooms & Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("amenities")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Amenities
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("refer")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Refer & Earn
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Locations</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">H.No: 1-98/9/3/74/2, </li>
                <li className="text-sm text-muted-foreground">R.L Residency Jai Hind enclave,</li>
                <li className="text-sm text-muted-foreground">Opp 4 Seasons indoor swimming pool,</li>
                <li className="text-sm text-muted-foreground">Madhapur, Hyderabad</li>
                <li className="text-sm text-muted-foreground">Telangana 500081</li>
              </ul>
            </div>
            {/* <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="border-t border-primary/10 mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Aashraya Co-living. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Toast for notifications */}
      <Toaster />
    </div>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/10"
          >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle {resolvedTheme === "dark" ? "light" : "dark"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

