import {id} from "../../lib/Module"
import {c} from "../../lib/Module"
import Require from "./Require"

let mode = Require.mode;

export function Changetab(){

   if(
        id('switch').classList.toggle('switchOn'),'switch switchOn'==id('switch').className){
        mode=1,
            c('from_area')[0].classList.remove('nmod'),
            id('mode').setAttribute('class','normalmode'),
            id('mode').innerHTML='Challenge',
            //c('post_privacyedit')[0].classList.add('none'),
            c('post_privacyedit')[0].style.display="block",
            id('postertype').classList.add('none'),
            c('from_area')[0].classList.add('cmod'),
            c('opentabs')[0].click(),
            c('tab_layout')[0].classList.remove('none');
            for(let Ge=0;Ge<c('basic_interface').length;Ge++)
                c('basic_interface')[Ge].classList.remove('none');
            id('anonomyous_comment').classList.add('none')


    }
    else{
            c('opentabs')[0].click(),
                mode=0,
                c('from_area')[0].classList.remove('cmod'),
                c('from_area')[0].classList.add('nmod'),
                id('mode').setAttribute('class','chmode'),
                id('postertype').classList.remove('none'),
                id('mode').innerHTML='Postmode';
                for(let Ge=0;Ge<c('basic_interface').length;Ge++)
                    c('basic_interface')[Ge].classList.add('none');
        c('tab_layout')[0].classList.add('none'),
           //c('post_privacyedit')[0].classList.remove('none'),
            id('anonomyous_comment').classList.remove('none')
        }

}

export default Changetab