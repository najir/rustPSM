// Base page for visually storing and showing userdata. 
export default {
    props : ['id'],
    data() {
        return {
            playerData: ''
        }
    },
    methods: {
    },
    mounted() {
        fetch('http://localhost:8081' + "/api/" + this.id, {
            method: 'GET' })
            .then(response => response.json().then(json => {
                this.playerData = json
                console.log(this.playerData)
            }))
            .catch(error => { console.log(error) })
    },
    template: `
        <h1>Player data Stats.</h1>
        <h1>Steam ID: {{this.id}}</h1>
        <table>
            <tr>
                <th> Headshot % </th>
                <th> Kill/Death Ratio </th>
                <th> Hit % </th>
                <th> Rating </th>
            </tr>
            <tr>
                <td> {{ this.playerData.headshot }} </td>
                <td> {{ this.playerData.kd }} </td>
                <td> {{ this.playerData.hitshot }} </td>
                <td> {{ this.playerData.rating }} </td>
            </tr>
        </table>


`

}