<script setup>
//todo refactor this to separate components based on form action logic

import {reactive, onMounted} from "vue";
import router from "@/router";
import $auth from "@/auth";
import $request from "@/request";

const props = defineProps({
  inputs: Array,
  method: String,
  action: String,
  title: String,
  callbackMessageText: String,
  callbackMessageTitle: String,
  callbackAction: Function,
  isLogin: Boolean,
  isAuthorizationNeeded: Boolean,
  hiddenId: String,
  reload: Boolean
})

const formData = reactive({});

const callbackMessage = reactive({
  text: '',
  title: ''
});

onMounted(() => {
  props.inputs.forEach(function (item) {
    formData[item.name] = ''
  })
});

const handleSubmit = function (event) {
  const form = new FormData(document.getElementById('form'))
  $request.post(event.target.action, form, props.isAuthorizationNeeded, function (response) {
    if (response.data.status === 'INVALID_DATA') {

      for (const formDataKey in formData) {
        formData.hasOwnProperty('error_' + formDataKey) ? delete formData['error_' + formDataKey ] : null;
      }
      for (const responseKey in response.data.errors) {
        formData['error_' + responseKey ] = response.data.errors[responseKey]
      }

    } else if (response.data.status === 'OK' || response.data.original.status === 'OK') {
      if (props.isLogin) {
        $auth.login(response.data.original.data.jwt)
        router.push('/');
      }

      if (props.reload) {
        location.reload();
      }

      callbackMessage.text = props.callbackMessageText
      callbackMessage.title = props.callbackMessageTitle

      for (const formDataKey in formData) {
        formData[formDataKey] = ''
      }
    }
  })
};

</script>

<template>
  <div class="s-content content">
    <main class="row content__page">
      <section class="column large-full entry format-standard">
        <h3 class="h2">{{!callbackMessage.text ? 'Lets Do It' : callbackMessage.text}}</h3>
        <form id="form" v-if="!callbackMessage.text" @submit.prevent="handleSubmit($event)" :method="method" :action="action" autocomplete="off" enctype="multipart/form-data">
          <fieldset v-for="input in inputs">
            <div class="form-field">
              <input :name="input.name" :id=input.name class="full-width" :placeholder="input.value ?? input.title" v-model="formData[input.name]" :type=input.type>
              <span v-if="formData['error_' + input.name]">{{formData['error_' + input.name]}}</span>
            </div>
          </fieldset>
          <input name="id" type="hidden" :value="hiddenId">
          <input name="submit" id="submit" class="btn btn--primary btn-wide btn--large full-width" :value="title" type="submit">
        </form>
        <hr>
        <br>
        <input @click="props.callbackAction" v-if="callbackMessage.title" class="btn btn--primary btn-wide btn--large full-width" :value="callbackMessage.title" type="button">
      </section>
    </main>
  </div>
</template>

<style scoped>

</style>