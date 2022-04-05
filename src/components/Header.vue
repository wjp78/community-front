<template>
  <a-layout-header>
    <div class="layout-header-center">
      <div class="logo">
        <img src="../assets/logo-2.png" alt="layui">
      </div>
      <a-menu theme="dark" mode="horizontal" :default-selected-keys="['1']" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">
          <i class="iconfont icon-jiaoliu" />
          交流
        </a-menu-item>
        <a-menu-item key="2">
          <i class="iconfont icon-iconmingxinganli" />
          案例
        </a-menu-item>
        <a-menu-item key="3">
          <i class="iconfont icon-ui" />
          框架
        </a-menu-item>
      </a-menu>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <li class="layui-nav-item">
          <a class="iconfont icon-touxiang layui-hide-xs" href="../user/login.html" />
        </li>
        <li class="layui-nav-item">
          <a href="../user/login.html">登入</a>
        </li>
        <li class="layui-nav-item">
          <a href="../user/reg.html">注册</a>
        </li>
        <li class="layui-nav-item layui-hide-xs">
          <a href onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" title="QQ登入" class="iconfont icon-qq" />
        </li>
        <li class="layui-nav-item layui-hide-xs">
          <a href onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" title="微博登入" class="iconfont icon-weibo" />
        </li>

        <!-- 登入后的状态 -->
        <!--
      <li class="layui-nav-item">
        <a class="fly-nav-avatar" href="javascript:;">
          <cite class="layui-hide-xs">贤心</cite>
          <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i>
          <i class="layui-badge fly-badge-vip layui-hide-xs">VIP3</i>
          <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg">
        </a>
        <dl class="layui-nav-child">
          <dd><a href="user/set.html"><i class="layui-icon">&#xe620;</i>基本设置</a></dd>
          <dd><a href="user/message.html"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</a></dd>
          <dd><a href="user/home.html"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a></dd>
          <hr style="margin: 5px 0;">
          <dd><a href="/user/logout/" style="text-align: center;">退出</a></dd>
        </dl>
      </li>
        -->
      </ul>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  name: 'Headers'
}
</script>

<style lang="scss" scoped>
.header-main {
  background-color: #393d49;
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  border-bottom: 1px solid #404553;
  border-right: 1px solid #404553;
  border-radius: 0;
  .header-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .header-left {
      display: flex;
      align-items: center;
    }
    .header-right {
      .header-nav {
        .header-nav-item {
          .login,
          .register {
            padding: 0 25px 0 0;
          }
          .avatar {
            i {
              font-size: 32px;
            }
          }
        }
      }
    }
    // 导航公共样式
    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0;
      .header-nav-item {
        a {
          padding: 0 25px 0 60px;
          display: block;
          height: 60px;
          line-height: 60px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          position: relative;
          &:hover {
            color: #fff;
          }
          i {
            position: absolute;
            left: 25px;
            padding-right: 10px;
            font-size: 26px;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
