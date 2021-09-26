<template>
  <div class="home">
    <AllBanks/>
  </div>
</template>

<script>

import AllBanks from '@/components/AllBanks.vue'

export default {
  name: 'Home',
  components: {
    AllBanks, 
  }
}
</script>

<style>
    .home{
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }
</style>
