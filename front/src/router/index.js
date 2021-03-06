import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will not redirct in the levelbar
* noDropdown : if `noDropdown:true` will not has submenu in the sidebar
* meta : `{ role: ['admin'] }`  will control the page role
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    hidden: true, 
    children: [{ path: 'home',component: _import('home/index') }]
  },

  {
    path: '/menu',
    component: Layout,
    redirect: 'noredirect',
    name: '菜单',
    icon: 'zujian',
    children: [
      //{ path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') },
      { path: 'stockcontrol', name: '库存管理', icon: 'zonghe', component: _import('page/stockcontrol') },
      { path: 'user', name: '用户管理', icon: 'zonghe', component: _import('page/user') }
    ]
  },

  {
    path: '/table',
    component: Layout,
    redirect: 'noredirect',
    name: '表单',
    icon: 'tubiao',
    children: [
      { path: 'stockform', name: '库存表', icon: 'zonghe', component: _import('table/stockform') },
      { path: 'filledshortform', name: '缺料表', icon: 'zonghe', component: _import('table/filledshortform') },
      { path: 'addrecord', name: '入库记录', icon: 'zonghe', component: _import('table/addrecord') },
      { path: 'subrecord', name: '出库记录', icon: 'zonghe', component: _import('table/subrecord') }
    ]
  },

  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/index',
  //   icon: 'tubiao',
  //   noDropdown: true,
  //   children: [{ path: 'index', name: 'Table', component: _import('table/index'), meta: { role: ['admin'] }}]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

