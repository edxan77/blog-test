<script setup>
import BlogWrapper from "@/components/BlogWrapper.vue";
import {ref} from "vue";
import $request from "@/request";
import {useRoute} from "vue-router";
import $auth from "@/auth";
import BlogForm from "@/components/BlogForm.vue";
import router from "@/router";
import $config from "@/config";

const canEdit = ref(false);

let blog = ref({});
let author = ref({});
let inputs = ref({});
let blogId = useRoute().params.id

$request.get($config.API_URL + '/blog/'+ useRoute().params.id, function (response) {
  blog.value = response.data.data;
  author.value = response.data.data.user;
  canEdit.value = response.data.can_edit;

 inputs = [
    {
      name: 'title',
      type: 'text',
      title: 'Blog Title',
      value: response.data.data.title
    },
    {
      name: 'description',
      type: 'text',
      title: 'Blog Description',
      value: response.data.data.description
    },
    {
      name: 'image',
      type: 'file',
      title: 'image',
    }
  ]
}, {params:{token: $auth.getToken()}})

const deleteBlog = function () {
  $request.post($config.API_URL + '/blog/delete', {id: blogId}, true, function () {
    router.push('/');
  })
}

</script>

<template>
  <blogWrapper page="blog-inner">
    <div v-if="blog" class="s-content content">
      <main class="row content__page">

        <article class="column large-full entry format-standard">
          <div class="content__page-header entry__header">
            <h1 class="display-1 entry__title">
              {{ blog.title }}
            </h1>
            <ul class="entry__header-meta">
              <li class="author">By <a> {{ author.username }} </a></li>
              <li class="date">{{ blog.created_at }}</li>
              <li class="cat-links">
                <a>{{ author.email }}</a>
              </li>
            </ul>
          </div>

          <div class="entry__content">
            <div class="media-wrap entry__media">
              <button @click="deleteBlog" v-if="canEdit" style="background-color: red; color: white">delete my post</button>
              <div class="entry__post-thumb">
                <img :src="'data:image/jpg;base64,' + blog.image">
              </div>
            </div>

            <p> {{ blog.description }} </p>

          </div>
        </article>
      </main>

    </div>

    <BlogForm :action="$config.API_URL + '/blog/update'" :inputs="inputs" v-if="canEdit" :hidden-id="blogId" :is-authorization-needed="true" :reload="true"></BlogForm>
  </blogWrapper>
</template>

<style scoped>

</style>