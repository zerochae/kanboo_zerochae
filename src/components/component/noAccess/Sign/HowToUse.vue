<template>
  <div>
    <div class="how-to-use-container">
      <div class="title-box">How To Use</div>
      <div class="stack">
        <div
          class="card"
          v-for="card in cards"
          :key="card"
          :id="`card${card.id}`"
        >
          <div class="how-card">
            <img
              class="how-card-img"
              :src="require(`@/assets/${card.img}`)"
              alt="img"
            />
            <div class="how-card-content">
              <div class="how-card-title">
                {{card.id}}
                {{ card.title }}
              </div>
              <div class="how-card-text">
                {{ card.content }}
              </div>
              <button @click="swap(card.id)">
                <i style="color: red" class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  data() {
    return {
      isActive: ``,
      step: "0",
      cards: [
        {
          id: "7",
          title: "Voice Chat",
          content: `This is the space where you can compile within the website. 
You can simply check the code tests and test results, share them with your team members, and discuss them. 
How many people can interpret this in English? There doesn't seem to be!`,
          img: "con3.jpg",
        },
        {
          id: "6",
          title: "VIEW",
          content: `This is the space where you can compile within the website. 
You can simply check the code tests and test results, share them with your team members, and discuss them. 
How many people can interpret this in English? There doesn't seem to be!`,
          img: "con1.jpg",
        },
        {
          id: "5",
          title: "ERD",
          content: `This is the space where you can compile within the website. 
You can simply check the code tests and test results, share them with your team members, and discuss them. 
How many people can interpret this in English? There doesn't seem to be!`,
          img: "con3.jpg",
        },
        {
          id: "4",
          title: "demand",
          content: `This is the space where you can compile within the website. 
You can simply check the code tests and test results, share them with your team members, and discuss them. 
How many people can interpret this in English? There doesn't seem to be!`,
          img: "con1.jpg",
        },
        {
          id: "3",
          title: "kanban",
          content: `This is the space where you can compile within the website. 
You can simply check the code tests and test results, share them with your team members, and discuss them. 
How many people can interpret this in English? There doesn't seem to be!`,
          img: "con3.jpg",
        },
        {
          id: "2",
          title: "gantt",
          content: `This is the space where you can compile within the website. 
You can simply check the code tests and test results, share them with your team members, and discuss them. 
How many people can interpret this in English? There doesn't seem to be!`,
          img: "con1.jpg",
        },
        {
          id: "1",
          title: "compiler",
          content: `This is the space where you can compile within the website. 
You can simply check the code tests and test results, share them with your team members, and discuss them. 
How many people can interpret this in English? There doesn't seem to be!`,
          img: "con3.jpg",
        },
        {
          id: "0",
          title: "create project",
          content: `This is the space where you can compile within the website. 
You can simply check the code tests and test results, share them with your team members, and discuss them. 
How many people can interpret this in English? There doesn't seem to be!`,
          img: "con1.jpg",
        },
      ],
    };
  },
  methods: {
    swap(i) {
      let card = this.cards.pop()
      let thisCard = document.getElementById(`card${i}`);
      thisCard.style.animation = "swap 900ms forwards"; 
      this.cards.unshift(card);
    },
  },
};
</script>

<style>
how-to-use-container {
  background: white !important;
}
.how-to-use-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: blue;
  --y: calc(937px + 70px);
  height: var(--y);
  overflow: hidden;
}

.how-to-use-container,
.how-to-use-container:before,
.how-to-use-container::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.how-card-img {
  width: 320px;
  height: 440px;
}

.stack {
  margin-top: 50px;
  width: 1200px;
  height: 900px;
  position: relative;
}

.how-card-content {
  text-align: center;
  display: inline;
  float: right;
  margin: 15px 0px 0px 30px;
}

.card {
  padding: 15px;
  background-color: white;
  width: 80%;
  min-height: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  box-shadow: 0 5px 10px 0 rgba(26, 25, 58, 0.2),
    0 15px 20px 0 rgba(219, 219, 177, 0.1);
  transition: transform 200ms;
  z-index: 3;
}

.card:nth-last-child(n + 8) {
  --y: calc(-50% - 270px);
  transform: translate(-50%, var(--y)) scale(0.70);
  box-shadow: 0 0 1px 1px #00000003;
}
.card:nth-last-child(7) {
  --y: calc(-50% - 225px);
  transform: translate(-50%, var(--y)) scale(0.75);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.01);
}
.card:nth-last-child(6) {
  --y: calc(-50% - 180px);
  transform: translate(-50%, var(--y)) scale(0.80);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.01);
}
.card:nth-last-child(5) {
  --y: calc(-50% - 135px);
  transform: translate(-50%, var(--y)) scale(0.85);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.01);
}
.card:nth-last-child(4) {
  --y: calc(-50% - 90px);
  transform: translate(-50%, var(--y)) scale(0.9);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.01);
}
.card:nth-last-child(3) {
  --y: calc(-50% - 45px);
  transform: translate(-50%, var(--y)) scale(0.95);
}
.card:nth-last-child(2) {
  --y: calc(-50%);
  transform: translate(-50%, var(--y)) scale(1);
}
.card:nth-last-child(1) {
  --y: calc(-50% + 45px);
  transform: translate(-50%, var(--y)) scale(1.05);
}

@keyframes swap {
  0% {
    z-index: 50;
    opacity: 1;
  }
  50% {
    transform: translate(50%) scale(0.85) rotate(-5deg);
    animation-timing-function: ease-in;
    opacity: 0.4;
  }
  100% {
    transform: translate(-50% - 90px) scale(0.85);
    z-index: -1;
    opacity: 0.01;
  }
}
</style>