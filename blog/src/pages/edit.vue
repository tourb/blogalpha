<template>
  <div>
    <exitbutton></exitbutton>
    <section class="main">
      <div class="edit">
        <h1>编辑文章</h1>
        <h3>文章标题</h3>
        <el-input v-model="title"></el-input>
        <h3>内容简介</h3>
        <el-input type="textarea" v-model="content" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>
        <h3>文章内容</h3>
        <el-input type="textarea" v-model="description" :autosize="{ minRows: 6, maxRows: 30 }"></el-input>
        <p>
          <label>是否展示到主页</label>
          <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="black"> </el-switch>
        </p>
        <el-button @click="submit">确定</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import request from '@/helper/request'
import exitbutton from '@/components/exit'
export default {
  components: {
    exitbutton
  },
  data () {
    return {
      title: '',
      content: '',
      description: '',
      atIndex: true
    }
  },
  async created () {
    this.blogId = this.$route.params.blogId
    let res = await request.getDetail({ blogId: this.blogId })
    // console.log(res)
    this.content = res.data.content
    this.title = res.data.title
    this.description = res.data.description
    this.atIndex = res.data.atIndex
  },
  methods: {

    submit () {
      request.updateBlog({ blogId: this.blogId }, { title: this.title, content: this.content, description: this.description, atIndex: this.atIndex })
        .then(res => {
          // console.log(res)
          this.$message.success(res.msg)
          this.$router.push('/index')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.exit {
  width: 50px;
  height: 50px;
  background-color: black;
  position: relative;
  top: 10px;
  left: 10px;
  border: 1px solid rgba(18, 18, 18, 1%);
}
.exit1 {
  width: 30px;
  height: 30px;
  border-left: 3px solid #fff;
  border-bottom: 3px solid #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%) rotate(45deg);
  left: 50%;
}
.main {
  max-width: 500px;
  min-width: 300px;
  min-height: 100%;
  margin: 50px auto;
  border: 1px solid rgba(18, 18, 18, 1%);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 40px;
  border-radius: 5px;
}
.edit {
  line-height: 40px;
}
.el-button {
  color: black;
  background-color: #fff;
  border: 1px solid black;
}
.el-button:hover {
  color: #409eff;
  background-color: #fff;
  border: 1px solid #409eff;
}
</style>
