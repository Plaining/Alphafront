<template>
  <div id="welcome" class="background-img" :style="backgroundDiv">
    <div>
      <a href="http://www.baidu.com">
      <Button class="button-login" type="ghost" v-on:click="loginMethod">
          <span v-if="!loading">Log in!</span>
          <span v-else>Loading...</span>
      </Button>
      </a>
    </div>
    <div class="wcm-style">
      <img src="../assets/logo.jpg" class="logo-style">
      <div>
        <router-link to='/HomePage'>
          <a>
            <i-button class="button-home" type="primary">Click to home page</i-button>
          </a>
        </router-link>
      </div>
      <div style="margin-top:150px;">
        <span class="slogan-font">Alpha fly,fly high!</span>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'welcome',
  data() {
    return {
        backgroundDiv: {
            backgroundImage: 'url(' + require('../assets/welcome.jpg') + ')'
        }
    }
  },
  method(){
  }
}
</script>

<style>
.background-img {
    height: 800px;
    width: 100%;
    background: no-repeat center top;
    background-size: contain;
}
.logo-style{
  margin-top: 150px;
  width: auto; 
  height: 200px;
}
.wcm-style{
  width: 100%;
  text-align: center;
  float: right;
}
.button-login{
  margin-top: 5px;
  margin-right: 50px;
  float: right;
  color: #101010 !important;
}
.button-home{
  background-color: #eee;
  border: none;
  color: #101010; 
  font-weight: bold;
}
.slogan-font{
  color: grey;
  font-style: italic;
  font-weight: bold;
  font-size: 50px;
  font-family: "SimHei";
}
</style>
