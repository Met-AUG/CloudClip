<template>
  <div class="shared-clipboard">
    <header :class="['app-header', { 'scrolled': isScrolled }]">
      <h1 class="app-title">
        <span class="cloud-icon">☁️</span>
        <span class="title-text">云剪贴板</span>
      </h1>
      <button :class="['copy-button', { 'scrolled': isScrolled, 'copied': copied }]" @click="copyOriginalContent">
        <font-awesome-icon v-if="!copied" icon="copy" />
        <font-awesome-icon v-else icon="check" />
        <span v-if="!isScrolled">复制原文</span>
      </button>
    </header>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="content-wrapper">
      <h2>渲染后的内容</h2>
      <MarkdownRenderer :content="content" />
      <h3 @click="toggleOriginalContent" class="toggle-button">
        原始内容
        <font-awesome-icon :icon="showOriginalContent ? 'chevron-up' : 'chevron-down'" />
      </h3>
      <div v-if="showOriginalContent" class="code-block-wrapper">
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
import MarkdownRenderer from './MarkdownRenderer.vue'
import { getCopy, copyToClipboard } from '../apis/copy.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy, faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCopy, faCheck, faChevronDown, faChevronUp)

export default {
  name: 'SharedClipboard',
  components: {
    MarkdownRenderer,
    FontAwesomeIcon
  },
  data() {
    return {
      content: '',
      loading: true,
      error: null,
      isScrolled: false,
      copied: false,
      showOriginalContent: false
    }
  },
  methods: {
    async copyOriginalContent() {
      const successful = await copyToClipboard(this.content);
      if (successful) {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1000);
      } else {
        console.error('复制失败');
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    toggleOriginalContent() {
      this.showOriginalContent = !this.showOriginalContent;
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await getCopy(id)
      this.content = response.data.content
      this.loading = false
    } catch (error) {
      this.error = '获取内容失败'
      this.loading = false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
.shared-clipboard {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 70px; /* 向下移动内容，避免被 header 挡住 */
  padding-bottom: 40px;
}

.app-header {
  background-color: rgba(126, 87, 194, 0.8);
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 确保 header 在最上层 */
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.app-header.scrolled {
  height: 40px;
  background-color: rgba(126, 87, 194, 0.6);
}

.app-title {
  height: 60px;
  margin: 0;
  font-size: 26px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.app-header.scrolled .app-title {
  height: 40px;
  font-size: 20px;
}

.cloud-icon {
  font-size: 26px;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.app-header.scrolled .cloud-icon {
  font-size: 20px;
  margin-right: 5px;
  position: absolute;
  left: 10px; /* 移动至左边 */
}

.title-text {
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.app-header.scrolled .title-text {
  opacity: 0;
}

.copy-button {
  display: flex;
  align-items: center;
  background-color: #3c1076;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 9px 13px;
  cursor: pointer;
  transition: all 0.5s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.copy-button.scrolled {
  border-radius: 50%;
  padding: 9px;
}

.copy-button.copied {
  background-color: #28a745;
}

.copy-button i {
  margin-right: 0px;
}

.copy-button span {
  margin-left: 5px;
}

.copy-button.scrolled i {
  margin-right: 0;
}

.copy-button.copied i {
  margin-right: 0;
}

.content-wrapper {
  margin-top: 20px; /* 确保内容不被 header 挡住 */
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
  background-color: #e6c4fd;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.code-block-header__lang {
  font-size: 12px;
  color: #000000;
}

.code-block-header__copy {
  font-size: 12px;
  color: #3c1076;
  cursor: pointer;
}

.code-block-body {
  padding: 16px;
  margin: 0;
  overflow-x: auto;
}

.toggle-button {
  cursor: pointer;
  background-color: #e6c4fd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #3c1076;
  margin-bottom: 10px;
  border-radius: 30px;
  padding: 10px 20px;
}
</style>
