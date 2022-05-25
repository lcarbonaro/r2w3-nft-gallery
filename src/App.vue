<template>
  <q-layout view="hHh Lpr lFf">
    <q-header style="background-color: #333;" >
      <q-toolbar >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu" 
          class="btn-gradient"        
        />

        <q-toolbar-title >
          <span class="text-gradient">RoadToWeb3 - NFT Gallery</span>          
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"      
      bordered    
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable  href="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>Query NFTs</q-item-label>
          </q-item-section>
        </q-item>
        
        <q-item clickable  href="/about">
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
            <q-item-label caption>About this app</q-item-label>
          </q-item-section>
        </q-item>
        
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'


export default {
  name: 'LayoutDefault',

  components: {
   
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>

<style scoped>

.text-gradient {
  background: linear-gradient(to right, #30d08d, #c43ad6) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}


.btn-gradient {
  background-image: linear-gradient(to right, #30d08d, #c43ad6) !important; 
  color: white !important;
 
}

.btn-gradient-sm {
  background-image: linear-gradient(to right, #30d08d, #c43ad6);
  border: 0;
  color: white;  
  padding: 5px;  
  margin-top:15px;
}


</style>
