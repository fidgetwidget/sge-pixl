import Pixi from 'lib/Pixi'

export default {

  computed: {
    app() { return Pixi.app },
    stage() { return Pixi.app.stage },

  },

  methods: {
    initApplication(options) {
      return Pixi.initApplication(options)
    },

    initPixiStage(container) {
      return Pixi.initPixiStage(container)
    },

    createLoop(func) {
      return Pixi.createLoop(func)
    }
  }

}
