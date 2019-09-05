<template>
  <div class="recommend">
    <div class="recommend-content" ref="scroll">
      <div v-if="banner.length" class="slider-wrapper">
        <slider>
          <div v-for="item in banner" :key="item.id" @click.stop="selectBanner(item)">
            <img :src="item.picUrl" />
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>
<script>
import Slider from "@/components/slider/slider";
import { ERR_OK } from "@/utils/config";
import {
  getBanner,
  getRecommendList,
  getRecommendMusic
} from "@/services/recommend";

export default {
  components: {
    Slider
    // Scroll
  },
  data() {
    return {
      banner: []
    };
  },
  created() {
    this._getBanner();
    // this._getRecommendList()
    // this._getRecommendMusic()
    // this.$refs.recommendList.style.
  },
  methods: {
    _getBanner() {
      getBanner().then(res => {
        if (res.status === ERR_OK) {
          let list = res.data.banners;
          this.banner = list.splice(4);
          // console.log(this.banner);
        } else {
          console.error("Banner 获取失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/variable";
@import "~@/assets/scss/mixin";
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  z-index: 100;
}
</style>
