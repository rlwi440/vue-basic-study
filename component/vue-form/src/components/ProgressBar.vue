<template>
  <div class="progress"></div>
</template>

<script>
export default {}
</script>

<style scoped>
.progress {
  height: 5px;
  background-color: lime;
  width: 0%;
  animation: loading 1s ease-in-out;
}
/* .complete {
  width: 100%;
} */
@keyframes loading {
  0% {
    width: 0%;
  }
  25% {
    width: 25%;
  }
  50% {
    width: 50%;
  }
  75% {
    width: 75%;
  }
  100% {
    width: 100%;
  }
}
</style>
