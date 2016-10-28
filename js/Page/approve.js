mui.init()
	//一开始就加载
mui.ready(function() {
	(function($) {
		WeChat.init();
		var iid = location.search;
		var id = iid.replace("?id=", "")
		if(id != "") {
			//var surl = "http://192.168.0.191/BedrockAPI/api/Account/GetAccountApproval?jobnumber=" + id;
			mui.getJSON(WeChat.ADApproveStartLoad+id, "", function(data) {
				mui.each(data, function(index, item) {
					document.getElementById("content-input-Cname").value = item.CName;
					if(item.Sex == "男") {
						document.getElementById("adsex-nan").checked = true;
					} else {
						document.getElementById("adsex-nv").checked = true;
					}
					document.getElementById("content-input-Ename").value = item.EName;
					document.getElementById("content-input-Epwd").value = item.Password;
				});
				//文本框禁用
				document.getElementById("content-input-Cname").readOnly = true;
				document.getElementById("adsex-nan").disabled = "disabled";
				document.getElementById("adsex-nv").disabled = "disabled";
				document.getElementById("content-input-Ename").readOnly = true;
			});
		}
	})(mui);
});
//点击确定
function ADapproval() {
	var iid = location.search;
	var id = iid.replace("?id=", "")
	var Epwd = document.getElementById("content-input-Epwd").value;
	var Email = document.getElementById("content-input-Email").value;
	var AD = document.getElementById("content-input-AD").value;
	var ADPWD = document.getElementById("content-input-ADPWD").value;
	var content=document.getElementById("content-input-ADcontent").value;
	if(Epwd == "" || Email == "" || AD == "" || ADPWD == "") {
		alert("请将除备注外的信息填写完整！");
	} else {
		mui.ajax(WeChat.ADApproveSubmitYes+id, {
			data: {
				"Jobnumber": id,
				"AD": AD,
				"ADPwd": ADPWD,
				"Email": Email,
				"Password": Epwd,
				"Desc": content,
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'POST', //HTTP请求类型
			contentType: 'application/json; charset=utf-8',
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				mui.toast('添加成功!');
				mui.openWindow({
					url: '../../index.html?id=' + id,
				});
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				mui.toast('连接失败，请检查网络!');
				//mui.alert("连接失败，请检查网络！");
			}
		});

	}
}
//点击退回

function ADtuihui(){
	var iid = location.search;
	var id = iid.replace("?id=", "")
	var content=document.getElementById("content-input-ADcontent").value;
	alert(content);
	if(content=="") {
		alert("请在备注处填写原因！");
	} else {
		mui.ajax(WeChat.ADApproveSubmitNo+id, {
			data: {
				"AccountComent": content,
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'POST', //HTTP请求类型
			contentType: 'application/json; charset=utf-8',
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				mui.toast('添加成功!');
				mui.openWindow({
					url: '../../Pages/EmployeeInfo/account.html?id=' + id,
				});
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				mui.toast('连接失败，请检查网络!');
			}
		});

	}	
}
