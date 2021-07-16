<template>
  <div class="container mx-auto py-1">
    <div class="row">
      <div class="col p-4">
        <h1>Get request</h1>
        <p>Just fetch data from the API</p>
        <textarea readonly cols="30" rows="10" class="form-control" v-model="getter"></textarea>
      </div>
      <div class="col p-4">
        <h1>Post request</h1>
        <p>Send data to the API, then return data as JSON</p>
        <form @submit.prevent="post()">
          <textarea cols="30" rows="10" class="form-control" v-model="input"></textarea>
          <div class="d-grid mx-auto">
            <button type="submit" class="btn btn-primary my-2">Submit</button>
          </div>
        </form>
        <textarea class="form-control" cols="30" rows="10" readonly v-model="output"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="alert alert-danger" role="alert" v-show="alert" @click="alert = false">
        A simple danger alert—check it out!
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      getter: 'Requesting...',
      input: null,
      output: 'Waiting for input..',
      error: null,
      alert: false,
    }
  },
  async mounted() {
    await this.get()
  },
  methods: {
    async post() {
      try {
        const response = (await axios.post('http://localhost:5000/', this.input)).data
        this.output = JSON.stringify(response, null, 2)
      } catch (error) {
        this.error = error
        this.alert = true
      }
    },
    async get() {
      try {
        const response = (await axios.get('http://localhost:5000/')).data
        this.getter = response
      } catch (error) {
        this.alert = true
        this.error = error
      }
    }
  }
}
</script>
