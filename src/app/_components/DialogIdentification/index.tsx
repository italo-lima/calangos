'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { motion } from 'framer-motion';

interface Props {
  isOpen: boolean;
  loading: boolean;
  openChange: (value: boolean) => void;
  callback: (name: string) => void;
}

export const DialogIdentification = ({
  isOpen,
  loading,
  openChange,
  callback,
}: Props) => {
  const [anonymous, setAnonymous] = useState(true);
  const [name, setName] = useState('');

  const setNamePerson = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    return () => {
      setName('');
      setAnonymous(true);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apoie nossa causa</DialogTitle>
          <DialogDescription>
            Você pode realizar sua doação de forma anônima ou identificada. Para
            isso, basta escolher a opção que melhor se adequa a você abaixo. Sua
            generosidade fará a diferença!
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center items-center my-8">
            <svg className="w-6 h-6 border-2 border-t-transparent border-primary rounded-full animate-spin"></svg>
            <span className="ml-2 text-base">Gerando QrCode</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col mt-1">
              <motion.div
                className={`flex items-center space-x-2`}
                initial={{ marginBottom: 0 }}
                animate={{ marginBottom: anonymous ? 0 : '1rem' }}
                transition={{ duration: 0.5 }}
              >
                <Switch
                  id="anonymous-mode"
                  checked={anonymous}
                  onCheckedChange={setAnonymous}
                />
                <Label htmlFor="anonymous-mode">Doação Anônima</Label>
              </motion.div>

              <motion.input
                data-anonymous={anonymous}
                placeholder="Digite seu nome"
                value={name}
                onChange={setNamePerson}
                className="transition-opacity duration-300 ease-linear text-sm border-2 rounded-lg border-primary focus-visible:outline-none focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                initial={{ opacity: 0, height: 0, padding: 0 }}
                animate={{
                  opacity: anonymous ? 0 : 1,
                  height: anonymous ? 0 : '40px',
                  padding: anonymous ? 0 : '0.5rem',
                }}
                transition={{ duration: 0.5 }}
                style={{
                  opacity: anonymous ? '0' : '1',
                }}
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => callback(name)}>
                Enviar doação
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
