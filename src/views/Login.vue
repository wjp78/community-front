<template>
  <div class="app-container">
    <a-card style="width:100%; border: none;" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey" @tabChange="key => onTabChange(key, 'noTitleKey')">
      <p v-if="noTitleKey === 'login'">
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
          <a-row>
            <a-col span="24">
              <a-form-model-item prop="username">
                <a-input addon-before="用户名" v-model="form.username" placeholder="请输入用户名" />
              </a-form-model-item>
            </a-col>
            <a-col span="24">
              <a-form-model-item prop="password">
                <a-input addon-before="密码" v-model="form.password" type="password" placeholder="请输入密码" />
              </a-form-model-item>
            </a-col>
            <a-col span="24">
              <a-form-model-item prop="code">
                <div class="codeStyle">
                  <a-input addon-before="验证码" v-model="form.code" placeholder="请输入验证码" />
                  <div @click="_getCode" class="svg" v-html="svg"></div>
                </div>
              </a-form-model-item>
            </a-col>

            <a-col :span="24" style="margin-top: 20px;">
              <a-space>
                <a-button type="primary" @click="submit">点击登录</a-button>
                <a-button class="forget-pwd" type="link" ghost>
                  <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                </a-button>
              </a-space>
            </a-col>

            <!-- <a-col :span="24">
              <div class="layui-form-item fly-form-app">
                <span>或者使用社交账号登入</span>
                <a href onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-QQ" title="QQ登入"></a>
                <a href onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-xinlangweibo" title="微博登入"></a>
              </div>
            </a-col> -->
          </a-row>
        </a-form-model>
      </p>
    </a-card>
  </div>
</template>
<script>
import { getCode, login } from '@/api/login'
import uuid from 'uuid/dist/v4'

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      tabListNoTitle: [
        {
          key: 'login',
          tab: '登入'
        },
        {
          key: 'reg',
          tab: '注册'
        }
      ],
      noTitleKey: 'login',
      svg: '',
      form: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户', trigger: 'change' },
          { pattern: new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'), message: '请输入正确的邮箱', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, message: '不符合最小长度要求', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { min: 4, message: '验证码长度必须为4', trigger: 'change' },
          { max: 4, message: '验证码长度必须为4', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    window.vue = this
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    console.log(sid)
    this._getCode(sid)
  },
  methods: {
    // 获取验证码
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    // tab 改变
    onTabChange (key, type) {
      this.$router.push(key)
    },
    // 登陆
    async submit () {
      try {
        const valid = await this.$refs.ruleForm.validate()
        if (!valid) {
          return
        }
      } catch (err) {
        return this.notifyError('登陆错误,请输入必填项!')
      }
      const params = Object.assign({}, this.form, {
        sid: this.$store.state.sid
      })
      login(params).then(res => {
        if (res.code === 200) {
          this.$refs.ruleForm.resetFields()
          this.notifySuccess('登录成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.app-container {
  ::v-deep .ant-form-item-children {
    display: flex;
  }
  ::v-deep .ant-input-wrapper {
    width: 300px;
  }
  ::v-deep .ant-input-group-addon {
    width: 8em;
  }
  ::v-deep .forget-pwd {
    color: #000000;

    &:hover {
      color: #009688;
    }
  }

  .codeStyle {
    position: relative;
    height: 32px;
    line-height: 32px;

    .svg {
      position: absolute;
      top: -12px;
      left: 315px;
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
