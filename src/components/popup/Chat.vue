<template>
  <div class="chat-container">
    <button
      style="
        position: absolute;
        top: 30%;
        right: 50%;
        background: #eee;
        width: 100px;
        height: 100px;
      "
      @click="chatTest"
    >
      채팅 테스트
    </button>
    <div class="chat-box">
      <div class="chat-header"></div>
      <div class="chat-content"></div>
      <div class="chat-inputBox"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.chat-container {
  overflow: hidden;
  background: red;
}
.chat-box {
  width: 280px;
  height: 330px;
  background: #414556;
}
</style>