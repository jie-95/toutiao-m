<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit" ref="forms">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="text"
        type="text"
        name="text"
        label="密码"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>

        <template #button>
          <van-button
            round
            size="mini"
            class="code-btn"
            native-type="button"
            v-if="isShow"
            @click="sendCode"
            >获取验证码</van-button
          >

          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            @finish="isShow = true"
            v-else
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { codeRules, mobileRules } from '@/views/login/rules'
import { login, getCodeApi } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      text: '',
      codeRules,
      mobileRules,
      isShow: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      try {
        this.loading()
        const {
          data: { data: token }
        } = await login(this.mobile, this.text)
        this.$store.commit('SET_TOKEN', token)
        this.$router.push('/my')
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.success('登录失败')
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.forms.validate('mobile').then(async () => {
        this.loading()
        try {
          await getCodeApi(this.mobile)
          this.$toast.success('验证码获取成功发')
          this.isShow = false
        } catch (error) {
          const status = error.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = error.response.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
// top
:deep(.van-nav-bar__content) {
  background-color: #3296fa;
  .van-icon-arrow-left{
    color: #fff;

  }
  .van-nav-bar__title {
    color: #fff;
  }
}
:deep(.code-btn) {
  &.van-button--mimi {
    padding: 0 0.02rem;
  }
  &.van-button--default {
    background: #eeeeee;
    color: #a9929b;
  }
}
</style>
