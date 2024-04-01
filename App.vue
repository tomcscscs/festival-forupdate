<template>
  <RouterView />
</template>
<script>
import { computed } from "vue";
export default {
  data: function () {
    return { user: null, token: null };
  },
  methods: {
    setUser: function (val) {
      this.user = val;
      if (val) localStorage.setItem("user", JSON.stringify(this.user));
      else localStorage.removeItem("user");
    },
    setToken: function (val) {
      this.token = val;
      if (val) localStorage.setItem("token", this.token);
      else localStorage.removeItem("token");
    },
  },
  provide: function () {
    return {
      user: computed(() => this.user),
      token: computed(() => this.token),
      setUser: this.setUser,
      setToken: this.setToken,
    };
  },
  mounted: function () {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.token = localStorage.getItem("token");
    }
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poor+Story&display=swap");

* {
  font-family: "Poor Story", system-ui;
  font-weight: 400;
  font-style: normal;
}

#app {
  min-width: 986px;
}
.fs-7 {
  font-size: 0.9rem;
}
</style>
