<template>
  <div>
    <header class="smi-header">
      <h2>测试sticky</h2>
    </header>
    <main class="smi-content">
      <lucky-turntable :config="luckyTurntableConfig"></lucky-turntable>
      <!--<div class="lucky-turntable">
          <div class="lucky-turntable-wrap">
    
            <div class="lucky-turntable-bg" :class="{'lucky-turntable-odd':blockNum%2===1}">
              <ul class="skew-list" :style="bgStyle">
                <li class="skew-col" v-for="item in blockNum" :style="`transform: rotate(${item*(360/blockNum)}deg) skew(${90-(360/blockNum)}deg);`">
                </li>
              </ul>
            </div>
    
            <div class="lucky-turntable-content">
              <div class="lucky-block"v-for="(key,item) in blockNum" :key="key" :style="`transform:translateX(-50%) rotate(${item*(360/blockNum)}deg)`">
                <div class="lucky-block-col">
                  星美通信
                </div>
                <div class="lucky-block-col">
                  流量
                  <i>1024M</i>
                </div>
                <img class="lucky-block-icon" src="http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv" alt="">
              </div>
            </div>
  
            <div class="lucky-turntable-point">
            </div>
    
          </div>
        </div>-->
  
      <button @click="showModal">测试</button>
      <div v-for="(key,item) in 30" :key="key">123</div>
      <transition name="showSticky">
        <div class="sticky-bar-fixed" v-show="isShow">
          <p @click="showList=!showList">导航条</p>
          <transition name="showSticky">
            <ul class="nav-list" v-show="showList">
              <li class="nav-item" v-for="(key,item) in 6" :key="key">1</li>
            </ul>
          </transition>
        </div>
      </transition>
      <div class="sticky-wrap" ref="stickyWrap">
        <div class="sticky-bar-static" ref="staticSticky">
          导航条
        </div>
      </div>
      <div class="sector"></div>
      <div v-for="(key,item) in 30" :key="key">123</div>
    </main>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import LuckyTurntable from '@/components/LuckyTurntable'

export default {
  name: 'home',
  components: {
    'lucky-turntable': LuckyTurntable
  },
  data() {
    return {
      isShow: false,
      showList: false,
      blockNum: 9,
      luckyTurntableConfig: {
        data: [
          {
            prize_id:1,
            content: '<div class="col">星美通信</div><div class="col">流量<i>1024M</i></div>',
            img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
          },
          {
            prize_id:2,
            content: '<div class="col"><i>Aigo</i>立体声</div><div class="col">耳麦<i>A0707</i></div>',
            img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
          },
          {
            prize_id:3,
            content: '<div class="col"><i>Aigo</i></div><div class="col">蓝牙机<i>X7</i></div>',
            img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
          },
          {
            prize_id:4,
            content: '<div class="col"><i>Aigo</i></div><div class="col">复读机<i>V8</i></div>',
            img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
          },
          {
            prize_id:5,
            content: '<div class="col">联想<i>Pad</i></div>',
            img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
          },
          {
            prize_id:6,
            content: '<div class="col">星美影票</div>',
            img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
          },
          {
            prize_id:7,
            content: '<div class="col">中国红版</div><div class="col"><i>Iphone7p</i></div><div class="col"><i>256G</i></div>',
            img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
          },
          {
            prize_id:8,
            content: '<div class="col">星美通信</div><div class="col">流量<i>10M</i></div>',
            img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
          },
          {
            prize_id:9,
            content: '<div class="col">星美通信</div><div class="col">流量<i>100M</i></div>',
            img: 'http://fun.assets.smi170.com/FqBRFJfvv63tSM5mdb9ozYh9QjUv'
          },
          {
            prize_id:10,
            content: '<div class="col">星美通信</div><div class="col">流量<i>500M</i></div>',
          },
        ],
        // colors:[
        //   '#fff','#FFF4D4'
        // ],
        // background:'',
        // pointer:''
      },
     
      bgRotateData: {
        'block-12': 45,
        'block-11': 10,
        'block-10': 0,
        'block-9': 31,
        'block-8': 25,
        'block-7': 16,
        'block-6': 0,
        'block-5': 58,
        'block-4': 45
      }
    }
  },
  computed: {
    'bgStyle': function () {
      var _rotateDeg = this.bgRotateData['block-' + this.blockNum];
      console.log(_rotateDeg)
      var _styleStr = `transform:rotate(${_rotateDeg}deg)`;
      return _styleStr;
    }
  },
  /**
   * 12 => 背景转45
   * 11=> 10度;
   * 10 => 0 ;
   * 9 => 31
   * 8 => 25 度 
   * 7 => 16 度
   * 6 => 0
   * 5 => 58
   * 4 => 45
   */
  mounted() {
    var staticSticky = this.$refs.staticSticky;
    var stickyWrap = this.$refs.stickyWrap;
    var self = this
    document.addEventListener('scroll', function () {
      let t = stickyWrap.getBoundingClientRect().top
      // console.log(t)
      if (t < 50) {
        // alert()
        // self.isShow = true
        staticSticky.style.position = 'fixed';
        staticSticky.style.top = '40px';
      }
      else if (t > 40) {
        // self.isShow = false
        console.log(111)
        staticSticky.style.position = 'absolute';
        staticSticky.style.top = '0';
      }
    })
    console.log(this.bgStyle)
  },
  methods: {
    tabShow() {
      this.isShow = !this.isShow;
    },
    showModal() {
      Toast('helloworld')
    },
    showConfirm() {
      MessageBox({
        title: '登陆提示',
        message: '请先登陆!',
        confirmButtonText: '去登陆',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          return false;
        }
      })
    }
  }
}
</script>
<style lang="scss" src="./home.scss" scoped></style>
<style lang="scss">
.sticky-bar-fixed {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100%;
  height: 40px;
  background: #fff;
  /*opacity: 0;*/
  p {
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
}



.sticky-inner {
  background: #000;
  height: 40px;
  color: #fff;
  position: relative;
}

.type-container {
  background: pink;
  width: 100%;
  padding-top: 40px;
}

.showlist-enter-active,
.showlist-leave-active {
  transition: all .3s;
  transform: translateY(0);
}

.showlist-enter,
.showlist-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}

.showSticky-enter-active,
.showSticky-leave-active {
  transition: all .3s;
  transform: translateY(0);
}

.showSticky-enter,
.showSticky-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}

.nav-list {
  background: #fff;
  position: absolute;
  width: 100%;
  top: 40px;
}

.sticky-wrap {
  position: relative;
  height: 40px;
  /*background:pink;*/
}

.sticky-bar-static {
  position: absolute;
  left: 0;
  top: 0px;
  width: 100%;
  height: 40px;
  background: #fff;
}
</style>

