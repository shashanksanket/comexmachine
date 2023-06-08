
<template>
	<div>
		<Navbar />
		<div class="homeRoot">
			<center>
				<h2 style="margin-top:2%; align-items: center; text-align: center; letter-spacing: 0.2px; font-family: 'Mulish'; font-style: normal; font-weight: 800; font-size: 30px; line-height: 38px; color: #1B419B;">
					Welcome {{ firstName }}!</h2>
					<h3 style="font-family: 'Mulish'; font-style: normal; font-weight: 600; font-size: 22px; line-height: 28px; align-items: center;text-align: center; letter-spacing: 0.2px; color: #7A7A7A;">Look into your recent orders and order history.</h3>
			</center>
			<div style="margin-top:4%;" class="container rented">
				<h3 style="font-family: 'Mulish'; font-style: normal; font-weight: 700; font-size: 24px; line-height: 30px; display: flex; align-items: center; text-align: center; letter-spacing: 0.2px; color: #1B419B;">
					Recently Rented
				</h3>
				<div class="cards" >
					
					<div v-for="i in 3" class="card">
						<div class="image">
							<div class="label">New</div>
						</div>
						<div class="title">
						<p class="mainTitle">
							Title
						</p>
						<p class="status statusSuccess">
							Approved
						</p>
						<br/><br/>
					</div>
					<p class="description">
						Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia cdgrthrhinr
					</p>
					<p>
						<img src="./location.svg"/> &nbsp Mumbai, Maharashtra
					</p>

					</div>
					
				</div>
				
			</div>
			<div style="margin-top:4%;" class="container newly">
				<h3 style="font-family: 'Mulish'; font-style: normal; font-weight: 700; font-size: 24px; line-height: 30px; display: flex; align-items: center; text-align: center; letter-spacing: 0.2px; color: #1B419B;">
					Newly Listed
				</h3>
				<div class="cards" >
					
					<div v-for="i in 3" class="card">
						<div class="image">
							<div class="label">New</div>
						</div>
						<div class="title">
						<p class="mainTitle">
							Title
						</p>
						<p class="status statusPending">
							New
						</p>
						<br/><br/>
					</div>
					<p class="description">
						Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia cdgrthrhinr
					</p>
					<p>
						<img src="./location.svg"/> &nbsp Mumbai, Maharashtra
					</p>

					</div>
					
				</div>
				
			</div>
			<div style="margin-top:4%;" class="container order">
				<h3 style="font-family: 'Mulish'; font-style: normal; font-weight: 700; font-size: 24px; line-height: 30px; display: flex; align-items: center; text-align: center; letter-spacing: 0.2px; color: #1B419B;">
					Request History
				</h3>
				<div class="cards" >
					<div v-for="item in requestHistoryData" class="card">
						<div class="image">
							<div class="label">New</div>
						</div>
						<div class="title">
						<p class="mainTitle">
							{{ item }}
							{{item.title}}
						</p>
						<p class="status statusRented">
							{{item.approvalStatus}}
						</p>
						<br/><br/>
					</div>
					<p class="description">
						Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia cdgrthrhinr
					</p>
					<p>
						<img src="./location.svg"/> &nbsp Mumbai, Maharashtra
					</p>

					</div>
					
				</div>
				
			</div>
		</div>

		
		
	</div>
</template>
<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
	BSidebar, BProgressBar, BModal, BProgress, BForm, BFormFile, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'
import Navbar from '../Navbar.vue'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import { mapMutations, mapActions, mapState } from "vuex";
import Password from "vue-password-strength-meter";
// import { jsonToCSV } from 'vue-papaparse'
import VuePapaParse from 'vue-papa-parse'
import Papa from 'papaparse'
import { positive } from '@/@core/utils/validations/validations'
import Vidle from 'v-idle'


