'use client';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import {
  HomeIcon,
  MenuIcon,
  ClipboardList,
  ShoppingBasket,
  BookImage,
} from 'lucide-react';
import Image from 'next/image';
import { useCampaign } from '@/app/hooks/use-campaign';

export const Header = () => {
  const { campaign, isValidCampaign } = useCampaign();

  return (
    <div className="shadow-nonew-full rounded-none border-none bg-transparent h-12">
      <Card className="flex items-center rounded-none shadow-none border-none bg-transparent h-full">
        <CardContent className="flex items-center justify-between py-0 px-4 max-w-2xl w-full">
          <Link href="/" className="relative h-8 w-20">
            <Image alt="Logo da Calango" src="/logo-calangos.png" fill />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-transparent"
              >
                <MenuIcon size={28} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2 py-5">
                <SheetClose asChild>
                  <Button
                    className="justify-start gap-2"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/">
                      <HomeIcon size={18} />
                      Home
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="justify-start gap-2"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/#about-us">
                      <ClipboardList size={18} />
                      Sobre nós
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="justify-start gap-2"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/#adventures">
                      <BookImage size={18} />
                      Nossas aventuras
                    </Link>
                  </Button>
                </SheetClose>
                {isValidCampaign && (
                  <SheetClose asChild>
                    <Button
                      className="justify-start gap-2"
                      variant="ghost"
                      asChild
                    >
                      <Link href="/campaign">
                        <ShoppingBasket size={18} />
                        {campaign?.name}
                      </Link>
                    </Button>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  );
};
