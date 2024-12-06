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
  </v-card>
</template>

<script setup lang="ts">
import { Product } from "../types/product";

defineProps<{ product: Product }>();
</script>

