import { assets } from "@/components/asset/assets";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="grid lg:grid-cols-2 items-center justify-center h-screen w-full sm:p-0">
      <div className="hidden lg:flex flex-col items-center justify-center h-full">
        <div className="bg-color w-full h-full  bg-login"></div>
      </div>

      <div className="bg-yellow-50 w-full h-full  bg-color">
        <div className="flex flex-col  h-full justify-center items-start">
          <h1 className="text-4xl font-bold w-full mb-3 mt-10 text-shadow px-[5vh] md:px-[10vh]">
            <span className="text-white">Tentang</span> Kami
          </h1>
          <p className="text-justify text-sm  md:text-base lg:text-md px-[5vh] md:px-[10vh] lg:pr-[20vh]  text-white">
            UMKM Kes Yang bermula pada April 2019 dengan nama Enbal Kenari
            Rifki. Produk awal berupa enbal kenari menghadapi tantangan harga
            bahan baku tinggi (enbal lokal dan kenari dari Banda Neira) serta
            kemasan sederhana, yang mengakibatkan kesulitan dalam menentukan
            harga jual yang menguntungkan. Memasuki tahun 2022, pemilik
            melakukan perubahan signifikan. Nama diubah menjadi Kes Yang, ukuran
            enbal diperkecil, dan kemasan ditingkatkan menjadi lebih menarik,
            sekaligus memenuhi standar legalitas produk kuliner untuk
            meningkatkan kepercayaan konsumen. Saat ini, di tahun 2024, Kes Yang
            memiliki 10 karyawan tetap dengan produksi rutin, dan berencana
            menambah tenaga kerja untuk memenuhi permintaan pasar.
          </p>
          <Link href="#contact">
            <button className="bg-white text-yellow-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out m-5 mx-[5vh] md:mx-[10vh] cursor-pointer">
              Contact
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
