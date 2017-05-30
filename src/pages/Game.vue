<template lang="pug">
  .game
    pixi-stage.stage()
</template>

<script>
import Pixi from 'lib/Pixi'
import pixiStage from 'components/pixi-stage'

export default {
  name: 'game',
  
  components: {
    pixiStage
  },

  data() {
    return {
      g: undefined,
      toggle: false,
      delay: 0,
    }
  },

  computed: {
    pixiOptions() {
      return {
        background: 'light-blue',
        transparent: true
      }
    }
  },

  methods: {
    init() {
      this.g = new Pixi.core.Graphics()
      this.g.lineStyle(1, 0x555555)
      this.g.moveTo(30, 30)
      this.g.lineTo(30, 40)
      this.g.lineTo(40, 40)
      Pixi.stage.addChild(this.g)
      Pixi.createLoop(this.gameLoop)
    },

    gameLoop(delta) {
      if (this.toggle) {
        this.g.x += 1
        this.toggle = false
        console.log('foo')
      } else {
        this.delay++
        if (this.delay > 30)
          this.toggle = true
      }
    },
  },

  created() {
    Pixi.initApplication(this.pixiOptions)
  },

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.game
  .stage
    display: inline-block
    border: 1px solid rgba(#333, 0.5)
    line-height: 0
</style>
