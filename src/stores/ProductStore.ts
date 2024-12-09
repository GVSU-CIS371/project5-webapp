import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaMcfUDtg9-oeORyOWvLJeQof2Rz0Xif8",
  authDomain: "project5-6c7f0.firebaseapp.com",
  projectId: "project5-6c7f0",
  storageBucket: "project5-6c7f0.firebasestorage.app",
  messagingSenderId: "453167408815",
  appId: "1:453167408815:web:0c30858ef4dfd8d956d65a",
  measurementId: "G-MM4LPT3KYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
  }),

  actions: {
    
    async init() {
      const productsCollection = collection(db, "products");
    
      const snapshot = await getDocs(productsCollection);
    
      if (snapshot.empty) {
        for (const product of initProducts) {
          await setDoc(doc(productsCollection, product.id), product.data);
        }
        this.products = initProducts;
      } else {
        this.products = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data() as ProductDoc["data"],
        }));
      }
    },
    removeProduct(productToRemove: ProductDoc) {
      this.products = this.products.filter(product => product.data.name !== productToRemove.data.name);
    },

    filterByCategory(category: string) {
      return this.products.filter((product) => product.data.category === category);
    },

    filterByRating(minRating: number) {
      return this.products.filter((product) => product.data.rating >= minRating);
    },
  },
});
