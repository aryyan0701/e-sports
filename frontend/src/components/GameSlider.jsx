import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const games = [
  { id: 1, name: 'Dote 2', image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/570/capsule_616x353.jpg?t=1714502360' },
  { id: 2, name: 'League of Legends', image: 'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b' },
  { id: 3, name: 'Fortnite', image: 'https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg' },
  { id: 4, name: 'Dote 2', image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/570/capsule_616x353.jpg?t=1714502360' },
  { id: 5, name: 'League of Legends', image: 'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b' },
  { id: 6, name: 'Fortnite', image: 'https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg' },
  // Add more games as needed
];

const GameSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {games.map((game) => (
        <div key={game.id}>
          <div className="p-4 border border-gray-200 rounded-md">
            <img src={game.image} alt={game.name} className="w-full h-auto rounded-md" />
            <p className="text-center mt-2">{game.name}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default GameSlider;
