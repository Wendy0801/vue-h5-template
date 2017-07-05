<template>
  <div>

    <div v-if="!isApp">
      <div v-if="hashNow!==enterHash" class="smi-header-icon smi-header-icon-left" @click="goBack">
        <img src="/static/images/icons/back.png" alt="">
      </div>
      <div v-if="hashNow===enterHash" class="smi-header-icon smi-header-icon-left" @click="goHome">
        <img src="/static/images/icons/home.png" alt="">
      </div>
    </div>

    <div v-if="isApp">
      <a v-if="!url" class="smi-header-icon smi-header-icon-left" href="smifun://back?page=information">
        <img src="/static/images/icons/back.png" alt="">
      </a>
      <div v-if="url">
        <a v-if="url!=='justgoback'" class="smi-header-icon smi-header-icon-left" :href="url">
          <img src="/static/images/icons/back.png" alt="">
        </a>
        <div v-if="url==='justgoback'" class="smi-header-icon smi-header-icon-left" @click="goBack">
          <img src="/static/images/icons/back.png" alt="">
        </div>
      </div>
    </div> 

  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  props: [
    'isApp',
    'url'
  ],
  data() {
    return {
      hashNow: ''
    }
  },
  computed: {
    ...mapState({
      enterHash: state => state.config.enterHash,
    })
  },
  mounted() {
    this.hashNow = window.location.hash;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    goHome() {
      this.$router.push({ 'path': '/' });
      this.$store.dispatch('setEnterHash', '');
    }
  },
  beforeDestroy() {
    // alert('销毁了')
  },
  beforeRouteLeave(to, from, next) {
  }
}

</script>
<style lang="scss">

</style>
