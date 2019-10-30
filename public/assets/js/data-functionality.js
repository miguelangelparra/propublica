
//Headers (Datos para la solicitud de datos al servidor)
var init = {
	method: 'GET',
	headers: { 'X-API-Key': 'uWXbbuTY8jRbLvkqFPmD39gtSXXRKTJ0mXCBPnxw' }
}

//Request
var request = new Request(url, init)

//Instancia de VUE
var app1 = new Vue({
  el: '#vm',

  data: {
    //Datos crudos de miembros
    members: [],

    isLoaded: false,

    //Variables para filtrar  (con valores inicializados)
    selectedState: "allStates",
    selectedParties: ["R", "D", "I"],
  },

  computed: {
    //Dibuja estados en el select
    states() { return Array.from(new Set(this.members.map(member => member.state))).sort() },

    //Filtra a los miembros por estado y partido
    toFilteredMembers() {
      return this.members.filter(member =>
        (this.selectedState == member.state || this.selectedState == "allStates")
        && (this.selectedParties.includes(member.party)))
    }
  },

  created() {
		//Solicitud de data al servidor
		fetch(request)
			.then(members => members.json())
			.then((membersJson) => { 
				this.members = membersJson.results[0].members
				this.isLoaded = true}
				)
			.catch(() => alert("Lo sentimos, tuvimos problema con el servidor. (Vuelve más tarde!)"))
	},
})
