<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 用户信息 -->
    <van-cell-group>
      <van-cell title="头像" value="内容" is-link @click="$refs.file.click()">
        <van-image
          round
          width="0.8rem"
          height="0.8rem"
          :src="`${userInfo.photo}`"
        />
        <!-- accept 默认文件类型 -->
        <input
          type="file"
          hidden
          ref="file"
          accept=".png,.jpg,.jpeg"
          @change="selectPhoto"
        />
      </van-cell>
      <van-cell title="昵称" is-link>{{ userInfo.name }}</van-cell>
      <van-cell title="性别" is-link>{{
        userInfo.gender == 1 ? '男' : '女'
      }}</van-cell>
      <van-cell title="生日" is-link>{{ userInfo.birthday }}</van-cell>
    </van-cell-group>
    <van-popup
      v-model="isAvator"
      :style="{ width: '100%', height: '100%' }"
      closeable
      class="avator-popup"
    >
      <updateAvator :photo="photo" @upload-avator="userInfo.photo = $event" v-if="isAvator"/>
    </van-popup>
  </div>
</template>

<script>
import { resolveToBase64 } from '@/utils/index'
import updateAvator from '@/views/User/components/UpdataAvator.vue'
import { getUserInfo } from '@/api'
export default {
  name: 'user',
  data() {
    return {
      userInfo: {},
      isAvator: false,
      photo: ''
    }
  },
  components: {
    updateAvator
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('用户信息获取失败，请重试')
      }
    },
    async selectPhoto(e) {
      // 1.获取用户选择的图片对象
      // -e.target触发事件的对象
      // -file 为数组，储存用户选择的所有文件对象
      // this.isAvator = true
      const file = e.target.files[0]
      // 2.把file文件对象处理成immg标签可以识别的url
      // const url = window.URL.createObjectURL(file)
      // console.log(url)
      // 3.传递u'r'l
      // this.photo = url

      // 4 清空value
      // e.target.value = ''

      const url = await resolveToBase64(file)
      this.photo = url
      e.target.value = ''
      this.isAvator = true
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
