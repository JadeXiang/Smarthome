<!--主页-->
<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div id="lun" @click="goThree">
      <el-carousel :interval="4000" type="card" height="300px" style="margin-top: 15px">
        <el-carousel-item v-for="(item, index) in superUrl" :key="index">
          <h3 class="medium">
            <el-image :src="item.url" id="img"></el-image>
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">最新产品</h2>
      </div>

      <ProductBox 
        v-for="product in latestProducts"
        v-bind:key="product.id"
        v-bind:product="product" />
    </div>
<!--    <div>-->
<!--      <iframe :src="threeUrl" style="height: 1000px;width: 100%"></iframe>-->
<!--    </div>-->
  </div>
</template>

<script>
import axios from 'axios'

import ProductBox from '@/components/ProductBox'

export default {
  name: 'Home',
  data() {
    return {
      threeUrl:'Untitled-4.html',
      latestProducts: [],
      superUrl: [
        { index: 1, url: require("../assets/001.jpg") },
        { index: 2, url: require("../assets/002.jpg") },
        { index: 3, url: require("../assets/004.jpg") },
        { index: 4, url: require("../assets/005.jpg") },
      ],
    }
  },
  components: {
    ProductBox
  },
  mounted() {
    this.getLatestProducts()

     document.title = 'Home | Smarthome'
  },
  methods: {
    goThree(){
      window.location.href='Untitled-4.html'
    },
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)

      await axios
        .get('/api/v1/latest-products/')
        .then(response => {
          this.latestProducts = response.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>

<style>
#lun{
  height: 350px;
}
</style>
