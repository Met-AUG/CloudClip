<template>
    <div class="clipboard-box">
        <div class="input">
            <textarea class="textarea-input" v-model="content" placeholder="在此输入文本" ref="editor"></textarea>        
            <button class="submit" @click="saveContent">
                保存
            </button>
            <div v-if="shareLink" class="share-link">
                分享链接: <a :href="shareLink" target="_blank">{{ shareLink }}</a>
            </div>
        </div>
        <div class="preview" ref="preview">
            <div class="desc">
                预览
            </div>
            <MarkdownRenderer :content="content" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MarkdownRenderer from './MarkdownRenderer.vue'
import axios from 'axios'

const content = ref("")
const shareLink = ref("")
const editor = ref(null)
const preview = ref(null)

const saveContent = async () => {
    if (!content.value.trim()) {
        alert('请输入内容后再保存！')
        return
    }

    try {
        const response = await axios.post('http://localhost:3000/api/clipboard', { content: content.value })
        shareLink.value = `${window.location.origin}/clip/${response.data.id}`
    } catch (error) {
        console.error('保存失败:', error)
    }
}

const syncScroll = () => {
    const editorPercentage = editor.value.scrollTop / (editor.value.scrollHeight - editor.value.clientHeight)
    preview.value.scrollTop = editorPercentage * (preview.value.scrollHeight - preview.value.clientHeight)
}

onMounted(() => {
    editor.value.addEventListener('scroll', syncScroll)
})

onBeforeUnmount(() => {
    editor.value.removeEventListener('scroll', syncScroll)
})
</script>

<style scoped>
.clipboard-box {
    display: flex;
    flex-direction: column;
    background-color: #f3e5f5;
    align-items: center;
    justify-content:space-around;
    height: calc(100vh - 100px);
    box-sizing: border-box;
}
.input,  .preview{
  width: calc(100% - 100px); 
  height: calc(50vh - 80px);
  border-radius: 33px; /* 增大圆角半径 */
  box-sizing: border-box;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影以模拟曲率连续的效果 */
}

@media (min-width: 768px) {
  .input,  .preview {
    width: calc(50% - 40px); /* 在大屏幕时占据 50% 宽度 */
    height: calc(100vh - 140px);
  }
  .clipboard-box {
    flex-direction: row;
  }
}
.input{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.preview{
    overflow: auto;
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent; /* Firefox */
}
.preview::-webkit-scrollbar {
    width: 8px; /* Chrome, Safari, Opera */
}
.preview::-webkit-scrollbar-track {
    background: transparent; /* Chrome, Safari, Opera */
    border-radius: 20px; /* 增大圆角半径 */
}
.preview::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Chrome, Safari, Opera */
    border-radius: 20px; /* 增大圆角半径 */
    border: 3px solid transparent; /* Chrome, Safari, Opera */
    background-clip: content-box; /* Chrome, Safari, Opera */
}
.textarea-input{
    flex: 1;
    resize: none;
    border: none;
    border-radius: 20px; /* 增大圆角半径 */
    padding: 10px;
    font-size: 15px; /* 增大字体大小 */
    background-color: #f3e5f5;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 99%;
    box-sizing: border-box;
    outline: none;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影以模拟曲率连续的效果 */
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent; /* Firefox */
}
.textarea-input::-webkit-scrollbar {
    width: 8px; /* Chrome, Safari, Opera */
}
.textarea-input::-webkit-scrollbar-track {
    background: transparent; /* Chrome, Safari, Opera */
    border-radius: 20px; /* 增大圆角半径 */
}
.textarea-input::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Chrome, Safari, Opera */
    border-radius: 20px; /* 增大圆角半径 */
    border: 3px solid transparent; /* Chrome, Safari, Opera */
    background-clip: content-box; /* Chrome, Safari, Opera */
}
.submit{
    padding: 10px 15px;
    background-color: #ba68c8;
    color: white;
    border: none;
    border-radius: 20px; /* 增大圆角半径 */
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 99%;
    margin-top: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影以模拟曲率连续的效果 */
}
.desc{
    font-size: 18px; /* 增大字体大小 */
    color: #7b1fa2;
    font-weight: bolder;
    margin-bottom: 10px;
}
.share-link {
    font-size: 12px;
}
</style>