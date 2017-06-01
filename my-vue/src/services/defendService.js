import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class defendService {
	
	getSafePolt(sentdata) {
		return xhr({
			url: '/firewall/iptables.php',
			method: 'POST',
			body: {
				oper: sentdata.oper,
				protocol_id: sentdata.protocal_id,
				ids: sentdata.ids,
				src: sentdata.src,
				dst: sentdata.dst,
				dports:sentdata.dports,
				sports:sentdata.sports,
				iptableid:sentdata.iptableid
			}
		})
	}
	
	getHostComputer(sentdata){	
		return xhr({
			url: '/firewall/honey.php',
			method: 'POST',
			body: {
			  oper:sentdata.oper,
			  abcd:sentdata.ip,//添加
			  vport:sentdata.vport,//添加
			  rport:sentdata.rport,//添加
			  ids:sentdata.ids//删除
			}
		})
	}
	
	getSelfset(sentdata){
		return xhr({
			url:'/firewall/mac_info.php',
			method:'POST',
			body:{
				oper:sentdata.oper,
				macs:sentdata.macs,
				desc:sentdata.desc,
				debug:true
			}
		})
	}
	
}
// 实例化后再导出
export default new defendService()