import { useGetMovies } from "@/hooks";
import { Slider, Carousel, Navbar } from "@/components";

export const Home = () => {
  const { carousel, popular, topRated } = useGetMovies();

  return (
    <>
      <Navbar />
      {carousel.length && <Carousel carousel={carousel} />}
      {popular.length && (
        <Slider movies={popular.slice(0, 15)} title={"Populares"} />
      )}
      {topRated.length && (
        <Slider movies={topRated.slice(0, 15)} title={"En emisión"} />
      )}
    </>
  );
};

export default Home;
