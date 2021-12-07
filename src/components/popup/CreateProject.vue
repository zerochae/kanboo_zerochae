<template>
  <div>
    <!-- <button class="callModal" @click="모달눌렀니 = true">
      Create Project 버튼
    </button> -->
    <div class="bg-container">
      <div class="white-container">
        <h1 class="createProject-title">Create Project</h1>
        <div class="createProject-content">
          <input class="create-input" type="text" placeholder="Name" />
          <input class="create-input" type="text" placeholder="Start" />
          <input class="create-input" type="text" placeholder="End" />
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

<style scoped>
.callModal {
  font-size: 50px;
  background: cornflowerblue;
}

.bg-container {
  z-index: 1;
  width: 100%;
  height: calc(100% - 70px);
  background: rgba(0, 0, 0, 0.36);
  position: absolute;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.white-container {
  z-index: 2;
  width: 30vw;
  border-radius: 15px;
  background: #2C2F3B;
  padding:25px;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.7);
}

.createProject-content{
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.createProject-title{
  font-size: 32px;
  margin-bottom: 35px;
}

.create-input{
  background: #414556;
  border: none;
  outline: none;
  margin-bottom: 15px;
  font-size: 22px;
  color:white;
  border-radius: 5px;
  padding: 5px 10px;
  box-shadow: 0px 5px 35px rgba(0, 0, 0, 0.5);
}

.createProject-btn{
  display: block;
  background: #FF8906;
  font-size: 24px;
  color:white;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0px 5px 35px rgba(0, 0, 0, 0.3);
}
</style>