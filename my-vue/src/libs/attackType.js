export default {
	
	valuetype(value) {
		this._try_build_map();
		
		if(this._map.value[`${value}`]){
			return this._map.value[`${value}`]
		}else{
			return value
		}
	},
	
	value(value) {
		this._try_build_map();
		if(this._map.value[`${value}`]){
			return this._map.value[`${value}`]+'服务探测'
		}else{
			return value+'端口扫描'
		}
		
	},
	_try_build_map() {
		if (this._map) {
			return;
		}
		
		this._map = {key:{}, value:{}};
		for(let e of this.data) {
	        this._map["key"][e["text"]] = e["value"];
	        this._map["value"][e["value"]] = e["text"];
	    }
	},
	data:[
		{ text: "FTP", value: "21" },
        { text: "SSH", value: "22" },
        { text: "TELNET", value: "23" },
        { text: "SMTP", value: "25" },              
        { text: "DNS", value: "53" },
        { text: "WEB", value: "80" },
        { text: "POP3", value: "110" },
        { text: "DCE endpoint resolution", value: "135" },
        { text: "NetBios名称", value: "137" },
        { text: "NetBios会话", value: "139" },
        { text: "IMAP", value: "143" },
        { text: "HTTPS", value: "443" },
        { text: "MICROSOFT-DS", value: "445" },
        { text: "Microsoft SQL", value: "1433" },     
        { text: "MYSQL", value: "3306" },
        { text: "远程桌面", value: "3389" }, 
        { text: "pcANYWHERE data", value: "5631" },        
        { text: "Virtual Network Computing Server", value: "5800" },
        { text: "ICMP", value: "0" }
	]	
}