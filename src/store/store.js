import Vue from 'vue'
import Vuex from 'vuex'
import { isFullscreen } from '../lib/util'

Vue.use(Vuex)

var Store = {}

const state = {
  config: {
    server: 'http://localhost:8040/'
  },
  apiURL: null,
  api: null,
  media: {},
  sidebar: false,
  fullscreen: isFullscreen(),
  posterSize: 1,
  thumbSize: 1,
  collection: '',
  panel: null,
  scrollbarWidth: 0,
  videoFullscreen: false,
  videoPlaying: false,
  vhOffset: 0
}

// mutations: synchronous changes
const mutations = {
  SIDEBAR (state, data) {
    state.sidebar = data
  },
  FULLSCREEN (state, data) {
    state.fullscreen = data
  },
  POSTER_SIZE (state, size) {
    state.posterSize = size
  },
  POSTER_HOVER (state, obj) {
    state.posterHover = obj
  },
  PANEL (state, item) {
    state.panel = item
  },
  COLLECTION (state, coll) {
    state.collection = coll
  },
  API (state, api) {
    state.api = api
  },
  VIDEO_PLAYING (state, flag) {
    state.videoPlaying = flag
  },
  VIDEO_FULLSCREEN (state, flag) {
    state.videoFullscreen = flag
  },
  SAVE_CONFIG (state, config) {
    state.config = config
    state.apiURL = config.server
  },
  SCROLLBAR_WIDTH (state, w) {
    state.scrollbarWidth = w
  },
  VH_OFFSET (state, offset) {
    state.vhOffset = offset
  }
}

// actions: asynchronous changes.
const actions = {
  LOAD_CONFIG (context) {
    let dev = process.env.NODE_ENV !== 'production'
    let cfgurl = dev ? '/static/config.json' : '/config.json'
    return fetch(cfgurl, {
      redirect: 'follow'
    }).then((resp) => {
      if (!resp.ok) {
        throw new RangeError('unexpected HTTP code ' + resp.status)
      }
      return resp.json()
    }).then((json) => {
      context.commit('SAVE_CONFIG', json)
    })
  }
}

Store = new Vuex.Store({
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
export default Store
