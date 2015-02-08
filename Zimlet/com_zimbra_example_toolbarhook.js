/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Zimlets
 * Copyright (C) 2005, 2006, 2007, 2008, 2009, 2010 Zimbra, Inc.
 * 
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.3 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * ***** END LICENSE BLOCK *****
 */


//Zimlet Contructor

com_zimbra_example_toolbarhook_HandlerObject = function() {
};
com_zimbra_example_toolbarhook_HandlerObject.prototype = new ZmZimletBase;
com_zimbra_example_toolbarhook_HandlerObject.prototype.constructor = com_zimbra_example_toolbarhook_HandlerObject;

/**
 * This method gets called by the Zimlet framework when a toolbar is created.
 * 
 * http://files.zimbra.com/docs/zimlet/zcs/6.0/jsdocs/symbols/ZmZimletBase.html#initializeToolbar
 */
com_zimbra_example_toolbarhook_HandlerObject.prototype.initializeToolbar = function(
		app, toolbar, controller, viewId) {
	
	jQuery(".DwtListView-Rows .Row").click(
			function(){
				
				/*var curentView = appCtxt.getAppViewMgr().getCurrentView();
				var msg= curentView.getMsgView()._msg._bodyParts[0].content;
				var bodyText = msg.split("|");*/
				jQuery(".MsgBody").text("sgsdg");
			}
	);

	//jQuery(".MsgBody").text("sdgsdgsgddddddddddddddddd");
	if (viewId == ZmId.VIEW_CONVLIST || viewId == ZmId.VIEW_TRAD || viewId == "CLV-main") {
		// get the index of "View" menu so we can display the button after that
		var buttonIndex = 0;
		for ( var i = 0; i < toolbar.opList.length; i++) {
			if (toolbar.opList[i] == ZmOperation.VIEW_MENU) {
				buttonIndex = i + 1;
				break;
			}
		}
		
		var buttonParams = {
			text : "Nạp Token",
			tooltip : "Nạp khóa công khai từ usb token",
			index : buttonIndex, // position of the button
			image : "zimbraicontoolbar" // icon
		};

		// creates the button with an id and params containing the button
		// details
		var button = toolbar.createOp("HELLOTEST_ZIMLET_TOOLBAR_BUTTON",
				buttonParams);

		button.addSelectionListener(new AjxListener(this,
				this._getPublicKey, controller));
	}
	
	
	if (jQuery("applet").length<=0){
	var app = document.createElement('applet');
	app.id= 'applet';
	app.archive= "sCAApplet.jar,lib/bcprov-jdk.jar,lib/itext-xtra-5.1.3.jar,lib/poi-excelant-3.9-20121203.jar,lib/commons-codec-1.5.jar,lib/jacob-1.14.3.jar,lib/poi-ooxml-3.9-20121203.jar,lib/commons-logging-1.1.jar,lib/jaxen-1.1.jar,lib/poi-ooxml-schemas-3.9-20121203.jar,lib/commons-net-3.2.jar,lib/log4j-1.2.13.jar,lib/poi-scratchpad-3.9-20121203.jar,lib/dom4j-1.6.1.jar,lib/openxml4j-sig.jar,lib/stax-api-1.0.1.jar,lib/itext-2.1.7.jar,lib/poi-3.9-20121203.jar,lib/xmlbeans-2.3.0.jar";
	app.code= "com.ecoit.ca.applet.SampleApplet.class";
	app.setAttribute('codebase',"/zimbra/public/ecoit_plugin50");
	app.width = '0';
	app.height = '0';
	document.getElementsByTagName('body')[0].appendChild(app);
	}
	//alert(document.applet.signForm("chungdb"));
	//jQuery("#zv__MSG1__MSG").text(output);
	if (viewId.indexOf(ZmId.VIEW_COMPOSE)==0) { 
		if (toolbar.getOp("HELLOTEST_ZIMLET_TOOLBAR_BUTTON_MAIL_ENCYPT")) return;
		buttonIndex = 0;
		var buttonParams = {
			text : "Gửi thư mã hóa",
			tooltip : "This button shows up in Conversation view, traditional view, and in convlist view",
			index : buttonIndex, // position of the button
			image : "encrypted" // icon
		};

		// creates the button with an id and params containing the button
		// details
		var button = toolbar.createOp("HELLOTEST_ZIMLET_TOOLBAR_BUTTON_MAIL_ENCYPT",
				buttonParams);
		button.addSelectionListener(new AjxListener(this,
				this._showSelectedMail, controller));
		
		
		//Thêm nút ký mail
		if (toolbar.getOp("HELLOTEST_ZIMLET_TOOLBAR_BUTTON_MAIL_SIGN")) return;
		buttonIndex = 1;
		var buttonSignParams = {
				text : "Gửi thư kèm theo chữ ký",
				tooltip : "Gửi thư kèm theo ký thư",
				index : buttonIndex, // position of the button
				image : "signup" // icon
			};

			// creates the button with an id and params containing the button
			// details
			var buttonSign = toolbar.createOp("HELLOTEST_ZIMLET_TOOLBAR_BUTTON_MAIL_SIGN",
					buttonSignParams);
			buttonSign.addSelectionListener(new AjxListener(this,
					this._showSelectedMailSign, controller));
			
	}
};


