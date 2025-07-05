import { useRouter } from "next/navigation";

const SuccessView = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" text-center p-6 rounded-md shadow-md border border-gray-300">
        <h1 className="text-2xl font-semibold mb-2"> Pembayaran Berhasil</h1>
        <button
          className="cursor-pointer bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out"
          type="button"
          onClick={() => push("/member/order")}
        >
          Cek Orderanmu Disini
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
