import CircularLoading from "./CircularLoading";
import Modal from "components/Modal/Modal";

const ModalLoading = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
      <CircularLoading />
    </Modal>
  );
};

export default ModalLoading;
