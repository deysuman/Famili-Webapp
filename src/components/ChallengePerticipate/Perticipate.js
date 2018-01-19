import React,{Component} from "react"
import Peoplelist from "../People/Peoplelist";
import Ajax from "../../lib/ajax";
import {URLS} from "../../constants/api"
import Countdown from "../Countdown/Countdown"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ReactTooltip from 'react-tooltip';





export default class Perticipate extends Component{


    constructor(props){
        super(props);

        this.state = {
            post : true,
            info : false,
            perticiperter : [],
            activenotification : true

        }

        this.ShowInfo = this.ShowInfo.bind(this);
        this.Showposts = this.Showposts.bind(this);
    }


    Showposts (){

        this.setState({
            post : true,
            info : false
        })

        this.props.showpost();

    }



    ShowInfo ()
    {

        this.setState(
            {
            post : false,
            info : true
            }
        )

        this.props.showinfo();

    }

    handleClick(e, data)
    {
        console.log(data);
    }

    onClicks(targetNode, ref, data) {
        // targetNode refer to the html node on which the menu is triggered
        console.log(targetNode);
        //ref will be the mounted instance of the wrapped component
        //If you wrap more than one component, ref will be an array of ref
        console.log(ref);
        // Additionnal data props passed down to the `Item`
        console.log(data);
    }



    Timer ()
    {
        if(typeof showcountdown !== 'undefiend') {

            if(showcountdown == 0) {

                let label = 'Voteing will be start on';

                if(typeof  showpostbox !== 'undefiend'){

                    if(showpostbox === 0){

                        label = 'Voteing will be start on and Perticipate end on'
                    }



                    else {

                        label = 'Voteing will be start on';
                    }

                    if(action_active===0){

                        label = 'Voteing will be end on';

                    }



                }

                let uitime = challengestarttime;

                let is_notifi = this.state.activenotification;


                return (

                    <div className="Countdown_sec">

                        <p className="s3usjd">{label}</p>

                            <ContextMenuTrigger id="secuirty_send_vote_start_notification">
                                <i data-tip data-for='notfication_req' className="icon icon-notification-bell"></i>

                                <ReactTooltip id='notfication_req' effect='solid'>
                                    <span>(Right click to option)</span>
                                </ReactTooltip>

                            </ContextMenuTrigger>

                            <ContextMenu id="secuirty_send_vote_start_notification">
                                <MenuItem disabled={true}>
                                    Notification
                                </MenuItem>

                                <MenuItem divider />

                                <MenuItem>
                                    Yes
                                </MenuItem>
                                <MenuItem>
                                    No
                                </MenuItem>
                            </ContextMenu>



                        <Countdown date={uitime}/>

                    </div>
                )

            }

        }

    }


    Layouts() {

        const checkInfo = this.state.info;
        const checkPost = this.state.post;


        return (

            <div>
                <div className="search-tab-box">
                    <div className="search-tab-box-content">
                        <button ref="posts" onClick={this.Showposts} className={checkPost ? "search-tab-active" : null} type="button">Posts
                        </button>
                        <button ref="information" onClick={this.ShowInfo} className={checkInfo ? "search-tab-active" : null} type="button">
                            Information
                        </button>
                    </div>
                </div>

                {this.Timer()}


                {this.Template()}

            </div>
        )

    }



    Perticiperters (){

        const items = this.state.perticiperter;

        const item = items.map((item) => {
            return <Peoplelist value={item} key={Math.random()}/>
        });

        return (

            <div className="tyhd">

                <div className="format">

                    <aside>

                        <h1>Pericipeters</h1>

                    </aside>

                    <aside>

                     <i className="icon-security serr" data="privacy"></i>

                    </aside>

                </div>

                <div className="peoplesarea">

                     {item}

                </div>

            </div>
        )

    }


    GetpertipaterLists(){

        let data = "postid="+this.props.postid;

        let reactThis = this;

        Ajax(URLS.PERTICIPETERS, data, reactThis, function(data) {



            for(let i=0;i<data.users.length;i++){

                reactThis.state.perticiperter.unshift(data.users[i]);



            }

            reactThis.setState({
                perticiperter :reactThis.state.perticiperter
            })


        });


    }


    componentDidMount(){

        this.GetpertipaterLists();

    }







    Template () {

            if(this.state.info){
                return (
                    <div>
                        {this.Perticiperters()}
                    </div>
                )
            }
     }






    render (){

        return this.Layouts()

    }


}