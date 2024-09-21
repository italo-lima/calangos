export const AboutUs = () => {
  return (
    <div className="pt-12" id="about-us">
      <div className="flex flex-col px-5">
        <h1 className="text-3xl font-semibold">Sobre Nós</h1>
        <div>
          <span className="mt-2 block text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, dolor quibusdam qui aspernatur necessitatibus tempore
            deserunt ex hic, doloremque, laboriosam suscipit similique nihil
            velit delectus unde laborum eligendi cupiditate incidunt.
          </span>
        </div>
      </div>
      <div className="flex flex-col pt-8">
        <div className="px-8">
          <h3 className="w-1/2 pb-4 text-4xl">
            <small>+ de</small> 2 anos de história
          </h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 text-left">
            <div className="flex flex-col">
              <p className="p-0 text-5xl">17</p>
              <span className="mt-1 text-sm uppercase">trilhas realizadas</span>
            </div>
            <div className="flex flex-col">
              <p className="p-0 text-5xl">+100</p>
              <span className="mt-1 text-sm uppercase">
                pessoas trilharam conosco
              </span>
            </div>
            <div className="flex flex-col">
              <p className="p-0 text-5xl">3</p>
              <span className="mt-1 text-sm uppercase">
                cestas básicas entregues
              </span>
            </div>
            <div className="flex flex-col">
              <p className="p-0 text-5xl">+200</p>
              <span className="mt-1 text-sm uppercase">
                kg de alimentos arrecadados
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
