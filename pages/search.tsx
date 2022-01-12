import { useContext, useRef, useState } from 'react';
import { ModalWindow } from 'interfaces/ui/components/molecules/others/modalWindow';

export default function Search() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  return <ModalWindow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} message='テスト' />;
}
