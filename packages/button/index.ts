import VEButton from './src/main.vue'

VEButton.install = function (App) {
  App.component(VEButton.name, VEButton)
}

export default VEButton
