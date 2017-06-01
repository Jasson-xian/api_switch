<template>
	<div class="pages">
		<span class="prepage  button button--aylen" @click='prePage()' data-toggle="popover" data-placement="left" onselectstart="return false;">上一页</span>
		<span id="currentpage" onselectstart="return false;">{{currentpage}}</span>
		<span class="nextpage  button button--aylen" @click='nextPage()' data-toggle="popover" data-placement="right" onselectstart="return false;">下一页</span>
		<input type="text" class="toNpage" placeholder="1" data-toggle="popover" data-placement="right">
		<span  class=" button button--aylen"  @click='whichPage()' onselectstart="return false;">跳转</span>
		<span onselectstart="return false;">共 {{totalpage==0?1:totalpage}} 页</span>
	</div>
</template>
<script>
	export default {
		props: {
			totalpage: {
				type: Number,
				required: true
			},
			nowpage:{
				type: Number,
				required: true
			}
		},
		data() {
			return {
				currentpage: 1
			}
		},
		watch:{
			nowpage:function(){
				this.currentpage = this.nowpage
			}
		},
		methods: {
			prePage: function() {
				this.currentpage--;
				if(this.currentpage < 1) {
					this.currentpage = 1;
					this.popoverShow('.prepage', '已是第一页')
				} else {
					this.$emit('getPageData', this.currentpage)
				}

			},
			nextPage: function() {
				this.currentpage++;
				if(this.currentpage > this.totalpage) {
					this.currentpage = this.totalpage
					if(this.totalpage == 0) {
						this.currentpage = 1;
					}
					this.popoverShow('.nextpage', '已是最后一页')
				} else {
					this.$emit('getPageData', this.currentpage)
				}

			},
			whichPage: function() {
				var topage = Number($('.toNpage').val())
				if(topage == '') {
					this.popoverShow('.toNpage', '请输入要跳转的页码')
				} else if(topage <= this.totalpage && topage >= 1) {
					this.currentpage = topage
					this.$emit('getPageData', this.currentpage)
				} else {
					this.popoverShow('.toNpage', '页码超出范围')
				}
			},
			popoverShow: function(ele, content) {
				$(ele).attr("data-content", content).popover('show')
				setTimeout(function() {
					$(ele).popover('destroy')
				}, 500)
			}
		}
	}
</script>
<style scoped>
	.pages {
		text-align: center;
		height: 30px;
		padding: 5px 0;
		margin-top: 5px;
		border-bottom: 1px dashed #f1f1f1;
	}
	
	.pages span {
		display: inline-block;
		padding: 2px 8px;
		margin: 0 3px;
		cursor: pointer;
		vertical-align: middle;
		-moz-user-select:none;
	}
	
	input {
		width: 40px;
		background: #E8E8E8;
		height: 18px;
		border-radius: 5px;
		margin-left: 10px;
		text-align: center;
	}
	
	.button{
		border-radius: 5px;
	}
	input::-webkit-input-placeholder {
	    color:#FFFFFF;
	}
	input::-moz-placeholder { 
	    color:#FFFFFF;
	}
	input:-ms-input-placeholder{
	   color:#FFFFFF;
	}
</style>