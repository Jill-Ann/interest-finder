<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['login', 'loginFacebook']),
    async submitLogin(e) {
      e.preventDefault()

      try {
        await this.login({
          email: this.email,
          password: this.password
        })

        this.$router.push('/profile')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    }
  }
}
</script>

<template lang="pug">
//- .login.border.p-3
//-     form(@submit="submitLogin")
//-       h1 Log in to your account
//-       label(for="email") Email:&nbsp;
//-         input(v-model="email" id="email" type="email" placeholder="Your email" required)
//-       label(for="password") Password:&nbsp;
//-         input(v-model="password" id="password" type="password" placeholder="Your password" required)
//-       input(type="submit" value="Log in")
//-     div(v-if="backendError") {{ backendError }}
//-     div Don't have an account yet? <router-link to="/register">Register</router-link>
//-     a(href='https://backend-5i4olyndpa-ew.a.run.app/api/accounts/auth/facebook') Login with Facebook

.container
  .col
    .row.main-row.d-flex.justify-content-center.align-items-center
      .form-container
        form.login-form.d-flex.flex-column.m-4.p-5(@submit="submitLogin")
          h1.mb-4 Log in
          input#email.form-elem.my-2.p-2(v-model="email" type="email" placeholder="Email address" required)
          input#password.form-elem.my-2.p-2(v-model="password" type="password" placeholder="Password" required)
          input.form-elem.my-2.p-2(type='submit' value='Log in')
          div(v-if="backendError") {{ backendError }}
          p.form-elem.my-2.p-1
            | Don't have an account yet? 
            <router-link to="/register">Sign up</router-link>
          a.form-elem.my-2.p-2.fb(href='https://backend-5i4olyndpa-ew.a.run.app/api/accounts/auth/facebook')
            i.fa.fa-facebook.fa-fw.mr-2
            | Continue with Facebook

</template>

<style lang="scss" scoped>

.container {
  background-color: #CEECEF;
}

.main-row {
  height: 80vh;
}

.form-container {
  width: auto;
  background-color: white;
  border-radius: 1%;
  border-left: 5px solid #FFC52C;
  border-top: 5px solid #030D4F;
  box-shadow: 1px 2px 10px slategray;
  // box-shadow: 2px 5px 15px darkslategray;
}
 
form {
  background-color: white;
}

// h1 {
//   font-family: 'Roboto';
//   font-weight: bold;
// }

.fb {
    background-color: #1877F2;
    color: white;
    font-weight: bold;
    border-radius: 4px;
    font-size: 17px;
    text-decoration: none; 
  }

  .fb:hover {
    color: white;
    text-decoration: none;
  }
</style>
