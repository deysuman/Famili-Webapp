let notice = 0;


export function notifyBrowser(title,desc,avatar,id)
{
    notice = notice + 1;

    //flashTitle(title+' '+ desc, 100);

    var l = document.createElement("div");
    l.id="toast_"+id;
    l.className="tostar";
    l.innerHTML = '<div class="tostar-time">justnow</div><div class="tostar-close" onClick="removetoast('+id+')"><i class="icon icon-multiply"></i></div><div class="tostar-image"><img src="'+avatar+'" /></div><div class="tostar-headline"><p><b>'+title+'</b> '+desc+'</p></div><div class="tostar-text"><div class="toster-box"><i class="icon icon-favorite-heart-button"></i><p>Love your post</p></div></div>';


    if(document.getElementsByClassName("tostar-con")[0]!=null){

        document.getElementsByClassName("tostar-con")[0].appendChild(l);

    }

    else {

        $('body').append('<div class="tostar-con"></div>');
        document.getElementsByClassName("tostar-con")[0].appendChild(l);


    }

    setTimeout(function(){document.getElementById("toast_"+id).remove();},5000);



    let visibilityChange,hidden, state;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
        state = "visibilityState";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
        state = "mozVisibilityState";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
        state = "msVisibilityState";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
        state = "webkitVisibilityState";
    }

    document.addEventListener(visibilityChange, function() {
        //document.title = document[state];
    }, false);


    //document.title = document[state];
    if(document[state]==="hidden"){

        if(Notification.permission !== "denied") {
            Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
                var n = new Notification(title, {
                    body: desc,
                    icon: avatar // optional
                });

                n.onclick = function () {
                    return false;
                };

                n.onclose = function () {

                };

            });
        }

    }else{
        //show
    }







/*
    if (Notification.permission !== "granted")
    {
        Notification.requestPermission();
    }
    else
    {
        var notification = new Notification(title, {
            icon:avatar,
            body: desc,
        });

        /!* Remove the notification from Notification Center when clicked.*!/
        notification.onclick = function () {
            return false;
        };

        /!* Callback function when the notification is closed. *!/
        notification.onclose = function () {
//console.log('Notification closed');
        };

    }

    */

}


export function removetoast(ids){
    document.getElementById("toast_"+ids).remove();
}



/*
export function flashTitle(newMsg, howManyTimes) {
    function step() {

        if(notice!=0){
            var conti = c("notification-icon-alert")[0];

            conti.style.display = "block";

            var count = conti.getElementsByTagName("p");

            if(count.length > 0){
                count[0].innerHTML = (notice != 0) ? (notice > 99) ? '+99' : notice : '';
            }
            else{
                var p = document.createElement("p");
                p = (notice != 0) ? (notice > 99) ? '+99' : notice : '';
                conti.appendChild(p);
            }
        }
        document.title = (document.title == original) ? newMsg : (notice!=0) ? '('+notice+') ' : '' + original;

        if (--howManyTimes > 0) {
            timeout = setTimeout(step, 1000);
        };
    };

    howManyTimes = parseInt(howManyTimes);

    if (isNaN(howManyTimes)) {
        howManyTimes = 5;
    };

    cancelFlashTitle(timeout);
    step();
};*/
