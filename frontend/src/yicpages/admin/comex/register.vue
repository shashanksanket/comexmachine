
<template style="z-index:1000; margin-top:200px;">
	<div>
		<Navbar />
		<div>
				
				
				
				
		<div class="rootSignup">

<template>
	<div class="d-flex justify-content-between align-items-center ">
		<h5 class="mainTitle">
			Signup To Portal
		</h5>
	</div>
	<div>
		<p v-if="success">
			Account created Successfully! Redirecting to login page...
		</p>
		<b-form @submit.prevent="login()">
			<small variant="danger">{{ errors }}</small>
			<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Firstname"
					label-for="input-4" >
					<b-form-input id="input-4" v-model="firstName"  ></b-form-input>
				</b-form-group>
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Lastname"
					label-for="input-4" >
					<b-form-input id="input-4" v-model="lastName"  ></b-form-input>
				</b-form-group>
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Email"
					label-for="input-4" >
					<b-form-input id="input-4" v-model="email"  ></b-form-input>
				</b-form-group>
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Location"
					label-for="input-4" >
					<b-form-input id="input-4" v-model="location"  ></b-form-input>
				</b-form-group>
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Contact Number"
					label-for="input-4" >
					<b-form-input id="input-4" v-model="phone"  ></b-form-input>
				</b-form-group>
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Password"
					label-for="input-4" >
					<b-form-input type="password" id="input-4" v-model="password"></b-form-input>
				</b-form-group>
			<b-button type="submit"  @click="onSubmit()" variant="primary"
				style="margin-top: 20px; width: 100%;">Submit</b-button>
		</b-form>
	</div>
	<br/><br/>
	<center>
		<p>Already Have an Account? 
		<a href="/login">Login here!</a></p>
	</center>
		
	
</template>
</div>
	</div>
	</div>
</template>
<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
	BSidebar, BModal,BAlert, BForm, BFormFile, BTable, BFormGroup, BFormInput, BFormInvalidFeedback, BButton, BFormSelect, BFormDatepicker
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
import Vue from 'vue'
import Vidle from 'v-idle'
import VueMq from 'vue-mq'
Vue.use(VueMq, {
  breakpoints: {
    smallDevices: 600,
    mediumDevices: 1200,
    largeDevices: Infinity,
  }
})

export default {
	components: {
		BSidebar,
		Vidle,
		BForm,
		BFormSelect,
		BTable,
		BFormFile,
		BFormGroup,
		BAlert,
		BFormInput,
		BFormInvalidFeedback,
		BButton,
		vSelect,
		BModal,
		Navbar,
		BFormDatepicker,
		// Form Validation
		ValidationProvider,
		ValidationObserver,
		VuePhoneNumberInput,
		Password
	},
	model: {

	},
	props: {


	},
	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			location: '',
			password: '',
		}
	},
	async mounted() {

	},
	methods: {
		...mapActions({
			signup: "auth/signup",

		}),
		
		
		async onSubmit() {
			await this.signup({ firstName: this.firstName, lastName: this.lastName, email: this.email, phone: this.phone, location: this.location, password: this.password})
			this.success = true
			this.reset()
			setTimeout(() => {
				this.$router.push('/login')
			}, 3000);
		},
		reset() {
			this.firstName= '',
			this.lastName= '',
			this.email= '',
			this.phone= '',
			this.location= '',
			this.password= ''
		}
	},
	computed: {
		...mapState({
			
			

		}),
	},

}

</script>
<style scoped lang="scss">
.form {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: 500px;
	width: auto;
}

.rootSignup {
	padding: 55px 86px;
	gap: 8px;
	width: 40%;
	// width: 80%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin: auto;
	margin-top: 10px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.mainTitle {

	margin-left: auto;
	margin-right: auto;
	margin-bottom: 30px;
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

@media screen and (max-width: 1000px) {
.rootLogin{
	padding: 45px 46px;
	gap: 4px;
	width: 80%;
}
}
</style>
	