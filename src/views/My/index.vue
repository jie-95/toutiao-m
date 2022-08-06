<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">
        登陆后的
        <button @click="$router.push('/user')">编辑资料</button>
      </div>
      <div class="logout" v-else>
        未登陆的
        <button @click="$router.push('/login')">去登陆</button>
      </div>
    </header>

    <!-- 中间 -->
    <main>中间/收藏/历史/小姿</main>

    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logOut">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logOut() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style scoped lang="less">
.login {
  font-size: 30px;
}
</style>
