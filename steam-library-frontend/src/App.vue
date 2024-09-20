<template>
  <div id="app">
    <h1>
      STEAM
      <img :src="logo" alt="Steam Logo" class="logo" />
    </h1>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      logo: require('@/assets/Steam_icon_logo.png')
    };
  }
};
</script>

<style>
.logo {
  width: 50px;  
  height: auto;
  vertical-align: middle; 
  margin-left: 10px; 
}
</style>
