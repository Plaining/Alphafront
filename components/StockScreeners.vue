<template>
  <div>
   <div>
    <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
      <FormItem
      v-for="(item, index) in formDynamic.items"
      v-if="item.status"
      :key="index"
      :label="'Item ' + item.index"
      :prop="'items.' + index + '.value'"
      :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
      <Row>
        <Col span="18">
          <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
        </Col>
        <Col span="4" offset="1">
          <Button @click="handleRemove(index)">Delete</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="12">
          <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
      <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</div>
<Table stripe :columns  ="columns1" :data="data1">
  
</Table>
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
          key: 'price'
        },
        {
          title: 'change',
          key: 'change'
        },
        {
          title: 'pchange',
          key: 'pchange'
        },
        {
          title: 'volume',
          key: 'volume'
        },
        {
          title: 'fiftyDayAverage',
          key: 'fiftyDayAverage'
        },{
          title: 'twoHundredDayAverage',
          key:'twoHundredDayAverage'
        },{
          title: 'fiftytwoWeekRange',
          key:'fiftytwoWeekRange'
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
      async searchInfo(){
          const url = "/GetStockList";
          const res = await this.$http.get(url);
          // const url = "./static/getInfoTest.json";
          // const res = await this.$http.get(url);
          for(var i = 0; i < res.length;i++){
            console.log(res[i]);
            console.log(typeof(res[i]));
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
          console.log(this.name);
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      handleAdd () {
        this.index++;
        this.formDynamic.items.push({
          value: '',
          index: this.index,
          status: 1
        });
      },
      handleRemove (index) {
        this.formDynamic.items[index].status = 0;
      }
    }
  }
</script>


<style>
</style>