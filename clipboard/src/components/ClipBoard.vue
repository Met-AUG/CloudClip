<template>
    <div class="clipboard-box">
        <div class="input">
            <textarea class="textarea-input" v-model="content" placeholder="在此输入文本" ref="editor"></textarea>        
            <button class="submit">
                保存
            </button>
        </div>
        <div class="preview">
            <div class="desc">
                预览
            </div>
            <MarkdownRenderer :content="content" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownRenderer from './MarkdownRenderer.vue'

const content = ref("")
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
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
  background-color: #ffffff;
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
    overflow: auto
}
.textarea-input{
    flex: 1;
    resize: none;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    background-color: #f3e5f5;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 90%;
    box-sizing: border-box;
}
.submit{
    padding: 10px 15px;
    background-color: #ba68c8;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 90%;
    margin-top: 20px;
}
.desc{
    font-size: 18px;
    color: #7b1fa2;
    font-weight: bolder;
    margin-bottom: 10px;
}
</style>