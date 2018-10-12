
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // select
    host: '',
    dirPath: '',
    // settings
    lnum: 100,
    // search
    searchType: 0,
    lstart: 0,
    pattern: '',
    // filePath
    filePath: '',
    // update flag
    updateFileTree: false,
    updateLines: false,
  },
  mutations: {
    setFilePath(state, filePath) {
      state.filePath = filePath;
    },
    submitSearch(state, {searchType, lstart, pattern}) {
      state.searchType = searchType;
      state.lstart = lstart;
      state.pattern = pattern;
    },
    submitSettings(state, lnum) {
      state.lnum = lnum;
    },
    updateFileTree(state) {
      state.updateFileTree = !state.updateFileTree;
    },
    updateLines(state) {
      state.updateLines = !state.updateLines;
    }
  }
});

export default store;