<script setup>
import BlogWrapper from "@/components/BlogWrapper.vue";
import BlogForm from "@/components/BlogForm.vue";
import { ref } from 'vue';
import $config from "@/config";


const inputs = ref([
  {
    name: 'email',
    type: 'text',
    title: 'E-mail',
  },
  {
    name: 'password',
    type: 'password',
    title: 'Password',
  }
]);

</script>


<template>
<BlogWrapper page="login">
  <BlogForm title="Login" method="post" :action="$config.API_URL + '/login'" :inputs="inputs" :is-login=true :is-authorization-needed="false"></BlogForm>
</BlogWrapper>
</template>

<style scoped>

</style>