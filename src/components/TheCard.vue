<template>
  <q-card class="my-card">
      <img :src="image">

      <q-card-section>
        <div class="text-h6">{{title}}</div>
        <!-- <div class="text-subtitle2">{{id}}</div> -->
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{description}}
      </q-card-section>
    </q-card>

</template>

<script setup>
defineProps({
  image: String,
  title: String,
  id: String,  
  address: String,
  description: String,
})

</script>


<style scoped>
.my-card {
  width: 100%;
  max-width: 200px;
}
</style>