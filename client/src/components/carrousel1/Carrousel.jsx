import "./carrousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper/modules";
import image1 from "../../assets/foods1.jpg";
import image2 from "../../assets/foods2.jpg";
import image3 from "../../assets/foods3.jpg";

const Carrousel = () => {
  return (
    <div className="carou12">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Parallax]}
        navigation={true}
        speed={600}
        autoplay = {{
          delay: 5000
        }}
        className="myswiper"
        centeredSlides={true}
        loop={true}
        pagination={true}
        parallax={true}
      >
        <SwiperSlide>
          <img src={image1} alt="Not found" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} alt="Not found" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image3} alt="Not found" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carrousel;
