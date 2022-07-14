<template>
  <header>
    <template>
      <div class="AppHeader">
        <div class="AppHeader-inner">
          <div class="user-info">
            <ul>
              <li>你好，{{ user.username }}</li>
              <li>
                <el-button type="text"><router-link to="/create">创建文章</router-link></el-button>
              </li>
              <li><el-button type="text" @click="loginout">注销</el-button></li>
              <li>
                <router-link to="/my"><img class="Avatar" :src="user.avatar" alt="头像" /></router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template> </template>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['user', 'isLogin'])
  },
  created () {
    this.checkLogin()
  },
  methods: {
    ...mapActions(['checkLogin', 'logout']),
    loginout () {
      this.$confirm('确定退出？是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        return this.logout()
      }).then(() => {
        this.$message.success('success')
        this.$router.push('/')
      }).catch(() => {
        this.$message.info('取消操作')
      })
    }
  }

}
</script>

<style lang="less" scoped>
.AppHeader {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  overflow: hidden;
  background: #fff;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
}
.AppHeader-inner {
  display: flex;
  padding: 0 16px;
  margin: 0 auto;
  height: 52px;
  max-width: 1156px;
  background-clip: content-box;
  min-width: 100px;
  padding-left: 16px;
  padding-right: 30px;
  flex-direction: row-reverse;
}
.user-info {
  margin: auto 0;
  vertical-align: middle;
}
.user-info ul {
  display: flex;
  line-height: 52px;
}
.user-info li {
  margin: 0 5px;
}
.user-info .Avatar {
  border-radius: 4px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
</style>
