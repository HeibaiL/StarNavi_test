
export const revertFromCamelCase = arg => {
    return arg.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
}

export const getDate = () => {
    let today = new Date();
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
    const monthName = today.toLocaleString("default", {month: "long"});
    const year = today.getFullYear();
    const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
    const time = hours + ":" + minutes;

    return `${time}  ${day} ${monthName} ${year}`
}

export const validate = (modeChosen, name, setMessage) => {
    if (!modeChosen && !name) {
        setMessage(" Please, choose the game mode and type your name in!")
        return false
    } else if (!modeChosen) {
        setMessage("Please, choose the game mode!")
        return
    } else if (!name) {
        setMessage("Please, type your name in!")
        return false
    }
    return true
}