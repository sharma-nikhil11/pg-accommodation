import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json()

    // Log the received data for debugging
    console.log("Received form data:", data)

    // Validate required fields
    if (!data.name || !data.phone || !data.email) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Add timestamp
    const submissionData = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "pg_accommodation")

    // Insert the data into the 'bookings' collection
    const result = await db.collection("bookings").insertOne(submissionData)

    if (result.acknowledged) {
      console.log(`Booking saved to MongoDB with ID: ${result.insertedId}`)

      // Send success response
      return NextResponse.json({
        success: true,
        message: "Booking request received and saved to MongoDB",
        id: result.insertedId,
      })
    } else {
      throw new Error("Failed to insert document into MongoDB")
    }
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json({ success: false, message: "Failed to process your request" }, { status: 500 })
  }
}

