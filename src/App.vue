<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.fade-enter-active {
  animation: slideIn 0.5s;
}

.fade-leave-active {
  animation: slideOut 0.5s forwards;
}

@keyframes slideIn {
  from { transform: translateX(-100vw); }
  to { transform: translateX(0px); }
}

@keyframes slideOut {
  from { transform: translateX(0px); }
  to { transform: translateX(100vw); }
}
</style>
