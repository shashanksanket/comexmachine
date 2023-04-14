import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import comex from './comex'
import app from './app'
import verticalMenu from './vertical-menu'
import appConfig from './app-config'
import auth from './auth'
import admin from './admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    comex,
    verticalMenu,
    appConfig,
    app,
    admin,
    auth
    
  },
  //plugins: [...servicePlugins],
  //FIXME: We need to use persistent storage
  // currently on page refresh, store is getting reset
  strict: process.env.DEV,
})
