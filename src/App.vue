<template>
  <div class="container">
    <nav>
      <Menu/>
      <Home/>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
// import Compiler from './components/container/access/projectDetail/compiler/Compiler.vue'
import Menu from './components/component/global/Menu.vue'
import Home from './components/container/noAccess/Home.vue'
export default {
  name: 'App',
  components: {
    // Compiler,
    Menu,
    Home
  }
}
</script>

<style scoped>

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #16161A;
}

nav {
  widows: 100%;
  height: 70px;
  background: #75757529;
  color: #ffffff;
}

</style>
