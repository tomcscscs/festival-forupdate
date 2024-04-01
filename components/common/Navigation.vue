<template>
  <div class="p-2 d-flex justify-content-between">
    <div class="d-flex align-items-end">
      <RouterLink to="/"
        ><img src="/logo.png" height="60" class="me-3"
      /></RouterLink>
      <ul class="nav nav-underline">
        <li class="nav-item">
          <RouterLink to="/map" class="nav-link">지도</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/community" class="nav-link">후기</RouterLink>
        </li>
      </ul>
    </div>
    <div class="px-5 d-flex align-items-end">
      <RouterLink to="/login/email" class="btn btn-light btn-sm" v-if="!user"
        >로그인 및 회원가입</RouterLink
      >
      <div class="dropdown" v-else>
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ user.nickname }}
        </button>
        <ul class="dropdown-menu">
          <li>
            <a
              class="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#setting"
              >설정(로그아웃)</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Setting v-if="user" />
</template>
<script>
import Setting from "../modal/Setting.vue";
export default {
  components: { Setting },
  inject: ["user"],
  mounted: function () {
    console.log(this.user);
  },
};
</script>
