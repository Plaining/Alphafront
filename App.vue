<template>
  <div id="app">
    <div class="div-title">
        <Input class="inputsize" search enter-button placeholder="Enter Symbol..."  v-model="searchSymbol" @on-search="sendMessage"/>
         <a href="/User/">
           <Button class="button-login" type="primary" v-on:click="loginMethod">
            {{isLogin}}
          </Button> 
        </a>
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
                <MenuItem name="StockScreeners">Stock Screeners</MenuItem>
        </Submenu>
    </Menu>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import Info from '@/components/Info'
export default {
  data () {
    return {
      isLogin: 'log in',
      theme1: 'light',
      searchSymbol: '',
      isRouterAlive: true,
    }
  },
  created: function() {
      this.$nextTick(function(){
        this.checkifLogin();
      });
  },  
  components: {
    'data-detail': Info,
  },
  methods:{
    async checkifLogin(){
      const url="/User/isLogin";
      const res = await this.$http.get(url);
      if(res.isLogin){
        this.isLogin = "log out";
      }else{
        this.isLogin = "log in";
      }
    },
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){this.isRouterAlive = true});
    },
    selectPageIndex: function(pname){
      if(pname=="Info"){
        if(this.searchSymbol==''){
          alert("Please input a symbol!");
        }
        this.$router.push(
         '/Info/'+this.searchSymbol
        );
      }else{
        this.$router.push('/'+pname);
      }
    },
    sendMessage(event){
      
      this.$router.push(
         '/Info/'+this.searchSymbol
        );
      this.reload();
    },
    loginMethod: function(event){

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
.inputsize{
  width: 555px !important;
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
