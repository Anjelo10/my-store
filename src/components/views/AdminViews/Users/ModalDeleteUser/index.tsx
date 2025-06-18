"use client";
import Modal from "@/components/ui/Modal/Modal";
import userServices from "@/services/users";
import { User } from "@/type/users.type";
import { Dispatch, SetStateAction, use, useState } from "react";

type Proptype = {
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  showToast: any;
};

const ModalDeleteUser = (props: Proptype) => {
  const { deletedUser, setDeletedUser, setUsersData, showToast } = props;
  const [isLoading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    const result = await userServices.deleteUser(deletedUser.id);
    if (result.status === 200) {
      setLoading(false);
      showToast("User berhasil dihapus", "success");
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setLoading(false);
      showToast("User gagal dihapus", "danger");
    }
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className="text-2xl font-bold">Are You Sure?</h1>
      <button
        type="button"
        className=" mt-3 cursor-pointer bg-yellow-500 text-white px-2 rounded-sm py-1 flex items-center justify-center"
        onClick={() => handleDeleteUser()}
      >
        {isLoading ? "Deleting..." : "Yes, Delete"}
      </button>
    </Modal>
  );
};

export default ModalDeleteUser;
