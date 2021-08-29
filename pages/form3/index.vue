<template>
  <v-sheet>
      <h1>classを用いる</h1>
        <v-snackbar :value="message">{{message}}</v-snackbar>

        <v-card :loading="loading? 'primary':false">
            <v-card-title>ユーザー情報</v-card-title>
            <v-card-text>
                <div>名前：{{user.name}}</div>
                <div>メールアドレス：{{user.email}}</div>    
            </v-card-text>
            <v-card-actions>
                <v-btn @click="dialog=true">編集</v-btn>
            </v-card-actions>
        </v-card>

      <v-dialog v-model="dialog">
          <v-card class="px-10 py-5" :loading="connecting? 'primary':false">
              <v-text-field v-model="user.name" label="名前" />
              <v-text-field v-model="user.email" label="メールアドレス" />

              <v-btn @click="save()">保存</v-btn>
              <v-btn @click="cancel()">キャンセル</v-btn>
          </v-card>
      </v-dialog>
  </v-sheet>
</template>

<script lang="js">
import { defineComponent, ref, reactive } from '@nuxtjs/composition-api'
import User from './User.js'

export default defineComponent({
    setup(props,{emit}) {
        const loading = ref(true)
        const connecting = ref(false)
        const dialog = ref(false)
        const message = ref("")
        const user = ref({})

        async function load(){
            loading.value = true
            user.value = await new User()
            loading.value = false
        }
        load()

        async function save(){
            connecting.value =  true
            await user.value.save()
            connecting.value = false
            message.value = "保存しました"
            dialog.value=false
        }

        function cancel(){
            dialog.value=false
        }

        return {
            loading, connecting, dialog, message, user,
            save, cancel
        }
    }
})
</script>