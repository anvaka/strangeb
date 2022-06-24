<template>
  <div class='scene-container'>
    <svg>
      <g>
        <path stroke='black' fill='transparent'/>
      </g>
    </svg>
    <div class='editor'>
      <a href='https://en.wikipedia.org/wiki/B%C3%A9zier_curve'><h3>Bezier points</h3></a>
      <ul>
        <li v-for='item in animation' v-bind:key="item.name">
          <label for='{{item.name}}'>{{item.name}}</label>
          <input type='text' v-model='item.code' id='{{item.name}}' v-on:change='updateAnimation(item)'>
        </li>
      </ul>
      <code><pre>
  from - angle where curve starts
  to - angle where curve ends
  alpha - animated angle
      </pre></code>
    </div>
  </div>
</template>

<style>
a {
  text-decoration: none;
}

svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.scene-container {
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  height: 100%;
}
.editor {
  position: absolute;
  z-index: 1;
  background-color: rgba(230, 230, 230, 0.8);
  padding: 0 12px;
}
.editor input {
  width: 230px;
}

.editor ul {
  padding: 0;
}

.editor li {
  list-style-type: none;
}

@media (max-width: 600px) {
  .editor {
    display: none;
  }
}
</style>

<script>
import createRenderer from './lib/renderer.js'
import {setHashFromState} from './lib/appState.js'

export default {
  props: ['animation'],

  methods: {
    updateAnimation(item) {
      let error = this.renderer.recompile();
      if (!error) setHashFromState()
    }
  },

  mounted() {
    let scene = this.$el.querySelector('g')
    this.renderer = createRenderer(scene, this.animation)

    let container = this.$el.querySelector('svg')
    let zoomer = this.renderer.getPanzoom();
    zoomer.moveBy(container.clientWidth/2, container.clientHeight/2)
  },

  unmounted() {
    this.renderer.dispose()
  }
}
</script>
