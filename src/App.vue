<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from "@/components/m-header/m-header";
import Tab from "@/components/tab/tab";
import Player from "@/components/player/player";
export default {
  components: {
    MHeader,
    Player,
    Tab
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/index.scss";
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>