import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDatabase();

  const eventBookings = await db
    .collection("eventBookings")
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  const railwayBookings = await db
    .collection("railwayBookings")
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ eventBookings, railwayBookings });
}
