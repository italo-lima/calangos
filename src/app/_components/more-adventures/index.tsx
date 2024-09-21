import Image from 'next/image';
import { Card } from '../ui/card';

export const MoreAdventures = () => {
  return (
    <div className="py-12 px-4">
      <Card className="rounded-3xl">
        <div className="flex flex-col">
          <div className="relative h-80 w-full">
            <Image
              className="rounded-t-3xl"
              alt="2 homens andando em meio a catinga"
              src="/more-adventure.jpg"
              fill
              objectFit="cover"
            />
          </div>
          <div className="px-4 pt-6 pb-8 bg-primary text-gray-50 rounded-b-3xl">
            <div className="relative h-8 w-20">
              <Image alt="Logo da Calango" src="/logo-calangos.png" fill />
            </div>
            <h1 className="text-3xl mt-4">Mais aventura em cada trilha</h1>
            <p className="mt-4 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio laboriosam modi ducimus, ea soluta porro fuga tempore
              ut cum architecto magnam voluptates dignissimos ad ex? Natus, qui.
              Non, accusantium ut!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
