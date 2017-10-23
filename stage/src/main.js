// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'

Vue.use(VueResource)

Vue.config.productionTip = false

router.beforeEach((to,from,next) => {

  if(store.state.token == null){

    if(to.path != '/login'){
      next('/login');
    }else{
      next();
    }
  }else{
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