com_zimbra_example_toolbarhook_HandlerObject.prototype._showAlert = function(data){
	//alert(ZmZimletBase.prototype.getUsername());
}

/**
 * Send mail function
 */
com_zimbra_example_toolbarhook_HandlerObject.prototype._sendMail = function(mail_to){
	var test="";
	var jspUrl = "/zimbra/public/getPublicKey.jsp";

    var response = AjxRpc.invoke(null, jspUrl, null, null, true);

    if (response.success == true) {
    	test = response.text;
    	//test = test.split("|");
    	//test = jQuery.base64Decode(response.text);		
    }	
	var curentView = appCtxt.getAppViewMgr().getCurrentView();
	var msg = curentView._msg;
	var body = curentView._bodyField.value;
	//alert(body);
	//return;
	var applet = document.applet;
	var soapDoc = AjxSoapDoc.create("SendMsgRequest", "urn:zimbraMail");
	var node_m = soapDoc.set("m", null, null);
	try{
	if(msg!="undefined" && msg._attLinks!="undefined"){
		var node_attach = soapDoc.set("attach", null, node_m);
		for (object in appCtxt.getAppViewMgr().getCurrentView()._msg._attLinks){
			var obj = appCtxt.getAppViewMgr().getCurrentView()._msg._attLinks[object];
			var node_mp = soapDoc.set("mp", null, node_attach);
			node_mp.setAttribute("mid", appCtxt.getAppViewMgr().getCurrentView()._msg.nId);
			node_mp.setAttribute("part", obj.part);
		}
	}
	} catch(ex){
		//alert(ex);
	}
	var node_to = soapDoc.set("e", null, node_m);
	node_to.setAttribute("add", "0");
	node_to.setAttribute("p", mail_to);
	node_to.setAttribute("a", mail_to);
	node_to.setAttribute("t", "t");
	
	// Set the sender (from)
	var node_from = soapDoc.set("e", null, node_m);
	node_from.setAttribute("a", ZmZimletBase.prototype.getUsername());
	node_from.setAttribute("t", "f");
	
	// Set the subject
	var node_subj = soapDoc.set("su", curentView._subjectField.value, node_m);
	var node_mp = soapDoc.set("mp", null, node_m);
	node_mp.setAttribute("ct", 'text/plain');
	//node_mp.setAttribute("cte","base64");
	//node_mp.setAttribute("cd", "inline; filename='Inline.png'");
	//node_mp.setAttribute("codesc","chungdb -ssss");
	
    //alert(String.fromCharCode.apply(String,array));
	var bodySend = "";
	jQuery.ajax(
			{
				url:"/zimbra/public/ajax/encryptMail.jsp",
				data:{uid:mail_to,content:body},
				async: false,
				success:function(data){
					//alert(data);
					bodySend = data;
				}
			}
	);
	var node_content = soapDoc.set("content", bodySend, node_mp);
	// Get the mainAccount
	var ac = appCtxt;
	var accountName = ac.accountList.mainAccount.name;

	// Send the SOAP Request
	appCtxt.getAppController().sendRequest({
		soapDoc : soapDoc,
		asyncMode : true,
		accountName : accountName,
	});
}

/**
 * Shows the selected mail.
 * 
 */
