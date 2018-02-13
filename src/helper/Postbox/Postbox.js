import {c,id,isInArray,ClickgetImg} from "../../lib/Module";
import WindowEventCreator from "../../lib/WindowEventCreator"
import Require from "./Require"
import {URLS} from "../../constants/api"
import {ajaxObj,ajaxReturn} from "../../lib/ajax"
import plyr from 'plyr';
import swal from 'sweetalert';


let commentmode = Require.commentmode;
 let anoncom = Require.anoncom;
 let posttext = Require.posttext;
 let image = Require.image;
 let video = Require.video;
 let postprivacy = Require.postprivacy;
 let peopletag = Require.peopletag;
 let posttype = Require.posttype;
 let xhpc_message = Require.xhpc_message;
 let xhpc_title = Require.xhpc_title;
 let xhpc_type = Require.xhpc_type;
 let xhpc_category = Require.xhpc_category;
 let xhpc_subcategory = Require.xhpc_subcategory;
 let audience = Require.audience;
 let allimages = Require.allimages;
 let chmode = Require.chmode;
 let participatedays = Require.participatedays;
 let normalposttags = Require.normalposttags;
 let challengeposttags = Require.challengeposttags;
 let allvideos = Require.allvideos;
 let cy = Require.cy;
 let ary = Require.ary;
 let p = Require.p;
 let videono = Require.videono;
 let xhpc_end_time = Require.xhpc_end_time
 let title = Require.title;
 let mode= Require.mode;
 let lop = Require.lop;
 let no = Require.no;
 let pmode = Require.pmode;
 let perticipate = Require.perticipate;
 let postid = Require.posid;

export function Togglepostdiv() {
    for (let g = c('opentabs'), i = 0, len = g.length; i < len; i++) !function (Ge) {
        g[i].onmousedown = function () {
            for (let Qe = 0; Qe < c('form_item').length; Qe++) c('form_item')[Qe].classList.remove('block');
            c('form_item')[Ge].classList.add('block')
        }
    }(i);
}

export function Showdashboard() {

    if($("#switches").hasClass("switch switchon")){

        lop = 1;
    }

    else {
        lop = 0;
    }

    console.log("Mylop"+lop)

    1 == lop ? (change_global(), id('postbox').classList.add('f_type'), (0 != no || 0 < no ) && (1 < no && swal('Error', 'This post is talent type. You could add single image or video only. Please delete', 'error'), id('postbox').classList.contains('img_avil') || id('postbox').classList.add('img_avil'))) : (id('postbox').classList.contains('f_type') && id('postbox').classList.remove('f_type'), id('postbox').classList.contains('img_avil') && id('postbox').classList.remove('img_avil'))
}

export function ChangeCommentMode() {
    let Ge=id('custom_checkbox1');
    anoncom=!0==Ge.checked?1:0
}

