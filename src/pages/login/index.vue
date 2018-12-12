<template>
  <div class="login-layout">
    <div class="login">
      <div class="loginMsg">登&nbsp;&nbsp;录</div>
      <el-form
      class="login-form"
      :model="loginForm"
      :label-position="'left'"
      :rules="loginRules"
      label-width="80px"
      @keyup.enter.native="login()">
        <div class="login-logo"></div>
        <div class="login-item">
          <el-input :class="{searchfocus: nameInputState}" @focus="focus('nameInputState')" @blur="blur('nameInputState')" v-model="loginForm.account" placeholder="Username" :disabled="processing">
            <template slot="prepend"><i class="fa fa-user"></i></template>
          </el-input>
        </div>
        <div class="login-item">
          <el-input :class="{searchfocus: pswInputState}" @focus="focus('pswInputState')" @blur="blur('pswInputState')" type="password" v-model="loginForm.password" placeholder="Password" :disabled="processing">
            <template slot="prepend"><i class="fa fa-lock"></i></template>
          </el-input>
        </div>

        <div class="login-item">
          <el-button class="btn-defalut" type="success" @click="login()" :loading="processing" :disabled="disabled">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
// import logo from '@/assets/img/logo.png'
import constant from '@/constant'
import { mapState } from 'vuex'

const {REJECT, RESULT} = constant

export default {
  name: 'login',
  data () {
    return {
      // logo,
      processing: false,
      nameInputState: 0,
      pswInputState: 0,
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          {required: true, message: '请输入账号'}
        ],
        password: [
          {required: true, message: '请输入密码'}
        ]
      }
    }
  },
  computed: {
    disabled () {
      return !this.loginForm.account || !this.loginForm.password
    },
    ...mapState(['user'])
  },
  watch: {
    'user.info.async_state': function (state) {
      if (state === RESULT) {
        if (this.$store.state.user.info.role === '管理员') {
          this.$router.push({name: 'setting_password'})
        } else {
          let redirect = this.$route.query.redirect
          if (redirect) {
            this.$router.replace({path: redirect})
          } else {
            this.$router.push({name: 'home'})
          }
        }
      } else if (state === REJECT) {
        this.processing = false
      }
    }
  },
  methods: {
    login () {
      if (this.loginForm.account && this.loginForm.password) {
        this.processing = true
        this.$router.push('/home/condition')
        // this.$store.dispatch('login', this.loginForm)
      }
    },
    focus (attr) {
      this[attr] = 1
    },
    blur (attr) {
      this[attr] = 0
    }
  }
}
</script>
