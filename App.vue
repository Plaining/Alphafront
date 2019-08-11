<template>
  <div id="app">
    <div class="div-title">
        <Input class="input-size" search enter-button placeholder="Enter Symbol..." />
        <Button class="button-login" type="primary" >
          <span v-if="!loading">Log in!</span>
          <span v-else>Loading...</span>
        </Button>
    </div>
    <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="selectPageIndex">
        <MenuItem name="0">
        </MenuItem>
        <MenuItem name="Info">
            <Icon type="ios-paper" />
            Info
        </MenuItem>
        <MenuItem name="MyPortfolio">
            <Icon type="ios-people" />
            MyPortfolio
        </MenuItem>
        <Submenu name="Screeners">
            <template slot="title">
                <Icon type="ios-stats" />
               Screeners
            </template>
                <MenuItem name="ETFScreeners">ETF Screeners</MenuItem>
                <MenuItem name="StockScreeners">Stock Screeners</MenuItem>
        </Submenu>
    </Menu>
    <br>
    <router-view/>

    <!-- <router-view/> -->
  </div>
</template>

<script>
import Info from '@/components/Info'
export default {
  date () {
    return {
      theme1: 'light'
    }
  },
  components: {
    'data-detail': Info
  },
  methods:{
    selectPageIndex: function(name){
      this.$router.push('/'+name);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.div-title{
  margin-top: 20px;
  height:40px;
}
.input-size{
  width: 555px;
  margin-left: 255px;
  float:left;
}
.button-login{
  margin-right: 50px;
  float:right;
}
.tab{
  border:1px solid #ccc;
  padding:10px;
}
</style>
