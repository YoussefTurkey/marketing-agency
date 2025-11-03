import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/firebase';

const db = getFirestore(app);

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, 'projects', id));
    
    return NextResponse.json({ 
      success: true 
    });
    
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}