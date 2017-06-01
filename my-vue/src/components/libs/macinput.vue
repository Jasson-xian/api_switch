<template>  
    <div class="input_wrap">
        <input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece',empty)" class="mac_input mac_a" type="text"> : 
        <input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece',empty)" class="mac_input mac_b" type="text"> : 
        <input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece',empty)" class="mac_input mac_c" type="text"> :
        <input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece',empty)" class="mac_input mac_d" type="text"> :
        <input maxlength="2" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece',empty)" class="mac_input mac_e" type="text"> :
        <input maxlength="3" @focus = "notEmpty($event)" @keyup="nextInput($event)" @blur = "testFormat($event,'mac_piece',empty)" class="mac_input mac_f" type="text">
    </div>		
</template>
<script>
import formatTest from 'libs/formatTest'

export default {
    props:{
       empty:{
           type: Boolean,
		   required: true
       }
    },
    methods:{
        testFormat(event,reg, empty) {
            let ele = event.currentTarget
            var test = new formatTest(ele,reg, empty)
            let result =  test.testFormat();
             if(result){
                $(ele).css("border",'none')
            }
            return result
		},
        nextInput(event){    
            if($(event.currentTarget).val().length>1){
               event.preventDefault()
               $(event.currentTarget).next().focus()    
            }   
        },
        notEmpty: function(event) {
            let ele = event.currentTarget
            var test = new formatTest(ele)
            test.notEmpty()
        }
    }
}

</script>
<style scoped>
    input{
		width: 20px;
		height: 100%;
		text-align: center;
		padding: 0;	
        color: #555;
	}
	.input_wrap{
        display: inline-block;	
		width: 180px;
		height: 25px;
		border: 1px solid  #e8e8e8;
		border-radius: 3px;
		box-sizing: border-box;
        color: #999;
	}
</style>