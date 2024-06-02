export const SelectedUsers = ({ user, changeStatusUser }) => {
  return (
    <div>
      <p>{user.firstName + " " + user.lastName}</p>
      {changeStatusUser && <p>{user.status === true ? "Habilitado" : "Inhabilitado"}</p>}
    </div>
  );
};
