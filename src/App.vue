<template>
  <div id="app">
    <a-layout>
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
export default {
  name: 'App',
  components: {
    ImoocHeader: () => import('@/components/Header'),
    ImoocFooter: () => import('@/components/Footer')
  }
}
</script>

<style lang="scss">
@import 'assets/css/global.css';
</style>
