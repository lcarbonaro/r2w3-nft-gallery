<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm row">

      <div id="divLeft" class="col-3">
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

      <div id="divRight" class="col-8" style="margin-left:15px;">
      
        <div class="row items-start q-gutter-md">

          <TheCard v-for="card in nfts" :description="card.description" :address="card.address" :title="card.title" :id="card.id" :image="card.image" :key="card.id" />
                    
        </div>

      </div>


    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

import TheCard from '../components/TheCard.vue'


const chkCollection = ref(false);
const inpWalletAddr = ref('');
const inpCollectionAddr = ref('');
const isLoading = ref(false);

const nfts = ref([]);

const apiKey = "0QV_PKXXkxWEd0BzIP64AVry5C5oXBEV";  



async function callAPI() {
  if( chkCollection.value ) {
    await getNFTsByCollection();
  } else {
    await getNFTs();
  }
}

async function getNFTsByCollection() {  
  isLoading.value = true;  
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection/`;
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
    nfts.value = respJson.nfts.map(nft => {
      return {
        image: nft.media[0].gateway,
        title: nft.title,
        id: nft.id.tokenId,
        address: nft.contract.address,
        description:nft.description
      };
    });
  }

  isLoading.value = false;
  
}  // getNFTsByCollection

async function getNFTs() {  
  isLoading.value = true;  
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
  const requestOptions = { method: 'GET' };
  let fetchURL;
   
  if (inpCollectionAddr.value.length) {
    fetchURL = `${baseURL}?owner=${inpWalletAddr.value}&contractAddresses%5B%5D=${inpCollectionAddr.value}`;    
  } else {   
    fetchURL = `${baseURL}?owner=${inpWalletAddr.value}`;        
  }

  let resp = await fetch(fetchURL, requestOptions);
  let respJson = await resp.json();

  if (respJson) {    
    nfts.value = respJson.ownedNfts.map(nft => {
      return {
        image: nft.media[0].gateway,
        title: nft.title,
        id: nft.id.tokenId,
        address: nft.contract.address,
        description:nft.description
      };
    });;
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
