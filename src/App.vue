<template>
  <!-- App -->
  <div id="app" class="app" :class="{'h5-in-app':isApp,'h5-in-wechat':isWechat}">



    <router-view></router-view>
    <transition name="fade">
      <loading v-show="loadingNow"></loading>
    </transition>
    <mt-popup v-model="popupVisible" position="top" class="mint-popup-2" :class="popupClass" :modal="false">
      <p>{{message}}</p>
    </mt-popup>
    <!-- {{isWechat}}
    {{isApp}}
    {{userinfo.username}}
    <br>
    <br>
    <br>
    <br>
    <br>
    <br> -->
    <!-- <button type="button" @click="addUserinfo()">测试添加vuex数据</button>
    <button type="button" @click="changeUserinfo()">改变值</button> -->
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from '@/components/Loadding';

export default {
  components: {
    'loading': Loading
  },
  data() {
    return {
      popupVisible: false,
      popupClass: 'info',
      message: '操作成功',
      showMusicPlayer: false,
      musicBarDeg: 0,
    }
  },
  computed: {
    ...mapGetters({
      loadingNow: 'getLoadingStatu',
      actionStatu: 'getActionStatu',
      userinfo: 'getUserinfo',
      isWechat:'getIsWechat',
      isApp:'getIsApp',
    })
  },
  watch: {
    'actionStatu': function () {
      this.type = this.actionStatu.type;
      this.popupClass = this.actionStatu.isFromApp
        ? `${this.actionStatu.type} mint-popup-app`
        : this.actionStatu.type;
      this.message = this.actionStatu.message;
      this.popupVisible = true;
      setTimeout(() => {
        this.popupVisible = false;
      }, 1500)
    }
  },
  mounted() {
    // this.$_showtip('hello world')
    // alert(this.isWeiXin)
    // this.$_api.post({
    //   ext: 'http://haokur.com/cross/test',
    //   data: '1',
    //   code: 2
    // })
    //   .then(res => {
    //     console.log(res)
    //     console.log('请求结果')
    //   })
    //   .catch(err=>{
    //     console.log('请求错误')
    //     throw '错误'
    //   })
    //   .finally(()=>{
    //     console.log('请求完成')
    //     this.$_showtip('请求完成')
    //   })
    this.$_cookie.set({
      token: '12313'
    })
    console.log(this.$_cookie.get('token'))
    // this.$_showtip()
    // console.log(this.userinfo,22)
  },
  methods: {
    addUserinfo() {
      this.$store.dispatch('SET_USERINFO', {
        username: 'xiaobing',
        age: 27
      })
    },
    changeUserinfo() {
      this.$store.dispatch('SET_USERINFO', {
        username: '张三',
        age: 27
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fade-leave-active {
  opacity: 0;
  transition: all 0.5s ease
}
</style>
