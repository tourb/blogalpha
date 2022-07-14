<template>
  <div>
    <router-link to="/index"
      ><div class="exit"><div class="exit1"></div></div
    ></router-link>
  </div>
</template>

<script>
export default {

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
</style>
