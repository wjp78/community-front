<template>
  <div class="controller">
    <a-card style="width:100%" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey" @tabChange="key => onTabChange(key, 'noTitleKey')">
      <p v-if="noTitleKey === 'reg'">
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
          <a-row>
            <a-col span="24">
              <a-form-model-item prop="username">
                <a-input v-model="form.username" addon-before="用户名" placeholder="请输入用户名" />
                <div class="input-tips">将会成为您唯一的登入名</div>
              </a-form-model-item>
            </a-col>
            <a-col span="24">
              <a-form-model-item prop="name">
                <a-input v-model="form.name" addon-before="昵称" placeholder="请输入昵称" />
              </a-form-model-item>
            </a-col>
            <a-col span="24">
              <a-form-model-item prop="password">
                <a-input v-model="form.password" addon-before="密码" type="password" placeholder="请输入密码" />
                <div class="input-tips">6到16个字符</div>
              </a-form-model-item>
            </a-col>
            <a-col span="24">
              <a-form-model-item prop="repassword">
                <a-input v-model="form.repassword" addon-before="确认密码" type="password" placeholder="请输入密码" />
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
              <a-button type="primary" @click="Register"> 立即注册 </a-button>
            </a-col>

            <a-col :span="24">
              <div class="layui-form-item fly-form-app">
                <span>或者直接使用社交账号快捷注册</span>
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
import { getCode, reg } from '@/api/login'

export default {
  name: 'Reg',
  data() {
    const validatorPwd = (rules, value, callback) => {
      if (value) {
        if (value.length < 6) {
          callback(new Error('不符合最小长度要求'))
        } else if (value.length < 17) {
          callback()
        } else {
          callback(new Error('The 密码 value is not valid'))
        }
        if (this.form.repassword.length > 5 && this.form.repassword.length < 17) {
          this.$refs.ruleForm.validateField('repassword')
        }
      }
    }

    const validatorRePwd = (rules, value, callback) => {
      if (value) {
        if (value.length < 6) {
          callback(new Error('不符合最小长度要求'))
        } else if (value.length < 17) {
          if (value !== this.form.password) return callback(new Error('两次输入内容不一致'))
          callback()
        } else {
          callback(new Error('The 密码 value is not valid'))
        }
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
      noTitleKey: 'reg',
      svg: '',
      form: {
        username: '',
        name: '',
        password: '',
        repassword: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户', trigger: 'change' },
          { pattern: new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'), message: '请输入正确的邮箱', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入昵称', trigger: 'change' },
          { min: 4, message: '请在昵称输入至少4个字符', trigger: 'change' },
          { pattern: new RegExp('\\D+'), message: '不能以纯数字为昵称', trigger: 'change' },
          { pattern: new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5]+$'), message: '只能包含中文、英文字母、数字和下划线', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { validator: validatorPwd, trigger: 'change' }
        ],
        repassword: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { validator: validatorRePwd, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { min: 4, message: '验证码长度必须为4', trigger: 'change' },
          { max: 4, message: '验证码长度必须为4', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this._getCode()
  },
  methods: {
    // 获取验证码
    _getCode() {
      getCode().then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    // tab 改变
    onTabChange(key, type) {
      this.$router.push(key)
    },
    async Register() {
      try {
        const valid = await this.$refs.ruleForm.validate()
        if (!valid) {
          return
        }
      } catch (err) {
        return this.$message.warning('注册错误,请输入必填项')
      }
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

  .input-tips {
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 310px;
    line-height: 32px;
  }
}
</style>
