<template>
  <v-container>
    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" md="4" lg="3">
        <StoreItem :product="product.data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useProductStore } from "../stores/ProductStore";
import StoreItem from "../components/StoreItem.vue";

const productStore = useProductStore();
const filteredProducts = productStore.filterByRating(4.5);
</script>