export function hash(){
        let str = $("#editable-boss").text();
			$(".highlighter").css("width",$(".emojionearea-editor").css("width"));
			str = str.replace(/\n/g, '<br>');



			if(!str.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?#([a-zA-Z0-9]+)/g) && !str.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?@([a-zA-Z0-9]+)/g) && !str.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?#([\u0600-\u06FF]+)/g) && !str.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?@([\u0600-\u06FF]+)/g)) {
                if(str.match(/(^|\s)#(([a-zA-Z0-9]+))/gi)) { //arabic support
                    //let f = str.replace(/(^|\s)#(([a-zA-Z0-9]+)|([\u0600-\u06FF]+))/gi,'<span class="hashtag">#$2</span>');
					str = str.replace(/(^|\s)(#[a-zA-Z0-9]+)/gi,'$1<span class="hashtag">$2</span>');
				}else{
					//str = str.replace(/#(([a-zA-Z0-9]+)|([\u0600-\u06FF]+))#(([a-zA-Z0-9]+)|([\u0600-\u06FF]+))/gi,'<span class="hashtag">#$1</span>');
				}

			}
			$(".highlighter").html(str);
    }

export function ChangeFontSizePostBox(){180<c('emojionearea-editor')[0].textContent.length?(c('emojionearea-editor')[0].classList.add('text_to_small'),c('emojionearea-editor')[0].style.fontSize="13px",$('.highlighter,.mentions').addClass('text_to_small')):(c('emojionearea-editor')[0].classList.remove('text_to_small'),c('emojionearea-editor')[0].style.fontSize="24px",$('.highlighter,.mentions').removeClass('text_to_small'))}



export function Cancelpost() {

    formormality();
}




let scrollY = 0;
let distance = 40;
let speed = 24;

export function autoScrollTo(el) {
    let currentY = window.pageYOffset;
    return document.getElementById(el).offsetTop;

}
export function resetScroller(el){
    let currentY = window.pageYOffset;
    let targetY = document.getElementById(el).offsetTop;
    let animator = setTimeout('resetScroller(\''+el+'\')',speed);
    if(currentY > targetY){
        scrollY = currentY-distance;
        window.scroll(0, scrollY);
    } else {
        clearTimeout(animator);
    }
}



export function ToggleTalent () {
    id('switches').classList.toggle('switchon'),'switch switchon'==id('switches').className?(lop=1,Showdashboard()):(lop=0,Showdashboard(),WindowEventCreator(c('opentabs')[0],'mousedown'))
    if($("#switches").hasClass("switchon")){

        if($(".items_uploadimages").length > 0){
            $(".additems").css("display","none");
        }
    }

    else {

        if($(".items_uploadimages").length > 0){
            $(".additems").css("display","block");
        }

    }

}

export function toggletagDrawer() {
    id('tag_con').classList.toggle('none')
}

export function OpenbrowseForUploadImage() {
    ClickgetImg('image_opener');
}

export function OpenbrowseForUploadVideo() {
    ClickgetImg('video_opener');
}

function hide_addbox(){
    if(!$('#switch').hasClass('switchOn')){

        if($('#switches').hasClass("switchon"))
        {
            $(".additems").css("display","none");
        }

        else {

            $(".additems").css("display","block");

        }

    }

    else{
        $(".additems").css("display","none");
    }
}


export function ImagechangeEvent() {

 for(let Ke,Ge=id('image_opener'),Qe=0;Qe<Ge.files.length;Qe++)Ke=id('image_opener').files[Qe],Uploadimg(Ke);

    id('image_opener').value='';
    id('video_opener').value='';
}

export function VideochangeEvent() {
    for(let Ke,Ge=id('video_opener'),Qe=0;Qe<Ge.files.length;Qe++)Ke=id('video_opener').files[Qe],Uploadimg(Ke);

    id('image_opener').value='';
    id('video_opener').value='';    
}

export function tylb(Ge){Ge?1!=perticipate&&id('postbox').classList.add('img_avil'):id('postbox').classList.contains('img_avil')&&id('postbox').classList.remove('img_avil')}

function Imagequtra(Ge){Ge?1!=perticipate&&id('postbox').classList.add('img_avil'):id('postbox').classList.contains('img_avil')&&id('postbox').classList.remove('img_avil')}

export function Uploadimg(Ge) {

    if($("#postbox").hasClass("cmod")){
        mode = 1;
    }

    else{
        mode = 0;
    }



//    console.log(no);
    
    0==mode?1==lop?0==no||1>no?ghh(Ge,!0):no&&swal('Error','This post is talent type. You could add single image or video only.','error'):ghh(Ge,!1):1==mode&&(0==perticipate||1==perticipate&&c('basic_interface but_scrren_dark functionnality')[0].classList.add('none'),0==no||1>no?ghh(Ge,!0):swal('Error','This post is challenge. You could add single image or video only.','error'))

    if(!$('#switch').hasClass('switchOn')){

        if($('#switches').hasClass("switchon"))
        {
            $(".additems").css("display","none");
        }

        else {

            $(".additems").css("display","block");

        }

    }

    else{
        $(".additems").css("display","none");
    }

}

export function ghh(Ge, Qe) {

    c('upload_section')[0].style.display = 'block', c('upload_items')[0].style.display = 'block', tylb(Qe);
    let Ke = Ge.name,
        Ze = Ke.substring(Ke.lastIndexOf('.') + 1).toLowerCase();
    if ('gif' == Ze || 'png' == Ze || 'bmp' == Ze || 'jpeg' == Ze || 'jpg' == Ze) {
        let et = Ge,
            tt = new FileReader;
        tt.onloadend = function() {
            let dt = no++,
                pt = document.createElement('div');
            pt.id = 'image_open_' + dt, pt.setAttribute('class', 'items items_uploadimages'), pt.innerHTML = '<div class="protograpy_panel"><div class="photography_image_container"><div class="photography_image" id="photo_' + dt + '"><div class="photoimage-loader" id="img_load' + dt + '"><div id="myProgress"><div class="myBar" id="img_bar' + dt + '"></div></div></div><img src="' + tt.result + '" alt="photography"/><div class="danger_photo_remove" luci-data-type="0" luci-data-value="{' + dt + '}"><i class="icon icon-multiply"></i></div></div></div></div></div><div class="clearfix"></div>', 0 == c('items_uploadimages').length && c('upload_section')[0].classList.remove('none'), c('upload_items')[0].insertBefore(pt, c('upload_items')[0].childNodes[0]), id('image_opener').value = '';
            let ut = ajaxObj('POST', URLS.UPLOADIMG);
            ut.upload.addEventListener('progress', function(mt) {
                let gt = 100 * (mt.loaded / mt.total);
                id('img_bar' + dt).style.width = Math.round(gt) + '%'
            }, !1), ut.addEventListener('load', function(mt) {
                id('img_bar' + dt).style.width = '0%', id('img_load' + dt).classList.add('none');
                let gt = JSON.parse(mt.target.responseText);
                !0 == gt.responds ? (allimages.push(gt.filename), id('photo_' + dt).setAttribute('luci-file-name', gt.filename)) : (swal('Error', 'Sorry something wrong. Image upload failed', 'error'), id('image_open_' + dt).remove())
            }, !1), ut.addEventListener('error', function() {
                swal('Error', 'Sorry something wrong. Image upload failed', 'error'), id('image_open_' + dt).remove()
            }, !1), ut.addEventListener('abort', function() {
                id('miovv' + et).value = 0, id('miovv' + et).style.display = 'none', id('kity' + et).style.display = 'none'
            }, !1), ut.send('value=' + encodeURIComponent(tt.result)), 0 == dt && c('tu')[0].classList.remove('none');
            delete_img()
        }, tt.readAsDataURL(et)
    } else if ('mp4' == Ze || 'mpg' == Ze || 'avi' == Ze || 'm4v' == Ze) {

        console.log("My section 1");

        c('upload_section')[0].classList.contains('none') && c('upload_section')[0].classList.remove('none');


        if ($('#switches').hasClass("switchon")) {


            console.log("My section 3");
                            no++;
                            let et = videono++,
                                nt = document.createElement('div');
                            nt.classList.add('up_videos'), nt.id = 'vi' + et, nt.innerHTML = '<div class="videouploadsection items"><div class="photography_image" id="video_' + et + '"><div class="photoimage-loader" id="video_load' + et + '"><div id="myProgress"><div class="myBar" id="video_bar' + et + '"></div></div></div><div id="player' + et + '"></div><div id="kity' + et + '" class="progressbar"><span class="widthupdate" id="miovv' + et + '"></span><span class="ty" id="progress_video' + et + '">0%</span></div><div class="danger_photo_remove" luci-data-value="{' + et + '}" luci-data-type="1"><i class="icon icon-multiply"></i></div>', c('upload_items')[0].insertBefore(nt, c('upload_items')[0].childNodes[0]);
                            let ot = new FormData;
                            ot.append('video', Ge);
                            let it = new XMLHttpRequest;
                            it.upload.addEventListener('progress', function(dt) {
                                let ct = 100 * (dt.loaded / dt.total);
                                //id('progress_video' + et).innerHTML = Math.round(ct) + '%';
                                id('video_bar' + et).style.width = Math.round(ct) + '%'
                                $('#vi'+et).find('.ty').html(Math.round(ct) + '%')
                            }, !1), it.addEventListener('load', function(dt) {
                                id('video_bar' + et).style.width = '0%';
                                let ct = JSON.parse(dt.target.responseText);
                                if (!0 != ct.error) {
                                    id('kity' + et).style.display = 'none';
                                    let pt = document.createElement('video');
                                    pt.src = ct.filename, pt.controls = 'controls', id('player' + et).appendChild(pt), plyr.setup(), allvideos.push(ct.name), id('player' + et).setAttribute('luci-file-name', ct.name)
                                } else {
                                    $("#vi" + et).remove();
                                    no--;

                                    if (no == 0 || no < 1) {
                                        $('.upload_section').css("display", "none");
                                        $(".additems").css("display", "block");
                                    }

                                    swal('Error', 'This video is not uploaded properly please try again', 'error');


                                }
                            }, !1), it.addEventListener('abort', function() {
                                id('miovv' + et).value = 0, id('miovv' + et).style.display = 'none', id('kity' + et).style.display = 'none'
                            }, !1), it.open('POST', URLS.UPLOADVIDEO), it.send(ot)



                            delete_img();

                            hide_addbox();

                            return false;




        }

        else{



        let reader = new FileReader();
        reader.onload = function() {
            var aud = new Audio(reader.result);
            aud.onloadedmetadata = function() {
                // sp.innerHTML = aud.duration;
                // console.log(aud.duration);
                // let durmins = Math.floor(aud.duration / 60);
                let seacond = aud.duration;


                console.log("My section 2");
                // console.log(seacond)

                if (!$('#switch').hasClass('switchOn')) {

                    if ($('#switches').hasClass("switchon")) {
                        if (seacond > 300) {

                            console.log("My section 3");

                            swal('Error', 'This post is talent type. You should add 5 minute video only.', 'error');

                            if (no == 0 || no < 1) {
                                $('.upload_section').css("display", "none");
                                $(".additems").css("display", "block");
                            }

                            return false;
                        } else {

                            console.log("My section 3");
                            no++;
                            let et = videono++,
                                nt = document.createElement('div');
                            nt.classList.add('up_videos'), nt.id = 'vi' + et, nt.innerHTML = '<div class="videouploadsection items"><div class="photography_image" id="video_' + et + '"><div class="photoimage-loader" id="video_load' + et + '"><div id="myProgress"><div class="myBar" id="video_bar' + et + '"></div></div></div><div id="player' + et + '"></div><div id="kity' + et + '" class="progressbar"><span class="widthupdate" id="miovv' + et + '"></span><span class="ty" id="progress_video' + et + '">0%</span></div><div class="danger_photo_remove" luci-data-value="{' + et + '}" luci-data-type="1"><i class="icon icon-multiply"></i></div>', c('upload_items')[0].insertBefore(nt, c('upload_items')[0].childNodes[0]);
                            let ot = new FormData;
                            ot.append('video', Ge);
                            let it = new XMLHttpRequest;
                            it.addEventListener('progress', function(dt) {
                                let ct = 100 * (dt.loaded / dt.total);
                                //id('progress_video' + et).innerHTML = Math.round(ct) + '%';
                                id('video_bar' + et).style.width = Math.round(ct) + '%'
                                $('#vi'+et).find('.ty').html(Math.round(ct) + '%')
                            }, !1), it.addEventListener('load', function(dt) {
                                id('video_bar' + et).style.width = '0%';
                                let ct = JSON.parse(dt.target.responseText);
                                if (!0 != ct.error) {
                                    id('kity' + et).style.display = 'none';
                                    let pt = document.createElement('video');
                                    pt.src = ct.filename, pt.controls = 'controls', id('player' + et).appendChild(pt), plyr.setup(), allvideos.push(ct.name), id('player' + et).setAttribute('luci-file-name', ct.name)
                                } else {
                                    $("#vi" + et).remove();
                                    no--;

                                    if (no == 0 || no < 1) {
                                        $('.upload_section').css("display", "none");
                                        $(".additems").css("display", "block");
                                    }

                                    swal('Error', 'This video is not uploaded properly please try again', 'error');


                                }
                            }, !1), it.addEventListener('abort', function() {
                                id('miovv' + et).value = 0, id('miovv' + et).style.display = 'none', id('kity' + et).style.display = 'none'
                            }, !1), it.open('POST', URLS.UPLOADVIDEO), it.send(ot)



                            delete_img();

                            hide_addbox();

                            return false;
                        }
                    } else {

                        if (seacond > 30) {

                            //alert('You should add half minute video only')

                            swal('Error', 'You should add half minute video only.', 'error');

                            if (no == 0 || no < 1) {
                                $('.upload_section').css("display", "none");
                                $(".additems").css("display", "block");
                            }

                            return false;
                        } else {

                            console.log("My section 3");
                            no++;
                            let et = videono++,
                                nt = document.createElement('div');
                            nt.classList.add('up_videos'), nt.id = 'vi' + et, nt.innerHTML = '<div class="videouploadsection items"><div class="photography_image" id="video_' + et + '"><div class="photoimage-loader" id="video_load' + et + '"><div id="myProgress"><div class="myBar" id="video_bar' + et + '"></div></div></div><div id="player' + et + '"></div><div id="kity' + et + '" class="progressbar"><span class="widthupdate" id="miovv' + et + '"></span><span class="ty" id="progress_video' + et + '">0%</span></div><div class="danger_photo_remove" luci-data-value="{' + et + '}" luci-data-type="1"><i class="icon icon-multiply"></i></div>', c('upload_items')[0].insertBefore(nt, c('upload_items')[0].childNodes[0]);
                            let ot = new FormData;
                            ot.append('video', Ge);
                            let it = new XMLHttpRequest;
                            it.upload.addEventListener('progress', function(dt) {
                                let ct = 100 * (dt.loaded / dt.total);
                                //id('progress_video' + et).innerHTML = Math.round(ct) + '%';
                                id('video_bar' + et).style.width = Math.round(ct) + '%'
                                $('#vi'+et).find('.ty').html(Math.round(ct) + '%');
                            }, !1), it.addEventListener('load', function(dt) {
                                id('video_bar' + et).style.width = '0%';
                                let ct = JSON.parse(dt.target.responseText);
                                if (!0 != ct.error) {
                                    id('kity' + et).style.display = 'none';
                                    let pt = document.createElement('video');
                                    pt.src = ct.filename, pt.controls = 'controls', id('player' + et).appendChild(pt), plyr.setup(), allvideos.push(ct.name), id('player' + et).setAttribute('luci-file-name', ct.name)
                                } else {
                                    $("#vi" + et).remove();
                                    no--;

                                    if (no == 0 || no < 1) {
                                        $('.upload_section').css("display", "none");
                                        $(".additems").css("display", "block");
                                    }

                                    swal('Error', 'This video is not uploaded properly please try again', 'error');

                                }
                            }, !1), it.addEventListener('abort', function() {
                                id('miovv' + et).value = 0, id('miovv' + et).style.display = 'none', id('kity' + et).style.display = 'none'
                            }, !1), it.open('POST', URLS.UPLOADVIDEO), it.send(ot)
                            delete_img();
                            return false;
                        }

                    }

                } else {

                    if (seacond > 300) {




                        swal('Error', 'This post is challenge type. You should add 5 minute video only.', 'error');
                        if (no == 0 || no < 1) {
                            $('.upload_section').css("display", "none");
                            $(".additems").css("display", "block");
                        }
                        return false;
                    } else {

                        console.log("My section 3");
                        no++;
                        let et = videono++,
                            nt = document.createElement('div');
                        nt.classList.add('up_videos'), nt.id = 'vi' + et, nt.innerHTML = '<div class="videouploadsection items"><div class="photography_image" id="video_' + et + '"><div class="photoimage-loader" id="video_load' + et + '"><div id="myProgress"><div class="myBar" id="video_bar' + et + '"></div></div></div><div id="player' + et + '"></div><div id="kity' + et + '" class="progressbar"><span class="widthupdate" id="miovv' + et + '"></span><span class="ty" id="progress_video' + et + '">0%</span></div><div class="danger_photo_remove" luci-data-value="{' + et + '}" luci-data-type="1"><i class="icon icon-multiply"></i></div>', c('upload_items')[0].insertBefore(nt, c('upload_items')[0].childNodes[0]);
                        let ot = new FormData;
                        ot.append('video', Ge);
                        let it = new XMLHttpRequest;
                        it.addEventListener('progress', function(dt) {
                            let ct = 100 * (dt.loaded / dt.total);
                            //id('progress_video' + et).innerHTML = Math.round(ct) + '%';
                            id('video_bar' + et).style.width = Math.round(ct) + '%';
                            $('#vi'+et).find('.ty').html(Math.round(ct) + '%');
                        }, !1), it.addEventListener('load', function(dt) {
                            id('video_bar' + et).style.width = '0%';
                            let ct = JSON.parse(dt.target.responseText);
                            if (!0 != ct.error) {
                                id('kity' + et).style.display = 'none';
                                let pt = document.createElement('video');
                                pt.src = ct.filename, pt.controls = 'controls', id('player' + et).appendChild(pt), plyr.setup(), allvideos.push(ct.name), id('player' + et).setAttribute('luci-file-name', ct.name)
                            } else {
                                $("#vi" + et).remove();
                                no--;
                                if (no == 0 || no < 1) {
                                    $('.upload_section').css("display", "none");
                                    $(".additems").css("display", "block");
                                }

                                swal('Error', 'This video is not uploaded properly please try again', 'error');
                            }
                        }, !1), it.addEventListener('abort', function() {
                            id('miovv' + et).value = 0, id('miovv' + et).style.display = 'none', id('kity' + et).style.display = 'none'
                        }, !1), it.open('POST', URLS.UPLOADVIDEO), it.send(ot)
                        delete_img();
                        hide_addbox();
                        return false;
                    }

                }

            };
        };
        reader.readAsDataURL(Ge);

    }


    } else {

        if (no == 0 || no < 1) {
            $('.upload_section').css("display", "none");
            $(".additems").css("display", "block");
        }


        swal('Error', 'This format is not supported', 'error');
        return false;
    }

}


function videobox(){

}


export function delete_img() {
    if (null != c('danger_photo_remove')[0])
        for (let Ge = 0; Ge < c('danger_photo_remove').length; Ge++) c('danger_photo_remove')[Ge].addEventListener('click', function() {
            if (this.hasAttribute('luci-data-value'))
                if ('0' == this.getAttribute('luci-data-type')) {
                    let Qe = this.getAttribute('luci-data-value'),
                        Ke = Qe.replace('{', '').replace('}', ''),
                        Ze = id('photo_' + Ke).getAttribute('luci-file-name');
                    


                    swal({
                      title: "Are you sure?",
                      text: 'You won\'t be able to revert this!',
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                      if (willDelete) {
                        removeA(allimages, Ze), id('photo_' + Ke).remove(), id('image_open_' + Ke).remove(), swal('Deleted!', 'Your imaginary file has been deleted.', 'success')
                        no--;
                        if(no == 0 || no < 1){
                            $('.upload_section').css("display","none");
                            $(".additems").css("display","block");
                        }
                      } else {
                        //swal("Your imaginary file is safe!");
                      }
                    });




                } else {
                    let Qe = this.getAttribute('luci-data-value'),
                        Ke = Qe.replace('{', '').replace('}', ''),
                        Ze = id('player' + Ke).getAttribute('luci-file-name');
                    
                    swal({
                      title: "Are you sure?",
                      text: 'You won\'t be able to revert this!',
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                      if (willDelete) {
                        (removeA(allvideos, Ze), id('player' + Ke).remove(), id('vi' + Ke).remove()) 
                        no--;
                        if(no == 0 || no < 1){
                            $('.upload_section').css("display","none");
                            $(".additems").css("display","block");
                        }
                      } else {
                        //swal("Your imaginary file is safe!");
                      }
                    });


                }
        }, !1)



}


function checkduration(Ge) {
    let reader = new FileReader();
    reader.onload = function() {
        var aud = new Audio(reader.result);
        aud.onloadedmetadata = function(){
            // sp.innerHTML = aud.duration;
            // console.log(aud.duration);
            // let durmins = Math.floor(aud.duration / 60);
            let seacond = aud.duration;

             console.log(seacond)

            if(!$('#switch').hasClass('switchOn')){

                if($('#switches').hasClass("switchon"))
                {
                    if(seacond > 300){

                        swal('Error','This post is talent type. You should add 5 minute video only.','error');
                        return false;
                    }

                    else {

                        return true;
                    }
                }

                else {

                    if(seacond > 30){

                        swal('Error','You should add half minute video only.','error');
                        return false;
                    }

                    else {

                        return true;
                    }

                }

            }

            else {

                if (seacond > 300) {

                    swal('Error', 'This post is challenge type. You should add 5 minute video only.', 'error');
                    return false;
                }

                else {

                    return true;
                }

            }

        };
    };
    reader.readAsDataURL(Ge);
}







export function addimg(){for(let Ge=null,Qe=0;Qe<c('transparent_hover').length;Qe++)c('transparent_hover')[Qe].addEventListener('click',function(){this.childNodes[0].click(),Ge=this.getAttribute('luci-id'),this.childNodes[0].addEventListener('change',function(){let Ke=id('img_porperty_'+Ge).files[0],Ze=new FileReader;Ze.onloadend=function(){id('photo_'+Ge).innerHTML='<img src="'+Ze.result+'" alt="photography"/>',id('photo_'+Ge).classList.remove('no_image8')},Ze.readAsDataURL(Ke)},!1)},!1)}

export function getSelection() {
    if(null!=c('selectedOption')[0]){let Ge=c('selectedOption')[0].textContent,Qe=c('selectedOption')[1].textContent;'Select'==Ge?'':cat=Ge,'Select'==Qe?'':scat=Qe}
}

export function editpostSetup(id) {
    postid = id;
}

export function newPost() {
    getSelection();
    let postdata =_("editable-boss").value;
    if(mode==0){
        if(postdata==""&&postdata.length<1&&allimages.length<1&&allvideos.length<1){swal("Error", "This post appears to be blank. Please write something or attach a link or photo to post.", "error");}else if(lop==1 && cat==""){swal("Error", "Category needed", "error");}else if(lop==1 && scat==""){swal("Error", "Sub-Category needed", "error");}else if(lop==1&&allimages.length>1||allvideos.length>1){swal("Error", "This post is talent type. You could add single image or video only. Please delete", "error");}else if(lop==1&&allimages.length < 0 || allvideos.length < 0){swal("Error", "This post is talent type. Please add one image or video", "error");}else if(lop==1&&_("xhcp_title").textContent==""){swal("Error", "This post is talent type. Please type title", "error");c("opentabs")[1].click();}
        else{sub_post()}
    }
    else if(mode==1){

        if(postdata==""&&postdata.length<1&&allimages.length<1&&allvideos.length<1){swal("Error", "This post appears to be blank. Please write something or attach a link or photo to post.", "error");}
        else if(cat==""&&perticipate!=1){swal("Error", "Category needed", "error");}
        else if(scat==""&&perticipate!=1){swal("Error", "Sub-Category needed", "error");}
        else if(allimages.length>1||allvideos.length>1){swal("Error", "Your post is chellenge type. You could add single image or video only. Please delete", "error");}
        else if(allimages.length < 0 || allvideos.length < 0){swal("Error", "Your post is chellenge type. Please add one image or video", "error");}
        else if(_("xhcp_title").textContent==""&&perticipate!=1){swal("Error", "This post is chellenge type. Please type title", "error");c("opentabs")[1].click();}
        else if(cy.length < 1 &&perticipate!=1){swal("Error", "Keyword needed", "error");c("opentabs")[2].click();}
        else if(chmode==0&&ary.length<1&&perticipate!=1){swal("Error", "Please select any one friends", "error");}
        else if(_("date").value==""&&perticipate!=1){
            swal("Error", "Please select participation time", "error");
        }
        else{
            participatedays=_("date").value;
            sub_post();
        }
    }
}

export function change_global() {
    //for (let Ge = 0; Ge < c('pricays'); Ge++) c('pricays')[Ge].classList.remove('selected-privacy-openion');
    //c('pricays')[0].classList.add('selected-privacy-openion'), 
     pmode = 0
}
export function _(x) {
    return document.getElementById(x);
}

export function formormality(){

    if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
   document.getElementById('post-small-btn').style.display='block';
    document.getElementById('postbox').style.display='none'
    document.getElementById('post-small-close-btn').style.display='none';
    $('html, body').css('overflowY', 'auto'); 

  }

   $('html, body').css('overflowY', 'auto'); 
    

    if($('#switch').hasClass('switchOn')){
        $('#switch').click();
    }

    if($("#switches").hasClass("switchon")){
        $("#switches").click();
    }

    $('#custom_checkbox1').checked=false;

    commentmode=0;
    anoncom=0;
    normalposttags.length = 0;
    challengeposttags.length = 0;
    c("editable-boss")[0].style.fontSize="24px";
    no=0,null!=c('selectedOption')[0]&&(c('selectedOption')[0].innerHTML='Select',
        c('selectedOption')[1].innerHTML='Select'),
        id('xhcp_title').innerHTML='',
        id('editable-boss').textContent='',
        allimages.length = 0,
        allvideos.length = 0,
        cy.length = 0,
        ary.length = 0,
        $('.tag').remove(),
        pmode=0,
        $('.highlighter').html('');
        $('.emojionearea-editor').mentionsInput('reset',function(){});

        $('#postbox').removeClass("edit_post");

    for(let Ge=0;Ge<c('items_uploadimages').length;Ge++)c('items_uploadimages')[Ge].remove();
        $(".makeMeList").val('');


    c('upload_items')[0]&&(c('upload_items')[0].style.display='none');
    for(let Ge=0;Ge<c('items_uploadimages').length;Ge++)c('items_uploadimages')[Ge].remove();
    c('upload_items')[0]&&(c('upload_items')[0].style.display='none');
    for(let Ge=0;Ge<c('up_videos').length;Ge++)c('up_videos')[Ge].remove();
    c('upload_items')[0]&&(c('upload_items')[0].style.display='none'),
        id('editable-boss').classList.remove('text_to_small'),
        $('.editable-boss').css('min-height','90px'),
    null!=WindowEventCreator(c('opentabs')[0],'mousedown')&&c('opentabs')[0].click(),
        videono=0,
        c('upload_section')[0].style.display='none',
        $('.highlighter').removeClass('text_to_small'),
        $('.emojionearea-editor').removeClass('text_to_small'),
        $('.emojionearea-editor').css('font-size','24px'),
        id('editable-boss').value=null,
        $('#custom_checkbox1').checked=false,
        lop=0,Showdashboard(),
        $('#switches').removeClass('switchon'),
        id('date')&&(id('date').value='');
        WindowEventCreator(c('opentabs')[0],'mousedown');
        $('.react-datepicker__input-container input').val('');
        $('.react-tagsinput-input').val('');

    if($(".emojionearea-button").hasClass("active")){
        $(".emojionearea-button").click();
    }

    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        document.getElementsByClassName('react-tagsinput-input')[0].dispatchEvent(evt);
    }
    else
        document.getElementsByClassName('react-tagsinput-input')[0].fireEvent("onchange");

    $('div.' + 'items_uploadimages').remove();
    $('div.'+'up_videos').remove();
    $(".additems").css("display","block");

    if(!$("#tag_con").hasClass("none")){$("#tag_con").addClass("none");}

    $('#custom_checkbox1').attr('checked', false); 

    if(document.getElementById("postsectioncl")!=null){

                            
    
                            if($("#postsectioncl").hasClass("active")){
                                    
                                   // $("#postsectioncl").click();


                            }

                            else if($("#talent").hasClass("active")){


                                
                               document.getElementById("switches").click();

                            }

                        }



}

export function updatetime() {

        var templates = {
            prefix: "",
            suffix: "",
            seconds: "just now",
            minute: " 1 minute ago",
            minutes: "%d minute ago",
            hour: "1 hour ago",
            hours: "%d hrs ago",
            day: "1 day ago",
            days: "%d days ago",
            month: "1 month ago",
            months: "%d months ago",
            year: "1 year ago",
            years: "%d years ago"
        };
        var template = function(t, n) {
            return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
        };
        var timer = function(time) {
            if (!time) return;
            time = time.replace(/\.\d+/, "");
            time = time.replace(/-/, "/").replace(/-/, "/");
            time = time.replace(/T/, " ").replace(/Z/, " UTC");
            time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
            time = new Date(time * 1000 || time);
            var now = new Date();
            var seconds = ((now.getTime() - time) * .001) >> 0;
            var minutes = Math.round(seconds / 60);
            var hours = Math.round(minutes / 60);
            var days = Math.round(hours / 24);
            var years = Math.round(days / 365);
            return templates.prefix + (seconds < 45 && template('seconds', seconds) || seconds < 60 && template('minute', 1) || minutes < 60 && template('minutes', minutes) || minutes < 90 && template('hour', 1) || hours < 24 && template('hours', hours) || hours < 24 && template('day', 1) || days < 30 && template('days', days) || days < 30 && template('month', 1) || days < 365 && template('months', days / 30) || years < 1.5 && template('year', 1) || template('years', years)) + templates.suffix;
        };
        var elements = document.getElementsByClassName('posttime');
        for (var i in elements) {
            var $this = elements[i];
            if (typeof $this === 'object') {
                $this.innerHTML = timer($this.getAttribute('data-time') || $this.getAttribute('datetime'));
            }
        }



}

export function Timeupdate() {
    (function timeAgo(selector) {var templates = {prefix: "",suffix: "",seconds: "just now",minute: " 1 minute ago", minutes: "%d minute ago",hour: "1 hour ago",hours: "%d hrs ago",day: "1 day ago",days: "%d days ago",month: "1 month ago",months: "%d months ago",year: "1 year ago",years: "%d years ago"};var template = function (t, n) {return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));};var timer = function (time) {if (!time) return;time = time.replace(/\.\d+/, "");time = time.replace(/-/, "/").replace(/-/, "/");time = time.replace(/T/, " ").replace(/Z/, " UTC");time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");time = new Date(time * 1000 || time);var now = new Date();var seconds = ((now.getTime() - time) * .001) >> 0; var minutes = Math.round(seconds / 60);var hours = Math.round(minutes / 60);var days = Math.round(hours / 24);var years = Math.round(days / 365);return templates.prefix + (seconds < 45 && template('seconds', seconds) || seconds < 60 && template('minute', 1) || minutes < 60 && template('minutes', minutes) || minutes < 90 && template('hour', 1) || hours < 24 && template('hours', hours) || hours < 24 && template('day', 1) || days < 30 && template('days', days) || days < 30 && template('month', 1) || days < 365 && template('months', days / 30) || years < 1.5 && template('year', 1) || template('years', years)) + templates.suffix;};var elements = document.getElementsByClassName('posttime');for (var i in elements) {var $this = elements[i];if (typeof $this === 'object') {$this.innerHTML = timer($this.getAttribute('data-time') || $this.getAttribute('datetime'));}}
    setTimeout(timeAgo, 60000);

    })();
}

