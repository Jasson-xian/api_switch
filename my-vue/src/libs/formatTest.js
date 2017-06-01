export default class formatTest {
	constructor(ele, reg, empty) {
		this.ele = ele
		this.reg = reg
		this.empty = empty //是否允许为空
	}
	testFormat() {
		// ip段
		var IPReg_piece = /^(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
		//mac段
		var MacReg_piece = /^[0-9A-Fa-f]{2}$/
		//正常ip
		var IPReg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
		//正常mac
		var MacReg = /^[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}$/
		//正常虚拟域名
		var virNameReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
		//正常端口号
		var protReg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
		//多个端口号以“，”隔开
		var protRangReg = /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])|(([89][0-9]):([89][1-9]|100)))((,([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))|(,(([89][0-9]):([89][1-9]|100)))){0,9}$/
		//ip范围
		var ipRangReg = /^(!*(2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)(\/(3[0-2]|2[0-9]|1[0-9]|[1-9]))*(\-(!*(2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?))*(\/(3[0-2]|2[0-9]|1[0-9]|[1-9]))*$/
		//端口号或则ip
		var port_ip = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$|[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
		//mac或ip
		var mac_ip = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$|^[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}$/
		//模糊ip查询
		var mohuIpReg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)+\.){0,3}(2[0-4]\d|25[0-5]|[01]?\d\d?){0,1}$/
		//模糊mac查询
		var mohuMacReg = /^([0-9A-Fa-f]{2}:){0,5}([0-9A-Fa-f]{2}){0,1}$/
		//正整数
		var IntgerReg = /^[1-9]\d*$/
		//正整数+0
		var IntgerPlusReg = /0$|(^[1-9]\d*$)/
		//空
		var Allpass = /\S/
		//邮箱
		var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		//6-18字符
		var regUsername = /^\w{6,18}$/;
		var _reg = ''
		switch(this.reg) {
			case 'ip':
				_reg = IPReg
				break;
			case 'ip_piece':
				_reg = IPReg_piece
				break;
			case 'mac':
				_reg = MacReg
				break;
			case 'mac_piece':
				_reg = MacReg_piece
				break;
			case 'ipRang':
				_reg = ipRangReg
				break;
			case 'mohuip':
				_reg = mohuIpReg
				break;
			case 'mohumac':
				_reg = mohuMacReg
				break;		
			case 'virName':
				_reg = virNameReg
				break;
			case 'prot':
				_reg = protReg
				break;
			case 'protRang':
				_reg = protRangReg
				break;
			case 'int':
				_reg = IntgerReg
				break;
			case 'intplus'://正整数加0
				_reg = IntgerPlusReg
				break;
			case 'allpass': //所有字符都可以验证 只用于验证 value 为 null 的控件是不是空
				_reg = Allpass
				break;
			case 'mask': //用算法验证掩码
				_reg = IPReg
				break;
			case 'vlanid': //vlanid要验证大小所以单独验证
				_reg = IntgerPlusReg
				break;
			case 'remark': //验证备注30字以内
				_reg = Allpass
				break;
			case 'CLname': //验证策略名15字以内
				_reg = Allpass
				break;
			case 'realm_ip':
				_reg = port_ip
				break;
			case 'email':
				_reg = regEmail
				break;
			case 'username':
				_reg = regUsername
				break;
			case 'mac_ip':
				_reg = mac_ip
				break;	
			default:
				break;
		}
		var val = $(this.ele).val()
		if (val!=null){//去除前后空格
		  val = val.replace(/(^\s*)|(\s*$)/g, "")			
		}

		if(this.empty) {
			//可以为空
			if(!_reg.test(val) && val) {
				this.worng()
				return false
			} else {
				this.right()
				return true

			}
		} else {
			//不能为空
			if(val == null) { //验证控件值为null
				$(this.ele).parent().find('.mi').css('color', '#b63039')
				this.worng()
				return false
			} else if(val == '') {
				$(this.ele).parent().find('.mi').css('color', '#b63039')
				this.worng()
				return false
			} else if(this.reg == 'mask') { //用于验证掩码 算法验证
				if(!mask_valid(val) || !_reg.test(val)) {
					this.worng()
					return false
				} else {
					this.right()
					return true

				}
			} else if(this.reg == 'vlanid') { //用于验证vlanid
				if((!_reg.test(val)) || (val < 0 || val > 4094)) {
					this.worng()
					return false
				} else {
					this.right()
					return true

				}
			} else if(this.reg == 'remark') { //用于验证备注长度
				if(val.length > 30) {
					this.worng()
					return false
				} else {
					this.right()
					return true

				}
			} else if(this.reg == 'CLname') { //用于验证策略名长度
				if(val.length > 15) {
					this.worng()
					return false
				} else {
					this.right()
					return true

				}
			} else if(!_reg.test(val)) {
				this.worng()
				return false
			} else {
				this.right()
				return true
			}
		}

	}
	isEmpty() {
		var val = $(this.ele).val()
		if(val) {
			$(this.ele).parent().find('.mi').css('color', '#d2d2d2')
			$(this.ele).css('border', '1px solid #e8e8e8')
		}
	}
	notEmpty() {
		$(this.ele).parent().find('.mi').css('color', '#d2d2d2')
		$(this.ele).css('border', '1px solid #e8e8e8')
	}
	right() {
		$(this.ele).parent().find('.mi').css('color', '#d2d2d2')
		if(this.reg=='mac_piece'||this.reg=='ip_piece'){
			$(this.ele).css('border', 'none')
		}else{
			$(this.ele).css('border', '1px solid #e8e8e8')
		}
		
	}
	worng() {		
		$(this.ele).css('border', '1px solid #b63039')
		$(this.ele).addClass('animated shake')
		var _this = this
		setTimeout(function() {
			$(_this.ele).removeClass('animated shake')
		}, 200)
	}
}