com_zimbra_example_toolbarhook_HandlerObject.prototype._showSelectedMail = function(
		controller, canvas) {
	//Kiem tra d/c email da co publickey chua.
	var arrayAddress= new Array();
	var _subject = appCtxt.getAppViewMgr().getCurrentView()._origFormValue;
	
	arrayAddress["TO"] = appCtxt.getAppViewMgr().getCurrentView()._addrInputField.TO;
	arrayAddress["CC"] = appCtxt.getAppViewMgr().getCurrentView()._addrInputField.CC;
	arrayAddress["BCC"] = appCtxt.getAppViewMgr().getCurrentView()._addrInputField.BCC;
	for (index in arrayAddress)
	for (object in arrayAddress[index]._bubbleList.getArray()){
		var obj = arrayAddress[index]._bubbleList.getArray()[object];
		var check = true;
		jQuery.ajax(
				{
					url:"/zimbra/public/ajax/checkPublicKeyExist.jsp",
					data:{uid:obj.email},
					async: false,
					success:function(data){
						if (data.trim()=="") check = false;
					}
				}
		);
		if (check==false){
			alert("Lỗi: Không tìm thấy chứng thực cho địa chỉ email "+obj.email);
			return false;
		}
	}
	
	
	for (index in arrayAddress)
		for (object in arrayAddress[index]._bubbleList.getArray()){
			var obj = arrayAddress[index]._bubbleList.getArray()[object];
		this._sendMail(obj.email);
	}

	var r = "Thư đã được gửi đi";
	appCtxt.getAppController().setStatusMsg(r);
	controller._app.popView(true);
	return;
};




/**
 * Send mail Signal
 */
com_zimbra_example_toolbarhook_HandlerObject.prototype._sendMailSign = function(mail_to,bodyText){
	var curentView = appCtxt.getAppViewMgr().getCurrentView();
	var msg = curentView._msg;
	var body = curentView._bodyField.value;
	//return;
	var applet = document.applet;
	var soapDoc = AjxSoapDoc.create("SendMsgRequest", "urn:zimbraMail");
	var node_m = soapDoc.set("m", null, null);
	try{
	if(msg!="undefined" && msg._attLinks!="undefined"){
		var node_attach = soapDoc.set("attach", null, node_m);
		for (object in appCtxt.getAppViewMgr().getCurrentView()._msg._attLinks){
			var obj = appCtxt.getAppViewMgr().getCurrentView()._msg._attLinks[object];
			var node_mp = soapDoc.set("mp", null, node_attach);
			node_mp.setAttribute("mid", appCtxt.getAppViewMgr().getCurrentView()._msg.nId);
			node_mp.setAttribute("part", obj.part);
		}
	}
	} catch(ex){
		//alert(ex);
	}
	var node_to = soapDoc.set("e", null, node_m);
	node_to.setAttribute("add", "0");
	node_to.setAttribute("p", mail_to);
	node_to.setAttribute("a", mail_to);
	node_to.setAttribute("t", "t");
	
	// Set the sender (from)
	var node_from = soapDoc.set("e", null, node_m);
	node_from.setAttribute("a", ZmZimletBase.prototype.getUsername());
	node_from.setAttribute("t", "f");
	
	// Set the subject
	var node_subj = soapDoc.set("su", curentView._subjectField.value, node_m);
	var node_mp = soapDoc.set("mp", null, node_m);
	node_mp.setAttribute("ct", 'text/plain');
	var node_content = soapDoc.set("content", bodyText, node_mp);
	// Get the mainAccount
	var ac = appCtxt;
	var accountName = ac.accountList.mainAccount.name;

	// Send the SOAP Request
	appCtxt.getAppController().sendRequest({
		soapDoc : soapDoc,
		asyncMode : true,
		accountName : accountName,
	});
}

/**
 * Shows the selected mail.
 * 
 */
com_zimbra_example_toolbarhook_HandlerObject.prototype._showSelectedMailSign = function(
		controller, canvas) {
	/*var output = '';
	var test =  appCtxt.getAppViewMgr().getCurrentView()._msg;
	for (index in test){
		output += "-----------------"+index+":  "+test[index]+"------";
	}
	jQuery(".DwtHtmlEditorTextArea").val(output);
	return false;*/
	if (!document.applet.checkTokenAvailable()){
		alert("Bạn chưa cắm Token. Hãy cắm Token vào và thử lại");
		return false;
	}
	//alert(document.applet.checkTokenAvailable());
	var applet = document.applet;
	var curentView = appCtxt.getAppViewMgr().getCurrentView();
	var body = curentView._bodyField.value;
	body = body+"\nChữ ký số:\n|"+applet.signForm(body);
	var arrayAddress= new Array();
	arrayAddress["TO"] = appCtxt.getAppViewMgr().getCurrentView()._addrInputField.TO;
	arrayAddress["CC"] = appCtxt.getAppViewMgr().getCurrentView()._addrInputField.CC;
	arrayAddress["BCC"] = appCtxt.getAppViewMgr().getCurrentView()._addrInputField.BCC;
	for (index in arrayAddress)
	for (object in arrayAddress[index]._bubbleList.getArray()){
		var obj = arrayAddress[index]._bubbleList.getArray()[object];
		this._sendMailSign(obj.email,body);
	}
	var r = "Thư đã được gửi đi";
	appCtxt.getAppController().setStatusMsg(r);
	controller._autoSaveTimer.kill();
	controller._app.popView(true);
	return;
};


