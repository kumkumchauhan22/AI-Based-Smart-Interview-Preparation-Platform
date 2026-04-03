import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Example: create or return test user
  let user = await prisma.user.findUnique({ where: { email: "test@example.com" } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
      },
    });
  }

  return NextResponse.json({ user });
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({
    data: {
      name: body.name ?? "New User",
      email: body.email ?? `user-${Date.now()}@example.com`,
    },
  });
  return NextResponse.json({ user });
}