export default {
	components: {
		BSidebar,
		BForm,
		BFormFile,
		BFormGroup,
		BFormInput,
		BFormInvalidFeedback,
		BButton,
		vSelect,
		BModal,
		Navbar,
		Vidle,
		BProgressBar,
		// Form Validation
		ValidationProvider,
		ValidationObserver,
		VuePhoneNumberInput,
		Password,
		BProgress,
	},
	model: {

	},
	props: {


	},
	data() {
		return {
			success: false,
			max: 100,

		}
	},
	computed: {
		...mapState({
			firstName: (state) =>{
				return state.auth.currUser.firstName
			},
			Totaldata: (state) => {
				return state.comex.Totaldata;
			},
			requestHistoryData: (state) => {
				return state.comex.requestHistoryData
			},
			TotalOlts: (state) => {
				return state.comex.TotalOlts;
			},
			TotalConnection: (state) => {
				return state.comex.TotalConnection;
			},
			Totaldisconnection: (state) => {
				return state.comex.Totaldisconnection;
			},
			TotalConnectionLeft: (state) => {
				return state.comex.TotalConnectionLeft;
			},
			TotalVlan: (state) => {
				return state.comex.TotalVlan;
			},
			error: (state) => {
				return state.comex.errorsInGetData;
			},
			role: (state) => {
				return state.auth.currUser.role;
			},
			userId: (state) => {
				return state.auth.currUser.id;
			}

		}),
	},

	methods: {
		...mapActions({
			getData: "comex/getData",
			logoutUser: "auth/logoutUser",
			getData: "comex/getData",
			totalProgress: "comex/totalProgress",
			requestHistory: "comex/requestHistory"

		}),
		onidle() {
			alert('You have been logged out due to inactivity of 15 minutes')
			this.$router.push({ name: "login" });
			this.logoutUser();
		},

		async Download() {
			await this.getData()
			console.log([this.data])
			var csv = Papa.unparse(this.data)
			// Papa.download(unparsedResults, 'LatestData')
			let content = new Blob([csv]);
			let urlObject = window.URL || window.webkitURL || window;
			let url = urlObject.createObjectURL(content);
			let el = document.createElement("a");
			el.setAttribute('href', url)
			el.setAttribute('download', 'CsvExport.csv')
			el.click();
			urlObject.revokeObjectURL(url);
			this.success = true
		}


	},
	async mounted() {
		await this.getData()
		await this.totalProgress()
		await this.requestHistory(this.userId)
	},



}

</script>
<style scoped lang="scss">
.container1 {
	padding: 55px 30px;
	gap: 8px;

	width: 443px;
	height: 335px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container2 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container3 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container4 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container5 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container6 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}
.status{
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 4px 10px;
	gap: 10px;

	// width: ;
	height: 26px;
	font-size: 20px;
	font-weight: bolder;

	border-radius: 4px;

	/* Inside auto layout */

	flex: none;
	order: 1;
	flex-grow: 0;
}
.statusSuccess{
	color:#259B1B;

	border: 1.5px dashed #7EA47A;

}
.statusPending{
	color:#795E00;;

	border: 1.5px dashed #775D00
	
}
.statusRented{
	color:#00267E;;

	border: 1.5px dashed #1B419B;
;

}
.description{
	font-size: medium;
	font-weight: bold;
}
.location{

}
.label{
	background: #DDFBDB;
	border: 1.5px solid #259B1B;
	border-radius: 4px;
	box-sizing: border-box;
	font-family: 'Mulish';
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 18px;
	/* identical to box height */

	display: flex;
	align-items: center;
	text-align: center;

	color: #0B6E02;

/* Auto layout */

	display: flex;
	margin: 2%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 4px 10px;
	gap: 10px;
	width: 51px;
	height: 26px;
	float:right;
}
.cards{
	display: flex;
	// flex-direction: row;
	// flex-wrap: wrap;
	margin-top: 3%;
	width: 100%;
	overflow-x: auto;
}
.title{
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top: 4%;
font-family: 'Mulish';
font-style: normal;
font-weight: 400;
font-size: 25px;
line-height: 23px;
color: #1A1A1A;
}
.card{
	padding:1.3%;
	width: 30%;
	display: inline-block;
	margin-right: 3%;
	flex-shrink: 0;

}
.image{
	width:auto ; height: 199px;  border-radius: 5px;
	background-image: url('./old.png');
}

@media (max-width: 1000px) {
	.adminCards div {
		width: 100%;
	}

}
</style>
	