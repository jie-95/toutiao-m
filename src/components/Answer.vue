<template>
  <div>
    <!-- 蒙层 -->
    <van-popup
      v-model="isAnswerMask"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
      <van-cell class="comment">
        <img :src="`${comments.aut_photo}`" alt="" />
        <div class="comment-right">
          <div class="top">
            <span class="left">{{ comments.aut_name }} </span>
            <span class="right"
              ><van-icon name="good-job-o" />{{
                comments.like_count === 0 ? '赞' : comments.like_count
              }}</span
            >
          </div>
          <div class="center">{{ comments.content }}</div>
          <div class="foot">
            <span>{{ comments.pubdate }}</span>

            <button @click="btn" class="btn">
              回复{{ comments.reply_count }}
            </button>
          </div>
        </div>
      </van-cell>
      <van-cell title="全部回复" />
      <!-- ========================================== -->
      <van-cell class="comment" v-for="item in answer" :key="item.com_id">
        <img :src="`${item.aut_photo}`" alt="" />
        <div class="comment-right">
          <div class="top">
            <span class="left">{{ item.aut_name }} </span>
            <span class="right"
              ><van-icon name="good-job-o" />{{
                item.like_count === 0 ? '赞' : item.like_count
              }}</span
            >
          </div>
          <div class="center">{{ item.content }}</div>
          <div class="foot">
            <span>{{ item.pubdate }}</span>

            <button @click="btn" class="btn">
              回复{{ item.reply_count }}
            </button>
          </div>
        </div>
      </van-cell>
    </van-popup>
    <!-- 蒙层 -->
  </div>
</template>

<script>
import { getCommentsAPI } from '@/api'
export default {
  data() {
    return {
      comments: '',
      isAnswerMask: false,
      answer: ''
    }
  },
  props: {
    artId: {
      type: String || Number,
      required: true
    }
  },

  methods: {
    onClickLeft() {
      this.isAnswerMask = false
    },

    btn() {
      // console.log(this.artId)
    },
    // 获取评论的评论
    async getComments(val) {
      const {
        data: { data: results }
      } = await getCommentsAPI({
        type: 'c',
        source: val
      })
      this.answer = results.results
      // console.log(this.answer)
    },
    // 获取评论的评论
    chanageisMask(val, comId, item) {
      this.isAnswerMask = val
      this.getComments(comId)
      // console.log(item)
      this.comments = item
    }
  },
  mounted() {
    this.$bus.$on('isMask', this.chanageisMask)
  },
  beforeDestroy() {
    this.$bus.$off('isMask')
  }
}
</script>

<style scoped lang="less">
// 评论

.comment {
  width: 100%;
  height: 236px;
  padding: 20px 32px;
  .van-cell__value {
    display: flex;
  }
  img {
    width: 72px;
    height: 72px;
    margin-right: 0.3333rem;
    border-radius: 50%;
  }
  .comment-right {
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 48px;
      .left {
        font-size: 26px;
        color: #406599;
      }
      .right {
        font-size: 26px;
        color: #000;
      }
    }
    .center {
      width: 100%;
      height: 36px;
      margin: 32px 0;
      color: #222;
      font-size: 32px;
    }
    .foot {
      width: 100%;
      height: 48px;
      span {
        font-size: 24px;
        margin-right: 25px;
        color: #222;
      }
      .btn {
        width: 135px;
        height: 48px;
        font-size: 24px;
        background-color: #fff;
        border-color: #ccc !important;
        border: 0.5px solid #222;
        border-radius: 24px;
        // text-align: center;
        line-height: 48px;
      }
    }
  }
}

// 评论
</style>
