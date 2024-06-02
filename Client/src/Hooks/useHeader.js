export const useHeader = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    return {
        headers: {
            auth: `Bearer ${token}` 
        }
    }
}