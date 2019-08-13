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
<Table stripe :columns  ="columns1" :data="data1"></Table>
</div>
</template>

<script>
  export default {
    name: 'StockScreeners',
    data () {
      return {
        index: 1,
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
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
        ],
        data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
        ]
      }
    },
    components: {
    },
    methods:{
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