<template>
  <div id="wrapper" >
    <nav v-show="!(path ==='/')" class="navbar is-dark" >
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>智慧家居</strong></router-link>

        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
        <div class="navbar-start">
          <div class="navbar-item">
            <form method="get" action="/search">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input" placeholder="您想要什么？" name="query">
                </div>

                <div class="control">
                  <button class="button is-success">
                      <span class="icon">
                      <i class="fas fa-search"></i>
                      </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="navbar-end">
          <router-link to="/desk" class="navbar-item">桌子</router-link>
          <router-link to="/chair" class="navbar-item">椅子</router-link>


          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-light">我的账户</router-link>
              </template>

              <template v-else>
                <router-link to="/log-in" class="button is-light">登录</router-link>
              </template>

              <router-link to="/cart" class="button is-success">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>购物车 ({{ cartTotalLength }})</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>
<!-- class="section"-->
    <section>
      <router-view/>
    </section>

    <footer v-show="!(path ==='/')" class="footer" style="background-color: #363636;padding: 20px 0px 20px 0px ">
      <div id="tips">
      <div style="align-items: center;justify-content: center;font-size:20px;display:flex">@联系我们</div>
      <div style="align-items: center;justify-content: center;display:flex">联系人：罗女士 电话：12345678910</div>
      <div style="align-items: center;justify-content: center;display:flex">公司地址： 四川省成都市武侯区蜀锦路88号</div>
      <div style="align-items: center;justify-content: center;display:flex">网络110报警服务 中国互联网举报中心 家长监护 Chrome商店下载 ©2021-2021网络技术有限公司 版权与免责声明 版权申诉</div>
    </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      path:'',
      showMobileMenu: false,
      cart: {
        items: []
      }
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;
    this.path = this.$route.path;
  },
  watch:{
            $route(to,from){
                this.path = to.path
            }
        },
  computed: {
      cartTotalLength() {
          let totalLength = 0

          for (let i = 0; i < this.cart.items.length; i++) {
              totalLength += this.cart.items[i].quantity
          }

          return totalLength
      }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}

#tips{
  width: 100%;
  height: 100px;
  background-color: #363636;
  margin-top: 20px;
  color: #ffffff;
}
</style>
