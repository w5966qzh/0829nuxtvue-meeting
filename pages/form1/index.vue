<template>
  <v-sheet>
      <h1>何も工夫しない</h1>
        <v-snackbar :value="message">{{message}}</v-snackbar>

        <v-card :loading="loading? 'primary':false">
            <v-card-title>ユーザー情報</v-card-title>
            <v-card-text>
                <div>名前：{{name}}</div>
                <div>メールアドレス：{{email}}</div>    
            </v-card-text>
            <v-card-actions>
                <v-btn @click="openDialog()">編集</v-btn>
            </v-card-actions>
        </v-card>

      <v-dialog v-model="dialog">
          <v-card class="px-10 py-5" :loading="connecting? 'primary':false">
              <v-text-field v-model="name" label="名前" />
              <v-text-field v-model="email" label="メールアドレス" />

              <v-btn @click="save()">保存</v-btn>
              <v-btn @click="cancel()">キャンセル</v-btn>
          </v-card>
      </v-dialog>
  </v-sheet>
</template>

<script lang="js">
export default {
    data(){
        return{
            loading:true,
            connecting:false,
            dialog:false,
            name:"",
            email:"",
            message:"",
        }
    },
    async created(){
        this.loading=true
        const {name,email} = await this.load()
        this.name = name
        this.email = email
        this.loading=false
    },
    methods:{
        load(){
            return new Promise(resolve=>{
                setTimeout(() => {
                    resolve({name:"あいみょん", email:"aimyon@fm802.co.jp"})
                }, 2000);                
            })
        },
        register(){
            return new Promise(resolve=>{
                setTimeout(()=>{
                    resolve()
                },2000)
            })
        },
        openDialog(){
            this.dialog=true
        },
        async save(){
            this.connecting =  true
            await this.register()
            this.connecting = false
            this.message = "保存しました"
            this.dialog=false
        },
        cancel(){
            this.dialog=false
        }
    }
}
</script>