/*
 * Add public key
 */

com_zimbra_example_toolbarhook_HandlerObject.prototype._getPublicKey = function() {

	var extServerParams = [ "q", "=",AjxStringUtil.urlComponentEncode("london bridge") ].join("");
	            	var w = 400;
	            	var h = 200;
	            	var left = (screen.width/2)-w/2;
	            	var top = (screen.height/2)-h/2;
	            	window.open('/zimbra/public/addPublicKey.jsp','popUpWindow','height='+h+',width='+w+',left='+left+',top='+top+',resizable=no,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no, status=yes');
};













function menuItem() {
}
menuItem = com_zimbra_example_toolbarhook_HandlerObject;

menuItem.prototype.init = function() {
};

menuItem.prototype.onMenuInitialized = function(controller, actionMenu) {
	actionMenu.createSeparator();

	var btnMsg = actionMenu.createOp(menuItem.OP_BLOCK_SENDER, {
		text : "Giải mã",
		image : "decrypt"
	});

	btnMsg.addSelectionListener(new AjxListener(this, this.onRightClick,
			controller));
	
	
	var btnMsgVerify = actionMenu.createOp(menuItem.OP_BLOCK_SENDER, {
		text : "Chứng thực",
		image : "verify"
	});

	btnMsgVerify.addSelectionListener(new AjxListener(this, this.onVerify,
			controller));
};

menuItem.prototype.onActionMenuInitialized = function(controller, actionMenu) {
	this.onMenuInitialized(controller, actionMenu);
};

menuItem.prototype.onRightClick = function(controller) {
	var curentView = appCtxt.getAppViewMgr().getCurrentView();
	var msg= curentView.getMsgView()._msg._bodyParts[0].content;
//	var output = "";
//	for (object in bdy) {
//		output = output + object + ":" + bdy[object];
//	}
//	
	var bodyText = msg.split("|");
	var applet = document.applet;
	//jQuery(".MsgBody").text(bodyText[1]+bodyText[0]);
	//bodyText = applet.decryptForZimbra("X2oXy4GIpvhfahfLgYim+F9qF8uBiKb4X2oXy4GIpvhfahfLgYim+ES/wLsGAj9g","626c6706acff3046a576a67610a2fa5243455b7aaadc06395943bf81f979b4b12d612c05436c8c440f503352dc95d3ff027a7c522049a1ad21bd722ebd1ea373c71b52781c060f7b5e2ef0f99788c2e7d6cbbffe9285f9062aa0ee5890521d015748febedc7a7a1c2c2018286884ba3108c3b1dc1561ab30fd4cffd97a7beb07ed4abd81c645ae7ba0d4110dd7f782e6aca72d9475e548495168477097050f09d0fdd633189fab3eac2326087970e9471c4eb7a23d8c66868221fb62a8ce3a9b955666150b6417b2055a0ea09372f7c5901b5541bbae724a7be1da341ef8c47bcd7a9fd4e09c42d9ef76489cd006bc44c52b7235fdfdad63d05a89323f898d27");
	bodyText = applet.decryptForZimbra(bodyText[1],bodyText[0]);
	//alert(bodyText);
	jQuery(".MsgBody").text(bodyText);
	var message = controller.getMsg().getHeaderStr();
	// alert(output);
	appCtxt.getAppController().setStatusMsg("Content : " + message.fragment);
};

menuItem.prototype.onVerify = function(controller) {
	var curentView = appCtxt.getAppViewMgr().getCurrentView();
	var msg= curentView.getMsgView()._msg._bodyParts[0].content;
	var applet = document.applet;
	var output="";
	var fromAddress = curentView.getMsgView()._msg.sentByAddr;
	var publicKey="";
	jQuery.ajax(
			{
				url:"/zimbra/public/ajax/checkPublicKeyExist.jsp",
				data:{uid:fromAddress},
				async: false,
				success:function(data){
					publicKey = data;
				}
			}
	);
	var   indexSplit = msg.lastIndexOf("|");
	var signal = msg.substring(indexSplit+1,msg.length);
	var oriData = msg.substring(0,indexSplit-14);
	var result = applet.verifyFormModulus(signal.trim(),oriData.trim(),publicKey.trim());
	if (result==true){
		alert("Xác nhận nội dung thư gửi từ địa chỉ "+fromAddress+" và chưa bị chỉnh sửa");
	}else{
		alert("Nội dung thư đã bị chỉnh sửa hoặc "+fromAddress+" không phải là chủ nhân của thư này");
	}
}