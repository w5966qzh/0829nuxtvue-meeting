<template>
  <v-dialog v-model="dialog">
    <!-- アクティベータースロット -->
    <template v-slot:activator="{ on }">
      <v-list-item-content v-on="on">
        <v-card-title>{{item.id}}{{item.name}}</v-card-title>
      </v-list-item-content>
    </template>
    <!-- ダイアログコンテンツ -->
    <v-card color="cyan lighten-4" light>
      <div class="d-flex justify-end">
        <v-btn @click="isEdit=!isEdit" text>編集</v-btn>
      </div>

      <v-card-title>
        {{item.id}}
      </v-card-title>
      <v-card-text>
        <v-text-field :disabled="!isEdit" v-model="item.name"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialog = false">
          Close
        </v-btn>
        <v-btn @click="remove(item)" color="red">
          削除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script lang="js">
import { defineComponent, ref, reactive, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props:{
    item:Object
  },
  setup(props,context){
    const dialog = ref(false)
    const isEdit = ref(false)
    function remove(e){
      context.emit('remove',e)
      dialog.value=false
    }

    const Item = class{
      constructor(id){
        this.id = id
        this.name = ""
      }
      init(props){
        this.id = props.id
        this.name = props.name
      }
    }

    return {
      Item,
      dialog,
      isEdit,
      remove
    }
  }
})
</script>
