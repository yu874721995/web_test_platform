<template>
  <div>
    <iframe
      :src="embedUrl"
      width="100%"
      height="850"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      embedUrl: 'http://192.168.3.243:9001/main.html' // 第三方网页的URL
    };
  }
};
</script>