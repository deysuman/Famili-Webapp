import {URLS} from "../constants/api";


function ajaxObj(meth, url) {
    var x = new XMLHttpRequest();
    x.withCredentials = false;
    x.open(meth, URLS.MAINURL + url, true);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    return x;
}

function ajaxReturn(x) {
    if (x.readyState == 4 && x.status == 200) {
        return true;
    }
}

export function Ajax(url, data, reactThis, success)
{
	$.ajax({
	type:"POST",
	url:URLS.MAINURL + url,
	data :data,
	dataType:"json",
	cache:false,
	timeout:50000,
	beforeSend :function(data) { }.bind(this),
	success:function(data){
	success.call(this, data);}.bind(this),
	error:function(data){
	}.bind(this)
	});
}


export function ajaxObj(Ge,Qe){var Ke=new XMLHttpRequest;return Ke.open(Ge,URLS.MAINURL+Qe,!0),Ke.setRequestHeader('Content-type','application/x-www-form-urlencoded'),Ke}
export function ajaxReturn(Ge){if(4==Ge.readyState&&200==Ge.status)return!0}

export default Ajax
