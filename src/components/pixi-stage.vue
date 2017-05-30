<template lang="pug">
  .pixi-stage(ref="stage")
</template>

<script>
import PixiMixin from 'mixins/Pixi'

export default {
  
  name: 'pixi-stage',

  mixins: [PixiMixin],

  mounted() {
    // console.log
    this.initPixiStage(this.$refs.stage)
  }
}
</script>

<style lang="stylus" scoped>

</style>
