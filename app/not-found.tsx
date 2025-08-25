import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center mx-auto">
          <span className="text-4xl font-bold text-white">404</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-amber-500">
          Page Not Found
        </h1>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Button
          asChild
          className="rounded-full bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90"
        >
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" /> Return Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

