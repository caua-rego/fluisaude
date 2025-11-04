import AnimatedIntro from "./AnimatedIntro";
import ComparisonSection from "./ComparisonSection";
import Footer from "./Footer";

const ScrollAnimationSection = () => {
  return (
    <>
      <section className="relative bg-background overflow-hidden rounded-2xl">
        <AnimatedIntro />
      </section>
      <ComparisonSection />
      <Footer />
    </>
  );
};

export default ScrollAnimationSection;
