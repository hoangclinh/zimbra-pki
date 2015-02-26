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
 var deployJava=function(){var l={core:["id","class","title","style"],i18n:["lang","dir"],events:["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","onkeypress","onkeydown","onkeyup"],applet:["codebase","code","name","archive","object","width","height","alt","align","hspace","vspace"],object:["classid","codebase","codetype","data","type","archive","declare","standby","height","width","usemap","name","tabindex","align","border","hspace","vspace"]};var b=l.object.concat(l.core,l.i18n,l.events);var m=l.applet.concat(l.core);function g(o){if(!d.debug){return}if(console.log){console.log(o)}else{alert(o)}}function k(p,o){if(p==null||p.length==0){return true}var r=p.charAt(p.length-1);if(r!="+"&&r!="*"&&(p.indexOf("_")!=-1&&r!="_")){p=p+"*";r="*"}p=p.substring(0,p.length-1);if(p.length>0){var q=p.charAt(p.length-1);if(q=="."||q=="_"){p=p.substring(0,p.length-1)}}if(r=="*"){return(o.indexOf(p)==0)}else{if(r=="+"){return p<=o}}return false}function e(){var o="//java.com/js/webstart.png";try{return document.location.protocol.indexOf("http")!=-1?o:"http:"+o}catch(p){return"http:"+o}}function n(p){var o="http://java.com/dt-redirect";if(p==null||p.length==0){return o}if(p.charAt(0)=="&"){p=p.substring(1,p.length)}return o+"?"+p}function j(q,p){var o=q.length;for(var r=0;r<o;r++){if(q[r]===p){return true}}return false}function c(o){return j(m,o.toLowerCase())}function i(o){return j(b,o.toLowerCase())}function a(o){if("MSIE"!=deployJava.browserName){return true}if(deployJava.compareVersionToPattern(deployJava.getPlugin().version,["10","0","0"],false,true)){return true}if(o==null){return false}return !k("1.6.0_33+",o)}var d={debug:null,version:"20120801",firefoxJavaVersion:null,myInterval:null,preInstallJREList:null,returnPage:null,brand:null,locale:null,installType:null,EAInstallEnabled:false,EarlyAccessURL:null,oldMimeType:"application/npruntime-scriptable-plugin;DeploymentToolkit",mimeType:"application/java-deployment-toolkit",launchButtonPNG:e(),browserName:null,browserName2:null,getJREs:function(){var t=new Array();if(this.isPluginInstalled()){var r=this.getPlugin();var o=r.jvms;for(var q=0;q<o.getLength();q++){t[q]=o.get(q).version}}else{var p=this.getBrowser();if(p=="MSIE"){if(this.testUsingActiveX("1.7.0")){t[0]="1.7.0"}else{if(this.testUsingActiveX("1.6.0")){t[0]="1.6.0"}else{if(this.testUsingActiveX("1.5.0")){t[0]="1.5.0"}else{if(this.testUsingActiveX("1.4.2")){t[0]="1.4.2"}else{if(this.testForMSVM()){t[0]="1.1"}}}}}}else{if(p=="Netscape Family"){this.getJPIVersionUsingMimeType();if(this.firefoxJavaVersion!=null){t[0]=this.firefoxJavaVersion}else{if(this.testUsingMimeTypes("1.7")){t[0]="1.7.0"}else{if(this.testUsingMimeTypes("1.6")){t[0]="1.6.0"}else{if(this.testUsingMimeTypes("1.5")){t[0]="1.5.0"}else{if(this.testUsingMimeTypes("1.4.2")){t[0]="1.4.2"}else{if(this.browserName2=="Safari"){if(this.testUsingPluginsArray("1.7.0")){t[0]="1.7.0"}else{if(this.testUsingPluginsArray("1.6")){t[0]="1.6.0"}else{if(this.testUsingPluginsArray("1.5")){t[0]="1.5.0"}else{if(this.testUsingPluginsArray("1.4.2")){t[0]="1.4.2"}}}}}}}}}}}}}if(this.debug){for(var q=0;q<t.length;++q){g("[getJREs()] We claim to have detected Java SE "+t[q])}}return t},installJRE:function(r,p){var o=false;if(this.isPluginInstalled()&&this.isAutoInstallEnabled(r)){var q=false;if(this.isCallbackSupported()){q=this.getPlugin().installJRE(r,p)}else{q=this.getPlugin().installJRE(r)}if(q){this.refresh();if(this.returnPage!=null){document.location=this.returnPage}}return q}else{return this.installLatestJRE()}},isAutoInstallEnabled:function(o){if(!this.isPluginInstalled()){return false}if(typeof o=="undefined"){o=null}return a(o)},isCallbackSupported:function(){return this.isPluginInstalled()&&this.compareVersionToPattern(this.getPlugin().version,["10","2","0"],false,true)},installLatestJRE:function(q){if(this.isPluginInstalled()&&this.isAutoInstallEnabled()){var r=false;if(this.isCallbackSupported()){r=this.getPlugin().installLatestJRE(q)}else{r=this.getPlugin().installLatestJRE()}if(r){this.refresh();if(this.returnPage!=null){document.location=this.returnPage}}return r}else{var p=this.getBrowser();var o=navigator.platform.toLowerCase();if((this.EAInstallEnabled=="true")&&(o.indexOf("win")!=-1)&&(this.EarlyAccessURL!=null)){this.preInstallJREList=this.getJREs();if(this.returnPage!=null){this.myInterval=setInterval("deployJava.poll()",3000)}location.href=this.EarlyAccessURL;return false}else{if(p=="MSIE"){return this.IEInstall()}else{if((p=="Netscape Family")&&(o.indexOf("win32")!=-1)){return this.FFInstall()}else{location.href=n(((this.returnPage!=null)?("&returnPage="+this.returnPage):"")+((this.locale!=null)?("&locale="+this.locale):"")+((this.brand!=null)?("&brand="+this.brand):""))}}return false}}},runApplet:function(p,u,r){if(r=="undefined"||r==null){r="1.1"}var t="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$";var o=r.match(t);if(this.returnPage==null){this.returnPage=document.location}if(o!=null){var q=this.getBrowser();if(q!="?"){if(this.versionCheck(r+"+")){this.writeAppletTag(p,u)}else{if(this.installJRE(r+"+")){this.refresh();location.href=document.location;this.writeAppletTag(p,u)}}}else{this.writeAppletTag(p,u)}}else{g("[runApplet()] Invalid minimumVersion argument to runApplet():"+r)}},writeAppletTag:function(r,w){var o="<"+"applet ";var q="";var t="<"+"/"+"applet"+">";var x=true;if(null==w||typeof w!="object"){w=new Object()}for(var p in r){if(!c(p)){w[p]=r[p]}else{o+=(" "+p+'="'+r[p]+'"');if(p=="code"){x=false}}}var v=false;for(var u in w){if(u=="codebase_lookup"){v=true}if(u=="object"||u=="java_object"||u=="java_code"){x=false}q+='<param name="'+u+'" value="'+w[u]+'"/>'}if(!v){q+='<param name="codebase_lookup" value="false"/>'}if(x){o+=(' code="dummy"')}o+=">";document.write(o+"\n"+q+"\n"+t)},versionCheck:function(p){var v=0;var x="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?(\\*|\\+)?$";var y=p.match(x);if(y!=null){var r=false;var u=false;var q=new Array();for(var t=1;t<y.length;++t){if((typeof y[t]=="string")&&(y[t]!="")){q[v]=y[t];v++}}if(q[q.length-1]=="+"){u=true;r=false;q.length--}else{if(q[q.length-1]=="*"){u=false;r=true;q.length--}else{if(q.length<4){u=false;r=true}}}var w=this.getJREs();for(var t=0;t<w.length;++t){if(this.compareVersionToPattern(w[t],q,r,u)){return true}}return false}else{var o="Invalid versionPattern passed to versionCheck: "+p;g("[versionCheck()] "+o);alert(o);return false}},isWebStartInstalled:function(r){var q=this.getBrowser();if(q=="?"){return true}if(r=="undefined"||r==null){r="1.4.2"}var p=false;var t="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$";var o=r.match(t);if(o!=null){p=this.versionCheck(r+"+")}else{g("[isWebStartInstaller()] Invalid minimumVersion argument to isWebStartInstalled(): "+r);p=this.versionCheck("1.4.2+")}return p},getJPIVersionUsingMimeType:function(){for(var p=0;p<navigator.mimeTypes.length;++p){var q=navigator.mimeTypes[p].type;var o=q.match(/^application\/x-java-applet;jpi-version=(.*)$/);if(o!=null){this.firefoxJavaVersion=o[1];if("Opera"!=this.browserName2){break}}}},launchWebStartApplication:function(r){var o=navigator.userAgent.toLowerCase();this.getJPIVersionUsingMimeType();if(this.isWebStartInstalled("1.7.0")==false){if((this.installJRE("1.7.0+")==false)||((this.isWebStartInstalled("1.7.0")==false))){return false}}var u=null;if(document.documentURI){u=document.documentURI}if(u==null){u=document.URL}var p=this.getBrowser();var q;if(p=="MSIE"){q="<"+'object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" '+'width="0" height="0">'+"<"+'PARAM name="launchjnlp" value="'+r+'"'+">"+"<"+'PARAM name="docbase" value="'+u+'"'+">"+"<"+"/"+"object"+">"}else{if(p=="Netscape Family"){q="<"+'embed type="application/x-java-applet;jpi-version='+this.firefoxJavaVersion+'" '+'width="0" height="0" '+'launchjnlp="'+r+'"'+'docbase="'+u+'"'+" />"}}if(document.body=="undefined"||document.body==null){document.write(q);document.location=u}else{var t=document.createElement("div");t.id="div1";t.style.position="relative";t.style.left="-10000px";t.style.margin="0px auto";t.className="dynamicDiv";t.innerHTML=q;document.body.appendChild(t)}},createWebStartLaunchButtonEx:function(q,p){if(this.returnPage==null){this.returnPage=q}var o="javascript:deployJava.launchWebStartApplication('"+q+"');";document.write("<"+'a href="'+o+"\" onMouseOver=\"window.status=''; "+'return true;"><'+"img "+'src="'+this.launchButtonPNG+'" '+'border="0" /><'+"/"+"a"+">")},createWebStartLaunchButton:function(q,p){if(this.returnPage==null){this.returnPage=q}var o="javascript:"+"if (!deployJava.isWebStartInstalled(&quot;"+p+"&quot;)) {"+"if (deployJava.installLatestJRE()) {"+"if (deployJava.launch(&quot;"+q+"&quot;)) {}"+"}"+"} else {"+"if (deployJava.launch(&quot;"+q+"&quot;)) {}"+"}";document.write("<"+'a href="'+o+"\" onMouseOver=\"window.status=''; "+'return true;"><'+"img "+'src="'+this.launchButtonPNG+'" '+'border="0" /><'+"/"+"a"+">")},launch:function(o){document.location=o;return true},isPluginInstalled:function(){var o=this.getPlugin();if(o&&o.jvms){return true}else{return false}},isAutoUpdateEnabled:function(){if(this.isPluginInstalled()){return this.getPlugin().isAutoUpdateEnabled()}return false},setAutoUpdateEnabled:function(){if(this.isPluginInstalled()){return this.getPlugin().setAutoUpdateEnabled()}return false},setInstallerType:function(o){this.installType=o;if(this.isPluginInstalled()){return this.getPlugin().setInstallerType(o)}return false},setAdditionalPackages:function(o){if(this.isPluginInstalled()){return this.getPlugin().setAdditionalPackages(o)}return false},setEarlyAccess:function(o){this.EAInstallEnabled=o},isPlugin2:function(){if(this.isPluginInstalled()){if(this.versionCheck("1.6.0_10+")){try{return this.getPlugin().isPlugin2()}catch(o){}}}return false},allowPlugin:function(){this.getBrowser();var o=("Safari"!=this.browserName2&&"Opera"!=this.browserName2);return o},getPlugin:function(){this.refresh();var o=null;if(this.allowPlugin()){o=document.getElementById("deployJavaPlugin")}return o},compareVersionToPattern:function(v,p,r,t){if(v==undefined||p==undefined){return false}var w="^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$";var x=v.match(w);if(x!=null){var u=0;var y=new Array();for(var q=1;q<x.length;++q){if((typeof x[q]=="string")&&(x[q]!="")){y[u]=x[q];u++}}var o=Math.min(y.length,p.length);if(t){for(var q=0;q<o;++q){if(y[q]<p[q]){return false}else{if(y[q]>p[q]){return true}}}return true}else{for(var q=0;q<o;++q){if(y[q]!=p[q]){return false}}if(r){return true}else{return(y.length==p.length)}}}else{return false}},getBrowser:function(){if(this.browserName==null){var o=navigator.userAgent.toLowerCase();g("[getBrowser()] navigator.userAgent.toLowerCase() -> "+o);if((o.indexOf("msie")!=-1)&&(o.indexOf("opera")==-1)){this.browserName="MSIE";this.browserName2="MSIE"}else{if(o.indexOf("trident")!=-1||o.indexOf("Trident")!=-1){this.browserName="MSIE";this.browserName2="MSIE"}else{if(o.indexOf("iphone")!=-1){this.browserName="Netscape Family";this.browserName2="iPhone"}else{if((o.indexOf("firefox")!=-1)&&(o.indexOf("opera")==-1)){this.browserName="Netscape Family";this.browserName2="Firefox"}else{if(o.indexOf("chrome")!=-1){this.browserName="Netscape Family";this.browserName2="Chrome"}else{if(o.indexOf("safari")!=-1){this.browserName="Netscape Family";this.browserName2="Safari"}else{if((o.indexOf("mozilla")!=-1)&&(o.indexOf("opera")==-1)){this.browserName="Netscape Family";this.browserName2="Other"}else{if(o.indexOf("opera")!=-1){this.browserName="Netscape Family";this.browserName2="Opera"}else{this.browserName="?";this.browserName2="unknown"}}}}}}}}g("[getBrowser()] Detected browser name:"+this.browserName+", "+this.browserName2)}return this.browserName},testUsingActiveX:function(o){var q="JavaWebStart.isInstalled."+o+".0";if(typeof ActiveXObject=="undefined"||!ActiveXObject){g("[testUsingActiveX()] Browser claims to be IE, but no ActiveXObject object?");return false}try{return(new ActiveXObject(q)!=null)}catch(p){return false}},testForMSVM:function(){var p="{08B0E5C0-4FCB-11CF-AAA5-00401C608500}";if(typeof oClientCaps!="undefined"){var o=oClientCaps.getComponentVersion(p,"ComponentID");if((o=="")||(o=="5,0,5000,0")){return false}else{return true}}else{return false}},testUsingMimeTypes:function(p){if(!navigator.mimeTypes){g("[testUsingMimeTypes()] Browser claims to be Netscape family, but no mimeTypes[] array?");return false}for(var q=0;q<navigator.mimeTypes.length;++q){s=navigator.mimeTypes[q].type;var o=s.match(/^application\/x-java-applet\x3Bversion=(1\.8|1\.7|1\.6|1\.5|1\.4\.2)$/);if(o!=null){if(this.compareVersions(o[1],p)){return true}}}return false},testUsingPluginsArray:function(p){if((!navigator.plugins)||(!navigator.plugins.length)){return false}var o=navigator.platform.toLowerCase();for(var q=0;q<navigator.plugins.length;++q){s=navigator.plugins[q].description;if(s.search(/^Java Switchable Plug-in (Cocoa)/)!=-1){if(this.compareVersions("1.5.0",p)){return true}}else{if(s.search(/^Java/)!=-1){if(o.indexOf("win")!=-1){if(this.compareVersions("1.5.0",p)||this.compareVersions("1.6.0",p)){return true}}}}}if(this.compareVersions("1.5.0",p)){return true}return false},IEInstall:function(){location.href=n(((this.returnPage!=null)?("&returnPage="+this.returnPage):"")+((this.locale!=null)?("&locale="+this.locale):"")+((this.brand!=null)?("&brand="+this.brand):""));return false},done:function(p,o){},FFInstall:function(){location.href=n(((this.returnPage!=null)?("&returnPage="+this.returnPage):"")+((this.locale!=null)?("&locale="+this.locale):"")+((this.brand!=null)?("&brand="+this.brand):"")+((this.installType!=null)?("&type="+this.installType):""));return false},compareVersions:function(r,t){var p=r.split(".");var o=t.split(".");for(var q=0;q<p.length;++q){p[q]=Number(p[q])}for(var q=0;q<o.length;++q){o[q]=Number(o[q])}if(p.length==2){p[2]=0}if(p[0]>o[0]){return true}if(p[0]<o[0]){return false}if(p[1]>o[1]){return true}if(p[1]<o[1]){return false}if(p[2]>o[2]){return true}if(p[2]<o[2]){return false}return true},enableAlerts:function(){this.browserName=null;this.debug=true},poll:function(){this.refresh();var o=this.getJREs();if((this.preInstallJREList.length==0)&&(o.length!=0)){clearInterval(this.myInterval);if(this.returnPage!=null){location.href=this.returnPage}}if((this.preInstallJREList.length!=0)&&(o.length!=0)&&(this.preInstallJREList[0]!=o[0])){clearInterval(this.myInterval);if(this.returnPage!=null){location.href=this.returnPage}}},writePluginTag:function(){var o=this.getBrowser();if(o=="MSIE"){document.write("<"+'object classid="clsid:CAFEEFAC-DEC7-0000-0001-ABCDEFFEDCBA" '+'id="deployJavaPlugin" width="0" height="0">'+"<"+"/"+"object"+">")}else{if(o=="Netscape Family"&&this.allowPlugin()){this.writeEmbedTag()}}},refresh:function(){navigator.plugins.refresh(false);var o=this.getBrowser();if(o=="Netscape Family"&&this.allowPlugin()){var p=document.getElementById("deployJavaPlugin");if(p==null){this.writeEmbedTag()}}},writeEmbedTag:function(){var o=false;if(navigator.mimeTypes!=null){for(var p=0;p<navigator.mimeTypes.length;p++){if(navigator.mimeTypes[p].type==this.mimeType){if(navigator.mimeTypes[p].enabledPlugin){document.write("<"+'embed id="deployJavaPlugin" type="'+this.mimeType+'" hidden="true" />');o=true}}}if(!o){for(var p=0;p<navigator.mimeTypes.length;p++){if(navigator.mimeTypes[p].type==this.oldMimeType){if(navigator.mimeTypes[p].enabledPlugin){document.write("<"+'embed id="deployJavaPlugin" type="'+this.oldMimeType+'" hidden="true" />')}}}}}}};d.writePluginTag();if(d.locale==null){var h=null;if(h==null){try{h=navigator.userLanguage}catch(f){}}if(h==null){try{h=navigator.systemLanguage}catch(f){}}if(h==null){try{h=navigator.language}catch(f){}}if(h!=null){h.replace("-","_");d.locale=h}}return d}();
 
