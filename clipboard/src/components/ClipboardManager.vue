<template>
    <div class="clipboard-manager" :class="{ 'vertical-layout': isVertical }">
      <div class="editor-section card">
        <textarea v-model="content" placeholder="在此输入文本" ref="editor"></textarea>
        <div class="controls">
          <button @click="saveContent" class="save-button">保存</button>
          <div v-if="shareLink" class="share-link">
            分享链接: <a :href="shareLink" target="_blank">{{ shareLink }}</a>
          </div>
        </div>
      </div>
      <div class="preview-section card" ref="preview">
        <h2>预览</h2>
        <MarkdownRenderer :content="content" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import MarkdownRenderer from './MarkdownRenderer.vue'
  
  export default {
    name: 'ClipboardManager',
    components: {
      MarkdownRenderer
    },
    data() {
      return {
        content: '',
        shareLink: '',
        isVertical: window.innerWidth > window.innerHeight
      }
    },
    methods: {
        async saveContent() {
      if (!this.content.trim()) {
        // 如果内容为空，显示提示并返回
        alert('请输入内容后再保存！');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/clipboard', { content: this.content })
        this.shareLink = `${window.location.origin}/clip/${response.data.id}`
      } catch (error) {
        console.error('保存失败:', error)
      }
    },
      handleResize() {
        this.isVertical = window.innerWidth > window.innerHeight
      },
      syncScroll() {
        const editorPercentage = this.$refs.editor.scrollTop / (this.$refs.editor.scrollHeight - this.$refs.editor.clientHeight)
        this.$refs.preview.scrollTop = editorPercentage * (this.$refs.preview.scrollHeight - this.$refs.preview.clientHeight)
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
      this.$refs.editor.addEventListener('scroll', this.syncScroll)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize)
      this.$refs.editor.removeEventListener('scroll', this.syncScroll)
    }
  }
  </script>
  
  <style scoped>
  .clipboard-manager {
    display: flex;
    height: 87vh;
    font-family: Arial, sans-serif;
    overflow: hidden;
    background-color: #f3e5f5;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .vertical-layout {
    flex-direction: row;
  }
  
  .vertical-layout .editor-section,
  .vertical-layout .preview-section {
    width: 50%;
  }
  
  .editor-section,
  .preview-section {
    padding: 15px;
    box-sizing: border-box;
    margin: 0 10px;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .textarea-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  textarea {
    flex: 1;
    width: 96%;  /* 缩短宽度，用百分比控制 */

    resize: none;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    background-color: #f3e5f5;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .save-button {
    width: 100%; /* 同样的宽度控制 */

    padding: 10px 15px;
    background-color: #ba68c8;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .save-button:hover {
    background-color: #ab47bc;
  }
  
  .share-link {
    font-size: 12px;
  }
  
  .preview-section {
    overflow-y: auto;
  }
  
  .preview-section h2 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #7b1fa2;
  }
  
  @media (max-width: 768px) {
    .clipboard-manager {
      flex-direction: column;
      height: auto;
    }
  
    .editor-section,
    .preview-section {
      width: 100%;
      height: 40vh;
      margin: 10px 0;
    }
  }
  </style>