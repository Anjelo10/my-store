import ProductCard from "@/components/views/PageInSeles/ProductCard";
import Navbar from "../components/fragments/Navbar/Navbar";
import HomePage from "../components/views/PageInSeles/HomePage";
import ContactPage from "@/components/views/PageInSeles/ContactPage";
import Footer from "@/components/views/PageInSeles/Footer";
import AboutPage from "@/components/views/PageInSeles/AboutPage";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <ProductCard />
      <AboutPage />
      <ContactPage />
      <Footer />
    </>
  );
}
