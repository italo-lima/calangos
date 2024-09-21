import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Button } from '../ui/button';

export const Footer = () => {
  return (
    <div className="flex flex-col bg-primary pt-8 pb-2 px-4 divide-y">
      <div className="flex justify-between pb-4">
        <div className="pt-4">
          <Link href="/" className="block relative h-8 w-20">
            <Image alt="Logo da Calango" src="/logo-calangos.png" fill />
          </Link>
          <div>
            <div className="my-4 flex gap-2 text-gray-50 ">
              <Link
                href="https://instagram.com/calangosdacaatinga"
                target="_blank"
              >
                <FaInstagram size={20} />
              </Link>
              <Link href="https://facebook.com" target="_blank">
                <FaFacebook size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <Link href="/" passHref>
            <Button className="text-gray-50 p-0 text-base" variant="link">
              Home
            </Button>
          </Link>
          <Link href="/#about-us" passHref>
            <Button className="text-gray-50 p-0 text-base" variant="link">
              Sobre Nós
            </Button>
          </Link>
          <Link href="/campaign" passHref>
            <Button className="text-gray-50 p-0 text-base" variant="link">
              Nossa campanha
            </Button>
          </Link>
        </div>
      </div>
      <div className="text-xs">
        <p className="text-gray-50 pt-4">
          &copy; 2024 Calangos da Catinga. All rights reserved.
        </p>
        <p className=" mt-2 flex text-gray-50">
          Developed by
          <Link
            href="https://instagram.com/italolimati"
            passHref
            target="_blank"
            className="underline pl-1"
          >
            Ítalo Lima
          </Link>
        </p>
      </div>
    </div>
  );
};
