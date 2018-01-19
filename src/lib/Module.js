export  function id(x) {
        return document.getElementById(x);
}

export function c(x) {
    return document.getElementsByClassName(x);
}

export function ClickgetImg(x) {
    id(x).click()
}

export function isInArray(Ge,Qe){return-1<Qe.indexOf(Ge)}

export default id