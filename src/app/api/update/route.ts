import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/firebase/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

// Define proper error type
interface FirebaseError extends Error {
  code?: string;
}

export async function PUT(request: NextRequest) {
  console.log("🏁 UPDATE API Route Called");

  try {
    const data = await request.json();
    console.log("📦 Received update data:", data);

    const { id, ...updateData } = data;

    if (!id) {
      console.log("❌ Missing project ID");
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    console.log("🔥 Attempting Firestore update for ID:", id);

    // Update the document in Firestore
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });

    console.log("✅ Project updated successfully");

    return NextResponse.json({
      success: true,
      message: "Project updated successfully"
    }, { status: 200 });

  } catch (error: unknown) {
    // Handle error properly without using 'any'
    console.error("💥 Error updating project:");
    
    if (error instanceof Error) {
      const firebaseError = error as FirebaseError;
      console.error({
        name: firebaseError.name,
        message: firebaseError.message,
        code: firebaseError.code,
        stack: firebaseError.stack
      });

      return NextResponse.json(
        { 
          success: false,
          error: "Failed to update project",
          details: firebaseError.message,
          code: firebaseError.code
        },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { 
          success: false,
          error: "Failed to update project",
          details: "An unknown error occurred"
        },
        { status: 500 }
      );
    }
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}