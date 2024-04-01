<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100 position-relative"
  >
    <h1>value = {{ value }}</h1>
    <div
      class="signup border border-1 d-flex flex-column justify-content-between"
    >
      <div class="text-center py-3 px-3">
        <p class="fs-4">간편하게 가입하고<br />다양한 서비스를 이용하세요.</p>
        <div class="py-2">
          <input
            type="text"
            placeholder="이메일주소"
            class="form-control fs-5"
            v-model="id"
          />
        </div>
        <div class="py-2">
          <input
            type="password"
            placeholder="영문,숫자 포함 8자 이상"
            class="form-control fs-5"
            v-model="password"
          />
        </div>
        <div class="py-2">
          <input
            type="password"
            placeholder="비밀번호 재입력"
            class="form-control fs-5"
            v-model="passwordCheck"
          />
        </div>
      </div>
      <div class="py-3 px-2">
        <button
          class="w-100 btn btn-warning text-light py-3 fs-5"
          @click="handleSubmit"
        >
          다음
        </button>
      </div>
    </div>
    <div
      v-if="cause"
      class="alert alert-dark bottom-0 start-50 translate-middle-x w-50 position-absolute fs-5 text-center mb-6"
      role="alert"
    >
      {{ cause }}
    </div>
  </div>
</template>
<script>
export default {
  inject: ["value"],
  data: function () {
    return {
      id: null,
      password: null,
      passwordCheck: null,
      cause: null,
    };
  },
  methods: {
    handleSubmit: function () {
      console.log("??");
      fetch("http://43.201.68.36:7030/api/user/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          password: this.password,
          passwordCheck: this.passwordCheck,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            this.$router.push("/login/email");
          } else {
            this.cause = result.cause;
            setTimeout(() => {
              this.cause = null;
            }, 2000);
          }
        });
    },
  },
};
</script>
<style scoped>
.signup {
  width: 520px;
  height: 488px;
}
.form-control {
  padding: 0.75rem 1.25rem;
}
.form-control:focus {
  box-shadow: none;
}
</style>
