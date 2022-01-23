<template>
  <div class="app-container">
    <a-card
      style="width:100%;border: none;"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="key => onTabChange(key, 'noTitleKey')"
    >
      <p v-if="noTitleKey === 'forget'">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 10 }">
          <a-row>
            <a-col span="24">
              <a-form-model-item prop="username">
                <a-input addon-before="用户名" v-model="form.username" placeholder="请输入用户名" />
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
              <a-button type="primary" @click="forget()"> 找回密码 </a-button>
            </a-col>
          </a-row>
        </a-form-model>
      </p>
    </a-card>

  </div>
</template>
<script>
import { getCode, forget } from '@/api/login'

export default {
  name: 'Forget',
  data () {
    return {
      tabListNoTitle: [
        {
          key: 'login',
          tab: '登入'
        },
        {
          key: 'forget',
          tab: '忘记密码'
        }
      ],
      noTitleKey: 'forget',
      svg: '',
      form: {
        username: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户', trigger: 'change' },
          { pattern: new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'), message: '请输入正确的邮箱', trigger: 'change' }],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { min: 4, message: '验证码长度必须为4', trigger: 'change' },
          { max: 4, message: '验证码长度必须为4', trigger: 'change' }]
      }
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    // 获取验证码
    _getCode () {
      getCode().then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    // tab 改变
    onTabChange (key, type) {
      this.$router.push(key)
    },
    async forget () {
      try {
        const valid = await this.$refs.ruleForm.validate()
        if (!valid) {
          return
        }
      } catch (err) {
        return this.$message.warning('请输入必填项')
      }
      forget({
        username: this.form.username,
        code: this.form.code
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          // alert('邮件发送成功')
          this.$message.success('邮件发送成功')
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
</style>
