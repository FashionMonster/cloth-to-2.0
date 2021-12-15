import { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';
import { CloseModalBtn } from 'interfaces/ui/components/atoms/buttons/closeModelBtn';
import { MODAL_STYLE } from 'constants/modalStyle';

//引数の型定義
type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
};

//モーダルコンポーネント
const ModalWindow: React.VFC<Props> = (props) => {
  if (props.isModalOpen) {
    return (
      <Modal isOpen={props.isModalOpen} style={MODAL_STYLE}>
        <div className='row-start-2 row-end-3 mx-auto my-auto font-medium whitespace-pre-line text-center'>
          {props.message}
        </div>
        <CloseModalBtn setIsModalOpen={props.setIsModalOpen} />
      </Modal>
    );
  } else {
    return <></>;
  }
};

export { ModalWindow };
