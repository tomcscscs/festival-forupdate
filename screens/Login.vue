<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div
      class="login border border-1 d-flex flex-column justify-content-between"
    >
      <div class="text-center py-3 px-3">
        <p>
          <RouterLink to="/"><img src="/logo.png" /></RouterLink>
        </p>
        <p class="fs-4">
          간편하게 로그인하고<br /><b>다양한 서비스를 이용하세요.</b>
        </p>
        <div class="py-2">
          <input
            type="text"
            placeholder="이메일주소"
            class="form-control fs-5"
            v-model="loginData.id"
          />
        </div>
        <div class="py-2">
          <input
            type="password"
            placeholder="비밀번호"
            class="form-control fs-5"
            v-model="loginData.password"
          />
        </div>
        <div class="d-flex py-2 nav">
          <RouterLink to="" class="flex-fill nav-link disabled"
            >아이디 찾기</RouterLink
          >
          <RouterLink
            to=""
            class="flex-fill border-start border-end nav-link disabled"
            >비밀번호 찾기</RouterLink
          >
          <RouterLink to="/signup/email" class="flex-fill nav-link"
            >회원가입 하기</RouterLink
          >
        </div>
      </div>
      <div class="py-3 px-2">
        <button
          class="w-100 btn btn-warning text-light py-3 fs-5"
          @click="handleSubmit"
        >
          시작하기
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
  inject: ["setToken", "setUser"],
  data: function () {
    return {
      loginData: {},
      cause: null,
    };
  },
  methods: {
    handleSubmit: function () {
      fetch("http://43.201.68.36:7030/api/user/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(this.loginData),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            this.setUser(result.user);
            this.setToken(result.token);
            this.$router.push("/");
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
.login {
  width: 520px;
  height: 588px;
}
.form-control {
  padding: 0.75rem 1.25rem;
}
.form-control:focus {
  box-shadow: none;
}
</style>
