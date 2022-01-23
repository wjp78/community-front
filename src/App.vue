<template>
  <div id="app">
      <!-- 顶部组件 -->
      <imooc-header></imooc-header>
      <!-- 内容组件 -->
      <router-view></router-view>
      <!-- 底部组件 -->
      <imooc-footer></imooc-footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    ImoocHeader: () => import('@/components/Header'),
    ImoocFooter: () => import('@/components/Footer')
  }
}
</script>

<style lang="scss">
@import '@/style/global.scss';
#app {
  height: 100%;
  overflow-y: auto;
}
</style>
