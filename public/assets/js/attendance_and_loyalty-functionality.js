
//Headers
var init = {
	method: 'GET',
	headers: { 'X-API-Key': 'uWXbbuTY8jRbLvkqFPmD39gtSXXRKTJ0mXCBPnxw' }
}

//Request
var request = new Request(url, init)

//Vue
var app1 = new Vue({

	el: '#vm',

	data: {
		members: [],

		isLoaded: false,

		statisticsGlance: [
			{
				idParty: "R",
				descriptionParty: "Republicants",
				numbersOfMembers: 0,
				pctVotesWithParty: 0,
			},
			{
				idParty: "D",
				descriptionParty: "Democrats",
				numbersOfMembers: 0,
				pctVotesWithParty: 0,
			},
			{
				idParty: "I",
				descriptionParty: "Independents",
				numbersOfMembers: 0,
				pctVotesWithParty: 0,
			},
			{
				idParty: "T",
				descriptionParty: "Total",
				numbersOfMembers: 0,
				pctVotesWithParty: 0,
			}
		],
	},

	methods: {
		toGetPctVoted(members) {
			return (members.reduce((accumulator, member) => accumulator + member.votes_with_party_pct, 0) / members.length).toFixed(2)
		},

		toGetMembersByParty(party) {
			return this.members.filter((member) => member.party == party)
		},

		toTotalGlance(){
				this.statisticsGlance.map((obj)=>{
				if (obj.idParty== "T"){
					obj.numbersOfMembers = this.members.length
					obj.pctVotesWithParty = this.toGetPctVoted(this.members)
				}
			})
		},

		toFilterByPercentil(percentilSearched, type, variable) {
			let data = this.members.slice()
			let dataOrdered = data.sort((a, b) => (a[variable] - b[variable]))
			let positionPercentil = Math.ceil((percentilSearched * dataOrdered.length) / 100) - 1
			let valueOfPositionByPercentil = dataOrdered[positionPercentil][variable]
			let dataFilteredByPercentil = dataOrdered.filter((member) => (type == ">" ? member[variable] <= valueOfPositionByPercentil : member[variable] >= valueOfPositionByPercentil))
			return dataFilteredByPercentil

			//Se utilizó la logica de los percentiles en estadistica
			//Ordena los datos segun el porcentaje de la variable indicada en parametro
			//Busca el entero superior de la posicion del percentil indicado
			//Busca el valor del porcentaje de la posicion del percentil indicado
			//Filtra segun el valor de la posicion en la cola o en la punta del array
		},
	},

	computed: {
		parties() {
			return Array.from(new Set(this.members.map(member => member.party)))
		},
//AT GLANCE FUNCTIONALITY
		toStatisticsGlance() {
			this.toTotalGlance()
			return (
				this.parties.map((party) => {
					this.statisticsGlance.map((obj) => {
						if (obj.idParty == party) {
							let membersParty = this.toGetMembersByParty(party)
							obj.numbersOfMembers = membersParty.length
							obj.pctVotesWithParty = this.toGetPctVoted(membersParty)
						}
					})
				})
			)
		},

		//ATTENDANCE FUNCTIONALITY
		toGetLeastEngaged() {
			if (this.members != 0) { return this.toFilterByPercentil(90, "", "missed_votes_pct").reverse() }
		},
		toGetMostEngaged() {
			if (this.members != 0) { return (this.toFilterByPercentil(10, ">", "missed_votes_pct")) }
		},

		//LOYALTY FUNCTIONALITY
		toGetLeastOftenVoteWithTheirParty() {
			if (this.members != 0) { return this.toFilterByPercentil(10, ">", "votes_with_party_pct") }
		},
		toGetMostOftenVoteWithTheirParty() {
			if (this.members != 0) { return (this.toFilterByPercentil(90, "", "votes_with_party_pct")).reverse() }
		},


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