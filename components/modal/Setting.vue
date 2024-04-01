<template>
  <div
    class="modal"
    id="setting"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title fs-5" id="exampleModalLabel">내 정보</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ user.nickname }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-light w-100"
            @click="handleLogout"
            data-bs-dismiss="modal"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["user", "setUser", "setToken"],
  methods: {
    handleLogout: function () {
      this.setUser(null);
      this.setToken(null);
    },
  },
};
</script>
