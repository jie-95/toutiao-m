<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <!-- <div class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div> -->
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ art.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="`${art.aut_photo}`"
          />
          <div slot="title" class="user-name">{{ art.aut_name }}</div>
          <div slot="label" class="publish-date">{{ art.pubdate }}</div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="art.content"></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <!-- <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div> -->
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div> -->
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <Comment :artId="art_id"></Comment>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        @click="write"
        class="comment-btn"
        type="default"
        round
        size="small"
        >写评论</van-button
      >
      <i><van-icon name="comment-o" :badge="art.comm_count" color="#777" /></i>
      <!-- ===========收藏============ -->
      <i @click="collect">
        <van-icon v-if="isCollect" color="#ff9632" name="star" />
        <van-icon v-else color="#777" name="star-o" />
      </i>
      <!-- /===========收藏============ -->
      <!-- ==========点赞============== -->
      <i @click="favor">
        <van-icon
          v-if="art.attitude == 0"
          color="#777"
          name="good-job-o"
          :badge="like"
        />
        <van-icon
          v-else-if="art.attitude == 1"
          color="#ff9632"
          name="good-job"
          :badge="like"
        />
        <van-icon v-else name="good-job" :badge="like" />
      </i>
      <!-- /==========点赞============== -->

      <!-- <van-icon color="#777" name="good-job-o" />
      <van-icon name="good-job" /> -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 回复蒙层 -->
    <Answer :artId="art_id"></Answer>
    <!-- /回复蒙层 -->
    <WriteMessage
      @changeIsShow="changeIsShow"
      :isShow="isShowWriteMsg"
      :artId="art_id"
    ></WriteMessage>
  </div>
</template>

<script>
import WriteMessage from '@/components/WriteMessage.vue'
import Comment from '@/components/Comment.vue'
import Answer from '@/components/Answer.vue'
import 'github-markdown-css/github-markdown.css'
import {
  getArtAPI,
  getLikingsAPI,
  isShouCangAPI,
  unCollect,
  unLikingsAPI,
  nomalLikeAPI
} from '@/api'
export default {
  data() {
    return {
      art: {},
      art_id: '',
      isShowWriteMsg: false,
      // 评论数量
      total: '',
      // 点赞数量
      like: '',
      // 收藏状态
      isCollect: ''
    }
  },

  name: 'ArticleIndex',
  components: {
    Comment,
    Answer,
    WriteMessage
  },
  props: {},

  computed: {},
  watch: {},
  created() {
    this.art_id = this.$route.params.artId
  },
  mounted() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      this.$toast.loading('文章加载中')
      try {
        const {
          data: { data }
        } = await getArtAPI(this.$route.params.artId)
        console.log(data)
        this.art = data
        this.isCollect = data.is_collected
        this.like = data.like_count
        this.like = data.like_count
        this.$toast.success('文章加载成功')
      } catch (error) {
        this.$toast.fail('文章加载失败，请重试')
      }
    },
    changeIsShow(val) {
      this.isShowWriteMsg = val
    },
    write() {
      console.log('写评论')
      this.isShowWriteMsg = true
    },
    // 字体图标控制
    // 收藏
    async collect() {
      console.log(this.art.is_collected)
      if (this.art.is_collected === false) {
        // 收藏
        try {
          console.log(this.art_id)
          const res = await isShouCangAPI({ target: this.art_id })
          console.log(res)
          this.isCollect = true
          // console.log();
        } catch (error) {
          console.log(error)
        }
      } else {
        // 取消收藏
        try {
          console.log(this.art_id)
          await unCollect(this.art_id)
          this.isCollect = false
        } catch (error) {
          console.log(error)
        }
      }
    },
    // 收藏
    // 点赞
    async favor() {
      if (this.art.attitude === 0) {
        // 喜欢
        await getLikingsAPI({ target: this.art_id })
        // const a = await getArtAPI(this.$route.params.artId)
        // console.log(a)
        this.art.attitude = 1
      } else if (this.art.attitude === 1) {
        // 不喜欢
        try {
          await unLikingsAPI({ target: this.art_id })
          this.art.attitude = -1
        } catch (error) {
          console.log(error)
        }
      } else {
        // 取消不喜欢
        try {
          await nomalLikeAPI(this.art_id)
          this.art.attitude = 0
        } catch (error) {
          console.log(error)
        }
      }
    }

    // 点赞
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
