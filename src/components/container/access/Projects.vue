<template>
  <div>
    <CreateProject/>
    <ProjectList/>
  </div>  
</template>

<script>

import ProjectList from '@/components/component/acess/projects/ProjectList.vue'
import CreateProject from '@/components/popup/CreateProject.vue'

export default {

components:{
  ProjectList,CreateProject
}

}
</script>

<style>

</style>