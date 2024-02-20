/*
	Copyright MIT ยฉ <2013> <Nathawut Niemsuwan @ Kidkarnmai Studio co.,ltd.>

	kidkarnmaiFb.init('478847426277404','v3.3',callback);
	kidkarnmaiFb.loadUserData(id,callback);
	kidkarnmaiFb.getStatus(callback);
	kidkarnmaiFb.fbLogin(callback);

*/

var kidkarnmaiFb = new function() {

	"use strict";

	 this.connect = false;
	 this.fbuser = {};

	 this.init = function(appid,version,callback){
	 	callback = callback || null;
		if (document.location.hostname == "localhost" || document.location.hostname == "127.0.0.1"){
			kidkarnmaiFb.connect = true;
			kidkarnmaiFb.fbuser = {
				'email': "test@kidkarnmai.com",
				'first_name': "FTest",
				'id': "1291184247717869",
				'last_name': "LTest",
				'name': "FTest LTest",
				'name_format': "{first} {last}",
				'picture':{
						'data':{
							'height': 597,
							'is_silhouette': 'false',
							'url': "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1291184247717869&height=800&width=800&ext=1564136052&hash=AeQtHuHltLjdCakE",
							'width': 597
						}
					},
				'short_name': "Nathawut"
			};
			if(callback!=null){
				kidkarnmaiFb.fbuser['status'] = 'connected';
				callback(kidkarnmaiFb.fbuser);
			}
		}
		else{
			window.fbAsyncInit = function() {
 			 FB.init({
 				 appId      : appid,
 				 cookie     : true,
 				 xfbml      : true,
 				 version    : version
 			 });
 			 FB.AppEvents.logPageView();
 			 kidkarnmaiFb.getStatus(callback);
 		 };
 		 (function(d, s, id){
 				var js, fjs = d.getElementsByTagName(s)[0];
 				if (d.getElementById(id)) {return;}
 				js = d.createElement(s); js.id = id;
 				js.src = "https://connect.facebook.net/en_US/sdk.js";
 				fjs.parentNode.insertBefore(js, fjs);
 			}(document, 'script', 'facebook-jssdk'));
		}
	}

	this.loadUserData = function(id,callback)
	{
		"use strict";
		callback = callback || null;
		id = id || "me";

		FB.api(("/" + id),handleInfo,{fields:"id,name,first_name,last_name,middle_name,name_format,short_name,email,picture.width(800).height(800)"});

		function handleInfo(response){
			console.log('loadUserData')
			console.log(response)
			kidkarnmaiFb.connect = true;
			kidkarnmaiFb.fbuser = response;
			if(response.error){
				kidkarnmaiFb.fbuser['status'] = 'error';
			}else{
				kidkarnmaiFb.fbuser['status'] = 'connected';
			}
			if(callback!=null){
				callback(kidkarnmaiFb.fbuser);
			}
		}
	}

	this.getStatus = function(callback){
		callback = callback || null;
		FB.getLoginStatus(function(response) {
			kidkarnmaiFb.statusCallback(response,callback);
		});
	}

	this.statusCallback = function(response,callback){
		callback = callback || null;
			console.log('statusCallback')
			console.log(response)
		if (response['status'] === 'connected') {
			 kidkarnmaiFb.loadUserData(response['authResponse']['userID'],callback)
		} else if (response['status']=== 'not_authorized') {
			if(callback!=null){
				callback(response)
			}
		} else {
			 if(callback!=null){
				callback(response)
			}
		}
	}

	this.fbLogin = function(callback){
		if(isLineApp()){
			swal({
					backdrop: 'rgba(0,0,0,0.9)',
					customClass: 'pop-jack',
					html:
					'<div class="block-pop-jack">' +
					'<p >เธเธญเธญเธ เธฑเธขเธ”เนเธงเธขเธเนเธฐ เธเธดเธเธเธฃเธฃเธกเนเธกเนเธชเธฒเธกเธฒเธฃเธ–เน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธ Facebook เนเธ”เนเธเธเนเธญเธเธเธฅเธดเน€เธเธเธฑเนเธ Line เธเธฃเธธเธ“เธฒเน€เธเธดเธ”เธเธเน€เธงเนเธเน€เธเธฃเธฒเธงเนเน€เธเธญเธฃเนเน€เธ—เนเธฒเธเธฑเนเธเธเนเธฐ</b></p>' +
					'</div>',
					showConfirmButton: false,
					showCancelButton: false,
			})
		}else{
			callback = callback || null;
			FB.login(function(response){
				kidkarnmaiFb.statusCallback(response,callback);
			},
			  {
				scope: 'public_profile,email',
				auth_type: 'rerequest'
			  });
		}

	}

	this.share = function(obj,callback){
		callback = callback || null;
		var objSend = {
			'og:url': obj['link'],
			'og:title': obj['title'],
			'og:description': obj['description'],
			'og:image': obj['image'],
			'og:hashtag': obj['hashtag'],
			'og:scrape':'true'
		}

		obj['description'] = obj['description'].replace("#", "%23");


		if(isFacebookApp()){
			FB.ui({
				method: 'share_open_graph',
				action_type: 'og.shares',
				hashtag: obj['hashtag'],
				action_properties: JSON.stringify({
					object : objSend
				})
			},
		  function(response) {
		    if (response) {
					callback(response)
		    }
		  });
		}else{
			console.log(obj['link']+'custom.php?t='+obj['title']+'&i='+obj['image']+'&d='+obj['description'])
			FB.ui({
				method: 'share',
				display:'popup',
				hashtag: obj['hashtag'],
				href: obj['link']+'custom.php?t='+obj['title']+'&i='+obj['image']+'&d='+obj['description']
			},
		  function(response) {
		    if (response) {
					callback(response)
		    }
		  });
		}


	}


	function isLineApp() {
		var ua = navigator.userAgent || navigator.vendor || window.opera;
		return (ua.indexOf("Line") > -1);
	}

	function isFacebookApp() {
		var ua = navigator.userAgent || navigator.vendor || window.opera;
		return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
	}
}