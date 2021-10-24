<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">ID:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="username-input "
          :class="{ error: isError }"
        />
      </div>
      <div>
        <label for="password">PW:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit" :disabled="!isUsernameVaild">로그인</button>
    </form>
    <p v-if="isError">올바르지 않은 ID입니다.</p>
  </div>
</template>

<script>
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export default {
  data() {
    return {
      username: "",
      password: "",
      isError: false
    }
  },
  computed: {
    isUsernameVaild() {
      return validateEmail(this.username)
    }
  },
  methods: {
    submitForm() {
      console.log("login")
      this.isError = true
      // this.initFrom()
    },
    initFrom() {
      this.username = ""
      this.password = ""
    }
  }
}
</script>

<style scoped>
.username-input {
  outline: none;
}

.username-input.error {
  border: 1px solid red;
}
</style>
