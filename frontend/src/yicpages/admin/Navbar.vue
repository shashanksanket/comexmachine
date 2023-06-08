<template>
<div>
	<b-navbar toggleable="lg" type="light" variant="">
  <b-navbar-nav>
    <img height="60rm" src="./logo.png" class="mr-auto">
  </b-navbar-nav>

  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

  <b-collapse v-if="isLoggedIn" id="nav-collapse" is-nav>
    <b-navbar-nav class="mx-auto">
      <b-nav-item  v-if="isLoggedIn && role=='ENDUSER'" @click="redirect('home')">Home
        <div :class="{ active: isActive1 }"></div>
      </b-nav-item>
      <b-nav-item  v-if="isLoggedIn && role=='SUPERADMIN'" @click="redirect('admin/dashboard')">Dashboard
        <div :class="{ active: isActive2 }"></div>
      </b-nav-item>
      <b-nav-item  v-if="isLoggedIn && role=='SUPERADMIN'" @click="redirect('admin/stocks')">Stocks
        <div :class="{ active: isActive3 }"></div>
      </b-nav-item>
      <b-nav-item  v-if="isLoggedIn && role=='ENDUSER'" @click="redirect('machine/request')">Request Machine
        <div :class="{ active: isActive4 }"></div>
      </b-nav-item>      
      <b-nav-item  v-if="isLoggedIn && role=='ENDUSER'" @click="redirect('machine/offer')">Offer Machine
        <div :class="{ active: isActive5 }"></div>
      </b-nav-item>
      <b-nav-item  v-if="isLoggedIn && role=='ENDUSER'" @click="redirect('machine/sale')">Machine Parts
        <div :class="{ active: isActive6 }"></div>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav v-if="isLoggedIn" class="ml-auto">

      <b-nav-item-dropdown right>

        <template #button-content>
          <em><img src="./profile.svg"></em>
        </template>
        <b-dropdown-item href="#">
          <b-nav-item  class="my-2 my-sm-0"><b>Hello {{firstName}}!</b></b-nav-item>
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <center>

            <b-button class="my-2 my-sm-0" variant="primary" @click="logout">Logout</b-button>
          </center>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>


</div>
</template>
  <script>

  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import {
	  BSidebar, BModal, BForm, BFormFile, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
	  BNavbar, BTooltip, BNavItemDropdown,Template, BDropdownItem, VBToggle,
  BNavbarToggle,
  BCollapse, BNavItem,
  BNavbarBrand,BNav, BNavbarNav,
  } from 'bootstrap-vue'
  import { ref } from '@vue/composition-api'
  import Ripple from 'vue-ripple-directive'
  import vSelect from 'vue-select'
  import store from '@/store'
import Vue from 'vue'

import VueMq from 'vue-mq'
import SidebarRight from './SidebarRight.vue'

  import VuePhoneNumberInput from 'vue-phone-number-input';
  import 'vue-phone-number-input/dist/vue-phone-number-input.css';
  import Password from "vue-password-strength-meter";
import { mapMutations, mapActions, mapState } from "vuex";
Vue.use(VueMq, {
  breakpoints: {
    smallDevices: 600,
    mediumDevices: 1200,
    largeDevices: Infinity,
  }
})
  
  
  export default {
	  components: {
		  BForm,
		  BFormFile,
		  BFormGroup,
		  BFormInput,
		  BFormInvalidFeedback,
		  BModal,
		  BNavbarBrand,
      BNavbar, 
      BTooltip, 
      BNavItemDropdown, 
      BDropdownItem,
      BNavbarToggle,
      Template,
      BCollapse,
      BButton,
      BNav,
      BNavItem,
      BNavbarNav,
      BSidebar,
      SidebarRight,
		  // Form Validation
		  ValidationProvider,
		  ValidationObserver,
	  },
	  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
	  model: {
  
	  },
	  props: {
  
  
	  },
	  data() {
		  return {
			 }
	  },
	  methods: {
      

      ...mapActions({
        logoutUser: "auth/logoutUser",
        searchByFunc: "comex/searchByFunc",
        setActiveNav: "comex/setActiveNav"

		}),
		async redirect(val){
      if (val=='home'){
        await this.setActiveNav('isActive1')
      }
      if (val=='admin/dashboard'){
        await this.setActiveNav('isActive2')
      }
      if (val=='admin/stocks'){
        await this.setActiveNav('isActive3')
      }
      if (val=='machine/request'){
        await this.setActiveNav('isActive4')
      }
      if (val=='machine/offer'){
        await this.setActiveNav('isActive5')
      }
      if (val=='machine/sale'){
        await this.setActiveNav('isActive6')
      }
			this.$router.push('/'+val)

		},
    logout() {
      this.$router.push({ name: "login" });
      this.logoutUser();
    },
	  },
	  computed: {
		  ...mapState({
  isLoggedIn: (state)=>{
    return state.auth.isAuthenticated
  },
  role: (state) =>{
    return state.auth.currUser.role
  },
  firstName: (state) =>{
    return state.auth.currUser.firstName
  },
  isActive1: (state) =>{
    return state.comex.activeNavs.isActive1
  },
  isActive2: (state) =>{
    return state.comex.activeNavs.isActive2
  },
  isActive3: (state) =>{
    return state.comex.activeNavs.isActive3
  },
  isActive4: (state) =>{
    return state.comex.activeNavs.isActive4
  },
  isActive5: (state) =>{
    return state.comex.activeNavs.isActive5
  },
  isActive6: (state) =>{
    return state.comex.activeNavs.isActive6
  },
 
  
		  }),
	  },
	  
  }
  
  </script>
  <style scoped>
*{
	font-weight:bolder ;
}
@keyframes animate {
  from {
    width: 0%;
    left:0px;
  }
  to {
    width: 100%;
    left: auto;
  }
}
.navbar{
	height: 60px;
  background: #e1e5f1;
}
.active{
  /* margin-top: 200px; */
  border: 2px solid rgb(6, 76, 156);
  margin-top: 5%;
  border-bottom: 20%;
  animation: 1s linear animate
}



</style>