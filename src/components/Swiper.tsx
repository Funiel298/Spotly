import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface MusicSwiperProps {
  title: string;
  items: any[];
}

const MusicSwiper: React.FC<MusicSwiperProps> = ({ title, items }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Swiper spaceBetween={10} slidesPerView={5}>
        {items?.map((item, index) => (
          <SwiperSlide key={index}>
            <div onClick={item.action} className="p-4 bg-gray-100 rounded-lg shadow-lg">
              <img src={item.picture} alt={item.title} className="mb-2 rounded-lg" />
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.artist.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MusicSwiper;
