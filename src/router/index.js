import Vue from 'vue'
import Router from 'vue-router'
import ClassMain from '@/components/ClassMain'
import Section2 from '@/components/Section2'
import Section3 from '@/components/Section3'
import Section4 from '@/components/Section4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ClassMain',
      component: ClassMain
    },
    {
      path: '/Section2',
      name: 'Section2',
      component: Section2
    },
    {
      path: '/Section3',
      name: 'Section3',
      component: Section3
    },
    {
      path: '/Section4',
      name: 'Section4',
      component: Section4
    },

  ]
})
