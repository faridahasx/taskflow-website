import CircularLoading from "./CircularLoading";
import Modal from "../Modal/Modal";

const LoadingModal = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
      <CircularLoading />
    </Modal>
  );
};

export default LoadingModal;
