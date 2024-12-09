<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" md="4" lg="3">
        <StoreItem :product="product.data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "../stores/ProductStore";
import StoreItem from "./StoreItem.vue";

// Access the product store
const productStore = useProductStore();

// Initialize the store (fetches products)
productStore.init();

// Make products reactive
const products = computed(() => productStore.products);
</script>
