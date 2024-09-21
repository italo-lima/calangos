import { Slide } from 'react-slideshow-image';

const imgs = [
  'photo-01.jpg',
  'photo-02.jpg',
  'photo-03.jpg',
  'photo-04.jpg',
  'photo-05.jpg',
  'photo-06.jpg',
];

export const Gallery = () => {
  return (
    <div className="pt-12" id="adventures">
      <div className="flex flex-col px-5">
        <h1 className="text-3xl font-semibold">
          Um pouco das nossas aventuras
        </h1>
        <div>
          <span className="mt-2 block text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
        <div className="my-2">
          <Slide arrows={false} indicators={true}>
            {imgs.map((img) => (
              <div className="each-slide-effect" key={img}>
                <div
                  style={{
                    backgroundImage: `url(${img})`,
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </div>
  );
};
