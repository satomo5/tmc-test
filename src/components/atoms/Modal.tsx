import { Box, Modal as ModalMUI } from "@mui/material";

type ModalAddTodoType = {
  isOpen: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
  size?: string | number;
};

/**
 * Modal component that displays a dialog box with a customizable size and content.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOpen - Whether the modal is open or not.
 * @param {Function} props.onCloseModal - The function to call when the modal is closed.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @param {string|number} [props.size=400] - The width of the modal.
 * @return {JSX.Element} The modal component.
 */

export default function Modal({
  isOpen,
  onCloseModal,
  children,
  size = 400,
}: ModalAddTodoType) {
  return (
    <ModalMUI
      open={isOpen}
      onClose={() => onCloseModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size,
          backgroundColor: "#ffff",
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        {children}
      </Box>
    </ModalMUI>
  );
}
