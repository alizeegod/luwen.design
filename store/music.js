/**
 * Author: alizeegod
 * Create Time: 2019-08-01 16:33
 * Description:
 */

export const state = () => {
    return {
        playList: [],
        playListDetail: {},
        songDetail: []
    }
}

export const mutations = {

    // 文章列表
    updatePlayList(state, action) {
        state.playList = action
    },
    updatePlayListDetail(state, action) {
        state.playListDetail = action
    },
    updateSongDetail(state, action) {
        state.songDetail = action
    }
}

export const actions = {
    fetchPlayList({ commit }, params = {}) {
        // return
        return this.$axios.$get('/user/playlist', { params })
            .then(response => {
                // console.log(response)
                commit('updatePlayList', response.playlist)
            })
            .catch(error => console.log(error))
    },
    fetchPlayListDetail({ commit }, params = {}) {
        // return
        return this.$axios.$get('/playlist/detail', { params })
            .then(response => {
                console.log(response)
                commit('updatePlayListDetail', response.playlist)
            })
            .catch(error => console.log(error))
    },
    fetchSongDetail({ commit }, params = {}) {
        // return
        return this.$axios.$get('/song/url', { params })
            .then(response => {
                // console.log(response)
                commit('updateSongDetail', response.data)
            })
            .catch(error => console.log(error))
    }
}
