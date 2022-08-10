<template>
  <!-- 评论区 -->
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell class="comment" v-for="item in comments" :key="item.com_id">
        <img :src="`${item.aut_photo}`" alt="" />
        <div class="comment-right">
          <div class="top">
            <span class="left">{{ item.aut_name }}</span>
            <span class="right"
              ><van-icon name="good-job-o" />
              {{ item.like_count === 0 ? '赞' : item.like_count }}</span
            >
          </div>
          <div class="center">{{ item.content }}</div>
          <div class="foot">
            <span>{{ item.pubdate }}</span>

            <button @click="answer(item.com_id, item)" class="btn">
              回复{{ item.reply_count }}
            </button>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
  <!-- /评论区 -->
</template>

<script>
import { getCommentsAPI } from '@/api'
export default {
  data() {
    return {
      comments: '',
      loading: false,
      finished: false,
      total: ''
    }
  },
  props: {
    artId: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    async getComments() {
      const {
        data: { data }
      } = await getCommentsAPI({
        type: 'a',
        source: this.artId
      })
      console.log(data)
      this.comments = data.results
      this.total = data.total_count
      console.log(this.total)
      this.$parent.total = this.total
    },
    onLoad() {},
    answer(comId, item) {
      // console.log(comId)
      this.$bus.$emit('isMask', true, comId, item)
    },
    // 添加新增评论数据
    pushNewObj(newObj) {
      this.comments.unshift(newObj)
    }
  },
  mounted() {
    console.log(this.artId)
    this.getComments()
    console.log(this.total)
    this.$bus.$on('newObj', this.pushNewObj)
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
