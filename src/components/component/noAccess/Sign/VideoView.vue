<template>
  <div>
    <div class="home-img-box">
      <div class="home-bg-img">
        <img src="@/assets/img_main.png" alt="" />
        <button>Start Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.home-img-box img {
  display: block;
  width: 1900px;
  height: 937px;
  margin: auto;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

.home-bg-img{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-bg-img button {
  position: absolute;
  color: white;
  width: 240px;
  height: 60px;
  background: #FF8906;
  border-radius: 15px;
  font-size: 33px;
}
</style>