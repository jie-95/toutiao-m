<template>
  <div>
    <van-popup
      class="mask"
      v-model="isShowWriteMsg"
      position="bottom"
      :style="{ height: '18%' }"
      @close="changeIsShow"
    >
      <van-field
        class="field"
        rows="3"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        v-model="value"
      />
      <van-button
        class="send"
        @click="sendMsg"
        :disabled="value.trim() ? false : true"
        type="info"
        >发布</van-button
      >
      <!-- <div class="send" @click="sendMsg">发布</div> -->
    </van-popup>
  </div>
</template>

<script>
import { sendCommentsAPI } from '@/api'
export default {
  data() {
    return {
      isShowWriteMsg: false,
      value: '',
      // 新增的评论返回值
      newComment: {}
    }
  },
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    artId: {
      type: String || Number,
      required: true
    }
  },
  methods: {
    changeIsShow() {
      this.$parent.isShowWriteMsg = false
    },
    sendMsg() {
      this.isShowWriteMsg = false
      console.log(this.value)
      this.sendComment()
      this.value = ''
    },
    async sendComment() {
      console.log(123)
      const {
        data: { data }
      } = await sendCommentsAPI({
        target: this.artId,
        content: this.value
      })
      console.log(data.new_obj)
      this.newComment = data.new_obj
      this.$bus.$emit('newObj', this.newComment)
    }
  },
  watch: {
    isShow(val) {
      this.isShowWriteMsg = val
    }
  }
  //   created() {
  //     console.log(this.artId)
  //   }
}
</script>

<style scoped lang="less">
.mask {
  display: flex;
  align-items: center;
  padding: 32px;
  .field {
    background-color: #f5f7f9;
    width: 578px;
  }
  .send {
    color: #6ba3d8;
    background-color: #fff;
    border: 0;
    font-size: 28px;
    text-align: center;
    line-height: 86px;
    height: 86px;
    flex: 1;
  }
}
</style>
