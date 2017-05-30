import Vue from 'vue'
import * as PIXI from 'pixi.js'

export default new Vue({

  data: {
    options: undefined,
    resources: [],
    loaded: [],
    app: undefined,
  },

  computed: {
    core() {
      return PIXI
    },
    stage() {
      if (this.app)
        return this.app.stage
      return null
    },
    initialized() { 
      return this.app !== undefined
    },
  },

  methods: {
    destroyApplication() {
      this.options = undefined
      this.app = undefined
      this.resources.length = 0
      this.loaded.length = 0
    },

    initApplication(options) {
      console.log('init application')
      this.options = options || {}
      this.app = new PIXI.Application(this.options)
      return this.app
    },

    initPixiStage(container) {
      console.log('init stage')
      if (!this.initialized)
        this.initApplication()
      container.appendChild(this.app.view)
      return this.app.view
    },

    addResource(res) {
      this.resources.push(res)
    },

    addResourceToLoader() {
      for (r in this.resources) {
        if (typeof r === 'string') {
          this.app.loader.add(r)
          this.loaded.push(r)
          continue
        }
        this.app.loader.add(r.name, r.file)
        this.loaded.push(r.name)
      }
    },

    loadResources(callback) {
      if (!this.initialized) {
        console.error('PIXI Application Must Be Initialized Before Loading Resources')
        return
      }
      this.addResourceToLoader()
      this.app.loader.load(callback)
    },

    createLoop(func) {
      if (!this.initialized)
        return false
      this.app.ticker.add(func)
      return this.app
    },
  }
})
