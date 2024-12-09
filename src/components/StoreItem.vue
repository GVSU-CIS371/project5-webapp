<template>
  <v-card class="ma-4" outlined>
    <v-img :src="product.image" alt="Product Image" height="200"></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>{{ product.category }}</v-card-subtitle>
    <v-card-text>
      <div>{{ product.description }}</div>
      <div class="mt-3">
        <strong>Price:</strong> ${{ product.price.toFixed(2) }}
      </div>
      <div>
        <strong>Rating:</strong> {{ product.rating }} ⭐
      </div>
      <div>
        <strong>Stock:</strong> {{ product.stock }}
      </div>
    </v-card-text>

    <!-- Delete Button -->
    <v-btn color="red" @click="deleteProduct">Delete</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { Product } from "../types/product";
import { getFirestore, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

// Define Props for Product
const props = defineProps<{ product: Product }>();

// Access the product object
const product = props.product;

// Function to handle the deletion of the product
const deleteProduct = async () => {
  const confirmation = window.confirm(`Are you sure you want to delete ${product.name}?`);
  if (!confirmation) {
    return;
  }

  const db = getFirestore();
  const productsRef = collection(db, "products");

  // Query Firestore to find the product by name
  const q = query(productsRef, where("name", "==", product.name));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    // Get the first document in case there are multiple products with the same name
    const productDoc = snapshot.docs[0];

    // Delete the product from Firestore by its document ID
    await deleteDoc(productDoc.ref);
    console.log(`Product ${product.name} deleted successfully.`);
  } else {
    console.log("Product not found.");
  }
  
};
</script>
