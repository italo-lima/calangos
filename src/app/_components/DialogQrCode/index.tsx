'use client';
import { addSeconds, format } from 'date-fns';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface Props {
  isOpen: boolean;
  openChange: (value: boolean) => void;
  dataPix: any;
}

export const DialogQrCode = ({ isOpen, openChange, dataPix }: Props) => {
  if (!Object.keys(dataPix).length) return;

  return (
    <Dialog open={isOpen} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escaneie o QrCode Abaixo</DialogTitle>
          <DialogDescription>
            <span className="block text-center mt-2 mb-1">
              Valor da doação: R$ {dataPix.data.valor.original}
            </span>
            QrCode válido até:{' '}
            {format(
              addSeconds(
                new Date(dataPix.data.calendario.criacao),
                dataPix.data.calendario.expiracao
              ),
              "dd/MM/yyyy 'às' HH:mm:ss"
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <img src={dataPix.url} alt="QR Code do Pix" className="h-80 w-full" />
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => openChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
