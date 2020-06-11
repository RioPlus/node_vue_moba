<template>
  <div>
    aa
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/saishi.jpg" class="w-100" alt>
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/libai.jpg" class="w-100" alt>
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/zhuge.jpg" class="w-100" alt>
      </swiper-slide>

      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        }
        // Some Swiper option/callback...
      }
    };
  }
};
</script>


<style lang='scss'>
.pagination-home {
  .swiper-pagination-bullet {
    background: #fff;
    &.swiper-pagination-bullet-active {
      
    }
    
  }
}
</style>


