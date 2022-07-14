<template>
  <div>
    <exitbutton></exitbutton>
    <section class="main">
      <div class="image">
        <img :src="img" alt="" />
        <h3>{{ username }}</h3>
      </div>
      <br />
      <h2>{{ title }}</h2>
      <br />
      <div v-html="markdown"></div>
    </section>
  </div>
</template>

<script>
import { marked } from 'marked'
import exitbutton from '@/components/exit'
import request from '@/helper/request'
export default {
  components: {
    exitbutton
  },
  data () {
    return {
      img: '',
      username: '',
      title: '',
      description: ''
    }
  },
  async beforeCreate () {
    this.blogId = this.$route.params.blogId
    let res = await request.getDetail({ blogId: this.blogId })
    // console.log(res.data)
    this.img = res.data.user.avatar
    this.username = res.data.user.username
    this.title = res.data.title
    this.description = res.data.description
  },
  computed: {
    markdown () {
      return marked(this.description)
    }
  }

}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  min-width: 300px;
  min-height: 100%;
  margin: 50px auto;
  border: 1px solid rgba(18, 18, 18, 1%);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 40px;
  border-radius: 5px;
}
.main img {
  border-radius: 5px;
}
.main .image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
