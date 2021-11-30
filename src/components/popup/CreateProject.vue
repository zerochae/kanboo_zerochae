<template>
  <div>
    <!-- <button class="callModal" @click="모달눌렀니 = true">
      Create Project 버튼
    </button> -->
    <div class="createProject-bg-container">
      <div class="createProject-white-container">
        <h1 class="createProject-title">Create Project</h1>
        <div class="createProject-content">
          <input class="createProject-input" type="text" placeholder="Name" />
          <input class="createProject-input" type="text" placeholder="Start" />
          <input class="createProject-input" type="text" placeholder="End" />
        </div>
        <button @click="모달눌렀니 = false" class="createProject-btn">
          Create Project
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      모달눌렀니: true,
    };
  },
};
</script>

<style>

.callModal {
  font-size: 50px;
  background: cornflowerblue;
}

.createProject-bg-container {
  width: 100%;
  height: calc(100% - 70px);
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  color: #fff;
}

.createProject-white-container{
  display: flex;
  flex-direction: column;
}


</style>