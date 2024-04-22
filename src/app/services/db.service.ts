import { Injectable } from '@angular/core';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { AuthService } from './auth.service';
import { snippet } from '../../models/snippet';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db?: any;
  constructor(private authService: AuthService) {
    this.db = getFirestore()
  }

  // async createSnippet(snippet: snippet) {
  //   try {
  //     const docRef = await addDoc(collection(this.db, "snippets"), {
  //       ...snippet,
  //       by: this.authService.uid
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //     alert('Error While Creating')
  //   }
  // }
  async createSnippet(snippet: snippet) {
    try {
      const uid = this.authService.getUid(); // Get the UID using getUid() method
      const docRef = await addDoc(collection(this.db, "snippets"), {
        ...snippet,
        by: uid // Use the UID as the value for the 'by' field
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Error While Creating')
    }
  }
  

  async getAllSnippet() {
    let result: any[] = []
    const querySnapshot = await getDocs(collection(this.db, "snippets"));
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() })
    });

    return result;
  }

  async getSnippetById(docId:string) {
    const docRef = doc(this.db, "snippets", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    }
     else {
      // docSnap.data() will be undefined in this case
      return {
        id: "",
        title: "not found",
        code: ""
      }
    }
  }
}
