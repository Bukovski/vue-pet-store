<template>
  <transition name="bounce" mode="out-in">
    <span
        class="inventory-message"
        v-if="(availableProduct) === 0"
        key="0"
    >
      All Out!
    </span>
    
    <span
        class="inventory-message"
        v-else-if="(availableProduct) < 6"
        key="1"
    >
      Only {{ availableProduct }} left!
    </span>
    
    <span class="inventory-message" v-else key="">Buy Now!</span>
  </transition>
</template>

<script>
  export default {
    name: "inventory-message",
    props: {
      availableProduct: {
        type: Number,
        required: true
      },
    }
  }
</script>

<style scoped>
  .inventory-message {
    display:inline-block;
    font-weight: bold;
    font-size: 18px;
    color: #1E95EA;
  }
  
  .bounce-enter-active {
    animation: shake 0.72s cubic-bezier(.37,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  
  @keyframes shake {
    10%, 90% {
      color: red;
      transform: translate3d(-1px, 0, 0);
    }
    
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
    
    30%, 50%, 70% {
      color: red;
      transform: translate3d(-4px, 0, 0);
    }
    
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>