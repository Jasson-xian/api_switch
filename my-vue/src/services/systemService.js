import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class SystemService {

	saveConfig(){
		return xhr({ 
		url: '/sys_conf/xmsd/SaveConfig.php'
		})
	}

	changePwd(old_pwd,new_pwd) {
		return xhr({ 
    	url: '/user/change_password.php',
    	method: 'POST',
    	body: {old_pwd:old_pwd,new_pwd:new_pwd}
    	})
	}

	sysUpload(file){
		return xhr({ 
    	url: '/sys_conf/UploadImage.php',
		method: 'POST',
		body:file
    	})
	}

	exportConf(){
		return xhr({ 
    	url: '/sys_conf/xmsd/ExportConfig.php'
    	})
	}

	sysReset(){
		return xhr({ 
    	url: '/sys_conf/Reset.php'
    	})
	}

	bkconfUpload(file){
		return xhr({ 
    	url: '/sys_conf/xmsd/UploadConfig.php',
    	method: 'POST',
    	body: {file}
    	})
	}
	
	command(cmd){
		return xhr({ 
    	url: '/sys_conf/command.php',
    	method: 'POST',
    	body: {cmd:cmd}
    	})
	}

	checkStart(cmd){
		return xhr({ 
    	url: '/sys_conf/CheckStart.php'
    	})
	}

	getTime() {
		return xhr({ url: '/sys_conf/time.php'})
	}

	setTime(systime) {
		return xhr({ 
			url: '/sys_conf/time.php',
			method: 'POST',
			body: {time:systime}
		})
	}

	getSysinfo() {
		return xhr({ url: '/main/SysInfo.php'})
	}

	doBypass(bypass){
		return xhr({
			url: '/sys_conf/bypass.php',
			method: 'POST',
			body: {oper:bypass.oper,group:bypass.group}
			})
	}
	getSysPolice(sentdata){
		return xhr({
			url: '/sys_conf/manage.php',
			method: 'POST',
			body: {
				oper:sentdata.oper,
				web_ui:sentdata.web_ui,
				punish:sentdata.punish,
				max_times:sentdata.max_times,
				name:sentdata.name,
				ip:sentdata.ip,
				note:sentdata.note,
				address:sentdata.address,
				port:sentdata.port,
				secret:sentdata.secret,
				id:sentdata.id,
				ids:sentdata.ids,
				page:sentdata.page
			}
			})
	}
	getNetDiagnose(sentdata){
		return xhr({
			url: '/sys_conf/net_test.php?oper='+sentdata.oper,
			method: 'POST',
			body: {
				ip:sentdata.ip,
				times:sentdata.times,
				length:sentdata.length,
				min_ttl:sentdata.min_ttl,
				max_ttl:sentdata.max_ttl
			},
			datatype:'String'
			})
	}
  
	getRoadNum(){
		return xhr({
			url: '/sys_conf/eth_groups.php',
			method: 'POST'
			})
	}

}

// 实例化后再导出
export default new SystemService()