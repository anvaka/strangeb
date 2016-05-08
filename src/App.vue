<template>
  <div id="app">
    <scene :animation='animation'></scene>
  </div>
</template>

<script>
import Scene from './Scene.vue'
import state from './lib/appState.js'

export default {
  components: {
    Scene
  },

  data() {
    return {
      animation: state.animation
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-family: Helvetica, sans-serif;
  position: fixed;
}

* {
  box-sizing: border-box;
}

svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
