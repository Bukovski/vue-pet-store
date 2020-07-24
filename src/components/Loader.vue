<template>
  <div style="height: 100vh;">
    <div style="color: red; position: absolute; left: 50%; top: 50%;">
      <vue-loaders-pacman color="currentColor" scale="1"></vue-loaders-pacman>
    </div>
  </div>
</template>


<script>
  import { VueLoadersPcckman } from 'vue-loaders';
  
  export default {
    name: 'loader',
    components: { VueLoadersPcckman }
  }
</script>

<style scoped></style>