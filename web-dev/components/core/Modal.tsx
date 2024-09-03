import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import dynamic from 'next/dynamic';
const MapComponent = dynamic(() => import('@/components/mapComponent/Map'), {
  loading: () => <p>A map is loading</p>,
  ssr: false
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
}

export function Modal({ isOpen, onClose, imageSrc }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] p-0">
        {imageSrc ? <img src={imageSrc} alt="Full size preview" className="w-full h-auto" /> : <MapComponent />}
      </DialogContent>
    </Dialog>
  );
}