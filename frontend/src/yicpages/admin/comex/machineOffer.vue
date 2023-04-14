
<template>
	<div>
		<Navbar />
		<div class="container">

			<h2 style="margin-left:auto; margin-right:auto;">Offer your Machine</h2>
			<b-button v-if="totalMachinesInSuit.length > 0" v-b-modal.addModal variant="primary" class="add-button"
				@click="addItem">Offer More Machines</b-button>
			<div style="margin-top:30px" v-if="totalMachinesInSuit.length > 0">
				<h3>
					<center>
						<b>
							Machine Offered By You
						</b>
					</center>
				</h3>
				<div v-for="data in totalMachinesInSuit" class="container2">
					<div class="sub-container1">

						<img src="./machine1.webp" style="border-radius:10% " width="200px" />
					</div>
					<div class="sub-container2">
						<!-- {{ data }} -->
						<h4>Location: {{ data.location }}</h4>
						<br /><br />
						<h4>Rate: {{ data.rate }}</h4>
						<div style="margin-top: 30%;">

							<b-button variant="primary" style="" @click="editModalShow(data)" v-b-modal.editModal>Edit</b-button>
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
							<b-button variant="primary" style="" @click="delModalShow(data.id)" v-b-modal.delModal>Delete</b-button>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="add-button-container">
				<h4>No machine Offered from your side Click below to add.</h4>
				<b-button v-b-modal.addModal variant="primary" class="add-button" @click="addItem">Add</b-button>
			</div>
		</div>
		<b-modal id="delModal" @ok="del()" ok-title="Yes" title="Add Machine">
						<h4>Are you sure about that?</h4>
					</b-modal>
					<b-modal id="editModal" @ok="edit()" ok-title="Save" title="Add Machine">
						<div class="form mt-5">
							<b-form>
								<b-form-group label="Location:">
									<b-form-input v-model="location" value="location" placeholder="Enter location"></b-form-input>
								</b-form-group>
								<b-form-group label="Owner:">
									<b-form-input v-model="owner" value="owner" placeholder="Enter owner"></b-form-input>
								</b-form-group>
								<b-form-group label="Rate:">
									<b-form-input v-model="rate" value="rate" type="number" placeholder="Enter rate"></b-form-input>
								</b-form-group>
							</b-form>
						</div>
					</b-modal>

		<b-modal id="addModal" @ok="onAdd()" ok-title="Save" title="Add Machine">
			<div class="form mt-5">
				<b-form>
					<b-form-group label="Location:">
						<b-form-input v-model="location" placeholder="Enter location"></b-form-input>
					</b-form-group>
					<b-form-group label="Owner:">
						<b-form-input v-model="owner" placeholder="Enter owner"></b-form-input>
					</b-form-group>
					<b-form-group label="Rate:">
						<b-form-input v-model="rate" type="number" placeholder="Enter rate"></b-form-input>
					</b-form-group>
				</b-form>
			</div>
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
			addModal: false,
			machineList: true,
			location: '',
			owner: '',
			rate: '',
			id: 0,

		}
	},
	computed: {
		...mapState({
			totalMachinesInSuit: (state) => {
				return state.comex.machinesInSuit
			},
			uid: (state)=>{
				return state.auth.currUser.id
			}

		}),
	},

	methods: {
		...mapActions({
			addMachine: "comex/addMachine",
			getMachineInSuit: "comex/getMachineInSuit",
			delMachine: "comex/delMachine",
			editMachine: "comex/editMachine"

		}),
		async onAdd() {
			await this.addMachine({ "location": this.location, "owner": this.owner, "rate": this.rate })
			this.reset()
			await this.getMachineInSuit()
		},
		async addItem(){
			this.reset()
		},
		reset(){
			this.location = '',
			this.owner = '',
			this.rate = ''
		},
		async del() {
			console.log(this.id)
			await this.delMachine(this.id)
			this.reset()
			await this.getMachineInSuit()

		},
		async edit() {
			await this.editMachine({ id: this.id, location: this.location, owner: this.owner, rate: this.rate })
			this.reset()
			await this.getMachineInSuit()
		},
		onidle() {
			alert('You have been logged out due to inactivity of 15 minutes')
			this.$router.push({ name: "login" });
			this.logoutUser();
		},
		editModalShow(val){
			this.id = val.id
			this.location = val.location
			this.owner = val.owner
			this.rate = val.rate
		},
		delModalShow(val){
			this.id = val
		}
	},
	async mounted() {
		await this.getMachineInSuit()

	},



}

</script>
<style lang="scss">
.form {
	max-width: 500px;
}

.container {
	padding: 40px 40px 40px 40px;
	gap: 8px;
	width: 95%;
	// height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: auto !important;
	margin-right: auto !important;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
	display: flex;
	flex-direction: column;

}

.add-button-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 60vh;
	border: 2px dashed #888888;
	border-radius: 12px;
}

.add-button {
	margin-top: 20px;
	font-size: larger;
	border-radius: 5px;
	border: 1px solid #333;
	background-color: #fff;
	color: #333;
	cursor: pointer;
}

.container2 {
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

.container2 .sub-container2 {
	margin-left: 20%;
}
</style>
