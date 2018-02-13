import React,{Component} from 'react';
import Changetab from "../../helper/Postbox/Chnagetab";
import Changemode from "../../helper/Postbox/Changemode";
import {
    Cancelpost,
    OpenbrowseForUploadImage,
    ImagechangeEvent,
    VideochangeEvent,
    ToggleTalent,
    newPost,
    ChangeCommentMode,
    toggletagDrawer,
    formormality,
    drag_drop,
    Cg,
    editpostSetup,
    autoScrollTo,
    Showdashboard,
    OpenbrowseForUploadVideo,
    Timeupdate}
    from "../../helper/Postbox/Postbox"
import {
    id
    ,c}
    from "../../lib/Module";
import Require from "../../helper/Postbox/Require";
import Editor from "../Editor/Editor";
import {URLS} from "../../constants/api"
import WindowEventCreator from "../../lib/WindowEventCreator"
import Posttag from "../Tag/Post/Posttag"
import {ajaxObj,ajaxReturn,Ajax} from "../../lib/ajax"
import plyr from 'plyr';
import TagsInput from 'react-tagsinput'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DropdownMenu from 'react-dd-menu';
import swal from 'sweetalert';

let handleFinish = function () {
    console.log('Skynet has become self-aware!');
}



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
 let posid = Require.posid;
 let cat = '',scat = '';
 let editworking = Require.editworking;
 let mydate = new Date('2014-04-03');

 const Completionist = () => <span>You are good to go!</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <span>{hours}:{minutes}:{seconds}</span>;
    }
};

const currentDate = new Date();
const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();




export default class Postbox extends Component{

    constructor(props){
        super(props);

        this.state = {


            editworking : false,
            tags : [],
            startDate: '',
            Taggedusers : [],
            showbox : 0,
            tagshow : false,
            isMenuOpen: false,
            privacy : 0,
            addpost : true,
            category : []


        }



        this.fromchange = this.fromchange.bind(this);
        this.Changemode = this.Changemode.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.cancelPost = this.cancelPost.bind(this);
        this.getImg = this.getImg.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.toggleTalent = this.toggleTalent.bind(this);
        this.newpost = this.newpost.bind(this);
        this.toggleCommentmode = this.toggleCommentmode.bind(this);
        this.toggleTagdrawer = this.toggleTagdrawer.bind(this);
        //this.togglePrivacy = this.togglePrivacy.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.getVideoandImage = this.getVideoandImage.bind(this);

        this.click = this.click.bind(this);
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.setForall = this.setForall.bind(this);
        this.setForimage = this.setForimage.bind(this);


    }

    handleChange(tags) {
        //console.log()
        this.setState({tags})
    }

    handleChanges(date) {
        this.setState({
            startDate: date
        });
    }

    toggle() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    close() {
        this.setState({ isMenuOpen: false });
    }

    click() {
        console.log('You clicked an item');
    }



    listCategory (){


        if(this.state.category.length > 0){

            const items = this.state.category;




        const item = items.map((el) => {

            return (

               <option value={el.name}> {el.name} </option>

            )

        });

        return item;

        }

        

    }



    getCategory(){

        let reactThis = this;

        Ajax(URLS.GETCATEGORY, '', reactThis, function (data) {

                for (let i = 0; i < data.category.length; i++) {



                    reactThis.state.category.push(data.category[i]);


                }
                reactThis.setState({
                    category: reactThis.state.category,

                });
            });
    }



    privacyLayout(){

        const st = this.state.privacy;
        let Svalue = "Global";

        switch (st){
            case 0 : Svalue = "Global";
                break;
            case 1 : Svalue = "Friend";
                break;
            case 2 : Svalue = "Onlyme";
                break;
            default : Svalue = "Global";

        }



        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle: <div className="privacy_selected">
                <div className="friend_privacy">
                    <span id="curentprivacy">{Svalue}</span>
                    <i className="privacy_selection_menu icon icon-security" onClick={this.toggle}></i>
                    <nav data-tooltip="Click for more" data-position="center top"></nav>
                </div>
            </div>
            ,
            align: 'right'
        };

