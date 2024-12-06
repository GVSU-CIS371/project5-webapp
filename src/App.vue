<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>

      <!-- Create Button -->
      <v-btn
        color="green"
        class="mx-5"
        @click="openCreateDialog"
      >
        <v-icon>mdi-plus</v-icon>
        Create Product
      </v-btn>
    </v-app-bar>

    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>

<!-- Create Product Dialog -->
<v-dialog v-model="dialogVisible" max-width="600px">
      <v-card>
        <v-card-title>Create New Product</v-card-title>
        <v-card-text>
          <!-- Form Fields for New Product -->
          <v-text-field label="Product Name" v-model="newProduct.name" />
          <v-text-field label="Category" v-model="newProduct.category" />
          <v-text-field label="Price" v-model="newProduct.price" type="number" />
          <v-text-field label="Stock" v-model="newProduct.stock" type="number" />
          <v-text-field label="Rating" v-model="newProduct.rating" type="number" />
          <v-textarea label="Description" v-model="newProduct.description" />
          <v-text-field label="Image URL" v-model="newProduct.image" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="saveProduct">Save</v-btn>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useProductStore } from "./stores/ProductStore.ts"; // Ensure correct path

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

// Dialog Visibility State
const dialogVisible = ref(false);

// New Product Fields
const newProduct = ref({
  name: "",
  category: "",
  price: 0,
  stock: 0,
  rating: 0,
  description: "",
  image: "",
});

// Product Store Instance
const productStore = useProductStore();

// Methods for Dialog
const openCreateDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  resetForm();
};

const saveProduct = async () => {
  try {
    await productStore.addProduct(newProduct.value); // Call action to save in Firestore
    console.log("Product saved successfully.");
    closeDialog();
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

// Reset Form Fields
const resetForm = () => {
  newProduct.value = {
    name: "",
    category: "",
    price: 0,
    stock: 0,
    rating: 0,
    description: "",
    image: "",
  };
};
</script>
