<template>
  <div class="mbody">
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">
        <div class="login-left">
          <div class="users">
            <img :src="`${userInfo.photo}`" alt="" />
            <span class="username">{{ userInfo.name }}</span>
          </div>
          <button class="btn" @click="$router.push('/user')">编辑资料</button>
        </div>
        <div class="grid">
          <span class="grig-span">
            <span>{{ userInfo.art_count }}</span>
            <span>头条</span>
          </span>
          <span class="grig-span">
            <span>{{ userInfo.fans_count }}</span>
            <span>粉丝</span>
          </span>
          <span class="grig-span">
            <span>{{ userInfo.follow_count }}</span>
            <span>关注</span>
          </span>
          <span class="grig-span">
            <span>{{ userInfo.like_count }}</span>
            <span>获赞</span>
          </span>
        </div>
      </div>
      <div class="logout" v-else>
        <img src="../../assets/images/mobile.png" alt="" />

        <div @click="$router.push('/login')">登陆/注册</div>
      </div>
    </header>

    <!-- 中间 -->
    <main>
      <div class="top">
        <div class="zhongjian">
          <div class="icon"><van-icon name="star-o" /></div>
          <div class="text">收藏</div>
        </div>
        <div class="zhongjian">
          <div class="icon"><van-icon name="clock-o" /></div>
          <div class="text">历史</div>
        </div>
      </div>
      <div class="b">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
      <van-cell v-if="isLogin" @click="logOut">退出</van-cell>
    </main>
  </div>
</template>

<script>
import { userInfo } from '@/api'
export default {
  name: 'home',
  data() {
    return {
      userInfo: ''
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    logOut() {
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        const { data } = await userInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.mbody {
  height: 100vh;
  background-color: #f5f7f9;
}
.login {
  font-size: 30px;
  height: 260px;
  background: url('../../assets/images/banner.png');
  background-size: 100% 100%;
  padding-top: 140px;
  .login-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
  }
  .users {
    display: flex;
    align-items: center;
  }
  img {
    width: 67.6 * 2px;
    height: 67.6 * 2px;
    border: 1px solid #fff;
    border-radius: 50%;
  }

  .username {
    margin-left: 20px;
    color: #fff;
  }
  .btn {
    width: 116px;
    height: 38px;
    font-size: 0.266rem;
    padding: 0;
    vertical-align: middle;
    border-radius: 16px;
    border: 0;
    color: #666;
  }
  .grid {
    height: 78px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .grig-span {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      text-align: center;
      color: #fff;
      padding-top: 20px;
      font-size: 12px;
    }
  }
}
main {
  width: 100%;
}
main .top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 154px;
  background-color: #fff;
  .zhongjian {
    padding-top: 24px;
    width: 50%;
    width: 100%;
    text-align: center;
    border: 1px solid #f5f7f9;

    .icon {
      color: #eb5253;

      font-size: 0.6rem;
    }
    .text {
      color: #646566;
      font-size: 0.32rem;
      line-height: 1.5;
      word-break: break-all;
    }
  }
}
main .b {
  margin: 20px 0;
}
:deep(.van-cell__value--alone) {
  width: 100%;
  color: #ff0000 !important;
  font-size: 28px;
  text-align: center;
}
// 未登录
.logout {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-items: ;
  font-size: 30px;
  height: 260px;
  background: url('../../assets/images/banner.png');
  background-size: 100% 100%;
  padding-top: 140px;
  img {
    width: 67.6 * 2px;
    height: 67.6 * 2px;
    border: 1px solid #fff;
    border-radius: 50%;
  }
  div {
    margin-top: 15px;
    font-size: 28px;
    color: #fff;
  }
}
</style>
