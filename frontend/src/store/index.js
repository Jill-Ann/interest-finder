import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import user from '../../../backend/src/models/user'

Vue.use(Vuex)

let baseUrl = new URL(
  'https://graph.facebook.com/search?limit=500&access_token=***REMOVED***'
  // "https://graph.facebook.com/search?limit=500&access…stion&locale=en_US&interest_list=%5B%22Yoga%22%5D"
)
// get access to URLSearchParams object
let params = baseUrl.searchParams
let completeUrl

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    incrementCount(state) {
      state.count++
    }
  },
  actions: {
    incrementCount(store) {
      store.commit('incrementCount')
    },

    async signUp(store, user) {
      await axios.post(`/api/signup`, {
        name: user.name,
        email: user.email,
        password: user.password
      })
    },

    async fetchUser(store, id) {
      const userRequest = await axios.get(`/api/users/${id}`)
      return userRequest.data
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/users')
      return usersRequest.data
    },

    async toggleStarred(store, interest) {
      await axios.patch(`/api/interests/${interest.name}`, {
        starred: !interest.starred
      }) // does this only work if the interest is already created? Can I create a new one like this?

      interest.starred = !interest.starred
    },

    async testInterest(store, name) {
      await axios.patch(`/api/interests/${name}`, {
        tested: true
      })
    },

    async fetchStarredInterest(store, id) {
      const interestRequest = await axios.get(`/api/interests/${id}`)
      return interestRequest.data
    },
    async fetchStarredInterests() {
      const interestsRequest = await axios.get('/api/interests')
      return interestsRequest.data
    },

    async setUrlParams({ store, dispatch }, { keyword, searchType, locale }) {
      if (searchType == 'adinterestsuggestion') {
        params.set('interest_list', `["${keyword}"]`)
      } else {
        params.set('q', keyword)
      }

      params.set('type', searchType)
      params.set('locale', locale)
      completeUrl = baseUrl.toString()
      console.log(completeUrl)
    },

    async getInterests({ store, dispatch }, form) {
      await dispatch('setUrlParams', form)
      const response = await axios.get(completeUrl)
      // console.log(response)
      return response
    }
  },
  modules: {}
})
