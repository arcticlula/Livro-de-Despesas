import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'mondays',
            paths: ['userDB', 'userPlayer', 'navbar', 'mode.playedMatchesOnly', 'highscore'],
        })(store)
    }
    )
}