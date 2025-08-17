// Importing Components
import HeroVideo from "./components/sections/HeroVideo";
import Counters from "./components/sections/Counters";
import OurProjects from "./components/sections/OurProjects";
import OurTeam from "./components/sections/OurTeam";

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <Counters />
      <OurProjects />
      <OurTeam />
    </main>
  );
}
