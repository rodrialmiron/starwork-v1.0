
const useHandleCheck = (state,setState) => {
    return (event) => {
        const userId = parseInt(event.target.value);
        if(!state.includes(userId)){
            setState([...state,userId])
        }else{
            setState(state.filter((id) => id !== userId));
        }
    }
}

export default useHandleCheck