import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {

	searchList (filter) {
		return xhr({ 
			url: '/userlist',
			method: 'POST',
			body: filter,
			other: {contentType: 'application/json; charset=utf-8'}
		})
  	}

	getUser(){
		return xhr({url:'/user/userlist.php'})
	}

	getLoginInfo () {
		return xhr({url:'/user/login_info.php'})
	}

	addUser(user){
		return xhr({ 
			url: '/user/add.php',
			method: 'POST',
			body: {
				user_id:user.user_id,
				role:user.role,
				real_name:user.real_name,
				department:user.department,
				email:user.email,
				auth_way:user.auth_way,
				password:user.password
			}
		})
	}

	expire(conf){
		return xhr({ 
			url: '/user/expire.php',
			method: 'POST',
			body: {
				oper:conf.oper,
				conf_value:conf.conf_value,
				is_active:conf.is_active
			}
		})
	}

	updateUser(user){
		return xhr({ 
			url: '/user/update.php',
			method: 'POST',
			body: {
				user_id:user.user_id,
				role:user.role,
				real_name:user.real_name,
				department:user.department,
				email:user.email,
				uid:user.uid
			}
		})
	}

	deleteUser(id){
		return xhr({ 
			url: '/user/delete.php',
			method: 'POST',
			body: {
				uid:id
			}
		})
	}

	changePwd(user){
		return xhr({ 
			url: '/user/change_password.php',
			method: 'POST',
			body: {
				uid:user.uid,
				old_pwd:user.old_pwd,
				new_pwd:user.new_pwd
			}
		})
	}

	login(user_id,password) {
		return xhr({
			url: '/user/login.php',
			method: 'POST',
			body: {
				user_id: user_id,
				password: password
			}
		})
	}

	logout() {
		return xhr({url:'/user/logout.php'})
	}

}

// 实例化后再导出
export default new UserService()