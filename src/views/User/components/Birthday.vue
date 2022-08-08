<template>
  <van-popup v-model="isBirthDay" position="bottom" :style="{ height: '30%' }">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
    <!-- @click-right="onClickRight" -->
  </van-popup>
</template>

<script>
import dayjs from 'dayjs'
import { changeUserInfo } from '@/api'

export default {
  data() {
    return {
      isBirthDay: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2025, 11, 1),
      currentDate: new Date(2021, 0, 17),
      date: ''
    }
  },
  props: {
    isBirth: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onCancel() {
      this.$parent.isBirthDay = false
      console.log('取消')
    },
    onConfirm() {
      this.$parent.isBirthDay = false
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      this.date = date
      this.changeBirthDay()
    },
    async changeBirthDay() {
      await changeUserInfo({ birthday: this.date })
      this.$parent.userInfo.birthday = this.date
    }
  },
  watch: {
    isBirth(val) {
      this.isBirthDay = val
      // console.log(val)
    },
    isBirthDay(val) {
      this.$parent.isBirthDay = val
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
  color: #969799;
}
</style>
