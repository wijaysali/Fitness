<template>
	<div v-if="!isLogin" class="main-i-log">
		<div class="text-center">Please<a href="javascript:void(0)" @click="handleClick">LOGIN</a>first！</div>
			<login-dialog :openCus="openCus" @setLogStatus="setLogStatus" @backBeforeSign="backBeforeSign"></login-dialog>
	</div>
	<div v-else class="main-i-profile">
		<mu-content-block>
		 	<mu-card>
				<div class="u-header">
					<div class="u-image">
	  					<mu-card-header :title="userName" :subTitle="'个人简介: '+userIntro">
						<mu-avatar :src="userImage" slot="avatar" :size="imageSize"/>
	  					</mu-card-header>
					</div>
					<div class="u-edit">
						<mu-flat-button label="Logout" class="" secondary @click="logOutUser"/>
						<mu-flat-button label="Edit" class="" secondary @click="editMyInfo" v-show="!editing"/>
						<mu-flat-button label="Save" class="" secondary @click="saveMyInfo" v-show="editing"/>
						<mu-flat-button label="Cancel" class="" secondary @click="cancelEdit" v-show="editing"/>
					</div>
				</div>
				<div class="u-body">
						<mu-snackbar v-if="successFlag" message="更新个人资料成功" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar" class="success-flag"/>
						<div class="today-plan-num" v-if="!editing">
							<div class="today-num-item" v-for="fieldPlan in fieldPlans"  v-if="fieldPlans">
								<set-today-num :fieldPlan="fieldPlan" :ptype="fieldPlan.type" :isSet="fieldPlan.todayCompleted"/>

							</div>
						</div>
						<div class="user-info" v-else>
							<mu-flexbox>
								<mu-flexbox-item>
									<label for="username">&emsp;&emsp;&emsp;&emsp;Title: </label>
								</mu-flexbox-item>
								<mu-flexbox-item class="">
									<mu-text-field :value="userName" type="text" name="username" disabled inputClass="form-uname" class="text-field-cus"/>
								</mu-flexbox-item>
							</mu-flexbox>
							<mu-flexbox>
								<mu-flexbox-item>
									<label for="oldpwd" class="required">&emsp;&emsp;&emsp;Title: </label>
								</mu-flexbox-item>
								<mu-flexbox-item class="form-cur-pwd">
									<mu-text-field :value="oldPwd" type="password" name="oldpwd" :errorText="oldPwdErrorMsg" class="text-field-cus old-pwd" @blur="blurOldPwd" :disabled="oldPwdDisabled"/>
									<mu-flat-button label="修改密码" class="change-pwd-btn" secondary @click="changeUserPwd"/>
								</mu-flexbox-item>
							</mu-flexbox>
							<mu-flexbox v-show="isChangePwd">
								<mu-flexbox-item>
									<label for="pwd">&emsp;&emsp;Please input your new password: </label>
								</mu-flexbox-item>
								<mu-flexbox-item class="">
									<mu-text-field :value="newPwd" type="password" name="newpwd" :errorText="newPwdErrorMsg" @input="inputNewPwd" @blur="blurNewPwd" class="text-field-cus"/>
								</mu-flexbox-item>
							</mu-flexbox>
							<mu-flexbox v-show="isChangePwd">
								<mu-flexbox-item>
									<label for="agnewpwd" class="required">repeat password: </label>
								</mu-flexbox-item>
								<mu-flexbox-item class="">
									<mu-text-field :value="agNewPwd" type="password" name="agnewpwd" :errorText="agNewPwdErrorMsg" @input="inputAgNewPwd" @blur="blurAgNewPwd" class="text-field-cus"/>
								</mu-flexbox-item>
							</mu-flexbox>
							<mu-flexbox>
								<mu-flexbox-item>
									<label for="sex" class="required">&emsp;&emsp;&emsp;&emsp;&emsp;Gender: </label>
								</mu-flexbox-item>
								<mu-flexbox-item>
									<mu-radio label="male" name="sex" nativeValue="0" :value="sexVal" @change="changeSex"/>
 									<mu-radio label="female" name="sex" nativeValue="1" :value="sexVal" @change="changeSex" class="form-radio"/>
								</mu-flexbox-item>
							</mu-flexbox>
							<mu-flexbox>
								<mu-flexbox-item>
									<label for="age" class="required">&emsp;&emsp;&emsp;&emsp;&emsp;tahun: </label>
								</mu-flexbox-item>
								<mu-flexbox-item>
									<mu-text-field :value="ageVal" type="number" name="age" class="text-field-cus" @input="inputAgeVal" :errorText="ageErrorMsg" @blur="blurAgeVal"/>
								</mu-flexbox-item>
							</mu-flexbox>
							<mu-flexbox>
								<mu-flexbox-item>
									<label for="mail" class="required">&emsp;&emsp;&emsp;&emsp;&emsp;email: </label>
								</mu-flexbox-item>
								<mu-flexbox-item>
									<mu-text-field :value="mailVal" type="email" name="mail" class="text-field-cus" @blur="blurMailVal" :errorText="mailErrorMsg"/>
								</mu-flexbox-item>
							</mu-flexbox>
							<mu-flexbox>
								<mu-flexbox-item>
									<label for="phone" class="required">&emsp;&emsp;&emsp;phone: </label>
								</mu-flexbox-item>
								<mu-flexbox-item>
									<mu-text-field :value="phoneVal" type="number" name="phone" class="text-field-cus" :errorText="phoneErrorMsg" @blur="blurPhoneVal" />
								</mu-flexbox-item>
							</mu-flexbox>
							<mu-flexbox>
								<mu-flexbox-item>
									<label for="intro">&emsp;&emsp;&emsp;&emsp;intro: </label>
								</mu-flexbox-item>
								<mu-flexbox-item>
									<mu-text-field :hintText="userIntro" :value="userTempIntro" type="text" name="intro" multiLine  :row="3" :rowsMax="6" class="text-field-cus" @blur="blurUserIntro"/>
								</mu-flexbox-item>
							</mu-flexbox>
						</div>
				</div>
			</mu-card>
		</mu-content-block>
	</div>
