mui.init()
	//一开始就加载
mui.ready(function() {
	(function($) {
		//alert(111);
		var iid = location.search;
		var id = iid.replace("?id=", "")
		if(id != "") {
			var surl = "http://localhost/Bedrock_WeCath_WeiXin/api/Account/GetAccountApproval?jobnumber=" + id;
			alert(surl);
			mui.getJSON(surl, "", function(data) {
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
				//document.getElementById("content-input-Epwd").readOnly=true;
				//var state = document.getElementById("accountadhid").value;
				//alert("78" + state);
			});
		}
	})(mui);
});
//点击确定http://192.168.0.132/BedrockAPI/api/Account/PostADApproval?jobnumber=Bedrock2016102158
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
		mui.ajax('http://localhost/Bedrock_WeCath_WeiXin/api/Account/PostADApproval?jobnumber='+id, {
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