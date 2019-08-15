<template>
  <div>   
    <Table stripe :columns  ="columns1" :data="data1" @on-row-click="rowClick">
    </Table>
    <!-- <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div> -->
  </div>

</template>

<script>
  export default {
    name: 'StockScreeners',
    data () {
      return {
        index: 1,
        symbol:'',
        name:'',
        price:'',
        change:'',
        pchange:0,
        volume:'',
        fiftyDayAverage:'',
        twoHundredDayAverage:'',
        fiftytwoWeekRange:'',
        formDynamic: {
          items: [
          {
            value: '',
            index: 1,
            status: 1
          }
          ]
        },
        columns1: [
        {
          title: 'symbol',
          key: 'symbol'
        },
        {
          title: 'name',
          key: 'name'
        },
        {
          title: 'price',
          key: 'price',
          sortable:true,
        },
        {
          title: 'change',
          key: 'change',
          sortable:true,
          filters:[{
            label:'up',
            value:1
          },{
            label:'down',
            value:2
          }],
          filterMultiple:false,
          filterMethod(value,row){
            if(value === 1){
              return row.change>0;
            }else if(value === 2){
              return row.change<0;
            }
          }
        },
        {
          title: 'pchange',
          key: 'pchange'
        },
        {
          title: 'volume',
          key: 'volume',
          sortable:true
        },
        {
          title: 'fiftyDayAverage',
          key: 'fiftyDayAverage',
          sortable:true
        },{
          title: 'twoHundredDayAverage',
          key:'twoHundredDayAverage',
          sortable:true
        },{
          title: 'fiftytwoWeekRange',
          key:'fiftytwoWeekRange',
          sortable:true
        }
        ],
        data1: [
        ]
      }
    },
    components: {
    },
    created: function() {
      this.$nextTick(function(){
        this.searchInfo();
      });
    }, 
    methods:{
      rowClick(data,index){
          this.$router.push('/Info/'+ data.symbol);
      },
      async searchInfo(){
        const url = "/stock/GetStockList";
        const res = await this.$http.get(url);
          // const url = "./static/getInfoTest.json";
          // const res = await this.$http.get(url);
          for(var i = 0; i < res.length;i++){
            res[i] = JSON.parse(res[i]);
            this.symbol=res[i]["symbol"];
            this.name=res[i]["longName"];
            this.price=res[i]["regularMarketPrice"];
            this.change=res[i]["regularMarketChange"];
            this.pchange=0;
            this.volume=res[i]["regularMarketVolume"];
            this.fiftyDayAverage=res[i]["fiftyDayAverage"];
            this.twoHundredDayAverage=res[i]["twoHundredDayAverage"];
            this.fiftytwoWeekRange=res[i]["fiftyTwoWeekRange"];
            this.data1.push({
              symbol:this.symbol,
              name:this.name,
              price:this.price,
              change:this.change,
              pchange:0,
              volume:this.volume,
              fiftyDayAverage:this.fiftyDayAverage,
              twoHundredDayAverage:this.twoHundredDayAverage,
              fiftytwoWeekRange:this.fiftytwoWeekRange
            });
          }
        },
        // handleSubmit (name) {
        //   this.$refs[name].validate((valid) => {
        //     if (valid) {
        //       this.$Message.success('Success!');
        //     } else {
        //       this.$Message.error('Fail!');
        //     }
        //   })
        // },
        // handleReset (name) {
        //   this.$refs[name].resetFields();
        // },
        // handleAdd () {
        //   this.index++;
        //   this.formDynamic.items.push({
        //     value: '',
        //     index: this.index,
        //     status: 1
        //   });
        // },
        // handleRemove (index) {
        //   this.formDynamic.items[index].status = 0;
        // }
      }
    }
  </script>


  <style>
  </style>