<template>
<form class="search" @submit.prevent="submit">
	<h1>LeadHit</h1>
	<div class="question">
		<input 
			type="text" 
			placeholder="id сайта"
			required
			v-model.trim="id"
			:class="{invalid: ($v.id.$dirty && !$v.id.required) }"
		/>
		 <small 
          class="helper-text invalid"
          v-if="$v.id.$dirty && !$v.id.required"
        >Поле id не должно быть пустым</small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.id.$dirty && !$v.id.minLength"
        >
          Id сайта должен быть {{$v.id.$params.minLength.min}} символа. Сейчас id {{id.length}}
        </small>
		<small 
          class="helper-text invalid"
          v-else-if="$v.id.$dirty && !$v.id.maxLength"
        >
          Id сайта должен быть {{$v.id.$params.maxLength.max}} символа. Сейчас id {{id.length}}
        </small>
		
	</div>
	<button type="submit">Войти</button>
</form>	

  
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import axios from "axios"

export default {
	name: 'login',
		data () {
			return {
				id: ''
			}
		},
		validations: {
			id: {
					required, 
					minLength: minLength(24), 
					maxLength: maxLength(24)
				}
		},
	methods: {
		submit() {
			if (this.$v.$invalid) {
				this.$v.$touch()
				return
			}

			axios
				.get("https://track-api.leadhit.io/client/test_auth", {
					headers: {
						"Api-Key": "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo",
						"Leadhit-Site-Id": this.id
					}
				})
				.then(response => {
					localStorage.setItem("leadhit-site-id", "5f8475902b0be670555f1bb3")
					this.$router.push("/analytics")
				})
				.catch(error => {
					if (error.response.status === 422) {
						this.id = "такого id нет"
					}
					console.log(error)
				})
		}
	},
}
</script>

<style  lang="scss" scoped>
$color: rgba(255,74,86,1);
form {
	display: flex;
	flex-direction: column;
	width: 400px;
	height: 350px;
	padding: 30px 25px;
	margin: 40px auto;
	border-radius: 40px;
	box-sizing: border-box;
	box-shadow: 0 0 20px -5px rgba(0, 0, 0, .25);
	background-color: white;
	
	  
	h1 {
		color: $color;
		font-weight: 100;
		margin-left: 15px;
		margin-bottom: 35px;
		text-transform: uppercase;
	}
		
	button {
		margin-top: 35px;
		background-color: white;
		border: 1px solid rgba(255,74,86,1);
		line-height: 0;
		font-size: 17px;
		display: inline-block;
		box-sizing: border-box;
		padding: 20px 15px; 
		border-radius: 60px;
		color: $color;
		font-weight: 100;
		position: relative;
		z-index: 1;
		
		&:hover, &:focus {
			color: white;
			background-color: $color;
		}
	}
	.question {
		position: relative;
		padding: 10px 0;
		  
		label {
			transform-origin: left center;
			color:  $color;
			font-weight: 100;
			font-size: 17px;
			box-sizing: border-box;
			padding: 10px 15px;
			display: block;
			position: absolute;
			margin-top: -40px;
			z-index: 2;
			pointer-events: none;

		}
	
		input {		
			position: relative;
			font-size: 17px;
			color: $color;
			padding: 10px 15px;
			background-color: none;
			box-sizing: border-box;

			appearance: none;
			border: 1px solid rgba(255,74,86,1);
			width: 100%;
			display: block;
			border-radius: 60px;
			font-weight: 100;
			z-index: 1;

			&::placeholder {
				font-weight: 300;
				color: rgba(175, 47, 47, 0.15);
			}

			&:focus {
				outline: none;
				background:$color;
				color: white;
			}
				
		}
	}	  

}
.helper-text {
	margin-left: 15px;
}

</style>