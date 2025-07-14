import React, { useLocation, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import InfoCarrousel from './Info-Carrousel';

const Carrousel = (props) => {
    const { images } = props;
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="carrousel-container">
            <Swiper
                modules={[Navigation, EffectCoverflow, Autoplay]}
                navigation
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                slidesPerView={3}
                spaceBetween={50}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                className="carrousel-swiper"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index} onClick={() => {
                        navigate(`/details/${img.id}?type=${img.type}`);
                    }}>
                        <div className="carrousel-slide">
                            <div
                                className="carrousel-card"
                                onMouseOver={() => setIsHover(true)}
                                onMouseOut={() => setIsHover(false)}
                            >
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    className="carrousel-img"
                                />
                                {isHover && (
                                    <InfoCarrousel movie={img} />
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carrousel;
