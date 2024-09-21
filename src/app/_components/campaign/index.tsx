import { Button } from '../ui/button';

export const Campaign = () => {
  return (
    <div className="bg-primary px-4 py-10 text-gray-50 text-center">
      <h1 className="text-3xl font-semibold pb-4">Campanha solidária</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        inventore, porro totam iure non mollitia esse numquam voluptas, beatae
        laudantium deserunt, velit tenetur corrupti at illum maxime officiis
        perspiciatis similique.
      </p>
      <Button className="bg-primary text-gray-50 border-gray-50 border rounded-full mt-4">
        Participar agora
      </Button>
    </div>
  );
};
