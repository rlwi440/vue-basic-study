<template>
  <div class="toast">
    토스트 팝업
  </div>
</template>

<script>
export default {
  props: ["open"],
  watch: {
    open(newValue) {
      if (newValue) {
        console.log("토스트 팝업열기 ")
      }
    }
  }
}
</script>

<style scoped>
.toast {
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 5%;
  left: -5%;
  transition: left 0.5s linear;
}
.open {
  left: 5%;
}
</style>
