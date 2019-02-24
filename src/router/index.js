import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import ClassMain from '@/components/ClassMain'
import Section2 from '@/components/Sections/Section2'
import Section3 from '@/components/Sections/Section3'
import Section4 from '@/components/Sections/Section4'
import Section6 from '@/components/Sections/Section6'
import Project1 from '@/components/Projects/Project1'
import Project2 from '@/components/Projects/Project2'
import Project3 from '@/components/Projects/Project3'

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
      path: '/Project1',
      name: 'Project1',
      component: Project1
    },
    {
      path: '/Section4',
      name: 'Section4',
      component: Section4
    },
    {
      path: '/Project2',
      name: 'Project2',
      component: Project2
    },
    {
      path: '/Section6',
      name: 'Section6',
      component: Section6
    },
    {
      path: '/Project3',
      name: 'Project3',
      component: Project3
    },
  ]
})
