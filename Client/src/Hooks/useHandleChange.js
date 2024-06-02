
// setState es la funcion que setea los estados
const useHandleChange = (state,setState) => {
    return (event) => {
    setState({
        ...state,
        [event.target.name] : event.target.value
    })
   }
};

export default useHandleChange