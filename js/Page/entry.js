mui.init({});
//一开始就加载
mui.ready(function() {
	(function($) {
		WeChat.init();
		var iid = location.search;
		var id = iid.replace("?id=", "")
		if(id != "") {
			//var surl = "http://192.168.0.191/BedrockAPI/api/Entry/GetIndex?id=" + id;
			mui.getJSON(WeChat.EntryStartLoad + id, "", function(data) {
				mui.each(data, function(index, item) {

					document.getElementById("content-input-Cname").value = item.CName;
					document.getElementById("content-input-Ename").value = item.EName;
					if(item.Sex == "男") {
						document.getElementById("sex-nan").setAttribute("checked", "checked");
					} else {
						document.getElementById("sex-nv").setAttribute("checked", "checked");
					}
					document.getElementById("content-input-idcard").value = item.IDcare;
					document.getElementById("content-input-cardaddress").value = item.CareAddress;
					document.getElementById("content-input-nowaddress").value = item.NowAddress;
					document.getElementById("content-input-maritalstatus").value = item.MaritalStatus;
					document.getElementById("content-input-education").value = item.Education;
					document.getElementById("content-input-tel").value = item.Phone;
					document.getElementById("states").value = item.Status;
					//document.getElementById("hrjobnumber").value = item.Jobnumber;
					//document.getElementById("entryId").value = item.Id;					
				});
				var state = document.getElementById("states").value;
				switch(state) {
					case "HR待审核":
						document.getElementById("shenhe").style.display = "block"
						break;
					case "HR已审核":
						document.getElementById("shenheend").style.display = "block"
						break;
					case "HR退回":
						document.getElementById("tuihui").style.display = "block"
						break;
					default:
						document.getElementById('buttom').style.display = "block"
						break;
				}
			});
		} else {
			document.getElementById('buttom').style.display = "block";
		}

	})(mui);
});
//提交
function submitinput() {
	var cname = document.getElementById("content-input-Cname").value; //姓名
	var Ename = document.getElementById("content-input-Ename").value; //英文名
	var sex = document.getElementsByName("radio1"); //性别
	var sexs;
	for(var i = 0; i < sex.length; i++) {
		if(sex[i].checked)
			sexs = sex[i].value;
	}
	var idcard = document.getElementById("content-input-idcard").value; //身份证号
	var cardaddress = document.getElementById("content-input-cardaddress").value; //身份证地址
	var nowaddress = document.getElementById("content-input-nowaddress").value; //现居住地址
	var maritalstatus = document.getElementById("content-input-maritalstatus").value; //婚姻状况
	var education = document.getElementById("content-input-education").value; //最终学历
	var tel = document.getElementById("content-input-tel").value; //手机
	var reg = /^1[34578]\d{9}$/;
	var regs = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
	if(cname == "" || Ename == "" || sexs == "" || idcard == "" || cardaddress == "" || nowaddress == "" || maritalstatus == "" || education == "" || tel == "") {
		mui.toast("请将信息填写完整！");
	} else if(!reg.test(tel) || !regs.test(idcard)) {
		alert("请输入正确的手机号或身份证号");
	} else {
		mui.ajax(WeChat.EntrySubmit, {
			data: {
				"CName": cname,
				"EName": Ename,
				"Sex": sexs,
				"IDcare": idcard,
				"CareAddress": cardaddress,
				"NowAddress": nowaddress,
				"MaritalStatus": maritalstatus,
				"Education": education,
				"Phone": tel
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'POST', //HTTP请求类型
			contentType: 'application/json; charset=utf-8',
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				var datas = eval('(' + JSON.stringify(data) + ')');
				//mui.alert("添加成功！");
				mui.toast('添加成功!');
				mui.openWindow({
					url: '../../index.html?id=' + datas.Jobnumber,
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
//跳转至HR审核页面
function hrentrybuttom() {
	var iid = location.search;
	var id = iid.replace("?id=", "")
	mui.openWindow({
		url: '../../Pages/EmployeeInfo/HRapprove.html?id=' + id,
	})
}
//退回后重新提交
function Resubmit() {
	var iid = location.search;
	var id = iid.replace("?id=", "")
	var cname = document.getElementById("content-input-Cname").value; //姓名
	var Ename = document.getElementById("content-input-Ename").value; //英文名
	var sex = document.getElementsByName("radio1"); //性别
	var sexs;
	for(var i = 0; i < sex.length; i++) {
		if(sex[i].checked)
			sexs = sex[i].value;
	}
	var idcard = document.getElementById("content-input-idcard").value; //身份证号
	var cardaddress = document.getElementById("content-input-cardaddress").value; //身份证地址
	var nowaddress = document.getElementById("content-input-nowaddress").value; //现居住地址
	var maritalstatus = document.getElementById("content-input-maritalstatus").value; //婚姻状况
	var education = document.getElementById("content-input-education").value; //最终学历
	var tel = document.getElementById("content-input-tel").value; //手机
	var reg = /^1[34578]\d{9}$/;
	var regs = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
	if(cname == "" || Ename == "" || sexs == "" || idcard == "" || cardaddress == "" || nowaddress == "" || maritalstatus == "" || education == "" || tel == "") {
		mui.toast("请将信息填写完整！");
	} else if(!reg.test(tel) || !regs.test(idcard)) {
		alert("请输入正确的手机号或身份证号");
	} else {
		mui.ajax(WeChat.EntryResuleSubmit + id, {
			data: {
				"CName": cname,
				"EName": Ename,
				"Sex": sexs,
				"IDcare": idcard,
				"CareAddress": cardaddress,
				"NowAddress": nowaddress,
				"MaritalStatus": maritalstatus,
				"Education": education,
				"Phone": tel
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
			}
		});
	}
}