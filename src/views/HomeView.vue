<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm row">

      <div id="divLeft" class="col-4">
        <div>
          <q-input v-model="inpWalletAddr" placeholder="Wallet address" dense>
            <template v-slot:append>
              <q-icon name="close" @click="inpWalletAddr = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <div style="margin:15px 0;">
          <q-input v-model="inpCollectionAddr" placeholder="Collection address" dense>
            <template v-slot:append>
              <q-icon name="close" @click="inpCollectionAddr = ''" class="cursor-pointer" />
            </template>
          </q-input>

        </div>

        <div style="margin:15px 0;">
          <q-checkbox left-label v-model="chkCollection" checked="chkCollection" label="Fetch for collection" />
        </div>

        <div style="margin:15px 0;">
          <q-btn :loading="isLoading" flat rounded class="btn-gradient" label="Let's Go" @click="callAPI" />
        </div>

      </div>

      <div id="divRight" class="col-6" style="margin-left:25px;">
      
        <div class="q-pa-md row items-start q-gutter-md">

          <TheCard v-for="card in cards" :title="card.title" :subtitle="card.subtitle" :image="card.image" :key="card.id" />
                    
        </div>

      </div>


    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

import TheCard from '../components/TheCard.vue'

const cards = ref([
  {
    id: 1,
    title:"Title1",
    subtitle:"SubTitle1",
    image: "https://cdn.quasar.dev/img/mountains.jpg"
  },
  {
    id: 2,
    title:"Title2",
    subtitle:"SubTitle2",
    image: "https://cdn.quasar.dev/img/parallax2.jpg"
  },
  {
    id: 3,
    title:"Title",
    subtitle:"SubTitle",
    image: "https://thecatapi.com/api/images/get?format=src&type=gif"
  },
  {
    id: 4,
    title:"Title",
    subtitle:"SubTitle",
    image: "https://picsum.photos/250?1234"
  },
  {
    id: 5,
    title:"Title",
    subtitle:"SubTitle",
    image: "https://picsum.photos/250?3456"
  },  
]);

const chkCollection = ref(false);
const inpWalletAddr = ref('');
const inpCollectionAddr = ref('');
const isLoading = ref(false);

const nfts = ref([]);

const apiKey = "hBfRT-PTexTchntBso2fOt6GKfSCGuHD";  

async function callAPI() {
  if( chkCollection.value ) {
    await getNFTsByCollection();
  } else {
    await getNFTs();
  }
}

async function getNFTsByCollection() {
  
  isLoading.value = true;

  
  const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}/getNFTsForCollection/`;
  const requestOptions = { method: 'GET' };

  let fetchURL;
  
  if (inpCollectionAddr.value.length) {
    fetchURL = `${baseURL}?contractAddress=${inpCollectionAddr.value}&withMetadata=${"true"}`;    
  } else {   
    // ??
  }

  let resp = await fetch(fetchURL, requestOptions);
  let respJson = await resp.json();

  if (respJson) {    
    nfts.value = respJson.nfts;
  }

  isLoading.value = false;
  
}  // getNFTsByCollection

async function getNFTs() {
  //console.log('chkColl',chkCollection.value);

  isLoading.value = true;

  const apiKey = "hBfRT-PTexTchntBso2fOt6GKfSCGuHD";  
  const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}/getNFTs/`;
  const requestOptions = { method: 'GET' };

  let fetchURL;
   
  if (!inpCollectionAddr.value) {
    fetchURL = `${baseURL}?owner=${inpWalletAddr.value}`;    
  } else {   
    fetchURL = `${baseURL}?owner=${inpWalletAddr}&contractAddresses%5B%5D=${inpCollectionAddr.value}`;    
  }

  let resp = await fetch(fetchURL, requestOptions);
  let respJson = await resp.json();

  if (respJson) {    
    nfts.value = respJson.ownedNfts;
  }

  isLoading.value = false;
  
}  // getNFTs

</script>

<style scoped>
.btn-gradient {
  background-image: linear-gradient(to right, #30d08d, #c43ad6) !important;
  color: white !important;
  margin-left: 20px;
}
</style>
