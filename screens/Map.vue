<template>
  <div class="d-flex flex-column vh-100">
    <Navigation />
    <div class="flex-fill row g-1 position-relative p-1 m-0">
      <div class="col-9 rounded-1" ref="map"></div>
      <div class="col-3 ps-1" style="height: 90vh; overflow-y: auto">
        <div class="h-100" v-if="!fetching">
          <ul class="list-group" v-if="currentFestivals.length !== 0">
            <li
              v-for="one in currentFestivals"
              v-bind:key="one.id"
              @click="$router.push('/map/festival/' + one.id)"
            >
              <div
                class="border border-1 list-group-item list-group-item-action p-2 rounded-1 mb-1"
              >
                <h4 class="mb-1">
                  <i class="bi bi-balloon"></i> {{ one.name }}
                </h4>
                <h6 class="mb-2 text-secondary">
                  {{ one.description }}
                </h6>
                <div class="mb-0 fs-7">
                  <i class="bi bi-calendar-date"></i> {{ one.startDate }} ~
                  {{ one.endDate }}
                </div>
                <div class="mb-0 fs-7">
                  <i class="bi bi-pin-map"></i> {{ one.localNameAddr }}
                </div>
              </div>
            </li>
          </ul>
          <div
            v-else
            class="h-100 d-flex align-items-center justify-content-center"
          >
            <div class="text-center">
              <i class="bi bi-fullscreen fs-2"></i>
              <p class="mt-2">
                축제 정보를 보려면 지도를 더 확대하거나 옮겨주세요.
              </p>
            </div>
          </div>
        </div>
        <div
          v-else
          class="h-100 d-flex align-items-center justify-content-center"
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>
<script>
import Navigation from "../components/common/Navigation.vue";
export default {
  components: { Navigation },
  data: function () {
    return {
      festivals: [],
      total: 0,
      jobId: null,
      currentFestivals: [],
      fetching: false,
    };
  },

  methods: {
    initMap: function () {
      const { lat, lng, zoom } = this.$route.query;

      const options = {
        center: new kakao.maps.LatLng(lat ?? 36.3322006, lng ?? 127.8367481),
        level: zoom ?? 12,
      };
      const map = new kakao.maps.Map(this.$refs.map, options);

      map.setMaxLevel(12);

      const clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 1, // 클러스터 할 최소 지도 레벨
        minClusterSize: 1,
      });

      fetch("http://43.201.68.36:7030/api/festival/comming")
        .then((response) => response.json())
        .then((result) => {
          this.total = result.total;
          this.festivals = result.items;
          const markers = this.festivals.map(
            (elm) =>
              new kakao.maps.Marker({
                position: new kakao.maps.LatLng(elm.latitude, elm.longitude),
              })
          );
          clusterer.addMarkers(markers);
        });

      kakao.maps.event.addListener(map, "bounds_changed", () => {
        if (this.jobId) {
          clearTimeout(this.jobId);
        }
        this.jobId = setTimeout(() => {
          if (map.getLevel() > 10) {
            this.currentFestivals = [];
            return;
          }
          const bounds = map.getBounds();
          // south : qa, north : pa , west: ha,  east : oa
          const { qa, pa, ha, oa } = bounds;
          const filtered = this.festivals.filter((elm) => {
            return (
              elm.latitude >= qa &&
              elm.latitude <= pa &&
              elm.longitude >= ha &&
              elm.longitude <= oa
            );
          });
          if (filtered.length === 0) {
            return;
          }
          const ids = filtered.map((elm) => "id=" + elm.id);
          console.log(ids.join("&"));
          //
          const q = ids.join("&"); // 1, 3 , 7 같은 페스티벌 아이디값은 어디서 확보해서?
          this.fetching = true;
          fetch("http://43.201.68.36:7030/api/festival/inform?" + q)
            .then((response) => response.json())
            .then((result) => {
              this.currentFestivals = result.items;
              this.fetching = false;
            });
        }, 500);
      });
    },
  },
  mounted: function () {
    this.initMap();
  },
};
</script>
<style scoped>
.root {
  height: 100vh;
  max-height: 100vh;
}
</style>
