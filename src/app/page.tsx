// Importing Components
import HeroVideo from "./components/sections/HeroVideo";
import Counters from "./components/sections/Counters";
import OurProjects from "./components/sections/OurProjects";
import OurTeam from "./components/sections/OurTeam";
import Contacts from "./components/sections/Contacts";
import Testimonials from "./components/sections/Testimonials";
import FAQs from "./components/sections/FAQs";

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <Counters />
      <OurProjects />
      <OurTeam />
      <Testimonials/>
      <FAQs />
      <Contacts />
    </main>
  );
}
