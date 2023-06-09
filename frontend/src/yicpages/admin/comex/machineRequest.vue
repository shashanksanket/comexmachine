
<template>
	<div>
		<Navbar />
		<div >


			<div v-if="data" v-for="data in machines ">

				<div class="container1">
					<div class="sub-container1">
	
						<img src="./machine2.webp" style="border-radius:10% " width="200px"  />
					</div>
					<div class="sub-container2">
						
						<h4>Location: {{data.location}}</h4>
						<br/><br/>
						<h4>Owner: {{data.owner}}</h4>
						<b-button v-if="data.requested" variant="primary" v-b-modal.falseRequestModal style="margin-top:30%">Requested</b-button>	
						<b-button v-else variant="primary" v-b-modal.requestModal style="margin-top:30%" @click="machineRequest(data.id)">Request HDD</b-button>	
					
					</div>
				</div>
			</div>
			<div v-else class="container">
				<center>

					<h4 style="margin-left:auto; display: inline-block; margin-right:auto">No machines on rent yet!</h4>
					<br><br>
					<b-button style="width:40%; margin-right:auto; display: inline-block; margin-left:auto;" variant="primary" class="add-button" @click="redirect('machine/offer')">Rent your machine</b-button>
				</center>
			</div>
			<b-modal id="requestModal" @ok="request()" ok-title="Yes" title="Request Machine">
				<h4>Are you sure about that?</h4>
			</b-modal>
			<b-modal id="falseRequestModal" ok-title="Ok" title="Already Requested">
				<h4>You have already requested for this HDD machine we will send you the confirmation soon...</h4>
			</b-modal>

			<v-idle @idle="onidle" style="display:none" :duration="900" />
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
import { request } from 'http'


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
			location: "Delhi",
			Owner: "Comex",
			id: 0
		}
	},
	computed: {
		...mapState({
			role: (state) => {
				return state.auth.currUser.role;
			},
			machines: (state) => {
				return state.comex.machines
			}
		}),
	},
	methods: {
		...mapActions({
			logoutUser: "auth/logoutUser",
			getTotalMachine: "comex/getTotalMachine",
			requestHDD: "comex/requestHDD"
		}),
		onidle() {
			alert('You have been logged out due to inactivity of 15 minutes')
			this.$router.push({ name: "login" });
			this.logoutUser();
		},
		async machineRequest(val){
			this.id = val
		},
		async request(){
			await this.requestHDD(this.id)
		await this.getTotalMachine()

		}
	},
	async mounted() {
		await this.getTotalMachine()
	},
}
</script>
<style scoped lang="scss">
body{
    overflow-x: hidden;

}
.container{
	padding: 40px 40px 40px 40px;
	gap: 8px;
	width: 45%;
	height: 60%;
	align-items: center;
	align-content: center;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 10%;
	margin-left: auto !important;
	margin-right: auto !important;
	margin-bottom: 50px;
	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container1 {
	padding: 40px 40px 40px 40px;
	gap: 8px;
	width: 65%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: auto !important;
	margin-right: auto !important;
	margin-bottom: 50px;

	background: #d8e2ed;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
	display: flex;
}
.container1 .sub-container2{
	margin-left: 20%;
}
// @media (max-width: 1000px) {
// 	.adminCards div {
// 		width: 100%;
// 	}
// }
</style>
	