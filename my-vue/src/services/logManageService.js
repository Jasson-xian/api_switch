import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class logManageService {
	getCheckCount() {
		return xhr({
			url: '/main/check_attack_count.php'
		})
	} //用户威胁次数查看时间

	getPermeateLog(sentdata) {
		return xhr({
			url: '/log/virtual_log.php',
			method: 'POST',
			body: {
				page: sentdata.page,
				start_time: sentdata.starttime,
				end_time: sentdata.endtime,
				attack_mac: sentdata.macIP,
				phy_port: sentdata.port,
				macip:sentdata.macip
			}
		})
	}

	getStatistic(type, macIP) {
		return xhr({
			url: '/log/virtual_status.php',
			method: 'POST',
			body: {
				type: type,
				mac: macIP
			}
		})
	}

	getTerminalLog(sentdata) {
		return xhr({
			url: '/log/host.php',
			method: 'POST',
			body: {
				page: sentdata.page,
				type: sentdata.type,
				start_time: sentdata.starttime,
				end_time: sentdata.endtime,			
				type:sentdata.type,
				wip:sentdata.wip,
				rip:sentdata.rip,
				mac:sentdata.mac,
				online_time:sentdata.online_time,
				groupid:sentdata.groupid
			}
		})
	}

	getUnblockLog(sentdata) {
		return xhr({
			url: '/log/block.php',
			method: 'POST',
			body: {
				page: sentdata.page,
				type: sentdata.type,
				mac: sentdata.macIP,
				start_time: sentdata.starttime,
				end_time: sentdata.endtime
			}
		})
	}

	getOrderLog(sentdata) {
		return xhr({
			url: '/log/oper_log.php',
			method: 'POST',
			body: {
				page: sentdata.page,
				mac: sentdata.mac,
				ip: sentdata.ip,
				user: sentdata.user,
				content: sentdata.content,
				result: sentdata.result,
				start_time: sentdata.starttime,
				end_time: sentdata.endtime
			}
		})
	}
	clearOrderLog(sentdata) {
		return xhr({
			url: '/log/oper_log.php',
			method: 'POST',
			body: {
				page: sentdata.page,
				mac: sentdata.mac,
				ip: sentdata.ip,
				user: sentdata.user,
				content: sentdata.content,
				result: sentdata.result,
				start_time: sentdata.starttime,
				end_time: sentdata.endtime,
				clear: 'clear'
			}
		})
	}
	getEventLog(sentdata) {
		return xhr({
			url: '/log/event.php',
			method: 'POST',
			body: {
				page: sentdata.page,
				type: sentdata.type,
				level: sentdata.level,
				start_time: sentdata.starttime,
				end_time: sentdata.endtime,
			}
		})
	}

	clearEventLog(sentdata) {
		return xhr({
			url: '/log/event.php',
			method: 'POST',
			body: {
				page: sentdata.page,
				type: sentdata.type,
				level: sentdata.level,
				start_time: sentdata.starttime,
				end_time: sentdata.endtime,
				clear: 'clear'
			}
		})
	}

	getServer(sentdata) {
		return xhr({
			url: '/log/conf.php',
			method: 'POST',
			body: {
				oper: sentdata.oper,
				types: sentdata.types,
				abcd: sentdata.severIP,
				port: sentdata.severProt,
				ids: sentdata.ids,
				id: sentdata.id,
				switch: sentdata.switch
			},

		})
	}

}

// 实例化后再导出
export default new logManageService()