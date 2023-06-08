
<template>
	<div>
		<Navbar />
		<div>
			<div class="container1">

				<div>
					<b-table ref="" class="position-relative" :items="machineOfferList" responsive
						:fields="machineOfferColumns" primary-key="id" show-empty empty-text="No matching records found">
						<template #cell(title)="data">

						</template>
						<template #cell(actions)="data">

							<b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

								<template #button-content>
									<img src="./more-vertical.svg" size="16" class="align-middle text-body" />
								</template>
							<!-- <b-dropdown-item v-b-modal.deleteModal>
									<img src="./trash.svg" size="16" class="align-middle text-body" />
									<span class="align-middle ml-50">Delete</span>
								</b-dropdown-item>
								<b-modal ok-title="Yes" @ok="deleteRow(data.item.id)" id="deleteModal">
									<h4>Are you sure?</h4>
									</b-modal> -->
								<b-dropdown-item v-b-modal.requestModal @click="requests(data.item.id)">
									<img src="./request.svg" size="16" class="align-middle text-body" />
									<span class="align-middle ml-50">All Requests</span>
								</b-dropdown-item>
							</b-dropdown>
						</template>

					</b-table>
					<b-modal ref="requestModal" ok-only id="requestModal">
						<b-table ref="" class="position-relative" :items="machineReqList" responsive
							:fields="machineReqColumns" primary-key="id" show-empty empty-text="No new request found">
							<template #cell(title)="data">


							</template>
							<template #cell(actions)="data">

								<b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

									<template #button-content>
										<img src="./more-vertical.svg" size="16" class="align-middle text-body" />
									</template>
									<b-dropdown-item v-b-modal.declineModal @click="edit(data)">
										<img src="./trash.svg" size="16" class="align-middle text-body" />
										<span class="align-middle ml-50">Decline</span>
									</b-dropdown-item>
									<b-dropdown-item v-b-modal.approveModal @click="edit(data)">
										<img src="./request.svg" size="16"  class="align-middle text-body" />
										<span class="align-middle ml-50">Approve</span>
									</b-dropdown-item>
								</b-dropdown>

							</template>

						</b-table>

					</b-modal>
					<b-modal id="declineModal" ok-title="Yes" @ok="decline(editData.id)">
						<h4>Are you sure?</h4>

					</b-modal>
					<b-modal id="approveModal" ok-title="Yes" @ok="approve(editData.id)">

						<h4>Are you sure?</h4>

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
			machineReqColumns: [
				{ key: 'requestedBy' },
				{ key: 'approvalStatus' },
				{ key: 'Actions' }
			],
			machineOfferColumns: [
				{ key: 'owner' },
				{ key: 'location' },
				{ key: 'rate' },
				{ key: 'Actions' }
			],
			editData: {
				id:0
			}
		}
	},
	computed: {
		...mapState({
			role: (state) => {
				return state.auth.currUser.role;
			},
			machineReqList: (state) => {
				return state.admin.machineReqList
			},
			machineOfferList: (state) => {
				return state.admin.machineOfferList
			}

		}),
	},
	methods: {
		...mapActions({
			logoutUser: "auth/logoutUser",
			getMachineReqList: "admin/getMachineReqList",
			getMachineOfferList: "admin/getMachineOfferList",
			declineReq: "admin/declineReq",
			approveReq: "admin/approveReq",
			// deleteMachine: "admin/deleteMachine",

		}),
		onidle() {
			alert('You have been logged out due to inactivity of 15 minutes')
			this.$router.push({ name: "login" });
			this.logoutUser();
		},
		edit(data){
			this.editData.id = data.item.id
		},
		async requests(id) {
			await this.getMachineReqList(id)
		},
		async decline(id) {
			await this.declineReq(id)
			this.$refs['requestModal'].hide()
		},
		async approve(id) {
			await this.approveReq(id)
			this.$refs['requestModal'].hide()
		},
		// async deleteRow(id){
		// 	await this.deleteMachine(id)
		// }

	},
	async mounted() {
		await this.getMachineOfferList()
	},
}
</script>
<style scoped lang="scss">
.container1 {
	padding: 40px 40px 40px 40px;
	margin: 50px;
	border-radius: 1%;
	gap: 8px;
	background-color: rgb(255, 255, 255);
	margin-bottom: 50px;
}
</style>
	