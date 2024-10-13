<template>
    <div class="shared-clipboard">
      <div v-if="loading">加载中...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <h2>渲染后的内容</h2>
        <MarkdownRenderer :content="content" />
        <h3>原始内容</h3>
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-block-header__lang">原始内容</span>
            <span class="code-block-header__copy" @click="copyOriginalContent">复制代码</span>
          </div>
          <pre class="code-block-body">{{ content }}</pre>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios'
import MarkdownRenderer from './MarkdownRenderer.vue'

export default {
  name: 'SharedClipboard',
  components: {
    MarkdownRenderer
  },
  data() {
    return {
      content: '',
      loading: true,
      error: null
    }
  },
  methods: {
    copyOriginalContent() {
      navigator.clipboard.writeText(this.content).then(() => {
        const copyBtn = document.querySelector('.code-block-header__copy')
        copyBtn.textContent = '复制成功'
        setTimeout(() => {
          copyBtn.textContent = '复制代码'
        }, 1000)
      }).catch(err => {
        console.error('复制失败:', err)
      })
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await axios.get(`http://localhost:3000/api/clipboard/${id}`)
      this.content = response.data.content
      this.loading = false
    } catch (error) {
      this.error = '获取内容失败'
      this.loading = false
    }
  }
}
</script>

<style scoped>
.shared-clipboard {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 40px;
}

.code-block-wrapper {
  background-color: #f6f8fa;
  border-radius: 6px;
  margin-bottom: 16px;
}

.code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #f1f3f5;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.code-block-header__lang {
  font-size: 12px;
  color: #6a737d;
}

.code-block-header__copy {
  font-size: 12px;
  color: #0366d6;
  cursor: pointer;
}

.code-block-body {
  padding: 16px;
  margin: 0;
  overflow-x: auto;
}
</style>
