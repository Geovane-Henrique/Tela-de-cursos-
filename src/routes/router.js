import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/LoginPage.vue'
import HomeApp from '../pages/HomeApp.vue'


Vue.use(VueRouter)

const routes = [
    {
    path: '/home',
    component:HomeApp
},
{
    path:'/login',
    component: Login
},
{
    path:'',
    component: Login
},
{
    path:'*',
    component: Login
}
]

const router = new VueRouter({
    routes
})

export default router