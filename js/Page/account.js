mui.init()
	//一开始就加载
mui.ready(function() {
	(function($) {
		var iid = location.search;
		var id = iid.replace("?id=", "")
		if(id != "") {
			var surl = "http://localhost/Bedrock_WeCath_WeiXin/api/Account/GetAccountIndex?jobnumber=" + id;
			alert(surl);
			mui.getJSON(surl, "", function(data) {
				mui.each(data, function(index, item) {
					//document.getElementById("content-input-pwd").value = item.Password;
					document.getElementById("accountadhid").value = item.AccountStatus;
					document.getElementById("email").value=item.Email;
					document.getElementById("emailpwd").value=item.Password;
				});
				var state = document.getElementById("accountadhid").value;
				alert("78" + state);
				if(state == "AD待审核"){
					document.getElementById('content-input-pwd').style.display = "none";
					document.getElementById("imghid").style.display = "none";
					document.getElementById('dai').style.display = "block";
				} 
				else if(state == "AD已审核"){
					document.getElementById('content-input-pwd').style.display = "none";
					document.getElementById("imghid").style.display = "none";
					document.getElementById('daiend').style.display = "block";
					var name=document.getElementById("email").value
					document.getElementById("name").textContent=name;
					var pwd=document.getElementById("emailpwd").value;
					document.getElementById("pwd").textContent=pwd;
				}

			});
		}
	})(mui);
});

//申请账户
function accountOKs() {
	alert(111);
	var Id = location.search;
	//alert(Id);
	var jobnumber = Id.replace("?id=", "");
	//alert(accounthid);
	var pwd = document.getElementById("content-input-pwd").value;
	alert(pwd);

	if(pwd == "") {
		mui.toast("请设置一个初始密码！");
	} else {
		mui.ajax('http://localhost/Bedrock_WeCath_WeiXin/api/Account/PostAccount?jobnumber=' + jobnumber, {
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
					//alert(datas.Jobnumber);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//console.log(type);
				mui.toast("连接失败！请检查网络");
			}
		});
	}

}

function approvalok(){
	var Id = location.search;
	var jobnumber = Id.replace("?id=", "");
	mui.openWindow({
		url:'approve.html?id='+jobnumber
	})
}
