import { Footer } from "@/components/Footer";
import Hero from "@/components/Homepage/Hero";
import { Navbar } from "@/components/Navbar";
import { Grid } from "lucide-react";

function Homepage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Grid />
      <Footer />
    </div>
  );
}

export default Homepage;
