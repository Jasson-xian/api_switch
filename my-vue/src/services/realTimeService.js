import xhr from './xhr/'

class RealTimeService {

	getDevRes() {
		return xhr({
			url: '/real_time/dev_res.php'
		})
	}

	getEthsState() {
		return xhr({
			url: '/real_time/eths_state.php'
		})
	}

	getOnlineNode(sentdata) {
		return xhr({
			url: '/real_time/online_hosts.php',
			method: 'POST',
			body: {
				rip: sentdata.rip,
				vip: sentdata.vip,
				wip: sentdata.wip,
				mac: sentdata.mac,
				vname: sentdata.vname,
				start_time: sentdata.starttime,
				end_time: sentdata.endtime,
				node_valid:sentdata.node_valid
			}

		})
	}

	setBlackList(sentdata) {
		return xhr({
			url: '/real_time/set_black_white.php',
			method: "POST",
			body: {
				oper: sentdata.oper,
				mori:sentdata.mac,	
				note: sentdata.note,
				reason: sentdata.reason,
				black_list: sentdata.black				
			}
		})
	}
	
	getBlackList(sentdata){
		return xhr({
			url:'/real_time/black_white_list.php',
			method:"POST",
			body:{
				mac:sentdata.mac,
				start_time:sentdata.start_time,
                end_time:sentdata.end_time,              
                black_list: sentdata.black
			}
		})
	}	
	
	setWhiteList(sentdata) {
		return xhr({
			url: '/real_time/set_black_white.php',
			method: "POST",
			body: {
				oper: sentdata.oper,
				mori:sentdata.mac,			
				note: sentdata.note,
				reason: sentdata.reason
			}
		})
	}
	
	getWhiteList(sentdata){
		return xhr({
			url:'/real_time/black_white_list.php',
			method:"POST",
			body:{
                mac:sentdata.mac,				
				start_time:sentdata.start_time,
                end_time:sentdata.end_time
			}
		})
	}	
	getRoadMessage(road){
		return xhr({
			url:'/real_time/hosts_info.php',
			method:"POST",
			body:{
			   groupid:road
			}
		})
	}

}

export default new RealTimeService()