import Vue from 'vue'
import Router from 'vue-router'

import index from "@/pages/index"
import certification from "@/pages/certification"
import authentication from "@/pages/authentication"
import identity from "@/pages/identity"
import hotel from "@/pages/hotel"
import register from "@/pages/register"
import logger from "@/pages/logger"
import forget from "@/pages/forget"
import amend from "@/pages/amend"
import management from '@/pages/management'
import collect from '@/pages/collect'
import myment from '@/pages/myment'
import release from '@/pages/release'
import landlord from '@/pages/landlord'
import list from '@/pages/list'
import sure from '@/pages/sure'
import house from '@/pages/house'
import issue from '@/pages/issue'
import serch from '@/pages/serch'
import my from '@/pages/my'
import housing_details from '@/pages/housing_details.vue'
import myjquery from '../assets/js/myjquery'
Vue.use(myjquery)
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/identity',
      name: 'identity',
      component: identity
    },
    {
      path: '/certification',
      name: 'certification',
      component: certification
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication
    },
    {
      path: '/hotel',
      name: 'hotel',
      component: hotel
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/logger',
      name: 'logger',
      component: logger
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/amend',
      name: 'amend',
      component: amend
    },
    {
      path: '/housing_details',
      name: 'housing_details',
      component: housing_details
    },
    {
      path: '/management',
      name: 'management',
      component: management
    },
    {
      path: '/collect',
      name: 'collect',
      component: collect
    },
    {
      path: '/myment',
      name: 'myment',
      component: myment
    },
    {
      path: '/release',
      name: 'release',
      component: release
    },
    {
      path: '/landlord',
      name: 'landlord',
      component: landlord
    },
    {
      path: '/sure',
      name: 'sure',
      component: sure
    },
    {
      path: '/house',
      name: 'house',
      component: house
    },
    {
      path: '/list',
      name: 'list',
      component: list
    }, {
      path: '/issue',
      name: 'issue',
      component: issue
    }, {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/serch',
      name: 'serch',
      component: serch
    },
  ]
})
