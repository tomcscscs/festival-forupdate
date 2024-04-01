<template>
  <div class="d-flex flex-column vh-100">
    <Navigation />

    <div>
      <div
        class="d-flex flex-column align-items-center py-3 h-50"
        id="srchform"
      >
        <h2 class="mb-4 text-light">어떤 축제를 찾고 계세요?</h2>
        <input
          type="text"
          z
          class="fs-5 w-50 px-4 py-2 rounded-1 mb-2"
          placeholder="원하시는 지역명, 축제명을 입력해주세요"
          ref="srch"
          @input="handleChange"
        />

        <div
          class="list-group w-50 border border-light"
          v-if="items"
          style="max-height: 220px; overflow-y: auto"
        >
          <div v-if="items.length === 0" class="px-4 py-2 fs-7 bg-light">
            검색 결과가 없습니다. 정확한 검색어를 입력해주세요.
          </div>
          <RouterLink
            :to="{
              path: '/map',
              query: { lat: one.lat, lng: one.lng, zoom: one.zoom },
            }"
            class="list-group-item list-group-item-action"
            v-for="one in items"
            :key="one.id"
          >
            <div class="d-flex justify-content-between">
              <div>
                <i
                  class="bi bi-balloon-heart"
                  v-if="one.type === 'festival'"
                ></i>
                <i class="bi bi-map" v-else></i>

                <span class="ms-2">{{ one.title }}</span>
              </div>
              <span>{{ one.subtitle }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from "@/components/common/Navigation.vue";
export default {
  components: { Navigation },
  data: function () {
    return { items: null, job: null };
  },
  methods: {
    handleChange: function () {
      const q = this.$refs.srch.value;
      if (this.job) clearTimeout(this.job);
      if (!q) {
        this.items = null;
        return;
      }

      this.job = setTimeout(() => {
        fetch("http://43.201.68.36:7030/api/search?q=" + q)
          .then((response) => response.json())
          .then((result) => {
            this.items = result.items;
          });
      }, 500);
    },
  },
};
</script>
<style scoped>
#srchform {
  background-image: url("/background-image.jpg");
}

#app {
  background-image: url("/background-image.jpg");
  filter: blur(5px);
  height: 100vh;
}
</style>
