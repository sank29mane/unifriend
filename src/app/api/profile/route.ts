import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

// GET - Get user profile
export async function GET() {
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

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
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
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// PUT - Update user profile
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

    const { firstName, lastName, bio, socialLinks, profilePhoto, university, country } = await request.json();

    // Validate social links format if provided
    if (socialLinks) {
      const validFields = ['linkedin', 'github', 'twitter', 'website'];
      const invalidFields = Object.keys(socialLinks).filter(
        field => !validFields.includes(field)
      );
      if (invalidFields.length > 0) {
        return NextResponse.json(
          { error: `Invalid social link fields: ${invalidFields.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Update computed name if firstName or lastName changed
    const computedName = (firstName && lastName) ? `${firstName} ${lastName}` : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(computedName && { name: computedName }),
        ...(bio !== undefined && { bio }),
        ...(socialLinks !== undefined && { socialLinks }),
        ...(profilePhoto !== undefined && { profilePhoto }),
        ...(university !== undefined && { university }),
        ...(country !== undefined && { country }),
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
    console.error("Update profile error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
