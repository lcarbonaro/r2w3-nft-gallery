<template>
  <q-card class="my-card">
      <img :src="image">

      <q-card-section>
        <div class="text-h6">{{title}}</div>
        <div class="text-subtitle2">{{subtitle}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ullam?
      </q-card-section>
    </q-card>

</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  image: String
})

</script>


<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>