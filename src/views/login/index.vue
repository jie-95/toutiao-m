<template>
  <div>
    <van-nav-bar
  title="登录"
  
/>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入手机号"
        :rules="mobileRules"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入验证码"
        :rules="codeRules"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import{codeRules,mobileRules} from "@/views/login/rules"
import { login,} from "@/api/user"
export default {
  name:"Login",
  data() {
    return {
      username: "",
      password: "",
      codeRules,
      mobileRules
    };
  },
  methods: {
   async onSubmit() {
      try {
        const res = await login(this.mobile,this.code)
        this.$toast.success("登录成功")
      } catch (error) {
        this.$toast.success("登录失败")
        const status = error.response.status
        let message = "请重新登录"
        if(status == 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)

      }
    },
  },
};
</script>

<style>
</style>