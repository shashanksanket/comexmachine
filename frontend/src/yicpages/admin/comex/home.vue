
<template>
	<div>
		<Navbar />
		
		
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
			Totaldata: (state) => {
				return state.comex.Totaldata;
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
			}

		}),
	},

	methods: {
		...mapActions({
			getData: "comex/getData",
			logoutUser: "auth/logoutUser",
			getData: "comex/getData",
			totalProgress: "comex/totalProgress"

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
	},



}

</script>
<style lang="scss">
.container1 {
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


.mainTitle {
	width: 262px;
	height: 38px;

	font-family: 'Mulish';
	font-style: normal;
	font-weight: 600;
	font-size: 30px;
	line-height: 38px;
	/* identical to box height */
	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: 0.2px;

	color: #ab7ef8;

}

@media (max-width: 1000px) {
	.adminCards div {
		width: 100%;
	}

}
</style>
	