<template>
  <div>
    <VideoView/>
    <div class="clear"></div>
    <HowToUse/>
  </div>
</template>

<script>
import HowToUse from '../../component/noAccess/Sign/HowToUse.vue';
import VideoView from './../../component/noAccess/Sign/VideoView.vue';

export default {
  components:{
    VideoView,
    HowToUse
  }
};
</script>

<style>
.clear{
  clear:both;
}
</style>