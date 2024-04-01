<template>
  <!-- Modal -->
  <div
    class="modal modal-lg fade"
    id="festivalView"
    ref="festivalView"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <i class="bi bi-balloon"></i>{{ item?.name }}
            <span v-if="user" class="text-warning favorite">
              <i
                v-if="favorite"
                class="bi bi-star-fill"
                @click="handleRemoveFavorite"
              ></i>
              <i v-else class="bi bi-star" v-on:click="handleAddFavorite"></i>
            </span>
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row content">
            <div class="col-8 p-1">
              <div
                ref="map"
                class="h-100 w-100 d-flex justify-content-center align-items-center"
              >
                <div class="spinner-border" role="status" v-if="!mapLoad">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div class="col-4">한줄후기 띄울 곳</div>
          </div>
        </div>
        <ul class="list-group">
          <li class="list-group-item">{{ item?.description }}</li>
          <li class="list-group-item">
            {{ item?.startDate }} ~ {{ item?.endDate }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import * as bootstrap from "bootstrap";
export default {
  inject: ["user", "token"],
  data: function () {
    return { item: null, favorite: false, mapLoad: false };
  },
  methods: {
    handleCheckFavorite: function () {
      const name = "yoon";

      fetch("http://43.201.68.36:7030/api/private/favorite/" + this.item.id, {
        method: "get",
        headers: {
          authorization: this.token,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            this.favorite = result.isFavorite;
          }
        });
    },

    handleAddFavorite: function () {
      fetch("http://43.201.68.36:7030/api/private/favorite/" + this.item.id, {
        method: "post",
        headers: {
          authorization: this.token,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            this.favorite = true;
          }
        });
    },
    handleRemoveFavorite: function () {
      fetch("http://43.201.68.36:7030/api/private/favorite/" + this.item.id, {
        method: "delete",
        headers: {
          authorization: this.token,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            this.favorite = false;
          }
        });
    },
  },

  mounted: function () {
    this.$refs.festivalView.addEventListener("hidden.bs.modal", (evt) => {
      setTimeout(() => {
        this.$router.push("/map");
      }, 200);
    });

    const id = this.$route.params.id;
    fetch("http://43.201.68.36:7030/api/festival/" + id)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          this.item = result.item;
          // 지도 띄우는 작업 ===================================================
          const center = new kakao.maps.LatLng(
            this.item.latitude,
            this.item.longitude
          );
          const marker = {
            position: center,
          };
          setTimeout(() => {
            new kakao.maps.StaticMap(this.$refs.map, {
              center: center,
              level: 3,
              marker: marker,
            });
            this.mapLoad = true;
          }, 1000);
          //===============================================
          // 이 페스티발 아이템을 즐겨찾기 한적 있는지 API 호출
          if (this.token) this.handleCheckFavorite();
        }
      });
    const modal = new bootstrap.Modal("#festivalView", {});
    modal.show();
  },
};
</script>
<style scoped>
.favorite {
  cursor: pointer;
}
.content {
  height: 360px;
}
#map {
  height: 100%;
  width: 100%;
}
</style>
