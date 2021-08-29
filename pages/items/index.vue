<template>
  <v-sheet light>
    <v-list dense>
      <v-list-item-action class="d-flex justify-end">
        <v-btn @click="createItem($event)" color="orange">新規作成</v-btn>
      </v-list-item-action>

      <v-list-item v-for="item in items" :key="item.id" >
        <item-view-model :item="item" @remove="remove($event)"/>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script lang="js">
import { defineComponent, ref, reactive, computed } from '@nuxtjs/composition-api'
import ItemViewModel from './ItemViewModel'
import axios from 'axios'

export default defineComponent({
  components:{ ItemViewModel },
  setup(props,context){
    const Item = ItemViewModel.setup().Item
    const items = ref([])

    const getDatas = () => {
      return new Promise(async (resolve,reject)=>{
        const {data} = await axios.get('/server/api/items')
        resolve(data)
      })
    }

    getDatas().then(datas=>{
      datas.forEach(item=>{
        const instance = new Item()
        instance.init(item)
        items.value.push(instance)
      })
      console.log(datas)
    })

    function createItem(){
      items.value.push(new Item(items.value.length+1))
    }

    function remove(e){
      console.log(items)
      items.value = items.value.filter(item=>item.id!==e.id)
      console.log("削除",items)
    }

    return {
      items,
      createItem,
      remove
     }
  }
})
</script>
