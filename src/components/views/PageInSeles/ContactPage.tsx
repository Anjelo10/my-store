import { IoLocationOutline } from "react-icons/io5";

const ContactPage = () => {
  return (
    <div id="contact">
      <div className="w-full h-[400px] bg-contact flex justify-center items-center flex-col">
        <h1 className="text-white text-4xl sm:text-6xl font-bold text-center w-full mb-3 ">
          Kotak Kami
        </h1>
        <p className="text-white text-xs sm:text-sm sm:w-[80vh]  w-[40vh] text-justify ">
          Untuk pertanyaan terkait layanan, dukungan teknis, atau kolaborasi,
          silakan hubungi kami melalui Kontak yang tersedia. Kami berkomitmen
          untuk memberikan respons yang cepat dan informatif
        </p>
      </div>
      <div>
        <div className="flex items-center flex-col">
          <h1 className="sm:text-4xl text-2xl font-bold text-center w-full mb-3 mt-10 ">
            <span className="text-yellow-500">Hubungi</span> & bergabung bersama
            kami
          </h1>
          <p className="text-center text-xs sm:w-[80vh] w-[50vh] mb-10">
            Punya ide menarik atau butuh informasi lebih lanjut? Mari kita
            bicara! Tim kami siap mendengarkan dan membantu Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 px-5 gap-6 sm:px-2 lg:px-[60vh] mb-10 ">
          <div className="bg-yellow-500 rounded-md">
            <div className="p-5 items-center flex py-7 flex-col">
              <i className="bx  bx-phone text-4xl text-white pb-5" />
              <h1 className="text-white text-xs">Telp: +628123456789</h1>
              <h1 className="text-white text-xs">Whatsapp: +628123456789</h1>
            </div>
          </div>
          <div className="bg-yellow-500 rounded-md">
            <div className="p-5 items-center flex py-7 flex-col">
              <i className="bx  bx-envelope text-4xl text-white pb-5" />
              <h1 className="text-white text-xs">kesyangkey@gmail.com</h1>
            </div>
          </div>
          <div className="bg-yellow-500 rounded-md">
            <div className="p-5 items-center flex py-7 flex-col">
              <IoLocationOutline className="text-6xl text-white pb-5" />
              <h1 className="text-white text-xs">Rumah Produksi Kesyang</h1>
              <h1 className="text-white text-xs">Desa Ibra, Kec. Kei Kecil </h1>
            </div>
          </div>
        </div>

        <div className="w-full h-[450px] sm:h-[500px] flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63515.868818793024!2d132.72506665899232!3d-5.7502610233269005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d2fe23f62859901%3A0x214c41d19eb6d4e3!2sIbra%2C%20Kec.%20Kei%20Kecil%2C%20Kabupaten%20Maluku%20Tenggara%2C%20Maluku!5e0!3m2!1sid!2sid!4v1750486487919!5m2!1sid!2sid"
            className="w-full h-full border border-yellow-500 "
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
