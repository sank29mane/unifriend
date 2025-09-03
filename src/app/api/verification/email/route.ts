import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: Request) {
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

    const { universityEmail } = await request.json();

    if (!universityEmail || !universityEmail.includes('.edu')) {
      return NextResponse.json(
        { error: "Please provide a valid .edu email address" },
        { status: 400 }
      );
    }

    // Check if university email is already used by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        universityEmail,
        id: { not: decoded.userId }
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This university email is already associated with another account" },
        { status: 409 }
      );
    }

    // Update user with university email and set status to pending
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        universityEmail,
        verificationMethod: 'UNIVERSITY_EMAIL',
        studentStatus: 'PENDING',
        isUniversityEmailVerified: false,
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

    // In a real application, you would send an actual verification email here
    // For now, we'll simulate the email verification process
    
    // TODO: Implement actual email sending with a service like SendGrid, Resend, or AWS SES
    // The email would contain a verification link with a token
    
    console.log(`Verification email would be sent to: ${universityEmail}`);
    
    return NextResponse.json({ 
      user: updatedUser,
      message: "Verification email sent! Please check your university email and click the verification link."
    });
  } catch (error) {
    console.error("Email verification error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
