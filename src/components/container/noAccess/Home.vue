<template>
  <div>
    <Projects/>
    <!-- <VideoView/> -->
    <!-- <HowToUse/> -->
  </div>
</template>

<script>
// import HowToUse from '@/components/component/noAccess/Sign/HowToUse.vue';
// import VideoView from '@/components/component/noAccess/Sign/VideoView.vue';
import Projects from '@/components/container/access/Projects.vue'

export default {
  components:{
    // VideoView,
    // HowToUse,
    Projects
  }
};
</script>

<style>
.clear{
  clear:both;
}
</style>