import { useState } from 'react';

export default function useOpenable() {
  const [open, setOpen] = useState(false);

  const handleClose: () => void = () => {
    setOpen(false);
  };

  const handleOpen: () => void = () => {
    setOpen(true);
  };

  const toggleOpen: () => void = () => {
    setOpen(!open);
  };

  return { open, handleClose, handleOpen, toggleOpen };
}
