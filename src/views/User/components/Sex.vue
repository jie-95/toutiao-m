<template>
  <van-popup
    v-model="isSex"
    position="bottom"
    :style="{ height: '30%' }"
    @close="changeIsSex"
  >
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
    <!-- @click-right="onClickRight" -->
  </van-popup>
</template>

<script>
import { changeUserInfo } from '@/api'
export default {
  data() {
    return {
      value: '男',
      isSex: false,
      columns: ['男', '女'],
      index: ''
    }
  },
  props: {
    isSex1: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onConfirm(value, index) {
      console.log(`${value},${index}`)
      this.index = `${index}`
      this.changeSex()
    },
    onCancel() {
      this.isSex = false
      this.$parent.isSex = false
    },
    changeIsSex() {
      this.$parent.isSex = false
    },
    async changeSex() {
      console.log(this.index)
      await changeUserInfo({ gender: this.index })
      this.$parent.userInfo.gender = this.index
      this.$parent.isSex = false
    }
  },
  watch: {
    isSex1(val) {
      this.isSex = val
    }
  }
}
</script>

<style scoped lang="less">
.pup {
  background-color: #fff !important;
}
.van-nav-bar {
  color: #000;
}
:deep(.van-nav-bar__text) {
  color: #969799;
}
</style>
