<template lang="pug">
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  created () {
    // const token = this.$route.query.token
    var token = this.$store.state.account.token
    var user = this.$store.state.account.user

    if (token) {
      token = null;
      user = null;
      this.setToken(token)
      this.setUser(user)
      this.fetchUser()
    }
    this.$router.replace('/')
  },
  methods: {
    ...mapActions(['fetchUser']),
    ...mapMutations(['setToken']),
    ...mapMutations(['setUser'])
  }
}
</script>
