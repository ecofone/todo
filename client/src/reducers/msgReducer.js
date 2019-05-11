
export default function (state = null, action) {
    return (action.payload && action.payload.messages) || state ;

}