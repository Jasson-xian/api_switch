<template>  
    <div class="input_wrap">
        <input  maxlength="3" @focus = "notEmpty($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',empty)" class="ip_input ip_a" type="text"> . 
        <input  maxlength="3" @focus = "notEmpty($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',empty)" class="ip_input ip_b" type="text"> . 
        <input  maxlength="3" @focus = "notEmpty($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',empty)" class="ip_input ip_c" type="text"> .
        <input  maxlength="3" @focus = "notEmpty($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',empty)" class="ip_input ip_d" type="text">
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
            if(event.keyCode==110||event.keyCode==190){
               event.preventDefault()
               $(event.currentTarget).next().focus()    
            }   
        },
        upnext(event){
            if($(event.currentTarget).val().length>=3){
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
		width: 36px;
		height: 100%;
		text-align: center;
		padding: 0;
	    color: #555;
        border: none; 
	}
	.input_wrap{
        display: inline-block;	
		width: 180px;
		height: 25px;
		border: 1px solid  #e8e8e8;
		border-radius: 5px;
		box-sizing: border-box;
        color: #999;
	}
</style>