export default {
    data() {
        return {
            id: '',
            errors: {
                steamId: ''
            }
        }
    },
    methods: {
        submit(handler) {
            let self = this
            if(this.steamIdCheck(id)){
                fetch(this.$router.base + "/" + id)
            }
            else {
                this.errors.steamId = "The steamId value you entered is not valid, please try again."
            }
        },
        steamIdCheck(idValue) {
            let finalId = idValue
            if () {

            }
            else {

            }
            return false
        }
    },
    template: `
        <h1>Welcome to RustPSM</h1>
        <h2>Isaac Perks</h2>
        <h3>05/18/22</h3>
        <p>Here you will be able to enter the steamID of a player to gather their stats and compare them to our database. <br />
            We will provide a built-in statistic for comparing users based on several ingame stats. More involved information <br />
            Can be found on the project github page:</p>
        <a href="https://www.github.com">GitHub Link</a>
        <form method="POST" class="form-horizontal" onSubmit="return false;" @submit.prevent="submit" v-on:submit="submit($event);">
            <input type="text" v-model="name">
            <button type="submit">
                Send SteamID
            </button>
            <p class="error" v-if="errors.steamId">{{errors.steamId}}</p>
        </form>`
}