<template lang="pug">
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  created () {
    // const token = this.$route.query.token
    var token = this.$store.state.account.token
    console.log(this.$store.state.account.token)

    console.log('token', token)
    if (token) {
      token = null;
      this.setToken(token)
      this.fetchUser()
    }
    this.$router.replace('/')
  },
  methods: {
    ...mapActions(['fetchUser']),
    ...mapMutations(['setToken'])
  }
}
</script>
