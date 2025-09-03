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

    const { document, fileName } = await request.json();

    if (!document || !fileName) {
      return NextResponse.json(
        { error: "Document and filename are required" },
        { status: 400 }
      );
    }

    // Validate file type from base64 header
    const allowedTypes = [
      'data:application/pdf',
      'data:image/jpeg',
      'data:image/png',
      'data:image/jpg',
      'data:application/msword',
      'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const isValidType = allowedTypes.some(type => document.startsWith(type));
    if (!isValidType) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload PDF, image, or Word document" },
        { status: 400 }
      );
    }

    // Update user with verification document and set status to pending
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        verificationDocument: document, // Store base64 document
        verificationMethod: 'DOCUMENT_UPLOAD',
        studentStatus: 'PENDING',
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

    // In a real application, you might:
    // 1. Upload the document to a secure file storage service (S3, etc.)
    // 2. Notify administrators for manual review
    // 3. Use OCR or document verification services for automated processing
    
    console.log(`Document verification submitted for user ${decoded.userId}: ${fileName}`);
    
    return NextResponse.json({ 
      user: updatedUser,
      message: "Document uploaded successfully! We will review it within 24-48 hours."
    });
  } catch (error) {
    console.error("Document verification error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