</template>

<script>
	import common_api from '../static/js/common.api'
	import setTodayNum from './custom/setTodayNum'
	import loginDialog from './custom/loginDialog'
	export default {
		data() {
			return {
				openCus: false,
				successFlag: false,                    
				sexVal: "0",                           
				ageVal: '',                            
				mailVal: '',                           
				phoneVal: '',                         
				userTempIntro: '',                     
				imageSize: 80,
				editing: false,
				isChangePwd: false,                    
				oldPwd: '',
				newPwd: '',
				agNewPwd: '',
				oldPwdDisabled: false,
				oldPwdErrorMsg: '',
				newPwdErrorMsg: '',
				agNewPwdErrorMsg: '',
				ageErrorMsg: '',
				mailErrorMsg: '',
				phoneErrorMsg: ''
			}
		},
		computed: {
			isLogin() {
				if(this.$store.getters.getAuthStatus === true) {
					this.queryRequest()
				}
				return this.$store.getters.getAuthStatus
			},
			userImage() {
				return this.$store.getters.getUserImage
			},
			fieldPlans() {
				return this.$store.getters.completedPlans
			},
			userName() {
				return this.$store.getters.getUserName
			},
			userIntro() {
				return this.$store.getters.getUserIntro
			}
		},
		methods: {
			handleClick() {
				this.openCus = true
			},
			setLogStatus(type) {
				this.$store.commit('SET_LOG_STATUS', type)
			},
			backBeforeSign() {
				this.openCus = false
			},
			queryRequest() {
				const date = common_api.getCurrentDate()
				this.$store.dispatch('GET_TODAY_COMPLETE', {
					date
				})
			},
			editMyInfo() {
				this.editing = true
				this.sexVal = "0"                         
				this.ageVal = ''                          
				this.mailVal = ''                         
				this.phoneVal = ''                        
				this.userTempIntro = ''                  
				this.isChangePwd = false                  
				this.oldPwd =  ''
		  		this.newPwd = ''
		 		this.agNewPwd = ''
 				this.oldPwdDisabled = false
				this.oldPwdErrorMsg = ''
				this.newPwdErrorMsg = ''
				this.agNewPwdErrorM = ''
				this.ageErrorMsg = ''
				this.mailErrorMsg = ''
				this.phoneErrorMsg =  ''
			},
			saveMyInfo() {
				if(!this.oldPwd) {
					this.oldPwdErrorMsg = 'Password can not be empty!'
					return false
				}
				if(!this.ageVal) {
					this.ageErrorMsg = 'Age can not be empty!'
					return false
				}
				if(!this.mailVal) {
					this.mailErrorMsg = 'Email can not be empty!'
					return false
				}
				if(!this.phoneVal) {
					this.phoneErrorMsg = 'Phone can not be empty!'
					return false
				}
				if(this.isChangePwd) {
					if(this.newPwdErrorMsg || this.agNewPwdErrorMsg) {
						return false
					}
				}
				const data = {
					uname: this.userName,
					sex: parseInt(this.sexVal),
					age: parseInt(this.ageVal),
					mail: this.mailVal,
					phone: this.phoneVal,
					intro: this.userTempIntro			
				}
				if(this.isChangePwd) {
					data.newPwd = this.newPwd
				}
				this.$store.dispatch('SAVE_USER_INFO', {data})
					.then((rescode) => {
						if(rescode === 202) {
							this.showSnackbar()
							setTimeout(() => {this.editing = false}, 500)
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			cancelEdit() {
				this.editing = false
			},
			
			blurOldPwd(e) {                                        
				const value = e.target.value
				if(!value) {
					this.oldPwdErrorMsg = 'Password can not be empty!'
					return false
				}
				this.$store.dispatch('VALIDATE_NAME_AND_PWD', {
					pwd: value
				}).then((rescode) => {
					if(rescode === 0) {
						this.oldPwd = value
						this.oldPwdErrorMsg = ''
						return true
					} else {
						this.oldPwdErrorMsg = 'your password is wrong input!'
						return false
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			changeUserPwd() {
				if(!this.oldPwdErrorMsg) {
					this.isChangePwd = true
					this.oldPwdDisabled = true
				}
			},
			blurNewPwd(e) {
				const value = e.target.value
				if(!value) {
					this.newPwdErrorMsg = 'your password can not be empty!'
					return false
				}
				if(value.length < 8) {
					this.newPwdErrorMsg = 'your password must be < 8 digits'
					return false
				}
				if(this.newPwd && this.agNewPwd && this.newPwd !== this.agNewPwd) {
					this.agNewPwdErrorMsg = 'your password not consistent. check again!'
					return false
				}
				this.newPwdErrorMsg = ''
				return true
			},
			blurAgNewPwd(e) {
				const value = e.target.value
				if(!value) {
					this.agNewPwdErrorMsg = 'your password can not be empty!'
					return false
				}
				if(value.length < 8) {
					this.agNewPwdErrorMsg = 'your password must be < 8 digits'
					return false
				}
				if(this.newPwd !== this.agNewPwd) {
					this.agNewPwdErrorMsg = 'your password not consistent. check again!'
					return false	
				}
				this.agNewPwdErrorMsg = ''
				return true
			},
			blurAgeVal(e) {
				const value = e.target.value
				if(!value) {
					this.ageErrorMsg = 'your age can not be empty!'
					return false
				}
				this.ageErrorMsg = ''
				return true
			},
			blurMailVal(e) {
				const exp = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$','g')
				const value = e.target.value
				if(!value) {
					this.mailErrorMsg = 'email can not be empty!'
					return false
				}
				if(!exp.test(value)) {
					this.mailErrorMsg = 'wrong format!'
					return false
				}
				this.mailVal = value
				this.mailErrorMsg = ''
				return true
			},
			blurPhoneVal(e) {
				const value = e.target.value
				const exp = new RegExp('^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$','g')
				if(!value) {
					this.phoneErrorMsg = 'phone can not be empty!'
					return false
				}
				if(!exp.test(value)) {
					this.phoneErrorMsg = 'wrong format!'
					return false
				}
				this.phoneVal = value
				this.phoneErrorMsg = ''
				return true
			},
			blurUserIntro(e) {
				const value = e.target.value
				this.userTempIntro = value
				return true
			},
			inputNewPwd(val) {
				this.newPwd = val
			},
			inputAgNewPwd(val) {
				this.agNewPwd = val
			},
			changeSex(val) {
				this.sexVal = val
			},
			inputAgeVal(val) {
				this.ageVal = val
			},
		    showSnackbar () {
		      this.successFlag = true
		      if (this.snackTimer) clearTimeout(this.snackTimer)
		      this.snackTimer = setTimeout(() => { this.successFlag = false }, 1000)
		    },
		    hideSnackbar () {
		      this.successFlag = false
		      if (this.snackTimer) clearTimeout(this.snackTimer)
		    },
			logOutUser() {
				this.$store.commit('LOG_OUT_USER')
			}
			
		},
		components: {
			setTodayNum,
			loginDialog
		}
	}
</script>

<style lang="less">
	.main-i-profile {
	    width: 70%;
	    min-height: 800px;
	    padding-bottom: 0px;
	    margin: 30px auto 0px;
	    .u-header {
	    	position: relative;
			.u-image,.u-edit {
				display: inline-block
			}
			.u-edit {
				position: absolute;
			    top: 50%;
			    transform: translateY(-50%);
			    right: 5%;
			}
	    }
	    .u-body {
	    	width: 100%;
	    	position: relative;
			margin-top: 10px;
			&:before {
				content: ' ';
		    	width:90%;
				height: 1px;
				margin: 10px auto 0;
				display: block;
				border-top: 1px solid #bdbdbd;
			}
			.success-flag {
			    left: 50%;
			    transform: translateX(-50%);
			    width: 20%;
			    top: 130px;
			}
			.user-info {
			    width: 60%;
    			margin: 20px auto 0;
    			padding-bottom: 40px;
    			.text-field-cus {
    				width: 90%;
    				&.old-pwd {
    					width: 64%
    				}
    			}
    			label.required {
    				&:before {
    					content: ' ';
    					width: 16px;
    					height: 16px;
						display: inline-block;
    					background: url('../static/images/important.png');
    				}
    			}
    			.change-pwd-btn {
    				display: inline-block;
    				width: 34%;
    			}
    			.form-radio {
    				margin-left: 50px;
    			}
			}
			.today-plan-num {
				width:100%;
				position: relative;
				display: flex;
				flex-direction:row;
				justify-content: center;
				flex-wrap:wrap;
				.today-num-item {
					flex: 1;
					min-width: 50%;
					min-height: 400px;
				}
			}
	    }
	}
</style>