<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">ID:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="isTitle"
          :class="{ error: isError }"
        />
      </div>
      <div>
        <label for="password">PW:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit" :disabled="!isUserValidate">로그인</button>
    </form>
    <p v-if="isSuccess">로그인이되었습니다.</p>
    <!-- <p v-if="isError">올바르지 않는형태입니다.</p>
    <p v-if="isUserValidate">이메일 형식이 맞습니다.</p> -->
    <toast-popup :open="isSuccess"></toast-popup>
  </div>
</template>

<script>
import ToastPopup from "@/components/ToastPopup.vue"

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export default {
  components: {
    ToastPopup
  },
  data() {
    return {
      username: "",
      password: "",
      isError: false,
      isSuccess: false
    }
  },
  computed: {
    isUserValidate() {
      return validateEmail(this.username)
    }
  },
  methods: {
    submitForm() {
      console.log("로그인")
      // this.initForm()
      this.isSuccess = true
      // this.isError = true
    },
    initForm() {
      this.username = ""
      this.password = ""
    }
  }
}
</script>

<style scope>
.isTitle {
  outline: none;
}
.isTitle.error {
  border: 1px solid red;
}
</style>
