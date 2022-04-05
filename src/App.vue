<!--
 * @Description:
 * @Company: 前端社区
 * @Author: Hugh
 * @Date: 2021-10-18 19:34:54
 * @LastEditors: Hugh
 * @LastEditTime: 2021-11-15 01:14:43
 * @FilePath: \front\src\App.vue
-->
<template>
  <div id="app">
    <a-layout id="components-layout-demo-top" class="layout">
      <!-- 顶部组件 -->
      <imooc-header />
      <!-- 内容组件 -->
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <!-- 底部组件 -->
      <imooc-footer />
    </a-layout>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss">
@import 'assets/css/global.css';
</style>