export function sub_post() {
    document.getElementById('submitpost').style.pointerEvents = "none";
    let a = _("editable-boss").value,
     b = "";
 1 < allimages.length && allimages.join(","), 1 < allvideos.length && allvideos.join(","), 0 == mode ? b = 1 < normalposttags.length ? normalposttags.join(",") : 0 == normalposttags.length ? "" : normalposttags : 1 == mode && (b = 1 < challengeposttags.length ? challengeposttags.join(",") : 0 == challengeposttags.length ? "" : challengeposttags);
 let c = ajaxObj("POST", URLS.NEWPOST);
 c.onreadystatechange = function() {
     if (!0 == ajaxReturn(c)) {
         let e = JSON.parse(c.responseText);
         e.error ? (1 == e.code ? swal({
                 title: "Are you sure?",
                 text: "You will not be able to continue this challenge!",
                 type: "warning",
                 showCancelButton: !0,
                 confirmButtonColor: "#DD6B55",
                 confirmButtonText: "Continue...",
                 cancelButtonText: "No. I am poor man",
                 closeOnConfirm: !1,
                 closeOnCancel: !1
             }, function(f) {
                 f ? swal("Deleted!", "Your imaginary file has been deleted.", "success") : swal("Cancelled", "Yes you are ", "error")
             }) : 1 == e.code ? swal({
                 title: "Are you sure?",
                 text: "You will not be able to continue this challenge!",
                 type: "warning",
                 showCancelButton: !0,
                 confirmButtonColor: "#DD6B55",
                 confirmButtonText: "Continue...",
                 cancelButtonText: "No. I am poor man",
                 closeOnConfirm: !1,
                 closeOnCancel: !1
             }, function(f) {
                 f ? swal("Deleted!", "Your imaginary file has been deleted.", "success") : swal("Cancelled", "Yes you are ", "error")
             }) : 2 == e.code && swal({
                 title: "Are you sure?",
                 text: "You will not be able to continue this challenge!",
                 type: "warning",
                 showCancelButton: !0,
                 confirmButtonColor: "#DD6B55",
                 confirmButtonText: "Continue...",
                 cancelButtonText: "No. I am poor man",
                 closeOnConfirm: !1,
                 closeOnCancel: !1
             }, function(f) {
                 f ? swal("Deleted!", "Your imaginary file has been deleted.", "success") : swal("Cancelled", "Yes you are ", "error")
             }), "" != e.code && (posttext = e.returndata.posttext, image = e.returndata.image, video = e.returndata.video, postprivacy = e.returndata.postprivacy, peopletag = e.returndata.peopletag, posttype = e.returndata.posttype, commentmode = c.returndata.commentmode, xhpc_message = xhpc_message, xhpc_title = xhpc_title, xhpc_type = xhpc_type, xhpc_category = xhpc_subcategory = xhpc_subcategory, title = title, xhpc_end_time = xhpc_end_time, audience = audience)) :
             console.log(e),
             document.getElementById('submitpost').style.pointerEvents = "auto",
             formormality(),
             setTimeout(function() {
                 $(".gif").gifplayer(), plyr.setup()
             }, 10)
     }
 };
 let d = "";
 $("textarea.editable-boss").mentionsInput("val", function(e) {
     d = e
 }), c.send("posttext=" + encodeURIComponent(a) + "&image=" + allimages + "&video=" + allvideos + "&postprivacy=" + pmode + "&peopletag=" + b + "&posttype=" + mode + "&commentmode=" + anoncom + "&xhpc_message=" + encodeURIComponent(d) + "&xhpc_type=" + lop + "&xhpc_category=" + cat + "&xhpc_subcategory=" + scat + "&title=" + encodeURIComponent(_("xhcp_title").textContent) + "&participatedays=" + participatedays + "&audience=" + chmode + "&perticipate=" + perticipate + "&token=" + token)}

