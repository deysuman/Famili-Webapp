
import Togglepostdiv from "./Postbox";

export function Changemode() {
    for (let Ge = document.getElementsByClassName('opentabs'), Qe = 0; Qe < Ge.length; Qe++) Ge[Qe].addEventListener('mousedown', function() {
        for (let Ke = 0; Ke < Ge.length; Ke++) Ge[Ke].classList.remove('activetab');
        this.classList.add('activetab')
    }, !1)

    Togglepostdiv();
}

export default Changemode