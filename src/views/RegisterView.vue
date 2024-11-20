<script setup>

import BlogForm from "@/components/BlogForm.vue";
import { ref } from 'vue';
import router from "@/router";
import BlogWrapper from "@/components/BlogWrapper.vue";
import $config from "@/config";

const inputs = ref([
  {
    name: 'email',
    type: 'text',
    title: 'E-mail'
  },
  {
    name: 'fullname',
    type: 'text',
    title: 'Fullname'
  },
  {
    name: 'password',
    type: 'password',
    title: 'Password'
  },
  {
    name: 'password_confirmation',
    type: 'password',
    title: 'Repeat Password'
  },
]);
</script>

<template>
<BlogWrapper page="register">
  <BlogForm callback-message-title="Go To Login Page"
            callback-message-text="Registration was successfully pleas check your mail address"
            :callback-action="()=> router.push('login')"
            :action="$config.API_URL + '/register'"
            :is-authorization-needed="false" title="Register" method="post"
            :inputs="inputs">

  </BlogForm>
</BlogWrapper>
</template>

<style scoped>

</style>