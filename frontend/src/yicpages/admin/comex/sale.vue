
<template>
	<div>
		<Navbar />
		<div class="container">

<div style="margin-top:30px" v-if="true">
	<h3>
		<center>
			<b>
				Machine Parts On Sale
			</b>
		</center>
	</h3>
	<div v-for="data in stockList" class="container2">
		<div class="sub-container1">

			<img src="./machine1.webp" style="border-radius:5% " width="200px" />
		</div>
		<div class="sub-container2">
			<h4>Ttile: {{ data.Title }} </h4>
			<br /><br />
			<h4>Description:{{ data.Description }} </h4>
			<br /><br />
			<h4>Location:{{ data.location }} </h4>
			<br /><br />
			<h4>Rate: {{ data.Rate }} </h4>

			<b-button v-b-modal.buyRequest style="margin-top:10%; width:100%" variant="primary" @click="buy(data.id)">Buy</b-button>
		</div>
	</div>
</div>

</div>
<b-modal id="buyRequest" @ok="requestBuy()" ok-title="Yes" title="Buy Machine">
				<h4>Are you sure about that?</h4>
			</b-modal>
		
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
			selectedId : 0

		}
	},
	computed: {
		...mapState({
			stockList: (state) => {
				return state.admin.stockList;
			},

		}),
	},

	methods: {
		...mapActions({
			getData: "comex/getData",
			logoutUser: "auth/logoutUser",
			getData: "comex/getData",
			totalProgress: "comex/totalProgress",
			getStocksList: "admin/getStocksList"

		}),
		buy(id){
			this.selectedId = id 
		},
		onidle() {
			alert('You have been logged out due to inactivity of 15 minutes')
			this.$router.push({ name: "login" });
			this.logoutUser();
		},
		requestBuy(){
			this.$router.push('/payment')
		}
		


	},
	async mounted() {
		await this.getStocksList()
	},



}

</script>
<style scoped lang="scss">
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

	width: 60%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left:auto;
	margin-right:auto;
	// margin-left: 50px;
	// margin-right: 50px;
	margin-bottom: 50px;
	display: flex;
	flex-direction: row;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}
.sub-container2{
	margin-left:10%;
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
	