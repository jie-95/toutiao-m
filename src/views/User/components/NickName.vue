<template>
  <van-popup
    v-model="isNickName"
    position="bottom"
    :style="{ height: '100%' }"
    @open="chuanzhi"
  >
    <van-nav-bar
      class="pup"
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="isNickName = false"
      @click-right="onClickRight"
    />
    <van-cell-group>
      <van-field v-model="value" maxlength="7" show-word-limit />
    </van-cell-group>
  </van-popup>
</template>

<script>
import { changeUserInfo } from '@/api'
export default {
  data() {
    return {
      isNickName: false,
      value: ''
    }
  },
  props: {
    isNick123: {
      type: Boolean,
      required: true
    },
    nname: {
      type: String
    }
  },
  watch: {
    isNick123(val) {
      this.isNickName = val
      console.log(val)
    },
    isNickName(val) {
      this.$parent.isNick = val
    }
  },

  mounted() {},
  methods: {
    async getUserName() {
      await changeUserInfo({ name: this.value })
      this.$parent.userInfo.name = this.value
      console.log('发送了请求')
      console.log(this.value)
    },
    chuanzhi() {
      this.value = this.nname
    },
    onClickRight() {
      // console.log('23')
      this.getUserName()
      this.isNickName = false
    }
  }
}
</script>

<style scoped lang="less">
.pup {
  background-color: #fff !important;
  color: #000;
}
:deep(.van-nav-bar__text) {
  color: #1989fa;
}
</style>
