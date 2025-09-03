import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    const { role } = await request.json();

    if (!role || !Object.values(Role).includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { 
        role: role as Role,
        // Reset student verification status if switching from helper back to student
        ...(role === 'STUDENT' && {
          studentStatus: 'UNVERIFIED',
          verificationMethod: null,
          universityEmail: null,
          isUniversityEmailVerified: false,
          verificationDocument: null,
        })
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        name: true,
        role: true,
        profilePhoto: true,
        bio: true,
        socialLinks: true,
        university: true,
        country: true,
        studentStatus: true,
        verificationMethod: true,
        universityEmail: true,
        isUniversityEmailVerified: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Change account type error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
