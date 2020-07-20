import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Denglv from '../views/Denglv.vue'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



Vue.use(VueRouter)

  const routes = [
  {
    path: '/land',
    component: Denglv,
    children:[
      {
        path:'/land',
        name:'land',
        component: () => import('../views/Land/Land.vue')
      },
      {
        path:'/register',
        name:'register',
        component: () => import('../views/Land/Register.vue')
      }
    ]
  },
  {
    path:'',
    name:'Home',
    component:Home,
    redirect: '/homepage',
    children:[
      {//首页
        path:'/homepage',
        name:'homepage',
        component: () => import('../views/content/Homepage.vue'),
        meta:{
          title:'首页',
          parentpath: '/homepage',
        }
      },
      {//已发布
        path:'/release',
        name:'release',
        redirect:"/releases",
        component: () => import('../views/content/Release.vue'),
        meta:{
          parentpath:'/release',
        },
        children:[
          {
            path: '/releases',
            name: 'releases',
            component: () => import('../views/content/Releases.vue'),
            meta:{
              title:'已发布',
              parentpath:'/release',
            }
          },
          {//编辑
            path: '/adit',
            name: 'adit',
            component: () => import('../views/content/Adit.vue'),
            meta:{
              parentpath:'/release',
            }
          },
          {//查看
            path: '/looks',
            name: 'looks',
            component: () => import('../views/content/Looks.vue'),
            meta:{
              parentpath:'/release',
            }
          }
        ]
      },
      {//统计
        path:'/statistics',
        name:'statistics',
        component: () => import('../views/content/Statistics.vue'),
        meta:{
          title:'统计',
          parentpath:'/statistics',
        }
      },
      {//发表文章
        path:'/article',
        name:'article',
        component: () => import('../views/content/Article.vue'),
        meta:{
          title:'发表文章',
          parentpath:'/article',
        }
      },
      {//标签页
        path:'/label',
        name:'label',
        component: () => import('../views/content/Label'),
        meta:{
          title:'标签页',
          parentpath:'/label',
        }
      },
      {//导出excel
        path:'/export',
        name:'export',
        component: () => import('../views/content/Export'),
        meta:{
          title:'导出excel',
          parentpath:'/export',
        }
      },
      {//图片上传
        path:'/upload',
        name:'upload',
        component: () => import('../views/content/Upload'),
        meta:{
          title:'图片上传',
          parentpath:'/upload',
        }
      },
      {//退出系统
        path:'/out',
        name:'out',
        component: () => import('../views/content/Out'),
        meta:{
          title:'退出系统',
          parentpath:'/out',
        }
      }
    ]
  },
  {
        path: '*',
        component: () => import('../views/content/404')
      }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title;
});

router.beforeEach((to,from,next) => { 
  let user = localStorage.getItem('username')
  if(to.path === '/land' || to.path === '/register'){
    next()
  }else{user ? next() : next('/land')}
})  

export default router
