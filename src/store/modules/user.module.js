import * as types from '../types'
export default {
  state: {
    'userinfo': null,
    'isTurn': true
  },
  actions: {
    [types.SET_USERINFO]: ({
      commit
    }, userinfo) => {
      commit(types.SET_USERINFO, userinfo)
    },
    [types.SET_LOTTERY_STATUS]: ({
      commit
    }, isTurn) => {
      commit(types.SET_LOTTERY_STATUS, isTurn)
    }
  },
  mutations: {
    [types.SET_USERINFO]: (state, userinfo) => {
      state.userinfo = userinfo
      localStorage.setItem('userinfo', JSON.stringify(userinfo))
    },
    [types.SET_LOTTERY_STATUS]: (state, isTurn) => {
      state.isTurn = isTurn
    }
  },
  getters: {
    getUserinfo: state => {
      if (state.userinfo) {
        return state.userinfo
      }
      var localState = localStorage.getItem('userinfo')
      if (localState) {
        return JSON.parse(localState)
      }
      return {}
    },
    getLotteryStatus: state => {
      return state.isTurn
    }
  }
}
