<template>
  <div class="recommend">
    <Scroll class="scroll-content" ref="scroll" :data="playList">
      <div>
        <div v-if="banner.length" class="decorate"></div>
        <slider v-if="banner.length">
          <img
            v-for="item in banner"
            :key="item.id"
            :src="item.imageUrl"
            @click.stop="onClickBanner(item)"
          />
        </slider>
        <div class="recommend-list" ref="recommendList">
          <h1 class="title">推荐歌单</h1>
          <ul>
            <li class="item" v-for="item in playList" :key="item.id">
              <div class="icon" @click="selectList(item)">
                <div class="gradients"></div>
                <img v-lazy="item.picUrl" />
              </div>
              <p class="play-count">
                <i class="iconfont">&#xe61f;</i>
                {{Math.floor(item.playCount / 10000) }}万
              </p>
              <div class="text">
                <p class="name">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-song" ref="recommendSong">
          <h1 class="title">推荐歌曲</h1>
          <ul>
            <li
              class="item"
              v-for="item in recommendMusic"
              :key="item.id"
              @click="selectSong(item)"
            >
              <div class="icon">
                <img v-lazy="item.image" />
              </div>
              <p class="text">{{item.name}}</p>
              <p class="singer">{{item.singer}}</p>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import Scroll from "@/components/scroll/scroll";
import Slider from "@/components/slider/slider";
import { ERR_OK } from "@/utils/config";
import { createNewSong } from "@/utils/index";
import {
  getBanner,
  getRecommendList,
  getRecommendMusic
} from "@/services/recommend";

export default {
  components: {
    Slider,
    Scroll
  },
  data() {
    return {
      banner: [],
      playList: [],
      recommendMusic: []
    };
  },
  created() {
    this._getBanner();
    this._getRecommendList();
    this._getRecommendMusic();
  },
  methods: {
    onClickBanner(item) {
      let regHttp = /^http/g;
      let regSong = /\/song\?id/g;
      if (regHttp.test(item.url)) {
        window.open(item.url);
      }
      if (regSong.test(item.url)) {
        //todo
        // getSongDetail(item.targetId).then((res) => {
        //   let m = res.data.songs[0]
        //   let song = {
        //     id: m.id,
        //     singer: m.ar[0].name,
        //     name: m.name,
        //     image: m.al.picUrl,
        //     album: m.al.name
        //   }
        //   this.insertSong(song)
        //   this.setFullScreen(true)
        // })
      }
    },
    selectList(ablum) {
      console.log(123);
      this.$router.push({
        path: `/recommend/${ablum.id}`
      });
      this.setMuiscList(ablum);
    },
    _getBanner() {
      getBanner().then(res => {
        if (res.code === ERR_OK) {
          let list = res.banners;
          this.banner = list.splice(4);
          // console.log(this.banner);
        } else {
          console.error("Banner 获取失败");
        }
      });
    },

    _getRecommendList() {
      getRecommendList().then(res => {
        if (res.code === ERR_OK) {
          this.playList = res.result;
        } else {
          console.error("getRecommendList 获取失败");
        }
      });
    },
    _getRecommendMusic() {
      getRecommendMusic().then(res => {
        if (res.code === ERR_OK) {
          let list = res.result.map(item => {
            return createNewSong(item);
          });
          list.splice(9);
          this.recommendMusic = list;
        } else {
          console.error("getRecommendMusic 获取失败");
        }
      });
    },
    ...mapMutations({
      setMuiscList: "SET_MUSIC_LIST",
      setFullScreen: "SET_FULL_SCREEN"
    }),
    ...mapActions(["insertSong"])
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/variable";
@import "~@/assets/scss/mixin";
.recommend {
  height: 100%;
  position: relative;
}
.scroll-content {
  height: 100%;
  overflow: hidden;
  .decorate {
    position: absolute;
    top: -30vh;
    z-index: -1;
    background: $color-theme;
    width: 100%;
    height: 45vh;
    vertical-align: inherit;
  }
}
.recommend-list {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  .title {
    height: 65px;
    line-height: 65px;
    padding-left: 1.5%;
    text-align: left;
    font-size: $font-size-medium;
    font-weight: bold;
    color: $color-text;
  }
  .item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    width: 33%;
    padding: 0 1%;
    .icon {
      position: relative;
      display: inline-block;
      width: 100%;
      margin-bottom: 5px;
      .gradients {
        position: absolute;
        top: 0;
        width: 100%;
        height: 35px;
        border-radius: 3px;
        background: linear-gradient(
          rgba(109, 109, 109, 0.4),
          rgba(255, 255, 255, 0)
        );
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
    .play-count {
      position: absolute;
      top: 5px;
      right: 8px;
      font-size: $font-size-small-s;
      color: $color-text-l;
    }
    .text {
      float: left;
      line-height: 16px;
      text-align: left;
      height: 40px;
      line-height: 16px;
      overflow: hidden;
      margin-bottom: 10px;
      font-size: $font-size-small;
    }
  }
}
.recommend-song {
  margin-top: -20px;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  .title {
    height: 65px;
    line-height: 65px;
    padding-left: 1.5%;
    text-align: left;
    font-size: $font-size-medium;
    font-weight: bold;
    color: $color-text;
  }
  .item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    width: 33%;
    padding: 0 1%;
    .icon {
      position: relative;
      display: inline-block;
      width: 100%;
      margin-bottom: 5px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
    .text {
      line-height: 16px;
      text-align: left;
      height: 16px;
      @include no-wrap();
      font-size: $font-size-small;
    }
    .singer {
      line-height: 16px;
      margin-bottom: 10px;
      text-align: left;
      @include no-wrap();
      font-size: $font-size-small;
      color: $color-text-g;
    }
  }
}
</style>
