<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-title">
        <span class="cloud-icon">☁️</span>
        <span class="title-text">云剪贴板</span>
      </h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f3e5f5;
  height: 100vh;
}

.app-header {
  background-color: #7e57c2;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 100px;
}

.app-title {
  height: 100px;
  margin: 0;
  font-size: 26px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cloud-icon {
  /* font-size: 1.2em; */
  font-size: 26px;
  margin-right: 10px;
}

.title-text {
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
</style>