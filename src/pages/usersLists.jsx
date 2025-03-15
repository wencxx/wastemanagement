import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { connection } from "../config/getConnection";

function UserLists() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adding, setAdding] = useState(false);
  const [users, setUsers] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const addUser = async () => {
    const userData = { name, username, password };
    try {
      setAdding(true);
      const response = await fetch(`${connection()}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(response);
      if (response.ok) {
        console.log("User added successfully");
        fetchUsers(); 
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setAdding(false);
      setName("");
      setUsername("");
      setPassword("");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${connection()}/api/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setDeleting(true);
      const response = await fetch(`${connection()}/api/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("User deleted successfully");
        fetchUsers(); 
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(false);
      setUserToDelete(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full h-full p-5 !lg:p-15 pt-0 space-y-10 overflow-y-auto">
      <h1 className="text-xl lg:text-3xl font-bold tracking-wide text-slate-800">
        Users Data
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <form
          className="w-full lg:w-3/5 border border-gray-300 bg-white shadow rounded-lg h-fit flex flex-col gap-y-5 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            addUser();
          }}
        >
          <h3 className="text-xl font-semibold tracking-wide text-slate-800">
            Add New User
          </h3>
          <div className="flex flex-col gap-y-1">
            <label className="font-medium" htmlFor="name">
              Full name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter full name"
              className="border border-gray-300 pl-2 rounded h-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="font-medium" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              id="username"
              className="border border-gray-300 pl-2 rounded h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              className="border border-gray-300 pl-2 rounded h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="p-2 py-3 bg-slate-900 text-white rounded flex justify-center items-center gap-3"
            type="submit"
            disabled={adding}
          >
            <Send />
            <span>{adding ? "Adding..." : "Add User"}</span>
          </button>
        </form>
        <div className="w-full lg:w-2/5 h-[80dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold tracking-wide text-slate-800">
              User Lists
            </h3>
          </div>
         <div className="flex flex-col gap-y-2">
              {users.length > 0 &&
                users.map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-between items-center border border-gray-300 p-2 rounded"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-800">{user.name}</h4>
                    </div>
                    <div>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => setUserToDelete(user)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              {!users.length && (
                <p className="text-center text-gray-400 text-lg">No users found</p>
              )}
            </div>
         </div>
      </div>
      {userToDelete && (
        <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete {userToDelete.name}?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setUserToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteUser(userToDelete._id)}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLists;
