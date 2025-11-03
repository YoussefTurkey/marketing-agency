import { NextRequest, NextResponse } from "next/server";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "@/app/firebase/firebase";

const db = getFirestore(app);

export async function POST(request: NextRequest) {
  try {
    console.log("📥 Received request to add project");

    const projectData = await request.json();
    console.log("📋 Project data keys:", Object.keys(projectData));

    // Validate required fields
    if (!projectData.titleEn || !projectData.titleAr) {
      return NextResponse.json(
        { success: false, error: "Title in both languages is required" },
        { status: 400 }
      );
    }

    // Clean empty strings from arrays (with safe access)
    if (projectData.info?.servicesEn) {
      projectData.info.servicesEn = projectData.info.servicesEn.filter(
        (service: string) => service?.trim() !== ""
      );
    }
    if (projectData.info?.servicesAr) {
      projectData.info.servicesAr = projectData.info.servicesAr.filter(
        (service: string) => service?.trim() !== ""
      );
    }

    // Filter out empty process steps (with safe access)
    if (projectData.processEn) {
      projectData.processEn = projectData.processEn.filter(
        (step: { head: string; body: string }) =>
          step.head.trim() !== "" || step.body.trim() !== ""
      );
    }

    if (projectData.processAr) {
      projectData.processAr = projectData.processAr.filter(
        (step: { head: string; body: string }) =>
          step.head.trim() !== "" || step.body.trim() !== ""
      );
    }

    // Add timestamps
    projectData.createdAt = new Date();
    projectData.updatedAt = new Date();

    console.log("💾 Saving to Firestore...");

    const docRef = await addDoc(collection(db, "projects"), projectData);

    console.log("✅ Project saved with ID:", docRef.id);

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: "Project added successfully",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("❌ Error adding project:", error.message);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add project",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}