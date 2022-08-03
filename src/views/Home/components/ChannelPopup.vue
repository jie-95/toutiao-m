<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button round size="small" class="edit-btn" @click="isEdit = !isEdit">
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>

    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        class="mychannel-item"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
        @click="changeActive(index,item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels as getAllChannelsAPI } from '@/api'
export default {
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannels()
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((aItem) => {
        return !this.myChannels.find((mItem) => mItem.id === aItem.id)
      })
    }
  },
  methods: {
    async getAllChannels() {
      try {
        const { data } = await getAllChannelsAPI()
        this.allChannels = data.data.channels
        console.log(this.allChannels)
      } catch (error) {
        this.$toast.fail('获取频道失败，请刷新重试')
      }
    },
    changeActive(index, item) {
      if (!this.isEdit) {
        this.$parent.$parent.show = false
        this.$emit('change-active', index)
      } else {
        if (item.name === '推荐') return
        this.$emit('del-channel', item.id)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel {
  padding-top: 1.33333rem;

  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }

  :deep(.van-grid-item__content) {
    background-color: #eee;
  }

  .recommend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      align-items: center;
    }
    :deep(.van-grid-item__icon) {
      font-size: 40px;
    }
    :deep(.van-grid-item__icon) {
      font-size: 20px;
    }
    :deep(.van-grid-item__text) {
      margin: 0;
    }
  }

  :deep(.mychannel-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 25px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
  .active {
    :deep(.van-grid-item__text) {
      color: red;
    }
  }
}
</style>
