export const useRole = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;

    if(role === 1) return "admin"
    if(role === 2) return "supervisor"
    if(role === 3) return "collaborator"
}