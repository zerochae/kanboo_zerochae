import { createWebHistory, createRouter } from "vue-router"

// import global from './routers/global'
import Home from './components/container/noAccess/Home.vue'
import Demo from './components/container/noAccess/Demo.vue'
import Community from './components/container/noAccess/Community.vue'
import Sign from './components/container/noAccess/Sign.vue'
import Projects from './components/container/access/Projects.vue'

import ProjectDetail from './components/container/access/projectDetail/ProjectDetail.vue'
import DashBoard from './components/container/access/projectDetail/DashBoard.vue'
import Scheduler from './components/container/access/projectDetail/Scheduler.vue'

import Compiler from './components/container/access/projectDetail/compiler/Compiler.vue'
import Java from './components/container/access/projectDetail/compiler/Java.vue'
import HTML from './components/container/access/projectDetail/compiler/HTML.vue'

import Board from './components/container/access/projectDetail/ProjectBoard.vue'
// import Demand from './components/container/access/projectDetail/Demand.vue'
import Gantt from './components/container/access/projectDetail/GanttChart.vue'
import GitAndIssue from './components/container/access/projectDetail/GitAndIssue.vue'
import Setting from './components/container/access/projectDetail/Setting.vue'
import Kanban from './components/component/acess/projectDetail/kanban/Article.vue'



const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/community',
    component: Community,
  },
  {
    path: '/signin',
    component: Sign,
  },
  {
    path: '/demo',
    component: Demo
  },
  {
    path: '/projects',
    component: Projects,
  },
  {
    path: "/pdtail",
    component: ProjectDetail,
    children: [
      {
        path: "dashboard",
        component: DashBoard
      },
      {
        path: "scheduler",
        component: Scheduler
      },
      {
        path: "compiler",
        component: Compiler,
        children: [
          {
            path: "backend",
            component: Java
          },
          {
            path: "frontend",
            component: HTML
          }
        ]
      },
      // {
      //   path: "demand",
      //   component: Demand
      // },
      {
        path: "board",
        component: Board
      },
      {
        path: "gantt",
        component: Gantt
      },
      {
        path: "gitissue",
        component: GitAndIssue
      },
      {
        path: "erdandview",
        component: DashBoard
      },
      {
        path: "setting",
        component: Setting
      },
      {
        path: "kanban",
        component: Kanban
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;