import request from "../utils/request";

export const postCopy = (data) => {
    return request({
        url: "/clipboard",
        method: "post",
        data: {
            content: data,
        }
    });
}

export const getCopy = (id) => {
    return request({
        url: `/clipboard/${id}`,
        method: "get"
    });
}

export const copyToClipboard = async (text) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("复制失败: ", err);
    }
  }
  
  // 使用回退方案
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';  // 防止页面滚动
  textarea.style.top = '-9999px';     // 将元素移出可视区域
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch (err) {
    console.error('复制失败:', err);
    document.body.removeChild(textarea);
    return false;
  }
};