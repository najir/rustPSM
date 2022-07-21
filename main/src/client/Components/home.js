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
            if(self.steamIdCheck(self.id)){
                self.$router.push(`/user/${self.id}`)
            }
            else {
                self.errors.steamId = "The steamId value you entered is not valid, please try again."
            }
        },
        steamIdCheck(idValue) {
            let finalId = idValue
            let result = false
            if (idValue.length == 17) {
                result = true
            }
            return result;
        }
    },
    template: `
        <h1>RustPSM</h1>
        <h2>Isaac Perks</h2>
        <h3>07/21/22</h3>
        <p class="spacealign">Enter your SteamID and submit to be sent to your personal statistics page.</p>
        <form class="form-horizontal" v-on:submit.prevent="submit($event);">
            <input type="text" v-model="id">
            <br />
            <button class="FWButton" type="submit">
                Send SteamID
            </button>
            <p class="error" v-if="errors.steamId">{{errors.steamId}}</p>
        </form>`
}