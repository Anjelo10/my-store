import React from "react";
import { assets } from "@/components/asset/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            Kami melestarikan cita rasa asli camilan tradisional Orang Kei.
            Dengan bahan dasar ketela pohon dan proses pembuatan yang telaten
            serta panjang, setiap gigitan menghadirkan kelezatan otentik dan
            warisan rasa Daerah.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Kesyang</h2>
            <div className="text-sm space-y-2">
              <p>0852-4353-6699</p>
              <p>kesyang@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
