import { db } from "@/app/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "portfolio"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Response.json(data);
  } catch (error) {
    console.error("❌ Error fetching portfolio:", error);
    return new Response("Failed to fetch portfolio", { status: 500 });
  }
}
