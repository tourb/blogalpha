<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
import request from '../helper/request'
export default {
  name: 'home',
  data () {
    return {
      username: 'hunger12',
      password: '123456'
    }
  },
  created () {
    this.getinfo()
  },
  methods: {
    async getinfo () {
      await request.getInfo().then(res => console.log(res))
    }

  }
}
</script>
