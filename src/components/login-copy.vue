<template>
  <div id="app">
    <div class="controller">
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
        <a-row>
          <a-col span="24">
            <a-form-model-item label="用户名">
              <a-input placeholder="请输入用户名" />
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item label="密码">
              <a-input placeholder="请输入密码" />
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item label="验证码">
              <a-input placeholder="请输入验证码" />
              <div @click="getCaptcha" class="svg" v-html="svg">
              </div>
            </a-form-model-item>

          </a-col>
          <a-col :span="24" style="padding-left: 4em;">
            <a-space>
              <a-button type="primary"> 点击登录 </a-button>
              <a-button class="forget-pwd" type="link" ghost>
                忘记密码
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form-model>

    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      svg: ''
    }
  },
  mounted() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      axios.get('http://localhost:3000/getCaptcha').then(res => {
        if (res.status === 200) {
          const obj = res.data
          if (obj.code === 200) {
            this.svg = obj.data
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background-color: #f2f2f2;
  overflow: hidden;
}

.controller {
  padding: 20px;
  width: 90%;
  margin: 0 auto;
  background-color: #fff;

  ::v-deep .forget-pwd {
    color: #000000;

    &:hover {
      color: #1890ff;
    }
  }

  ::v-deep .ant-form-item-label {
    width: 4em;
  }

  ::v-deep .ant-form-item-children {
    display: flex;
  }

  .svg {
    display: inline-block;
    margin-left: 20px;
    margin-top: -15px;
    cursor: pointer;
  }
}

input {
  width: 190px;
}
</style>
