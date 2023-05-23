import "swiper/css";
import "./Slider.scss";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { SliderMovie } from "@/types";
import { Link } from "react-router-dom";
import { API_IMAGE_POSTER } from "@/consts";
import { FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface PopularMoviesProps {
  title: string;
  movies: SliderMovie[];
}

export const Slider = ({ movies, title }: PopularMoviesProps) => {
  return (
    <div className="Popular">
      <h3 className="Popular-title">{title}</h3>
      <Swiper
        freeMode
        navigation
        spaceBetween={25}
        slidesPerView={7}
        modules={[Navigation, FreeMode]}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 3,
          },
          800: {
            slidesPerView: 4,
          },
          1100: {
            slidesPerView: 5,
          },
          1300: {
            slidesPerView: 6,
          },
          1920: {
            slidesPerView: 7,
          },
        }}
      >
        {movies.map((movie, index: number) => (
          <SwiperSlide key={index}>
            <Link to={`movie/${movie.id}`}>
              <img
                className="Swiper-img"
                src={`${API_IMAGE_POSTER}${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
