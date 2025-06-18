"use client";
import Modal from "@/components/ui/Modal/Modal";
import userServices from "@/services/users";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptype = {
  profile: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: number;
  showToast: any;
  setProfile: Dispatch<SetStateAction<any>>;
};

const ModalChangeAddress = (props: Proptype) => {
  const {
    setProfile,
    setChangeAddress,
    profile,
    setSelectedAddress,
    selectedAddress,
    showToast,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [updateAddress, setUpdateAddress] = useState<number>();

  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      address: [
        ...(profile.address ?? []),
        {
          recipient: form.recipient.value,
          phone: form.phone.value,
          addressLine: form.addressLine.value,
          note: form.note.value,
          isMain: false,
        },
      ],
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        showToast("Berhasil Tambah Alamat", "success");
      }
    } catch (error) {
      setIsLoading(false);
      showToast("Gagal Tambah Alamat", "danger");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const address = profile.address;
    address.splice(id, 1);
    const data = {
      address,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        showToast("Berhasil Hapus Alamat", "success");
      }
    } catch (error) {
      setIsLoading(false);
      showToast("Gagal Hapus Alamat", "danger");
    }
  };

  const handleChangeMainAddress = async (id: number) => {
    const address = profile.address;
    address.forEach((item: { isMain: boolean }, index: number) => {
      if (index === id) {
        item.isMain = true;
      } else {
        item.isMain = false;
      }
    });
    const data = {
      address,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        showToast("Berhasil Ganti Main Alamat", "success");
      }
    } catch (error) {
      setIsLoading(false);
      showToast("Gagal Ganti Main Alamat", "danger");
    }
  };

  const handleChangeAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const address = profile.address;
    const id = updateAddress || 0;
    address[id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: false,
    };
    const data = {
      address,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setUpdateAddress(undefined);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        showToast("Berhasil Tambah Alamat", "success");
      }
    } catch (error) {
      setIsLoading(false);
      showToast("Gagal Tambah Alamat", "danger");
    }
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className="text-2xl font-bold">Ganti Alamat Pengiriman</h1>
      {profile?.address?.map((item: any, id: number) => (
        <div key={item.addressLine}>
          <div
            className={`mt-3 w-full border flex border-gray-300 p-5 rounded-sm hover:bg-gray-100 transition duration-300 ease-in-out ${
              id === selectedAddress
                ? "border-2 bg-gray-100 border-yellow-500"
                : ""
            }`}
          >
            <div
              className="w-full cursor-pointer"
              onClick={() => {
                setSelectedAddress(id);
                setChangeAddress(false);
                handleChangeMainAddress(id);
              }}
            >
              <h1 className="font-semibold text-sm mb-1">
                Penerima: {item.recipient}
              </h1>
              <p className="text-sm mb-1 capitalize">No Telp: {item.phone}</p>
              <p className="text-sm mb-1 capitalize">
                {" "}
                Alamat: {item.addressLine}
              </p>
              <p className="text-sm capitalize">Note: {item.note}</p>
            </div>
            <div>
              <button
                name="delete"
                type="button"
                className={`cursor-pointer bg-red-500  text-white  rounded-sm h-[40px] w-[40px] ${
                  isLoading || id === selectedAddress
                    ? "opacity-50 hover:bg-red-500"
                    : ""
                }`}
                onClick={() => handleDeleteAddress(id)}
                disabled={isLoading || id === selectedAddress}
              >
                <i className="bx  bxs-trash text-[20px]" />
              </button>
              <button
                name="delete"
                type="button"
                className={`cursor-pointer bg-yellow-500 mt-2 text-white  rounded-sm h-[40px] w-[40px] `}
                onClick={() =>
                  id === updateAddress
                    ? setUpdateAddress(undefined)
                    : setUpdateAddress(id)
                }
                disabled={isLoading}
              >
                <i className="bx  bx-pencil"></i>
              </button>
            </div>
          </div>
          {id === updateAddress && (
            <div className="mt-5">
              <form onSubmit={handleChangeAddress}>
                <label className="text-sm">Penerima</label>
                <input
                  type="text"
                  name="recipient"
                  placeholder="Penerima"
                  className="bg-gray-200 p-2 rounded-sm w-full mb-1 text-sm capitalize"
                  defaultValue={item.recipient}
                />
                <label className="text-sm">No Telp</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="No Telp"
                  className="bg-gray-200 p-2 rounded-sm w-full mb-1 text-sm capitalize"
                  defaultValue={item.phone}
                />
                <label className="text-sm">Alamat</label>
                <textarea
                  name="addressLine"
                  placeholder="Alamat"
                  className="bg-gray-200 p-2 rounded-sm w-full mb-1 text-sm h-20 resize-none capitalize"
                  defaultValue={item.addressLine}
                />
                <label className="text-sm">Catatan</label>
                <input
                  type="text"
                  name="note"
                  placeholder="Catatan"
                  className="bg-gray-200 p-2 rounded-sm w-full mb-1 text-sm capitalize"
                  defaultValue={item.note}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white text-sm bg-yellow-500 px-2 rounded-sm mt-5 py-2 cursor-pointer"
                >
                  {isLoading ? "Loading..." : "Simpan"}
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => setIsAddNew(!isAddNew)}
        className="text-white text-sm bg-yellow-500 px-2 rounded-sm mt-5 py-2 cursor-pointer"
      >
        {isAddNew ? "Batal" : "Tambah Alamat Baru"}
      </button>

      {isAddNew && (
        <div className="mt-5">
          <form onSubmit={handleAddAddress}>
            <label className="text-sm">Penerima</label>
            <input
              type="text"
              name="recipient"
              placeholder="Penerima"
              className="bg-gray-200 p-2 rounded-sm w-full mb-1 text-sm capitalize"
            />
            <label className="text-sm">No Telp</label>
            <input
              type="text"
              name="phone"
              placeholder="No Telp"
              className="bg-gray-200 p-2 rounded-sm w-full mb-1 text-sm capitalize"
            />
            <label className="text-sm">Alamat</label>
            <textarea
              name="addressLine"
              placeholder="Alamat"
              className="bg-gray-200 p-2 rounded-sm w-full mb-1 text-sm h-20 resize-none capitalize"
            />
            <label className="text-sm">Catatan</label>
            <input
              type="text"
              name="note"
              placeholder="Catatan"
              className="bg-gray-200 p-2 rounded-sm w-full mb-1 text-sm capitalize"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="text-white text-sm bg-yellow-500 px-2 rounded-sm mt-5 py-2 cursor-pointer capitalize"
            >
              {isLoading ? "Loading..." : "Simpan"}
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default ModalChangeAddress;