export function sendagainpost(){
    let a=ajaxObj("POST",URLS.NEWPOST);a.onreadystatechange=function(){if(!0==ajaxReturn(a)){let c=JSON.parse(a.responseText);c.error?(1==c.code?swal({title:"Are you sure?",text:"You will not be able to continue this challenge!",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Continue...",cancelButtonText:"No. I am poor man",closeOnConfirm:!1,closeOnCancel:!1},function(d){d?swal("Deleted!","Your imaginary file has been deleted.","success"):swal("Cancelled","Yes you are ","error")}):1==c.code?swal({title:"Are you sure?",text:"You will not be able to continue this challenge!",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Continue...",cancelButtonText:"No. I am poor man",closeOnConfirm:!1,closeOnCancel:!1},function(d){d?swal("Deleted!","Your imaginary file has been deleted.","success"):swal("Cancelled","Yes you are ","error")}):2==c.code&&swal({title:"Are you sure?",text:"You will not be able to continue this challenge!",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Continue...",cancelButtonText:"No. I am poor man",closeOnConfirm:!1,closeOnCancel:!1},function(d){d?swal("Deleted!","Your imaginary file has been deleted.","success"):swal("Cancelled","Yes you are ","error")}),""!=c.code&&(posttext=c.returndata.posttext,image=c.returndata.image,video=c.returndata.video,postprivacy=c.returndata.postprivacy,peopletag=c.returndata.peopletag,posttype=c.returndata.posttype,commentmode=c.returndata.commentmode,xhpc_message=c.returndata.xhpc_message,xhpc_title=c.returndata.xhpc_title,xhpc_type=c.returndata.xhpc_type,xhpc_category=c.returndata.xhpc_category,xhpc_subcategory=c.returndata.xhpc_subcategory,title=c.returndata.title,xhpc_end_time=xhpc_end_time,audience=audience)):feeds.updateAjaxSubmit(c);formormality(),setTimeout(function(){$(".gif").gifplayer(),plyr.setup()},10)}};a.send("posttext="+posttext+"&image="+image+"&video="+video+"&postprivacy="+postprivacy+"&peopletag="+peopletag+"&posttype="+posttype+"&commentmode="+commentmode+"&xhpc_message="+xhpc_message+"&xhpc_type="+lop+"&xhpc_category="+xhpc_category+"&xhpc_subcategory="+xhpc_subcategory+"&title="+title+"&participatedays="+participatedays+"&audience="+audience+"&perticipate="+perticipate+"&token="+token)
}

export function Addtag(Qe,Ge){
       0==mode?normalposttags.push(Qe):1==mode&&challengeposttags.push(Qe)
       id('tagging').value='';
}



export function Deletetag(Ge){0==mode?(removeA(normalposttags,Ge)):1==mode&&(removeA(challengeposttags,Ge))}


export function deletealltag(){normalposttags.length = 0;challengeposttags.length = 0;}

export function removeA(Ge){for(let Qe,et,Ke=arguments,Ze=Ke.length;1<Ze&&Ge.length;)for(Qe=Ke[--Ze];-1!==(et=Ge.indexOf(Qe));)Ge.splice(et,1);return Ge}

export function getAllElementsWith(tag, attribute, value)
{
  let matchingElements = [];
  let allElements = document.getElementsByTagName(tag);
  for (let i = 0; i < allElements.length; i++)
  {
    if (value.indexOf(allElements[i].getAttribute(attribute)) != -1)
    {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}


export function Cg() {
    for (let Ge = 0; Ge < c('pricays').length; Ge++) c('pricays')[Ge].addEventListener('click', function() {
        if (0 == lop) {
            for (let Qe = 0; Qe < c('pricays').length; Qe++) c('pricays')[Qe].classList.remove('selected-privacy-openion');
            this.classList.add('selected-privacy-openion');
            let Ke = this.getAttribute('data-value');
            Ke = Ke.replace('{', '').replace('}', '').replace('this.', ''), Ke = Ke.charAt(0).toUpperCase() + Ke.slice(1);
            let Ze = this.getAttribute('data-privacy-class');
            Ke = Ke.replace('{', '').replace('}', '').replace('this.', ''), 'Global' == Ke ? pmode = 0 : 'Friend' == Ke ? pmode = 1 : 'Onlyme' == Ke && (pmode = 2), id('curentprivacy').innerHTML = Ke, c('privacy_select')[0].classList.add('none')
        } else swal('Error', 'Talent post require Global audience', 'error'), $('.privacy_selection_menu').trigger('click')
    }, !1)
}

export function drag_drop() {
    $('#postbox').on('drop dragdrop', function() {

        event.preventDefault();
        let Ge = event.dataTransfer.files[0];

        event.preventDefault();
        let imageUrl = event.dataTransfer.getData("URL");
        let links = getAllElementsWith("img", "src", imageUrl);
        let image;


        if (Ge) {

            let Ke = Ge.name;
            let Ze = Ke.substring(Ke.lastIndexOf('.') + 1).toLowerCase();
            if ('gif' == Ze || 'png' == Ze || 'bmp' == Ze || 'jpeg' == Ze || 'jpg' == Ze || 'mp4' == Ze || '3gp' == Ze || 'avi' == Ze || 'mkv' == Ze || 'wmv' == Ze || 'mov' == Ze) {
                return Uploadimg(Ge);
            }

        } else {

            if (links.length) {




                imageUrl = links[0].getAttribute("src");

                let my_array = imageUrl.split("/");
                let last_element = my_array[my_array.length - 1];

                let Ze = last_element.substring(last_element.lastIndexOf('.') + 1).toLowerCase();
                if ('gif' == Ze || 'png' == Ze || 'bmp' == Ze || 'jpeg' == Ze || 'jpg' == Ze || 'mp4' == Ze || '3gp' == Ze || 'avi' == Ze || 'mkv' == Ze || 'wmv' == Ze || 'mov' == Ze) {



                    let xhr = new XMLHttpRequest();
                    xhr.onload = function() {
                        let et = imageUrl,
                            tt = new FileReader;
                        tt.onloadend = function() {
                            let dt = no++,
                                pt = document.createElement('div');
                            pt.id = 'image_open_' + dt, pt.setAttribute('class', 'items items_uploadimages'), pt.innerHTML = '<div class="protograpy_panel"><div class="photography_image_container"><div class="photography_image" id="photo_' + dt + '"><div class="photoimage-loader" id="img_load' + dt + '"><div id="myProgress"><div class="myBar" id="img_bar' + dt + '"></div></div></div><img src="' + tt.result + '" alt="photography"/><div class="danger_photo_remove" luci-data-type="0" luci-data-value="{' + dt + '}"><i class="icon icon-multiply"></i></div></div></div></div></div><div class="clearfix"></div>', 0 == c('items_uploadimages').length && c('upload_section')[0].classList.remove('none'), c('upload_items')[0].insertBefore(pt, c('upload_items')[0].childNodes[0]), id('image_opener').value = '',id('video_opener').value = '';
                            let ut = ajaxObj('POST', URLS.UPLOADIMG);
                            ut.upload.addEventListener('progress', function(mt) {
                                let gt = 100 * (mt.loaded / mt.total);
                                id('img_bar' + dt).style.width = Math.round(gt) + '%'
                            }, !1), ut.addEventListener('load', function(mt) {
                                id('img_bar' + dt).style.width = '0%', id('img_load' + dt).classList.add('none');
                                let gt = JSON.parse(mt.target.responseText);
                                !0 == gt.responds ? (allimages.push(gt.filename), id('photo_' + dt).setAttribute('luci-file-name', gt.filename)) : (swal('Error', 'Sorry something wrong. Image upload failed', 'error'), id('image_open_' + dt).remove())
                            }, !1), ut.addEventListener('error', function() {
                                swal('Error', 'Sorry something wrong. Image upload failed', 'error'), id('image_open_' + dt).remove()
                            }, !1), ut.addEventListener('abort', function() {
                                id('miovv' + et).value = 0, id('miovv' + et).style.display = 'none', id('kity' + et).style.display = 'none'
                            }, !1), ut.send('value=' + encodeURIComponent(tt.result)), 0 == dt && c('tu')[0].classList.remove('none');
                            delete_img()
                        }, tt.readAsDataURL(xhr.response);

                        xhr.open('GET', imageUrl);
                        xhr.responseType = 'blob';
                        xhr.send();
                    }




                }


            }

        }


        $(this).css('border-color', 'transparent'), !1
    });

    $(document).on('dragenter', function(Ge) {
        Ge.preventDefault(), $('#postbox').css('border-color', 'red')
    }), $('#postbox').on('dragleave', function() {
        $('#postbox').css('border-color', 'transparent')
    }), $('#postbox').on('dragover', function(Ge) {
        $(this).css('border-color', 'blue'), Ge.preventDefault()
    }), window.addEventListener('dragover', function(Ge) {
        Ge = Ge || event, Ge.preventDefault()
    }, !1), window.addEventListener('drop', function(Ge) {
        Ge = Ge || event, Ge.preventDefault(), $('#postbox').css('border-color', 'transparent')
    }, !1)
}



export function Showtagfriendlists(Ge,Qe){
    let Ke=id(Ge);
    if(!Ke.value)return void popupClearAndHide();
    for(let Ze=new RegExp('^'+Ke.value,'i'),
            et=0,
            tt=document.createDocumentFragment(),
            nt=!1;
        et<obj.length;et++)if(Ze.test(obj[et].name)){
        nt=!0;let ot=document.createElement('p');
        ot.innerHTML='<li>' +
            '<div class="thumb">' +
            '<img src="029012.jpg" width="40px" height="40px">' +
            '</div>' +
            '<span>'+obj[et].name+'</span>' +
            '<div class="clearfix"></div>' +
            '</li>',
            ot.setAttribute('onclick','addtagby(\''+obj[et].name+'\','+obj[et].id+',\''+Qe+'\',\''+Ge+'\');popupClearAndHide();'),
            tt.appendChild(ot)}return!0==nt?(null==id('tagger_autocompleter')&&createtagbind(),
        id('autometic_maker').innerHTML='',
        id('autometic_maker').style.display='block',
        void id('autometic_maker').appendChild(tt)):void popupClearAndHide()}



export default Togglepostdiv