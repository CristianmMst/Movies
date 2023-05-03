import { useGetMovies } from "@/hooks";
import { useAppSelector } from "@/hooks/redux";
import { Slider, Carousel, Navbar } from "@/components";

export const Home = () => {
  const { carousel } = useAppSelector((state) => state.movies);
  const { popular, topRated } = useAppSelector((state) => state.movies);

  useGetMovies();

  return (
    <>
      <Navbar />
      {carousel.length ? <Carousel carousel={carousel} /> : null}
      {popular.length && (
        <Slider movies={popular.slice(0, 10)} title={"Populares"} />
      )}
      {topRated.length && (
        <Slider movies={topRated.slice(0, 10)} title={"En emisión"} />
      )}
    </>
  );
};

export default Home;
