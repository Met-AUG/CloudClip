
<template>
  <header class="app-header">
    <h1 class="app-title">
      <span class="cloud-icon">☁️</span>
      <span class="title-text">云剪贴板</span>
    </h1>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  background-color: #7e57c2;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
}

.app-title {
  height: 60px;
  margin: 0;
  font-size: 26px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cloud-icon {
  font-size: 26px;
  margin-right: 10px;
}

.title-text {
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
</style>