<script setup>

// todo make pagination to numeric

import BlogWrapper from "@/components/BlogWrapper.vue";
import {ref} from "vue";
import $request from "@/request";
import $config from "@/config";

let blogs = ref([]);

const changePage = function (url) {
  $request.get(url, function (response) {
    blogs.value = response.data.data
    console.log(blogs)
  })
}

$request.get($config.API_URL + '/blogs?page=1', function (response) {
  blogs.value = response.data.data
  console.log(blogs)
})

</script>

<template>
  <BlogWrapper page="home">
    <div v-if="blogs" class="s-content">

      <div class="masonry-wrap">

        <div class="masonry">

          <div class="grid-sizer"></div>

          <div :key="blog.id" v-for="blog in blogs.data" class="masonry__brick entry format-standard">

            <div class="entry__thumb">
              <router-link :to="'/blog/' + blog.id">
                <img :src="'data:image/jpg;base64,' + blog.image">
              </router-link>
            </div>

            <div class="entry__text">
              <div class="entry__header">

                <h2 class="entry__title">
                  <router-link :to="'/blog/' + blog.id">{{ blog.title }}</router-link>
                </h2>
                <div class="entry__meta">
                                    <span class="entry__meta-cat">
                                        <a>{{ blog.user.username }}</a>
                                        <a>{{ blog.user.email }}</a>
                                    </span>
                  <span class="entry__meta-date">
                                        <a>{{ blog.created_at }}</a>
                                    </span>
                </div>

              </div>
              <div class="entry__excerpt">
                <p>
                  {{ blog.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <button class="start" style="" @click="changePage(blogs.prev_page_url)" v-if="blogs.prev_page_url != null"><--
        </button>
        <button class="end" style="" @click="changePage(blogs.next_page_url)" v-if="blogs.next_page_url != null">-->
        </button>
      </div>

    </div>
  </BlogWrapper>
</template>


<style>
.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button.start {
  order: 1;
}

button.end {
  order: 2;
}

.row {
  display: flex;
}

.row button {
  flex: 0 0 auto;
}

.row > button.end {
  margin-left: auto;
}
</style>
