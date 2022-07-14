<template>
  <div class="mainSection">
    <headers></headers>
    <section class="main">
      <div v-for="(item, index) in blogs" :key="index" class="mainArea">
        <!-- 头像 -->
        <div class="imgArea">
          <img :src="item.user.avatar" alt="头像" />
          <p>
            <router-link :to="`/detail/${item.id}`">{{ item.user.username }}</router-link>
          </p>
        </div>
        <!-- 标题 -->
        <div class="titleArea">
          <h3>
            <router-link :to="`/detail/${item.id}`">{{ item.title }}</router-link>
          </h3>
        </div>
        <!-- 文章内容 -->
        <div class="sectionArea">
          <p>
            <router-link :to="`/detail/${item.id}`">{{ item.description }}</router-link>
          </p>
        </div>
      </div>

      <div class="block">
        <el-pagination layout="prev, pager, next" :total="total" :current-page="page" @current-change="onPageChange">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import headers from '../components/header'
import request from '@/helper/request.js'
export default {
  data () {
    return {
      blogs: [],
      total: 0,
      page: 1
    }
  },
  components: {
    headers
  },
  created () {
    this.getBlogs()
  },
  methods: {
    async getBlogs () {
      let res = await request.getIndexBlogs({ page: this.page })
      // console.log(res)
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
    },
    onPageChange (val) {
      // console.log(val)
      this.page = val
      this.getBlogs()
    }
  }
}
</script>

<style lang="less" scoped>
a {
  color: black;
}
.main {
  max-width: 1000px;
  min-width: 300px;
  height: 100%;
  margin: 50px auto;
  border: 1px solid rgba(18, 18, 18, 1%);
}
.mainSection {
  height: 100%;
}
.main .mainArea {
  display: grid;
  max-width: 900px;
  min-width: 300px;
  height: 100px;
  background: #fff;
  margin: 20px auto;
  grid-template-columns: 90px 1fr;
  grid-template-rows: 40px 1fr;
  grid-template-areas:
    'mainArea titleArea'
    'mainArea sectionArea';
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
}
.imgArea {
  grid-area: mainArea;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.titleArea {
  grid-area: titleArea;
  line-height: 40px;
}
.sectionArea {
  grid-area: sectionArea;
  font-size: 14px;
}
.sectionArea > p {
  height: 60px;
  width: 100%;
  overflow: hidden;
}
.imgArea > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.block {
  max-width: 900px;
  min-width: 300px;
  padding: 0 27px;
}
</style>
