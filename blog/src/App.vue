<template>
  <div id="app">
    <div id="nav"></div>
    <router-view />
  </div>
</template>
<script>

export default {

}
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  background: rgb(241, 239, 239);
}
* {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
a {
  text-decoration: none;
  color: #409eff;
}
</style>
