import ProductCard from "@/components/views/PageInSeles/ProductCard";
import Navbar from "../components/fragments/Navbar/Navbar";
import HomePage from "../components/views/PageInSeles/HomePage";
import ContactPage from "@/components/views/PageInSeles/ContactPage";
import Footer from "@/components/views/PageInSeles/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <ProductCard />
      <ContactPage />
      <Footer />
    </>
  );
}
