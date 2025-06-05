import { type NextRequest, NextResponse } from "next/server"
import { checkPNRStatus } from "@/lib/indian-railway-api"

export async function GET(request: NextRequest, { params }: { params: { pnr: string } }) {
  try {
    const pnr = params.pnr

    if (!pnr || pnr.length !== 10) {
      return NextResponse.json({ error: "Invalid PNR number" }, { status: 400 })
    }

    const pnrStatus = await checkPNRStatus(pnr)

    if (!pnrStatus) {
      return NextResponse.json({ error: "PNR not found" }, { status: 404 })
    }

    return NextResponse.json(pnrStatus)
  } catch (error) {
    console.error("Error checking PNR status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
