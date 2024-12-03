<template>
    <div class="clipboard-box">
        <div class="preview" ref="preview">
            <div class="desc">
                预览
            </div>
            <MarkdownRenderer :content="content" />
        </div>
        <div class="input">
            <textarea class="textarea-input" v-model="content" placeholder="在此输入文本" ref="editor"></textarea>        
            <button class="submit" @click="saveContent" :class="{ copied: isCopied }">
                {{ isCopied ? '已复制分享链接' : '保存' }}
            </button>
            <div v-if="shareLink" class="share-link">
                分享链接: <a :href="shareLink" target="_blank">{{ shareLink }}</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { postCopy, copyToClipboard } from '../apis/copy.js'
import MarkdownRenderer from './MarkdownRenderer.vue'


const content = ref("")
const shareLink = ref("")
const editor = ref(null)
const preview = ref(null)
const isCopied = ref(false)

const saveContent = async () => {
    if (!content.value.trim()) {
        alert('请输入内容后再保存！')
        return
    }
    try {
        const response = await postCopy(content.value)
        shareLink.value = `${window.location.origin}/clip/${response.data.id}`
        
        // 复制分享链接到剪贴板
        const successful = await copyToClipboard(shareLink.value);
        if (successful) {
            // 显示已复制分享链接
            isCopied.value = true
            setTimeout(() => {
                isCopied.value = false
            }, 1500)
        } else {
            console.error('复制失败');
        }
    } catch (error) {
        console.error('保存失败:', error)
    }
}

const syncScroll = () => {
    const editorPercentage = editor.value.scrollTop / (editor.value.scrollHeight - editor.value.clientHeight)
    preview.value.scrollTop = editorPercentage * (preview.value.scrollHeight - preview.value.clientHeight)
}

const handleTab = (event) => {
    if (event.key === 'Tab') {
        event.preventDefault();
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;

        // 插入制表符
        event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);

        // 移动光标位置
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
}

onMounted(() => {
    editor.value.addEventListener('scroll', syncScroll)
    editor.value.addEventListener('keydown', handleTab)
})

onBeforeUnmount(() => {
    editor.value.removeEventListener('scroll', syncScroll)
    editor.value.removeEventListener('keydown', handleTab)
})
</script>

<style scoped>
.clipboard-box {
    display: flex;
    flex-direction: column;
    background-color: #f3e5f5;
    align-items: center;
    justify-content:space-around;
    height: calc(100vh - 60px);
    box-sizing: border-box;
}
.input,  .preview{
  width: calc(100% - 20px); 
  height: calc(50vh - 50px);
  border-radius: 33px; /* 增大圆角半径 */
  box-sizing: border-box;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影以模拟曲率连续的效果 */
}

@media (min-width: 768px) {
  .input,  .preview {
    width: calc(50% - 40px); /* 在大屏幕时占据 50% 宽度 */
    height: calc(100vh - 100px);
  }
  .clipboard-box {
    flex-direction: row; /* 调换输入框和预览框的位置 */
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
    transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
}

.submit.copied {
    background-color: #4caf50; /* 绿色背景 */
    color: white;
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