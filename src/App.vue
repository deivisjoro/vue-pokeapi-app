<script setup>

  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

</script>

<template>

  <Header />
  <div class="main-container">
    <router-view></router-view>
  </div>
  <Footer />

</template>

<style scoped>
  .main-container{
    padding: 20px;    
    max-width: 1280px;
    margin: 0 auto;
  }
</style>
