"use client";
import Modal from "@/components/ui/Modal/Modal";
import Select from "@/components/ui/Select/Select";
import userServices from "@/services/users";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };
    try {
      const result = await userServices.updateUser(updatedUser.id, data);
      console.log("Berhasil update:", result);
    } catch (error) {
      console.error("Gagal update:", error);
      setError("Update gagal");
    } finally {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    }
  };
  return (
    <div>
      <Modal onClose={() => setUpdatedUser({})}>
        <h1 className="text-2xl font-bold pt-2">Update Users</h1>

        <form onSubmit={handleUpdateUser}>
          <label className="flex flex-col py-2">
            {<h1 className="text-sm mx-2">Email</h1>}
            <input
              type="text"
              name="email"
              defaultValue={updatedUser.email}
              disabled
              className="bg-gray-200 p-3 rounded-sm opacity-50"
            />
          </label>
          <label className="flex flex-col py-2">
            {<h1 className="text-sm mx-2">Email</h1>}
            <input
              type="text"
              name="email"
              defaultValue={updatedUser.fullname}
              disabled
              className="bg-gray-200 p-3 rounded-sm opacity-50 "
            />
          </label>
          <label className="flex flex-col py-2">
            {<h1 className="text-sm mx-2">Email</h1>}
            <input
              type="text"
              name="email"
              defaultValue={updatedUser.role}
              disabled
              className="bg-gray-200 p-3 rounded-sm opacity-50 "
            />
          </label>
          <Select
            label="Role"
            name="role"
            defaultValue={updatedUser.role}
            options={[
              { label: "Admin", value: "admin" },
              { label: "Member", value: "member" },
            ]}
          />
          <button
            type="submit"
            className="cursor-pointer flex my-3 items-center gap-2 hover:bg-yellow-600 transition bg-yellow-500 py-1 px-2 rounded-md"
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUpdateUser;
