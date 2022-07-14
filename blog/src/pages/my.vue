<template>
  <div>
    <exitbutton></exitbutton>
    <section class="main">
      <div class="image">
        <img :src="user.avatar" alt="" />
        <h3>{{ user.username }}</h3>
      </div>
      <div class="textSection" v-for="(blog, index) in blogs" :key="index">
        <!-- 时间 -->
        <div class="time">
          <p class="one">12</p>
          <p class="two">1月</p>
          <p class="three">1</p>
        </div>
        <!-- 标题 -->
        <div class="titleSection">
          <p>
            <strong>{{ blog.title }}</strong>
          </p>
        </div>
        <!-- 文章 -->
        <div class="mainText">
          <p>{{ blog.description }}</p>
        </div>
        <!-- 按钮 -->
        <div class="buttonTextmain">
          <el-button type="text"><router-link :to="`/edit/${blog.id}`">编辑</router-link></el-button>
          <el-button type="text" @click.prevent="del(blog.id)">删除</el-button>
        </div>
      </div>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          @current-change="onPageChange"
        ></el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import exitbutton from '@/components/exit'
import { mapGetters } from 'vuex'
import request from '@/helper/request'
export default {
  components: {
    exitbutton
  },
  data () {
    return {
      blogs: [],
      page: 1,
      total: 0
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      request.getBlogsByUserId(this.user.id, { page: this.page }).then(res => {
        // console.log(res)
        this.blogs = res.data
        this.page = res.page
        this.total = res.total
      })
    },
    onPageChange (val) {
      // console.log(val)
      this.page = val
      this.getUser()
    },
    editTx () {
      console.log('2')
    },
    del (blogId) {
      // console.log(val)
      this.$confirm('确认删除？是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        return request.deleteBlog({ blogId })
      }).then(() => {
        this.$message.success('删除成功')
        this.getUser()
      }).catch(() => {
        this.$message.info('取消操作')
      })
    }
  },
  computed: {
    ...mapGetters(['user'])
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
.main .textSection {
  min-width: 800px;
  min-height: 150px;
  display: grid;
  grid-template-rows: 50px 1fr 20px;
  grid-template-columns: 100px 1fr;
  padding: 30px 0;
  grid-template-areas:
    'time titleSection'
    'time mainText'
    'time buttonTextmain';
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
  margin: 10px;
}
.time {
  grid-area: time;
}
.titleSection {
  grid-area: titleSection;
}
.mainText {
  grid-area: mainText;
}
.buttonText {
  grid-area: buttonTextmain;
}
p {
  line-height: 50px;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.one {
  font-size: 40px;
}
.two {
  font-size: 20px;
}
.three {
  font-size: 15px;
}
.time {
  text-align: center;
  line-height: 50px;
}
</style>
