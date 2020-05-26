<template>
  <transition name="hide" mode="out-in">
    <div class="alert-wrap" v-show="show">
      <div :class="[ 'alert', isError ? 'alert-danger' : 'alert-success' ]" role="alert">
        <div class="alert-message">
          <button type="button" class="close alert-close" @click="toggleShow">&times;</button>
          <span class="alert-icon">{{ isError ? '☢' : '✔'  }}</span>
          <span class="alert-title">{{ isError ? 'Error' : 'Success'  }}</span>
          <span class="alert-message">{{ title }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  
  export default {
    name: 'alert',
    props: {
      showAlert: {
        type: Function
      },
      isError: {
        default: false,
        type: Boolean
      },
      show: {
        default: false,
        type: Boolean
      },
      title: {
        default: "Error message",
        type: String
      },
      timer: {
        default: 4000,
        type: Number
      }
    },
    methods: {
      toggleShow() {
        this.$emit('showAlert', { isError: this.isError })
      }
    },
    watch: {
      show(value) {
        if (value) {
          setTimeout(this.toggleShow, this.timer)
        }
      },
    }
  }

</script>

<style>
  .alert-wrap {
    position: fixed;
    display: flex;
    justify-content: center;
    
    bottom: 0;
    left:0;
    right:0;
    
    background: transparent;
    z-index: 9999;
  }
  
  .alert-message {
    position: relative;
    padding-right: 13px;
  }
  .alert-message .alert-icon {
    display: inline-block;
    position: relative;
    top: 2px;
    left: -3px;
    width: 20px;
    font-size: 24px;
  }
  .alert-message .alert-title {
    margin-right: 5px;
    font-weight: bold;
    font-size: 16px;
  }
  .alert-message .alert-close {
    position: absolute;
    top: 0;
    right: -5px;
    font-size: 40px;
  }
  
  .hide-enter-active {
    animation: showIn 1s;
  }
  
  .hide-leave-active {
    animation: showOut 1s forwards;
  }
  
  @keyframes showIn {
    from { transform: translateY(100px); }
    to { transform: translateY(0px); }
  }
  
  @keyframes showOut {
    from { transform: translateY(0px); }
    to { transform: translateY(100px); }
  }
</style>