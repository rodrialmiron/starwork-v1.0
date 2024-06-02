import Tabla from "./Tabla";

export const Detail = ({ user }) => {
  return (
    <div className="p-2 bg-gray-50 rounded-xl shadow-md overflow-auto dark:bg-gray-600 w-5/6">
      <details>
        <summary className="flex justify-between items-center px-4 bg-gray-50 dark:bg-gray-600 dark:text-white rounded-md cursor-pointer font-semibold ">
          {user.firstName + " " + user.lastName}
          <span className="flecha">▾</span>
        </summary>
        <p>
          <Tabla user={user} />
        </p>
      </details>
    </div>
  );
};