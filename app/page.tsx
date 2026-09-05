import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Hero, HeroFacts } from "@/components/Hero";
import { Notice } from "@/components/Notice";
import { FieldNotes } from "@/components/FieldNotes";
import { Question } from "@/components/Question";
import { Test } from "@/components/Test";
import { Connect } from "@/components/Connect";

export default function HomePage() {
  return (
    <>
      <Masthead />
      <main id="main">
        <Hero />
        <HeroFacts />
        <Notice />
        <FieldNotes />
        <Question />
        <Test />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
