mui.init()
	//一开始就加载
mui.ready(function() {
	(function($) {
		WeChat.init();
		var iid = location.search;
		var id = iid.replace("?id=", "")
		if(id != "") {
			//var surl = "http://192.168.0.191/BedrockAPI/api/Account/GetAccountIndex?jobnumber=" + id;
			mui.getJSON(WeChat.AccountStartLoad + id, "", function(data) {
				mui.each(data, function(index, item) {
					document.getElementById("accountadhid").value = item.AccountStatus;
					document.getElementById("email").value = item.Email;
					document.getElementById("emailpwd").value = item.Password;
				});
				var state = document.getElementById("accountadhid").value;
				switch(state) {
					case "AD待审核":
						document.getElementById('dai').style.display = "block"
						break;
					case "AD已审核":
						document.getElementById('daiend').style.display = "block";
						var name = document.getElementById("email").value
						document.getElementById("name").textContent = name;
						var pwd = document.getElementById("emailpwd").value;
						document.getElementById("pwd").textContent = pwd;
						break;
					case "AD退回":
						document.getElementById('content-input-pwd').style.display = "block";
						document.getElementById('content-input-pwd').style.marginLeft = "5%";
						document.getElementById('content-input-pwd').style.textAlign = "center";
						document.getElementById("imghidres").style.display = "block";
						document.getElementById("adminretrun").style.display = "block";
						break;
					default:
						document.getElementById('content-input-pwd').style.display = "block";
						document.getElementById('content-input-pwd').style.marginLeft = "5%";
						document.getElementById('content-input-pwd').style.textAlign = "center";
						document.getElementById("imghid").style.display = "block";
						break;

				}
			});
		}

	})(mui);
});

//申请账户
function accountOKs() {
	var Id = location.search;
	var jobnumber = Id.replace("?id=", "");
	var pwd = document.getElementById("content-input-pwd").value;
	if(pwd == "") {
		mui.toast("请设置一个初始密码！");
	} else {
		mui.ajax(WeChat.AccountSubmit + jobnumber, {
			data: {
				"Password": pwd
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'Post', //HTTP请求类型
			timeout: 10000, //超时时间设置为1秒；
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				var datas = eval('(' + JSON.stringify(data) + ')');
				//alert(datas);
				mui.toast("添加成功！");
				mui.openWindow({
					url: '../../index.html?id=' + datas.Jobnumber,
				})
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//console.log(type);
				mui.toast("连接失败！请检查网络");
			}
		});
	}
}

function accountResultSubmit(){
	var Id = location.search;
	var jobnumber = Id.replace("?id=", "");
	var pwd = document.getElementById("content-input-pwd").value;
	if(pwd == "") {
		mui.toast("请设置一个初始密码！");
	} else {
		mui.ajax(WeChat.AccountSubmitResult + jobnumber, {
			data: {
				"Password": pwd
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'Post', //HTTP请求类型
			timeout: 10000, //超时时间设置为1秒；
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				var datas = eval('(' + JSON.stringify(data) + ')');
				//alert(datas);
				mui.toast("添加成功！");
				mui.openWindow({
					url: '../../index.html?id=' + jobnumber,
				})
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//console.log(type);
				mui.toast("连接失败！请检查网络");
			}
		});
	}	
}


//点击查看
function approvalok() {
	var Id = location.search;
	var jobnumber = Id.replace("?id=", "");
	mui.openWindow({
		url: 'approve.html?id=' + jobnumber
	})
}