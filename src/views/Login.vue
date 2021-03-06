<template>
  <div class="controller">
    <a-card style="width:100%" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey" @tabChange="key => onTabChange(key, 'noTitleKey')">
      <p v-if="noTitleKey === 'login'">
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
          <a-row>
            <a-col span="24">
              <a-form-model-item prop="username">
                <a-input v-model="form.username" addon-before="用户名" placeholder="请输入用户名" />
              </a-form-model-item>
            </a-col>
            <a-col span="24">
              <a-form-model-item prop="password">
                <a-input v-model="form.password" addon-before="密码" type="password" placeholder="请输入密码" />
              </a-form-model-item>
            </a-col>
            <a-col span="24">
              <a-form-model-item prop="code">
                <div class="codeStyle">
                  <a-input v-model="form.code" addon-before="验证码" placeholder="请输入验证码" />
                  <div class="svg" @click="_getCode" v-html="svg" />
                </div>
              </a-form-model-item>
            </a-col>

            <a-col :span="24" style="margin-top: 20px;">
              <a-space>
                <a-button type="primary" @click="submit"> 点击登录 </a-button>
                <a-button class="forget-pwd" type="link" ghost>
                  <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                </a-button>
              </a-space>
            </a-col>

            <a-col :span="24">
              <div class="layui-form-item fly-form-app">
                <span>或者使用社交账号登入</span>
                <a href onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入" />
                <a href onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入" />
              </div>
            </a-col>
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
  data() {
    const checkCode = (rule, value, callback) => {
      if (this.codeStatus) {
        callback()
      } else {
        callback(new Error('验证码输入不正确!'))
      }
    }
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
      codeStatus: true,
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
          { max: 4, message: '验证码长度必须为4', trigger: 'change' },
          { validator: checkCode, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'form.code'(newVal) {
      if (newVal && !this.codeStatus) this.codeStatus = true
    }
  },
  mounted() {
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
    _getCode() {
      const sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    // tab 改变
    onTabChange(key, type) {
      this.$router.push(key)
    },
    // 登陆
    async submit() {
      try {
        const valid = await this.$refs.ruleForm.validate()
        if (!valid) {
          return
        }
      } catch (err) {
        return this.$message.warning('登陆错误,请输入必填项')
      }
      const params = Object.assign({}, this.form, {
        sid: this.$store.state.sid
      })
      login(params)
        .then(res => {
          if (res.code === 200) {
            this.$refs.ruleForm.resetFields()
          } else if (res.code === 401) {
            this.codeStatus = false
            this.$refs.ruleForm.validateField('code', err => {
              console.log('err', typeof err)
            })
          } else {
            this.$message.error('您的账号或者密码输入错误!')
          }
        })
        .catch(err => {
          const data = err.response.data
          if (data.code === 500) {
            this.$alert('用户名密码校验失败,请检查!')
          } else {
            this.$alert('服务器错误')
          }
          console.log('~ err', err.response)
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
  width: 100%;
  margin: 0 auto;
  margin-top: 15px;
  background-color: #fff;

  ::v-deep .forget-pwd {
    color: #000000;

    &:hover {
      color: #1890ff;
    }
  }

  ::v-deep .ant-form-item-children {
    display: flex;
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

.ant-input-group-wrapper::v-deep .ant-input-wrapper {
  width: 300px;
}
</style>
