
<template>
  <div>
    <AppHeader />
    <ClipBoard />
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import ClipBoard from './ClipBoard.vue'

export default {
  name: 'ClipBoardWithHeader',
  components: {
    AppHeader,
    ClipBoard
  }
}
</script>