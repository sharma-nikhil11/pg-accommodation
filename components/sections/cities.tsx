"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cities } from "@/data/cities"

export function Cities() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-16 bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold mb-6">Available in Major Cities</h2>
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
              <Button variant="ghost" className="rounded-full">
                {city}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

