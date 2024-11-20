<script setup>

import $auth from "@/auth";
import router from "@/router";
import $request from "@/request";
import $config from "@/config";

const props = defineProps({
  page: String,
  message: String
})

const logout = function () {
  $request.post($config.API_URL + '/logout', {}, true, function () {
    $auth.logout();
    router.push('/login');
  })
}
</script>

<template>
  <div id="top" class="s-wrap site-wrapper">
    <header class="s-header">

      <div class="header__top">
         <router-link to="/"><h2 style="color: #42b983">Blog Test Task</h2></router-link>
      </div>

      <nav class="header__nav-wrap">

        <ul class="header__nav">
          <li :class="page === 'home' ? 'current' : ''"><router-link :to="'/'">Home</router-link></li>
          <li v-if="$auth.check()" :class="page === 'blog-add' ? 'current' : ''"><router-link :to="'/blog/add'">Add New Blog</router-link></li>
          <li v-if="!$auth.check()" :class="page === 'login' ? 'current' : ''"><router-link :to="'/login'">Login</router-link></li>
          <li v-if="!$auth.check()" :class="page === 'register' ? 'current' : ''"><router-link :to="'/register'">Register</router-link></li>
        </ul> <!-- end header__nav -->

        <ul class="header__social">
          <li @click="logout" v-if="$auth.check()"><input type="button" value="Logout"></li>
        </ul>

      </nav>

      <a href="#0" class="header__menu-toggle">
        <span>Menu</span>
      </a>

    </header>
    <h3>{{ message }}</h3>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>