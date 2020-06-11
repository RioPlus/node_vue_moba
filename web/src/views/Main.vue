<template>
  <div>
    <div class="topbar bg-black p-2 px-6 text-left d-flex ai-center">
      <img
        src="https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2311790513,405754692&fm=58&s=5A94448AD0B885920D3F78B803009068&bpow=121&bpoh=75"
        alt="加载"
        height="30"
      >
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>

      <button type="button" class="btn bg-primary m-2">立即下载</button>
    </div>

    <div class="nav bg-primary pt-3 pb-2">
      <div class="nav d-flex text-white jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>

        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>

        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

