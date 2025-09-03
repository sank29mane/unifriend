import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, password, role } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Email, password, first name, and last name are required" },
        { status: 400 }
      );
    }

    if (role && !Object.values(Role).includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check if email already exists (this ensures one email = one account)
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const fullName = `${firstName} ${lastName}`;

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        name: fullName, // For backward compatibility
        password: hashedPassword,
        role: role || Role.STUDENT,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    // A more specific error type would be better here, but this is a start
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

