/** @jsxImportSource @emotion/react */
import { Box, Button, css, Typography } from "@mui/material";
import Iconify from "../atoms/Iconify";
import Modal from "../atoms/Modal";

type ModalDeleteTodoType = {
  title?: string;
  isOpen: boolean;
  isSubTodo: boolean;
  onCloseModal: () => void;
  onSubmitModal: () => void;
};

/**
 * Modal component for deleting a todo item or a sub todo item.
 *
 * @param {ModalDeleteTodoType} props - The props object containing the following properties:
 *   - title: The title of the item to be deleted (default: "this item").
 *   - isOpen: A boolean indicating whether the modal is open or not.
 *   - isSubTodo: A boolean indicating whether the item to be deleted is a sub todo or not.
 *   - onCloseModal: A function to be called when the modal is closed.
 *   - onSubmitModal: A function to be called when the delete button is clicked.
 * @returns {JSX.Element} The modal component.
 */
export default function ModalDeleteTodo({
  title = "this item", // The title of the item to be deleted (default: "this item").
  isOpen, // A boolean indicating whether the modal is open or not.
  isSubTodo, // A boolean indicating whether the item to be deleted is a sub todo or not.
  onCloseModal, // A function to be called when the modal is closed.
  onSubmitModal, // A function to be called when the delete button is clicked.
}: ModalDeleteTodoType): JSX.Element {
  return (
    // Render the modal component.
    <Modal isOpen={isOpen} onCloseModal={() => onCloseModal}>
      {/* Render the modal header. */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="18px 32px"
        borderRadius="8px 8px 0 0"
        sx={{
          backgroundColor: "#F6F6F6",
        }}
      >
        <Typography fontSize="18px">Confirm Delete</Typography>
        {/* Render the close icon. */}
        <div
          css={css`
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24px;
            height: 24px;
          `}
          onClick={() => onCloseModal()}
        >
          <Iconify icon="humbleicons:times" fontSize="24px" />
        </div>
      </Box>
      {/* Render the modal content. */}
      <Box padding="18px 32px" display="flex" flexDirection="column" gap={3}>
        {/* Render the confirmation message. */}
        <Typography>
          Are you sure want to delete {isSubTodo && "sub todo"} {title}?
        </Typography>
        {/* Render the buttons. */}
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          {/* Render the cancel button. */}
          <Button variant="outlined" onClick={onCloseModal}>
            Cancel
          </Button>
          {/* Render the delete button. */}
          <Button
            variant="contained"
            color="error"
            onClick={() => onSubmitModal()}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
