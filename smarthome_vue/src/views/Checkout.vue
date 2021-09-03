<!--结算-->
<template>
    <div class="page-checkout">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">结算</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>商品</th>
                            <th>颜色</th>
                            <th>价格</th>
                            <th>数量</th>
                            <th>总计</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                        >
                            <td>{{ item.product.name }}</td>
                            <td>{{ item.color }}</td>
                            <td>${{ item.product.price }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>${{ getItemTotal(item).toFixed(2) }}</td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colspan="3">总计</td>
                            <td>{{ cartTotalLength }}</td>
                            <td>${{ cartTotalPrice.toFixed(2) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">购物详情信息</h2>

                <p class="has-text-grey mb-4">* 必须项</p>

                <div class="columns is-multiline">
                    <div class="column is-6">


                        <div class="field">
                            <label>姓*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="last_name">
                            </div>
                        </div>

                        <div class="field">
                            <label>邮箱*</label>
                            <div class="control">
                                <input type="email" class="input" v-model="email">
                            </div>
                        </div>

                      <div class="field">
                            <label>地址*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="address">
                            </div>
                        </div>

                    </div>

                    <div class="column is-6">

                      <div class="field">
                            <label>名*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="first_name">
                            </div>
                        </div>

                      <div class="field">
                            <label>电话*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="phone">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="notification is-danger mt-4" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>

                <template v-if="cartTotalLength">
                    <hr>

                    <button class="button is-dark" @click="submitForm()">支付</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {toast} from "bulma-toast";

export default {
    name: 'Checkout',
    data() {
        return {
            cart: {
                items: []
            },
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            errors: [],

        }
    },
    mounted() {
        document.title = 'Checkout | Smarthome'

        this.cart = this.$store.state.cart
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        async submitForm() {
          this.errors = []

          if (this.first_name === '') {
            this.errors.push('姓不能为空!')
          }

          if (this.last_name === '') {
            this.errors.push('名不能为空!')
          }

          if (this.email === '') {
            this.errors.push('邮箱不能为空!')
          }

          if (this.phone === '') {
            this.errors.push('电话不能为空!')
          }

          if (this.address === '') {
            this.errors.push('地址不能为空!')
          }
          const items =[]
          for (let i = 0; i < this.cart.items.length; i++) {
                const item = this.cart.items[i]
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    color: item.color,
                    price: item.product.price * item.quantity
                }
                items.push(obj)
            }

          const data = {
            'first_name': this.first_name,
            'last_name': this.last_name,
            'email': this.email,
            'address': this.address,
            'phone': this.phone,
            'items': items,
          }

          await axios
              .post('/api/v1/checkout/', data)
              // .post('/api/v1/orders/', data)
              .then(response => {
                this.$store.commit('clearCart')
                this.$router.push('/cart/success')
              })
              .catch(error => {
                this.errors.push('出错了，请重试')

                console.log(error)
              })

          this.$store.commit('setIsLoading', false)
        }
    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
}
</script>
