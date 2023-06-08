
<template>
	<div>
		<Navbar />
		<div>
			<div class="container1">
				<h2>Add Stocks</h2>
				<div class="container sub1">
					<div class="form mt-5">
				<b-form @submit.prevent()>
					<b-form-group label="Title:">
						<b-form-input v-model="Title" placeholder="Enter Title"></b-form-input>
					</b-form-group>
					<b-form-group label="Description:">
						<b-form-input v-model="Description" placeholder="Enter Description"></b-form-input>
					</b-form-group>
					<b-form-group label="Rate:">
						<b-form-input v-model="Rate" type="number" placeholder="Enter rate"></b-form-input>
					</b-form-group>
					<b-form-group label="Condition:">
						<b-form-input v-model="condition" type="text" placeholder="What's the condition of the machine?"></b-form-input>
					</b-form-group>
					<b-form-group label="Location:">
						<b-form-input v-model="location" type="text" placeholder="Enter location"></b-form-input>
					</b-form-group>
					<br/>
					<b-button variant="primary" v-b-modal.submitModal>Submit</b-button>
					<b-modal id="submitModal" @ok="submit()" ok-title="Yes">Are you sure about that?</b-modal>
					<br/>
					<br/>
					<br/>
				</b-form>
			</div>
				</div>
				<div class="container sub2">
					<h2>Stock List</h2>
					<b-table ref="" class="position-relative" :items="stockList" responsive
						:fields="stocksColums" primary-key="id" show-empty empty-text="No matching records found">
						<template #cell(text)="data">

						</template>
						<template #cell(actions)="data">

							<b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

								<template #button-content>
									<img src="./more-vertical.svg" size="16" class="align-middle text-body" />
								</template>
								<b-dropdown-item v-b-modal.deleteModal @click="edit(data)">
									<img src="./trash.svg" size="16" class="align-middle text-body" />
									<span class="align-middle ml-50">Delete</span>
								</b-dropdown-item>
								<b-dropdown-item v-b-modal.editModal @click="edit(data)">
									<img src="./edit.svg" size="16" class="align-middle text-body" />
									<span class="align-middle ml-50">Edit</span>
								</b-dropdown-item>
							</b-dropdown>
						</template>

					</b-table>
					<b-modal id="deleteModal" ok-title="Yes" @ok="del(editData.id)">Are you sure about this?</b-modal>
					<b-modal ref="editModal" @ok="submitEdit()" ok-only id="editModal">
						
						<b-form>
								<b-form-group label="Location:">
									<b-form-input v-model="editData.location" value="editData.location" placeholder="Enter location"></b-form-input>
								</b-form-group>
								<b-form-group label="Ttile:">
									<b-form-input v-model="editData.Title" value="editData.Title" placeholder="Enter owner"></b-form-input>
								</b-form-group>
								<b-form-group label="Rate:">
									<b-form-input v-model="editData.Rate" value="editData.Rate" type="number" placeholder="Enter rate"></b-form-input>
								</b-form-group>
								<b-form-group label="Description:">
									<b-form-input v-model="editData.Description" value="editData.Description" type="text" placeholder="Enter Description"></b-form-input>
								</b-form-group>
								<b-form-group label="condition:">
									<b-form-input v-model="editData.condition" value="editData.condition" type="text" placeholder="Enter condition"></b-form-input>
								</b-form-group>
							</b-form>
					</b-modal>
				</div>
				<v-idle @idle="onidle" style="display:none" :duration="900" />
			</div>
		</div>

	</div>
</template>
<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
	BSidebar, BTable, BDropdown, BDropdownItem, BProgressBar, BModal, BProgress, BForm, BFormFile, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
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
import { stat } from 'fs'


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
		BTable,
		BModal,
		Navbar,
		Vidle,
		BDropdown, BDropdownItem,
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
			Title: '',
			Description: '',
			Rate: '',
			condition: '',
			location: '',
			stocksColums: [
				{ key: 'Title' },
				{ key: 'Description' },
				{ key: 'Rate' },
				{ key: 'location' },
				{ key: 'condition' },
				{ key: 'Actions' },
			],
			selectedData: '',
			editData: {
				id: 0,
				Title: '',
				Description: '',
				Rate: '',
				condition: '',
				location: '',
			}
		}
	},
	computed: {
		...mapState({
			role: (state) => {
				return state.auth.currUser.role;
			},
			stockList: (state) => {
				return state.admin.stockList;
			},

		}),
	},
	methods: {
		...mapActions({
			logoutUser: "auth/logoutUser",
			getStocksList: "admin/getStocksList",
			addStock: "admin/addStock",
			editStock: "admin/editStock",
			deleteStock: "admin/deleteStock"

		}),
		edit(data){
			this.editData.id = data.item.id,
			this.editData.Title = data.item.Title,
			this.editData.Description = data.item.Description,
			this.editData.Rate = data.item.Rate,
			this.editData.condition = data.item.condition,
			this.editData.location = data.item.location
		},	
		async del(id){
			await this.deleteStock(id)
			await this.getStocksList()
		},
		reset(){
			this.Title = '',
			this.Description = '',
			this.location = '',
			this.Rate = '',
			this.condition = ''
		},
		async submit() {
			await this.addStock({ Title: this.Title, Rate: this.Rate, Description: this.Description, location: this.location, Rate: this.Rate, condition: this.condition})
			this.reset()	
			await this.getStocksList()
		},
		async submitEdit() {
			await this.editStock(this.editData)
			this.reset()
			await this.getStocksList()
		},
		onidle() {
			alert('You have been logged out due to inactivity of 15 minutes')
			this.$router.push({ name: "login" });
			this.logoutUser();
		},
	},
	async mounted() {
		await this.getStocksList()
	},
}
</script>
<style lang="scss">
.container1 {
	padding: 40px 40px 40px 40px;
	margin: 50px;
	border-radius: 1%;
	gap: 8px;
	background-color: rgb(255, 255, 255);
	margin-bottom: 50px;
}
</style>
	