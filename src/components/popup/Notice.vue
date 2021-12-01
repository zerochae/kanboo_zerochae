<template>
  <div class="notice-container">
    <button
      style="
        position: absolute;
        top: 50%;
        right: 50%;
        background: #eee;
        width: 100px;
        height: 100px;
      "
      @click="noticeTest"
    >
      알람 테스트
    </button>
    <div
      :id="`notice-${index}`"
      class="notice-box"
      v-for="(message, index) in messages"
      :key="index"
    >
      <p class="notice-text">
        {{ message.user }} {{ message.content }}
        <button @click="closeNotice(index)" class="notice-close-btn">
          <i class="fas fa-times"> </i>
        </button>
      </p>
      <div class="notice-bar">
        <div class="notice-bar-fill"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  updated() {
    for (let index in this.messages) {
      setTimeout(() => {
        document.querySelector(`#notice-${index}`).style.display = "none";
      }, 3900);
    }
    clearTimeout();
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    closeNotice(index) {
      document.querySelector(".notice-box").style.display = "none";
      this.messages[index].check = "Y";
    },
    noticeTest() {
      this.messages.push({
        user: "zerochae",
        content: "님이 로그인하였습니다",
        check: "Y",
      });
    },
  },
};
</script>

<style>
.notice-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: blue;
 
}
.notice-box {
  margin-bottom: 10px;
  width: 280px;
  height: 60px;
  right: 0;
  background: #414556;
  display: inline;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 5px;
  transform: translate(-100%);
  animation: slide 4s linear;
  box-shadow: 0 5px 25px rgba(255, 255, 255, 0.2);
}

.notice-text {
  margin: 5px 5px 20px 5px;
}

.notice-box i {
  position: absolute;
  top: 0;
  right: 2%;
}

.notice-bar {
  height: 7px;
  width: 278px;
  background: #fff;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
}

.notice-bar-fill {
  background: #3f80a9;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  animation: progress 3s linear;
}

@keyframes progress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes slide {
  0% {
    transform: translate(100%);
    opacity: 0;
  }
  9%,
  91% {
    transform: translate(0%);
    opacity: 0.8;
  }
  100% {
    transform: translate(100%);
    opacity: 0;
  }
}
</style>