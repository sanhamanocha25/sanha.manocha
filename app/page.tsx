import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Hero, HeroFacts } from "@/components/Hero";
import { About } from "@/components/About";
import { CurrentWork } from "@/components/CurrentWork";
import { Built } from "@/components/Built";
import { Path } from "@/components/Path";
import { Education, Recognition, Toolkit } from "@/components/Codebook";
import { FieldNotes } from "@/components/FieldNotes";
import { Connect } from "@/components/Connect";

export default function HomePage() {
  return (
    <>
      <Masthead />
      <main id="main">
        <Hero />
        <HeroFacts />
        <About />
        <CurrentWork />
        <Built />
        <Path />
        <Education />
        <Toolkit />
        <Recognition />
        <FieldNotes />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
