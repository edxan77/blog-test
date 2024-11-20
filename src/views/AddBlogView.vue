<script setup>

import BlogWrapper from "@/components/BlogWrapper.vue";
import BlogForm from "@/components/BlogForm.vue";

import { ref } from 'vue';
import $config from "@/config";


const inputs = ref([
  {
    name: 'title',
    type: 'text',
    title: 'Blog Title',
  },
  {
    name: 'description',
    type: 'text',
    title: 'Blog Description',
  },
  {
    name: 'image',
    type: 'file',
    title: 'image',
  }
]);

</script>

<template>
  <blogWrapper page="blog-add">
    <BlogForm title="Create New Blog" method="post" :action="$config.API_URL + '/blog/add'" :inputs="inputs" :is-authorization-needed="true"></BlogForm>
  </blogWrapper>
</template>

<style scoped>

</style>