<template>
  <div style="color: #fff" class="update-avator">
    <img :src="photo" class="img" alt="" ref="image" />
    <footer>
      <span @click="$parent.$parent.isAvator = false">取消</span>
      <span @click="uploadAvator">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvator } from '@/api/user/'
export default {
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    uploadAvator() {
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '头像正在上传 ',
          forbidClick: true,
          duration: 0
        })
        try {
          const { data } = await uploadAvator(blob)
          console.log(data)
          this.$emit('upload-avator', data.data.photo)
          this.$parent.$parent.isAvator = false
          this.$toast.success('头像上传成功')
        } catch (error) {
          console.log(error)
          this.$toast.fail('头像上传失败')
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped lang="less">
.update-avator {
  position: relative;
  height: 100%;
}
img {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 65%;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 40px;
}
</style>