        return (<DropdownMenu {...menuOptions}>
            {this.privacyTemplate()}
        </DropdownMenu>);



    }



    Changemode (){
        Changemode();
    }

    changeTab (){

        /*
        if(
            id('switch').classList.toggle('switchOn'),'switch switchOn'==id('switch').className){
            mode=1,
                c('from_area')[0].classList.remove('nmod'),
                id('mode').setAttribute('class','normalmode'),
                id('mode').innerHTML='Challenge',
                //c('post_privacyedit')[0].classList.add('none'),
                c('post_privacyedit')[0].style.display="block",
                //id('postertype').classList.add('none'),
                c('from_area')[0].classList.add('cmod'),
                c('opentabs')[0].click(),
                c('tab_layout')[0].classList.remove('none');
            for(let Ge=0;Ge<c('basic_interface').length;Ge++)
                c('basic_interface')[Ge].classList.remove('none');
            id('anonomyous_comment').classList.add('none')

            $(".inpostmode").find("p").html("Challenge to your friends");

            if($('#tag_con').hasClass("none") && chmode==0){
                $('#tag_con').removeClass("none");
            }



            $(".tu").removeClass("none");

            if($('#mhgdfye').hasClass("none")){

                $('#mhgdfye').removeClass("none");
            }

            if($(".items_uploadimages").length > 0){
                $(".additems").css("display","none");
            }

            if(lop === 1){

                this.toggleTalent();

            }






        }

        else{
            WindowEventCreator(c('opentabs')[0],'mousedown'),
                mode=0,
                c('from_area')[0].classList.remove('cmod'),
                c('from_area')[0].classList.add('nmod'),
                id('mode').setAttribute('class','chmode'),
                //id('postertype').classList.remove('none'),
                id('mode').innerHTML='Postmode';
            for(let Ge=0;Ge<c('basic_interface').length;Ge++)
                c('basic_interface')[Ge].classList.add('none');
            c('tab_layout')[0].classList.add('none'),
                //c('post_privacyedit')[0].classList.remove('none'),
                id('anonomyous_comment').classList.remove('none')

            $(".inpostmode").find("p").html("Tag to your friends");



            if(this.state.tagshow ==  false){

                $('#tag_con').addClass("none");

            }

            if($(".items_uploadimages").length > 0){
                $(".additems").css("display","block");
            }


        }

        */

    }

    getImg (){

        //document.getElementById("image_opener").setAttribute("accept","image/*");
        OpenbrowseForUploadImage();
    }


    setForall(){
        document.getElementById("image_opener").setAttribute("accept","video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*");
        
    }

    setForimage(){
      document.getElementById("image_opener").setAttribute("accept","image/*");
          
    }


    getVideoandImage(){

            //alert();

        //$("#image_opener").attr();
        //document.getElementById("image_opener").removeAttribute("accept");
        //$("#image_opener").removeAttr("accept");
        //OpenbrowseForUploadImage();

        
           OpenbrowseForUploadImage(); 
        

    }

    getVideo(){
        OpenbrowseForUploadVideo();
    }

    uploadImg () {
            ImagechangeEvent();
    }

    uploadvideo (){
        VideochangeEvent();
    }


    change_globals(){
        pmode = 0;
        this.setState({
            privacy : 0
        })
        //for(let Ge=0;Ge<c('pricays');Ge++)c('pricays')[Ge].classList.remove('selected-privacy-openion');c('pricays')[0].classList.add('selected-privacy-openion'),id('curentprivacy').innerHTML='Global',pmode=0
    }


    Showdashboards () {

        console.log("Mylogs"+lop);

        1 == lop ? (this.change_globals(), id('postbox').classList.add('f_type'), ((0 != no || 0 < no) && (0 != videono || 0 < videono)) && (1 < no && swal('Error', 'This post is talent type. You could add single image or video only. Please delete', 'error'), id('postbox').classList.contains('img_avil') || id('postbox').classList.add('img_avil'))) : (id('postbox').classList.contains('f_type') && id('postbox').classList.remove('f_type'), id('postbox').classList.contains('img_avil') && id('postbox').classList.remove('img_avil'))
    }

    toggleTalent () {

        ToggleTalent();

        if($("#switches").hasClass("switchon")){

            lop = 1;
            this.setState({
                privacy : 0
            })

        }

        else {

            lop = 0;

            this.setState({
                privacy : 0
            })





        }


        //id('switches').classList.toggle('switchon'),'switch switchon'==id('switches').className?(lop=1,this.Showdashboards()):(lop=0,this.Showdashboards(),WindowEventCreator(c('opentabs')[0],'mousedown'))

    }

    toggleCommentmode (){
        let Ge=id('custom_checkbox1');
        anoncom=!0==id('custom_checkbox1').checked?0:1;
        

    }

    clearInput1() {

        this.input1.clear();

      
    
    }


    reacttoggleCommentmode(){

        if(id('custom_checkbox1').checked == true){

            id('custom_checkbox1').checked = false;

        }

        this.clearInput1();

    }



    

    togglePrivacy (num){
        if (0 == lop) {

             let Svalue = "Global";
            switch (num){
                case 0 : Svalue = "Global";
                break;
                case 1 : Svalue = "Friend";
                break;
                case 2 : Svalue = "Onlyme";
                break;
                default : Svalue = "Global";

            }

            if($("#switch").hasClass("switch switchOn")){


                if(num === 2){

                    swal('Error', 'Challenge post require Global audience or friend audience', 'error')

                }

                else {

                    pmode = num;

                    this.setState({
                        privacy : num
                    })

                }


            }

            else{

                     pmode = num;

                    this.setState({
                        privacy : num
                    })

            }

           

            

           } else{
             swal('Error', 'Talent post require Global audience', 'error')
           }

    }

    toggleTagdrawer (){

        toggletagDrawer();

        if($('#tag_con').hasClass('none')){
            this.setState({
                tagshow : false
            })


        }

        else {


            this.setState({
                tagshow : false
            })

        }

    }




    cancelPost () {

        let reactThis = this;
        if(id("editable-boss").textContent != "" || id("xhcp_title").textContent != "" || allimages.length > 0 || allvideos.length > 0) {

            let reactThis = this;
            swal({
                title: 'Are you sure?',
                text: 'Do you want to cancel this post',
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(willDelete => {

                if (willDelete) {



                 
                    if (reactThis.state.editworking == false) {
                        reactThis.reacttoggleCommentmode();
                        Cancelpost(); 
                        $(".makeMeList").val('');                   
                        reactThis.setState({
                            tags : [],
                            Taggedusers : [],
                            privacy : 0
                        });
                        reactThis.change_globals();

                        lop = 0;
                    } else {
                        reactThis.reacttoggleCommentmode();
                        Cancelpost();
                        reactThis.state.tags.length = 0;
                        $(".makeMeList").val('');
                        reactThis.setState({
                            tags : [],
                            Taggedusers : [],
                            privacy : 0
                        })
                        id("postbox").classList.remove("edit_post");
                        reactThis.setState = {
                            editworking: false,
                            Taggedusers : [],
                            privacy : 0
                        }

                        reactThis.change_globals();

                        lop =0 ;



                    }
                }

            })
        
        }




        



        

    }

    getSelection() {

        if (null == c('makeMeList')[0]) {

        } else {
            let Ge = c('makeMeList')[0].value,
                Qe = "TEST";
            '' === Ge ? '' : cat = Ge, '' === Qe ? '' : scat = Qe
        }

    }







    newPost() {

        let reactThis = this;

        this.getSelection();
        
        let postdata =id("editable-boss").textContent;
        if(mode==0){

           let lop =  ($("#switches").hasClass('switchon')) ? 1 : 0;
           console.log("Mylop"+lop);

           if(postdata==""&&postdata.length<1&&allimages.length<1&&allvideos.length<1){swal("Error", "This post appears to be blank. Please write something or attach a link or photo to post.", "error");}else if(lop==1 && cat==""){swal("Error", "Category needed", "error");}else if(lop==1 && scat==""){swal("Error", "Sub-Category needed", "error");}else if(lop==1&&allimages.length>1){swal("Error", "This post is talent type. You could add single image or video only. Please delete", "error");}else if(lop===1 && (allimages.length < 1 && allvideos.length < 1)){swal("Error", "This post is talent type. Please add one image or video", "error");}else if(lop==1&&id("xhcp_title").textContent==""){swal("Error", "This post is talent type. Please type title", "error");
            
                WindowEventCreator(c('opentabs')[1],'mousedown');
            
            }
            else{

                this.sub_post()

            }
        }

        else if(mode==1){
            if(postdata==""&&postdata.length<1&&allimages.length<1&&allvideos.length<1){swal("Error", "This post appears to be blank. Please write something or attach a link or photo to post.", "error");}
            else if(cat==""&&perticipate!=1){swal("Error", "Category needed", "error");}
            else if(scat==""&&perticipate!=1){swal("Error", "Sub-Category needed", "error");}
            else if(allimages.length>1||allvideos.length>1){swal("Error", "Your post is chellenge type. You could add single image or video only. Please delete", "error");}
            else if(allimages.length < 1 && allvideos.length < 1){swal("Error", "Your post is chellenge type. Please add one image or video", "error");}
            else if(id("xhcp_title").textContent==""&&perticipate!=1){swal("Error", "This post is chellenge type. Please type title", "error");

                WindowEventCreator(c('opentabs')[1],'mousedown');

            }
            else if(reactThis.state.tags.length < 1 && perticipate!=1){

                swal("Error", "Keyword needed", "error");

            //c("opentabs")[2].click();

                WindowEventCreator(c('opentabs')[2],'mousedown');

            }
            else if(chmode==0&&challengeposttags.length<1&&perticipate!=1){swal("Error", "Please select any one friends", "error");}
            else if(this.state.startDate==""&&perticipate!=1){
                swal("Error", "Please select participation time", "error");
            }
            else if(pmode==2){swal("Error", "Challenge post require Global audience or friend audience", "error");}
            else{
                participatedays= moment(this.state.startDate).format("YYYY/MM/DD hh:mm:ss");
                this.sub_post();
            }
        }
    }


    radiochange (){
        let reactThis = this;
         for (let Ge = c('radio'), Qe = 0; Qe < Ge.length; Qe++) Ge[Qe].addEventListener('click', function() {
                for (let Ke = 0; Ke < Ge.length; Ke++) Ge[Ke].classList.remove('tickinstalled');
                if (this.classList.add('tickinstalled'), this.hasAttribute('data-value')) {
                    let Ze = this.getAttribute('data-value');
                    Ze = Ze.replace('{', '').replace('}', ''), chmode = parseInt(Ze), reactThis.chmchange()
                }
            }, !1);
    }

    chmchange() {

        //0 == chmode ? c('freedomarea but_place-bottom tagger')[0].style.pointerEvents = 'all' : 2 == chmode && (c('freedomarea but_place-bottom tagger')[0].style.pointerEvents = 'none')

        if(chmode==0){
            id('tag_con').classList.remove("none");
        }
        else {
            id('tag_con').classList.add("none");
        }

        this.setState ({
            startDate : '',
        })

        $('.react-datepicker-ignore-onclickoutside input').val('');


    }


    edit_post(){
        let reactThis=this;

        let postid =  document.getElementById("postbox").getAttribute("data-edit");
        let d="";
        $(".emojionearea-editor").mentionsInput("con",function(e){
            d=e
        });

        let xhpc_message=encodeURIComponent(d);
        let data = "posttext="+xhpc_message+"&postid="+postid;
        Ajax('post/editpost', data , this, function(data){
            if(data.response){

                reactThis.reacttoggleCommentmode();
                formormality();
                reactThis.state.tags.length = 0;
                reactThis.setState ({
                    startDate : '',
                    tags : [],
                    Taggedusers : [],
                    privacy : 0
                })

                $('.react-datepicker-ignore-onclickoutside input').val('');




                let update = data.updates[0];
                reactThis.myeditpost(update);
                id("postbox").classList.remove("edit_post");
                editworking==false;

                 

                let pos = autoScrollTo("post_"+update.update_id);

                $('html, body').animate({
                    scrollTop: pos-40
                }, 2000);

            }
        });
    }

    myeditpost (update){

        this.props.editpost(update);

    }





    addPost (value){

        this.props.updateAjaxSubmit(value);

    }

    sub_post() {

       // reactThis = this;

       if(this.state.addpost == false){

            return;

       }

       this.setState({
        addpost : false
       })

        pmode = this.state.privacy;

        let Reactthis = this;
        let d="";
        $(".emojionearea-editor").mentionsInput("con",function(e){
            d=e
        });


        let a=id("editable-boss").textContent,b=0==mode?normalposttags:1==mode&&challengeposttags;1<allimages.length&&allimages.join(","),1<allvideos.length&&allvideos.join(","),0==mode?b=1<normalposttags.length?normalposttags.join(","):0==normalposttags.length?"":normalposttags:1==mode&&(b=1<challengeposttags.length?challengeposttags.join(","):0==challengeposttags.length?"":challengeposttags);var c=ajaxObj("POST",URLS.NEWPOST);c.onreadystatechange=function(){if(!0==ajaxReturn(c)){
            var e=JSON.parse(c.responseText);
            if(e.error){
                if(e.code===5){
                    swal('Error', e.cause, 'error')
                    return;
                }
            }
            e.error?(1==e.code?swal({title:"Are you sure?",text:"You will not be able to continue this challenge!",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Continue...",cancelButtonText:"Cancel",closeOnConfirm:!1,closeOnCancel:!1},function(f){f?swal("Deleted!","Going to payment process page","success"):swal("Cancelled","Yes you are ","error")}):1==e.code?swal({title:"Are you sure?",text:"You will not be able to continue this challenge!",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Continue...",cancelButtonText:"No. I am poor man",closeOnConfirm:!1,closeOnCancel:!1},function(f){f?swal("Deleted!","Your imaginary file has been deleted.","success"):swal("Cancelled","Yes you are ","error")}):2==e.code&&swal({title:"Are you sure?",text:"You will not be able to continue this challenge!",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Continue...",cancelButtonText:"No. I am poor man",closeOnConfirm:!1,closeOnCancel:!1},function(f){f?swal("Deleted!","Your imaginary file has been deleted.","success"):swal("Cancelled","Yes you are ","error")}),""!=e.code&&(posttext=e.returndata.posttext,image=e.returndata.image,video=e.returndata.video,postprivacy=e.returndata.postprivacy,peopletag=e.returndata.peopletag,posttype=e.returndata.posttype,commentmode=c.returndata.commentmode,xhpc_message=xhpc_message,xhpc_title=xhpc_title,xhpc_type=xhpc_type,xhpc_category=xhpc_subcategory=xhpc_subcategory,title=title,xhpc_end_time=xhpc_end_time,audience=audience)):
            Reactthis.addPost(e),
            Reactthis.reacttoggleCommentmode();
            formormality();
            Reactthis.setState({
                showbox : 0,
                startDate : '',
                tags : [],
                Taggedusers : [],
                privacy : 0,
                addpost : true
            })
            lop = 0;

            Reactthis.change_globals();

            

        }};
            c.send("posttext="+encodeURIComponent(a)+"&image="+allimages+"&video="+allvideos+"&postprivacy="+pmode+"&peopletag="+b+"&posttype="+mode+"&commentmode="+anoncom+"&xhpc_message="+encodeURIComponent(d)+"&xhpc_type="+lop+"&xhpc_category="+cat+"&xhpc_subcategory="+scat+"&title="+encodeURIComponent(id("xhcp_title").textContent)+"&participatedays="+participatedays+"&audience="+chmode+"&perticipate="+perticipate+"&token="+token)
    }




    newpost (){

        if(id("postbox").classList.contains("edit_post")){
            this.edit_post()
        }
        else{
            this.newPost();
        }


    }

    componentDidMount(){

        this.getCategory();

        drag_drop();
        if(typeof showpostbox !== 'undefined'){
                this.setState(
                    {
                        showbox : showpostbox
                    }
                )
        }

         $(document).mouseup(function(e)
       {
           let container = $("#drop1");

           // if the target of the click isn't the container nor a descendant of the container
           if (!container.is(e.target) && container.has(e.target).length === 0)
           {	
               container.hide();
               $('.privacy_select').addClass("none");
           }



       });

    
        var limit = 49;
        $('#xhcp_title').keypress(function() {
          return this.innerHTML.length < limit;
        }).on({
          'paste': function(e) {
            var len = this.innerHTML.length,
              cp = e.originalEvent.clipboardData.getData('text');
            if (len < limit)
              this.innerHTML += cp.substring(0, limit - len);
            return false;
          },
          'drop': function(e) {
            e.preventDefault();
            e.stopPropagation();
          }
        });


        

        $(".edit_form_div").click(function(){

            $(".emojionearea-editor").focus();
           
        });




    }

    datePickerwindow(){

        if(chmode===0){
            return <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChanges}

                showTimeSelect
                minDate={moment().add(1, "days")}
                maxDate={moment().add(3, "days")}
                dateFormat="LLL"
                placeholderText="Click to select a date"
            />;
        }

        else {

            return <DatePicker
                placeholderText="Click to select a date"
                selected={this.state.startDate}
                onChange={this.handleChanges}
                minDate={moment().add(1, "days")}
                maxDate={moment().add(5, "days")}
                showTimeSelect
                dateFormat="LLL"
            />;

        }

    }


    tabItems (){
        if(perticipate === 0) {
           return( <ul>
                <li className="opentabs activetab" onMouseDown={this.Changemode}>
                    Description
                    <span>*</span>
                </li>
                <li className="opentabs" onMouseDown={this.Changemode}>
                    Title
                    <span>*</span>
                </li>
                <li className="opentabs" onMouseDown={this.Changemode}>
                    Keywords
                    <span>*</span>
                </li>
            </ul>);
        }
        else{
            return( <ul>
                <li className="opentabs activetab" onMouseDown={this.Changemode}>
                    Description
                    <span>*</span>
                </li>
            </ul>);
        }

    }

    talentpostcreateTemplate (){

        if(perticipate === 0){
            return (
                <div className="basic_interface" id="anonomyous_comment">
                    <div className="nofreedom">
                        <p>If you wish to submit a tallent then swipe this button</p>
                    </div>
                    <div className="freedomarea">
                        <div id="switches" onClick={this.toggleTalent} className="switch"></div>
                    </div>




                </div>
            )
        }
    }

    photographytools(){

        const kl = {
            display : "none"
        }

        if (perticipate === 1){
            return (
                <div className="photograpy_tools">
                    <div className="tools_items">
                        <div className="tools_hints"><span>Select category <font>*</font></span></div>
                        <div className="tool_mechinery">
                            <select className="makeMeList">
                               <option value=''> Select one </option>
                                {this.listCategory()}
                            </select>
                        </div>
                    </div>

                </div>
            )

        }

        else{
            return (
                <div style={kl} className="photograpy_tools none">
                    <div className="tools_items">
                        <div className="tools_hints"><span>Select category <font>*</font></span></div>
                        <div className="tool_mechinery">
                            <select className="makeMeList">
                                <option value=''> Select one </option>
                               {this.listCategory()}
                            </select>
                        </div>
                    </div>

                </div>
            )
        }
    }

    privacyTemplate (){

        if(typeof changeablePrivacy !== 'undefined'){

            if(changeablePrivacy === true){
                return (


                        <div className="privacy_select">
                            <div className="post-drop-popup" id="drop1">
                                <div className="post-drop-pop">
                                    <a href="#"  onClick={this.togglePrivacy.bind(this,0)} data-value="{this.global}"
                                       className="pricays" data-testid="">Global</a>
                                    <a href="#"  onClick={this.togglePrivacy.bind(this,1)} data-value="{this.friend}"
                                       className="pricays" data-testid="">Friend</a>
                                    <a href="#"  onClick={this.togglePrivacy.bind(this,2)} data-value="{this.onlyme}"
                                       className="pricays" data-testid="">Onlyme</a>
                                </div>
                            </div>
                        </div>



                )
            }


        }

        else{
            return (

                     <div className="privacy_select">
                        <div className="post-drop-popup" id="drop1">
                            <div className="post-drop-pop">
                                <a href="#"  onClick={this.togglePrivacy.bind(this,0)} data-value="{this.global}"
                                   className="pricays" data-testid="">Global</a>
                                <a href="#"  onClick={this.togglePrivacy.bind(this,1)} data-value="{this.friend}"
                                   className="pricays" data-testid="">Friend</a>
                                <a href="#"  onClick={this.togglePrivacy.bind(this,2)} data-value="{this.onlyme}"
                                   className="pricays" data-testid="">Onlyme</a>
                            </div>
                        </div>
                    </div>

            )
        }
    }

    afterTimeOut (){

        alert()
    }






    Postbox () {

        if(typeof showpostbox !== 'undefined'){

            if(this.state.showbox === 0){

           }

            else if (this.state.showbox === 1) {

                return null


            } else {
                return null
            }

        }

        const shortcuts = {
            'Today': moment(),
            'Yesterday': moment().subtract(1, 'days'),
            'Clear': ''
        };




        let cl = (perticipate === 1) ? "cmod" : "nmod";
        let sl = (perticipate === 1) ? "" : "none";

        //const ClassNames = ();

        return (<div id="postbox" className={"from_area "+cl}>
        <div className="aaa_header">
          <div className="aaa_controler">
            <div className="controler">
              <div id="switch" onClick={this.changeTab} className="switch">
                <div id="mode" className="chmode">Postmode</div>
              </div>
            </div>
            <div className="controler_instraction">
              <p className="p1">Create your challenge swipe the button</p>
			  <p className="p2">Edit your post <font>this is beta version</font></p>
            </div>
          </div>
        </div>
        <div className={"tab_layout "+sl}>
          <div className="tab_Adapter">
            <div className="tab_items">



                {this.tabItems()}



            </div>
          </div>
          <div className="tab_instractions">
            <div className="hints">
              <p>*All are mendatory</p>
            </div>
          </div>
        </div>
        <div className="form_layout">
          <div className="forms_sec">
            <div className="forms_adapter">
              <div className="form_item block">

                <Editor/>

              </div>
              <div className="form_item none">
                <div contentEditable="true" id="xhcp_title" className="edit_form_div" placeholder="Title write here"></div>
              </div>
              <div className="form_item none">
                  <TagsInput value={this.state.tags} onChange={this.handleChange} />
              </div>
            </div>
          </div>

            <div className="post-anonomyus-check">
                <p>Honest views</p>

                <input type="checkbox"  name="custom_checkbox"  id="custom_checkbox1"
                       onChange={this.fromchange}/>
                <label htmlFor="custom_checkbox1" onClick={this.toggleCommentmode} ></label>

            </div>
        </div>
        <div className="upload_section">
          <div className="upload_adapter">
            <div className="upload_items">
			<div className="additems" onMouseDown={this.setForall} onClick={this.getVideoandImage}>
                <div className="additems_box">
                	<i className="icon icon-add"></i>
                </div>
            </div>
             </div>
          </div>
        </div>

                {this.photographytools()}

                {this.talentpostcreateTemplate()}




            <div className="tu none">
          <div id="mhgdfye" className="basic_interface but_scrren_dark functionnality none">
            <div className="nofreedom">
              <p>Choose type of challenge you create</p>
            </div>
            <div className="freedomarea">
              <div className="radio tickinstalled" data-value="{0}" onClick={this.radiochange()}>
                <div className="dw_r"><i className="frex"></i></div>
                <span>Friend</span>
                <div className="clearfix"></div>
              </div>

              <div className="radio" data-value="{2}" onClick={this.radiochange()}>
                <div className="dw_r"><i className="frex"></i></div>
                <span>Global</span>
                <div className="clearfix"></div>
              </div>
            </div>


              <div className="soc">
              <div className="nofreedom">
                <p>Participation Time</p>
              </div>
              <div className="freedomarea">
				<div className="field">
                    {this.datePickerwindow()}
				</div>
              </div>
            </div>



          </div>
        </div>

        <div id="postertype" data-value="this.post">
          <div className="soc none lo_interface" id="tag_con">
            <div className="nofreedom inpostmode">
              <p>Tag to your friends</p>
            </div>
              <Posttag ref={input1 => this.input1 = input1}/>
          </div>
        </div>

        <div className="p_controler">
          <div className="left_contoler_switches">
            <div id="photoupload" className="switchers responive_upload" onMouseDown={this.setForimage} onClick={this.getImg}> <i className="icon icon-picture-3"></i>
              <input onChange={this.uploadImg} accept="image/*" type="file" multiple id="image_opener"/>
              <span>Image</span> </div>
            <div id="tag_friend" onClick={this.toggleTagdrawer} className="switchers responive_upload"> <i className="icon icon-tag"></i>
              <input type="file" id=""/>
              <span>Tag friend</span> </div>
            <div className="switchers responive_upload" id="emj"  onClick={this.getVideo}> <i className="icon icon-smile"></i>
              <input type="file" id="video_opener" multiple onChange={this.uploadvideo} accept="video/*"/>
              <span>Video</span></div>
            <div className="clearfix"></div>
          </div>
          <div className="right_contoler_switches">

              <div className="post_privacyedit">

                {this.privacyLayout()}

              </div>






            <div className="actioner" onClick={this.cancelPost}>Cancel</div>
            <div className="actioner active" id="submitpost" onClick={this.newpost}>Post</div>
          </div>
        </div>
      </div>

    )}

    fromchange (){
        return ''
    }

    render (){
        return this.Postbox()
    }

}