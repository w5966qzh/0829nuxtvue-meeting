<template>
  <div>
    <div style="margin-top: 16px">
      <p>ユーザー件数: {{ userNum }}</p>
      <ul>
        <li v-for="u in data.users" :key="u.id">{{ u.id }} {{ u.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent, reactive, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const data = reactive({
      users: [],
    })

    const userNum = computed(() => data.users.length)

    // created ... DOMにさわれることが保証されてない。APIからデータ取得する処理などを書く
    setTimeout(() => {
      data.users.push(...[
        { id: 1, name: '加藤かな' },
        { id: 2, name: '田中紘一' },
        { id: 3, name: '山田太郎' },
      ])
    }, 3000);

    return {
      data,
      userNum,
    }
  },
})
</script>
