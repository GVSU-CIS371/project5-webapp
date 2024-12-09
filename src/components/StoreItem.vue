<template>
  <v-card class="ma-4" outlined>
    <!-- Image -->
    <template v-if="!editMode">
      <v-img :src="product.image" alt="Product Image" height="200"></v-img>
    </template>
    <template v-else>
      <v-text-field
        v-model="editedProduct.image"
        label="Image URL"
        outlined
      ></v-text-field>
    </template>

    <!-- Name -->
    <v-card-title v-if="!editMode">{{ product.name }}</v-card-title>
    <v-text-field
      v-else
      v-model="editedProduct.name"
      label="Product Name"
      outlined
    ></v-text-field>

    <!-- Category -->
    <v-card-subtitle v-if="!editMode">{{ product.category }}</v-card-subtitle>
    <v-text-field
      v-else
      v-model="editedProduct.category"
      label="Category"
      outlined
    ></v-text-field>

    <!-- Description -->
    <v-card-text>
      <div v-if="!editMode">{{ product.description }}</div>
      <v-textarea
        v-else
        v-model="editedProduct.description"
        label="Description"
        outlined
      ></v-textarea>

      <!-- Price -->
      <div class="mt-3">
        <strong>Price:</strong>
        <span v-if="!editMode">${{ product.price.toFixed(2) }}</span>
        <v-text-field
          v-else
          v-model="editedProduct.price"
          label="Price"
          type="number"
          outlined
        ></v-text-field>
      </div>

      <!-- Rating -->
      <div>
        <strong>Rating:</strong>
        <span v-if="!editMode">{{ product.rating }} ⭐</span>
        <v-text-field
          v-else
          v-model="editedProduct.rating"
          label="Rating"
          type="number"
          outlined
        ></v-text-field>
      </div>

      <!-- Stock -->
      <div>
        <strong>Stock:</strong>
        <span v-if="!editMode">{{ product.stock }}</span>
        <v-text-field
          v-else
          v-model="editedProduct.stock"
          label="Stock"
          type="number"
          outlined
        ></v-text-field>
      </div>
    </v-card-text>

    <!-- Action Buttons -->
    <div v-if="!editMode">
      <v-btn color="red" @click="deleteProduct">Delete</v-btn>
      <v-btn color="blue" @click="enterEditMode">Modify</v-btn>
    </div>
    <div v-else>
      <v-btn color="green" @click="updateProduct">Update</v-btn>
      <v-btn color="grey" @click="cancelEdit">Cancel</v-btn>
    </div>
  </v-card>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { Product } from "../types/product";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useProductStore } from "../stores/ProductStore";

// Define Props for Product
const props = defineProps<{ product: Product }>();

// Reactive State
const editMode = ref(false);
const editedProduct = ref({ ...props.product });
const productStore = useProductStore();

// Firestore Functions
const deleteProduct = async () => {
  const confirmation = window.confirm(
    `Are you sure you want to delete ${props.product.name}?`
  );
  if (!confirmation) return;

  const db = getFirestore();
  const productsRef = collection(db, "products");

  const q = query(productsRef, where("name", "==", props.product.name));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const productDoc = snapshot.docs[0];
    await deleteDoc(productDoc.ref);

    // Update the product store
    productStore.removeProduct({
      id: productDoc.id,
      data: props.product,
    });

    console.log(`Product ${props.product.name} deleted successfully.`);
  } else {
    console.log("Product not found.");
  }
};

const enterEditMode = () => {
  editMode.value = true;
};

const cancelEdit = () => {
  editMode.value = false;
  editedProduct.value = { ...props.product };
};

const updateProduct = async () => {
  const confirmation = window.confirm(
    `Are you sure you want to update ${props.product.name}?`
  );
  if (!confirmation) return;

  const db = getFirestore();
  const productsRef = collection(db, "products");

  const q = query(productsRef, where("name", "==", props.product.name));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const productDoc = snapshot.docs[0];
    await updateDoc(productDoc.ref, { ...editedProduct.value });

    Object.assign(props.product, editedProduct.value);
    console.log(`Product ${props.product.name} updated successfully.`);
    editMode.value = false;
  } else {
    console.log("Product not found for update.");
  }
};
</script>
