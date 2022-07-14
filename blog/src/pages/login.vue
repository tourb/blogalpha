<template>
  <div id="building">
    <div class="mainLogin">
      <div class="main">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <!-- 用户名 -->
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码">
            <el-input type="password" v-model="formLabelAlign.password"></el-input>
          </el-form-item>
        </el-form>
        <!-- 登录 -->
        <el-button type="primary" round @click="submitLogin()">登录</el-button>
        <p>没有账号？<router-link to="/register">点击注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import request from '../helper/request'
export default {
  data () {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    submitLogin () {
      request.login({ username: this.formLabelAlign.username, password: this.formLabelAlign.password }).then(
        () => {
          this.$router.push({ path: './index' })
        }
      )
    }
  }
}
</script>

<style  scoped>
#building {
  background: url('../assets/sign_bg.db29b0fb.png') no-repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: cover;
}
.mainLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
.mainLogin .main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  padding: 40px;
  border-radius: 4px;
}
</style>
