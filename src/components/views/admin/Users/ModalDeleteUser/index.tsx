import Modal from "@/components/ui/Modal/Modal";
import userServices from "@/services/users";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const handleDeleteUser = async () => {
    userServices.deleteUser(deletedUser.id);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className="text-2xl font-bold">Are You Sure?</h1>
      <button
        type="button"
        className=" mt-3 cursor-pointer bg-yellow-500 text-white px-2 rounded-sm py-1 flex items-center justify-center"
        onClick={() => handleDeleteUser()}
      >
        Delete
      </button>
    </Modal>
  );
};

export default ModalDeleteUser;
