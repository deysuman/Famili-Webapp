export function Togglereadmore(Element) {
    $(Element)
        .parent()
        .prev()
        .toggle(),
        $(Element)
            .prev()
            .toggle(),
        Element.remove()
}

export default Togglereadmore