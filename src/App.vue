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
import { useProductStore } from "./stores/ProductStore";
import { ref } from "vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

const dialogVisible = ref(false);

const newProduct = ref({
  name: "Beans",
  description: "can of beans",
  price: 5,
  rating: 4,
  stock: 10,
  image: "https://www.recipetineats.com/tachyon/2014/05/Homemade-Heinz-Baked-Beans_0.jpg?resize=900%2C1260&zoom=0.72",
  category: "groceries",
});

const openCreateDialog = () => {
  dialogVisible.value = true;
};

const saveProduct = async () => {
  const confirmation = window.confirm("Are you sure you want to save this product?");
  if (!confirmation) {
    return;
  }
  const db = getFirestore();
  const docRef = await addDoc(collection(db, "products"), newProduct.value);
  const productStore = useProductStore();
  await productStore.init();
  console.log("Product saved with ID:", docRef.id);
  productStore.products.push({
      id: docRef.id,
      data: newProduct.value,
  });
  closeDialog(); 
  };

const closeDialog = () => {
  dialogVisible.value = false;
  newProduct.value = {
  name: "Beans",
  description: "can of beans",
  price: 5,
  rating: 4,
  stock: 10,
  image: "https://www.recipetineats.com/tachyon/2014/05/Homemade-Heinz-Baked-Beans_0.jpg?resize=900%2C1260&zoom=0.72",
  category: "groceries",
  };
};
</script>
