<template>
  <div class="markdown-renderer" :class="wrapClass">
    <div ref="contentRef" class="leading-relaxed break-words">
      <div class="markdown-body" v-html="renderedContent" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, onUpdated, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'
import 'katex/dist/katex.min.css'

export default {
  name: 'MarkdownRenderer',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const contentRef = ref(null)

    const mdi = new MarkdownIt({
      html: false,
      linkify: true,
      highlight(code, language) {
        const validLang = !!(language && hljs.getLanguage(language))
        if (validLang) {
          const lang = language ?? ''
          return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
        }
        return highlightBlock(hljs.highlightAuto(code).value, '')
      },
    })

    mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
    mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })

    const wrapClass = computed(() => {
      return [
        'text-wrap',
        'min-w-[20px]', 'max-width-[810px]',
        'rounded-md',
        'px-3 py-2',
      ]
    })

    const renderedContent = computed(() => {
      let value = props.content
      value = value.replace(/\\\( *(.*?) *\\\)/g, '$$$1$$')
      value = value.replace(/\\\[ *(.*?) *\\\]/g, '$$$$$1$$$$')
      value = value.replace('\\[', "$$$$")
      value = value.replace('\\]', "$$$$")
      return mdi.render(value)
    })

    function highlightBlock(str, lang) {
      return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
    }

    function copyToClip(text) {
      return new Promise((resolve, reject) => {
        try {
          const input = document.createElement('textarea')
          input.setAttribute('readonly', 'readonly')
          input.value = text
          document.body.appendChild(input)
          input.select()
          if (document.execCommand('copy'))
            document.execCommand('copy')
          document.body.removeChild(input)
          resolve(text)
        }
        catch (error) {
          reject(error)
        }
      })
    }

    function addCopyEvents() {
      if (contentRef.value) {
        const copyBtn = contentRef.value.querySelectorAll('.code-block-header__copy')
        copyBtn.forEach((btn) => {
          btn.addEventListener('click', () => {
            const code = btn.parentElement?.nextElementSibling?.textContent
            if (code) {
              copyToClip(code).then(() => {
                btn.textContent = '复制成功'
                setTimeout(() => {
                  btn.textContent = '复制代码'
                }, 1000)
              })
            }
          })
        })
      }
    }

    function removeCopyEvents() {
      if (contentRef.value) {
        const copyBtn = contentRef.value.querySelectorAll('.code-block-header__copy')
        copyBtn.forEach((btn) => {
          btn.removeEventListener('click', () => { })
        })
      }
    }

    onMounted(() => {
      addCopyEvents()
    })

    onUpdated(() => {
      addCopyEvents()
    })

    onUnmounted(() => {
      removeCopyEvents()
    })

    return {
      contentRef,
      wrapClass,
      renderedContent
    }
  }
}
</script>

<style lang="less">
@import url(/src/style/style.less);
@import url(/src/style/highlight.less);
@import url(/src/style/github-markdown.less);
</style>
