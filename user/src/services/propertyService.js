import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const propertyService = {
  // Fetch all properties from Firestore
  getAllProperties: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      return querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
    }
  },

  // Fetch a single property by ID
  getPropertyById: async (id) => {
    try {
      const docRef = doc(db, 'properties', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { _id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Property not found");
      }
    } catch (error) {
      console.error("Error fetching property:", error);
      throw error;
    }
  }
};