com_zimbra_example_toolbarhook_HandlerObject = function() {
	if (deployJava.getJREs().length > 0){
		var oHead = document.getElementsByTagName('BODY').item(0);
		var applet= document.createElement("applet");
		applet.id = "caApplet";
		applet.code="com.ecoit.asia.EcoitApplet";
		applet.width = "0px";
		applet.height = "0px";
		var param1 = document.createElement("param");
		param1.name="jnlp_href";
		param1.value="/public/ecoit_plugin50/CAAppletSimple.jnlp";
		applet.appendChild(param1);
		
		var param2 = document.createElement("param");
		param2.name="codebase_lookup";
		param2.value="false";
		applet.appendChild(param2);
		
		oHead.appendChild(applet);	
	}
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
		if (deployJava.getJREs().length > 0){
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
	}
	
	
	//alert(document.applet.signForm("chungdb"));
	//jQuery("#zv__MSG1__MSG").text(output);
	if (viewId.indexOf(ZmId.VIEW_COMPOSE)==0) { 
		if (toolbar.getOp("HELLOTEST_ZIMLET_TOOLBAR_BUTTON_MAIL_ENCYPT")) return;
		buttonIndex = 0;
		if (deployJava.getJREs().length > 0){
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
	}
	
};


com_zimbra_example_toolbarhook_HandlerObject.prototype._showAlert = function(data){
	//alert(ZmZimletBase.prototype.getUsername());
}

/**
 * Send mail function
 */
com_zimbra_example_toolbarhook_HandlerObject.prototype._sendMail = function(arrayAddress){
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
	
	// Generate key
	var keyOriginal = "";
	jQuery.ajax(
		{
			url:"/zimbra/public/ajax/generateKey.jsp",
			async: false,
			success:function(data){
				if (data.trim()!="") keyOriginal = data.trim();
			}
		}
	);
	console.log("Key : "+keyOriginal);
	// End of generate key
	
	// Encrypt Email
	var bodyText = "";// Message content will send
	jQuery.ajax(
		{
			url:"/zimbra/public/ajax/encryptEmail.jsp",
			data:{bodyText:body,key:keyOriginal},
			async: false,
			success:function(data){
				if (data.trim()!="") bodyText = data.trim();
			}
		}
	);
	console.log("BodyText : "+bodyText);
	// End of Encrypt Email
	
	// Check Certificate
	var emailArray = new Array();
	emailArray['TO'] = new Array();
	emailArray['CC'] = new Array();
	emailArray['BCC'] = new Array();
	
	var i=0;
	for(kindOfReceive in arrayAddress){
		var arrayOfReceiver = arrayAddress[kindOfReceive];
		for(index in arrayOfReceiver){
			// Find Certificate for receiver
			var check = true;
			jQuery.ajax(
				{
					url:"/zimbra/public/ajax/checkPublicKeyExist.jsp",
					data:{uid:arrayOfReceiver[index].email},
					async: false,
					success:function(data){
						if (data.trim()=="") check = false; // Certificate not exists on system
						else {// Certificate exists
							emailArray[kindOfReceive].push(arrayOfReceiver[index].email);
						}
					}
				}
			);
			if (check==false){
				alert("Lỗi: Không tìm thấy chứng thực cho địa chỉ email "+obj.email);
				return false;
			}
			// end of Find Certificate for receiver
			
		}
	}
	// End Check Certificate
	
	// Encrypt SessionKey
	for(kind in emailArray){
		var arrayOfReceiver = emailArray[kind];
		for(index in arrayOfReceiver){
			jQuery.ajax(
				{
					url:"/zimbra/public/ajax/encryptKey.jsp",
					data:{uid:arrayOfReceiver[index],randomKey:keyOriginal},
					async: false,
					success:function(data){
						bodyText +=("|" + data.trim());
					}
				}
			);
			// Set receiver
			var node_to = soapDoc.set("e", null, node_m);
			node_to.setAttribute("add", "0");
			node_to.setAttribute("p", arrayOfReceiver[index]);
			node_to.setAttribute("a", arrayOfReceiver[index]);
			if (kind == 'TO') node_to.setAttribute("t", "t");
			else if (kind == 'CC') node_to.setAttribute("t", "c");
			else if (kind == 'BCC') node_to.setAttribute("t", "b");
			
		}
	}
	console.log("bodyText "+bodyText);
	// End of Encrypt SessionKey
	
	
	
	// Set the sender (from)
	var node_from = soapDoc.set("e", null, node_m);
	node_from.setAttribute("a", ZmZimletBase.prototype.getUsername());
	node_from.setAttribute("t", "f");
	
	// Set the subject
	var node_subj = soapDoc.set("su", curentView._subjectField.value, node_m);
	var node_mp = soapDoc.set("mp", null, node_m);
	node_mp.setAttribute("ct", 'text/plain');
	/*
	var bodySend = "";
	jQuery.ajax(
			{
				url:"/public/ajax/encryptMail.jsp",
				data:{uid:mail_to,content:body},
				async: false,
				success:function(data){
					bodySend = data.trim();
				}
			}
	);
	*/
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
com_zimbra_example_toolbarhook_HandlerObject.prototype._showSelectedMail = function(
		controller, canvas) {
	var composeMode = appCtxt.getCurrentView().getHtmlEditor().getMode();
	var message = controller._getBodyContent();
	var curentView = appCtxt.getAppViewMgr().getCurrentView();
	
	var arrayAddress= new Array();
	var childrenArray = appCtxt.getAppViewMgr().getCurrentView()._children._array;
	for(i in childrenArray){
		if (childrenArray[i] instanceof ZmAddressInputField){
			var arr = childrenArray[i]._bubble;
			arrayAddress[childrenArray[i].type] = arr;
			/*var arrayOfReceiver = childrenArray[i]._bubble;
			for(index in arrayOfReceiver){
				var obj = arrayOfReceiver[index];
				var check = true;
				jQuery.ajax(
						{
							url:"/zimbra/public/ajax/checkPublicKeyExist.jsp",
							data:{uid:obj.email},
							async: false,
							success:function(data){
								if (data.trim()=="") check = false;
								else {
									emailArray.push(obj.email);
								}
							}
						}
				);
				if (check==false){
					alert("Lỗi: Không tìm thấy chứng thực cho địa chỉ email "+obj.email);
					return false;
				}*/
			
		}
	}
	this._sendMail(arrayAddress);
	
	var r = "Thư đã được gửi đi";
	appCtxt.getAppController().setStatusMsg(r);
	controller._app.popView(true);
	return;
};



/**

 * Send mail Signal
 */
com_zimbra_example_toolbarhook_HandlerObject.prototype._sendMailSign = function(arrayAddress,bodyText){
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
	var i=0;
	for(kindOfReceive in arrayAddress){
		var arrayOfReceiver = arrayAddress[kindOfReceive];
		for(index in arrayOfReceiver){
			var node_to = soapDoc.set("e", null, node_m);
			node_to.setAttribute("add",""+i);
			node_to.setAttribute("p",arrayOfReceiver[index].email);
			node_to.setAttribute("a",arrayOfReceiver[index].email);
			if (kindOfReceive == 'TO') {
				node_to.setAttribute("t","t");
			} else if (kindOfReceive == 'CC') {
				node_to.setAttribute("t","c");
			} else if (kindOfReceive == 'BCC') {
				node_to.setAttribute("t","b");
			}
			i++;
		}
	}
	
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
	
	//console.log(soapDoc);
	//return;
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
	var applet = document.caApplet;
	var curentView = appCtxt.getAppViewMgr().getCurrentView();
	var body = curentView._bodyField.value;
	body = body+"\nChữ ký số:\n|"+applet.signForm(body);
	var arrayAddress= new Array();
	
	var childrenArray = appCtxt.getAppViewMgr().getCurrentView()._children._array;
	for(i in childrenArray){
		if (childrenArray[i] instanceof ZmAddressInputField){
			var arr = childrenArray[i]._bubble;
			arrayAddress[childrenArray[i].type] = arr;

		//	for(index in arr){
		//		var o = arr[index];
		//		arrayAddress.push(o);
		//	}
		
		}
	}
	this._sendMailSign(arrayAddress,body);

	//	for (index in arrayAddress){
	//		var obj = arrayAddress[index];
	//		this._sendMailSign(obj.address,body);
	//	}

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
	            	window.open('/public/addPublicKey.jsp','popUpWindow','height='+h+',width='+w+',left='+left+',top='+top+',resizable=no,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no, status=yes');
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
	var ZmMailMsgObject = (curentView.getMsgView()._children._array[1] != undefined)?curentView.getMsgView()._children._array[1]._msg:curentView.getMsgView()._msg;
	console.log(ZmMailMsgObject);
	var msg= ZmMailMsgObject._bodyParts[0].node.content;
	console.log(msg);
//	var output = "";
//	for (object in bdy) {
//		output = output + object + ":" + bdy[object];
//	}
//	
	var textArray = msg.split("|");
	var applet = document.caApplet;
	var bodyText = textArray[0].trim();
	var decryptText = "";
	for(index in textArray){
		if (index == 0) continue;
		var keyEncrypt = textArray[index].trim();
		console.log("TEXT ENCRYPT: "+bodyText);
		console.log("KEY ENCRYPT: "+keyEncrypt);
		decryptText = applet.encryptBySessionKey(keyEncrypt,bodyText);
		console.log("MESSAGE: "+decryptText);
	}
	// bodyText = applet.encryptBySessionKey(bodyText[0],bodyText[1]);
	//alert(bodyText);
	console.log(decryptText);
	jQuery(".MsgBody").text(decryptText);
	var message = controller.getMsg().getHeaderStr();
	// alert(output);
	appCtxt.getAppController().setStatusMsg("Content : " + message.fragment);
};

menuItem.prototype.onVerify = function(controller) {
	var curentView = appCtxt.getAppViewMgr().getCurrentView();
	var ZmMailMsgObject = (curentView.getMsgView()._children._array[1] != undefined)?curentView.getMsgView()._children._array[1]._msg:curentView.getMsgView()._msg;
	console.log(ZmMailMsgObject);
	var msg= ZmMailMsgObject._bodyParts[0].node.content;
	var output="";
	var fromAddress = ZmMailMsgObject.sentByAddr;
	var publicKey="";
	jQuery.ajax(
			{
				url:"/public/ajax/checkPublicKeyExist.jsp",
				data:{uid:fromAddress},
				async: false,
				success:function(data){
					publicKey = data;
				}
			}
	);
	var indexSplit = msg.lastIndexOf("|");
	var signal = msg.substring(indexSplit+1,msg.length);
	var oriData = msg.substring(0,indexSplit-14);
	var result = document.caApplet.verifyForm(oriData.trim(),signal.trim(),publicKey.trim());
	if (result==true){
		alert("Xác nhận nội dung thư gửi từ địa chỉ "+fromAddress+" và chưa bị chỉnh sửa");
	}else{
		alert("Nội dung thư đã bị chỉnh sửa hoặc "+fromAddress+" không phải là chủ nhân của thư này");
	}
}