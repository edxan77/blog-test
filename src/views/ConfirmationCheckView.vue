<script setup>

import BlogWrapper from "@/components/BlogWrapper.vue";
import {reactive, onMounted} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
import axios from "axios";
import $config from "@/config";

const callbackMessage = reactive({
  text: '',
  title: ''
});

onMounted(function () {
  axios
      .post($config.API_URL + "/confirm", {token: useRoute().params.token})
      .then(function (response) {
        if (response.data.status === 'ERROR') {
          callbackMessage.text = 'Oops Invalid Token you will be redirected to Register'

          setTimeout(function () {
            router.push('/register')
          }, 5000)
        } else if (response.data.status === 'OK') {
          callbackMessage.text = 'Congratulations you are successfully confirm your email address'
          callbackMessage.title = 'Go To Login Page'
        }
      })
})
</script>

<template>
  <BlogWrapper>
    <div v-if="callbackMessage.text" class="s-content content">
      <main class="row content__page">
        <section class="column large-full entry format-standard">
          <h3 class="h2">{{callbackMessage.text}}</h3>
          <hr>
          <br>
          <input @click="router.push('/login')" v-if="callbackMessage.title" class="btn btn--primary btn-wide btn--large full-width" :value="callbackMessage.title" type="button">
        </section>
      </main>
    </div>
  </BlogWrapper>
</template>

<style scoped>

</style>