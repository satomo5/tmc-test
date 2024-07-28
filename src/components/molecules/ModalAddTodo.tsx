/** @jsxImportSource @emotion/react */
import { Box, Button, css, TextField, Typography } from "@mui/material";
import Iconify from "../atoms/Iconify";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FormEventHandler, useState } from "react";
import Modal from "../atoms/Modal";
import moment from "moment";
import { DataTodoType } from "../../types/storage";

const FORM_INIT = {
  title: "",
  timestamp: "",
};

type ModalAddTodoType = {
  isOpen: boolean;
  isEdit?: boolean;
  dataEdit?: DataTodoType;
  onCloseModal: () => void;
  onSubmitModal: FormEventHandler<HTMLFormElement>;
};

/**
 * Modal component for adding or editing a todo.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is open or not.
 * @param {boolean} [props.isEdit] - Whether the modal is for editing or not.
 * @param {DataTodoType} [props.dataEdit] - The data of the todo to be edited.
 * @param {function} props.onCloseModal - The function to close the modal.
 * @param {function} props.onSubmitModal - The function to submit the form.
 * @returns {JSX.Element} The modal component.
 */
export default function ModalAddTodo({
  isOpen,
  isEdit,
  dataEdit,
  onCloseModal,
  onSubmitModal,
}: ModalAddTodoType) {
  // State to hold the error messages for form validation.
  const [error, setError] = useState(FORM_INIT);

  return (
    <Modal isOpen={isOpen} onCloseModal={() => onCloseModal()}>
      {/* Modal header */}
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
        <Typography fontSize="18px">
          {/* Title for add or edit mode */}
          {isEdit ? "Edit Todo" : "Add Todo"}
        </Typography>
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
          {/* Close icon */}
          <Iconify icon="humbleicons:times" fontSize="24px" />
        </div>
      </Box>

      {/* Form to add or edit a todo */}
      <Box
        component="form"
        padding="18px 32px"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setError(FORM_INIT);

          // Validate form fields
          if (!data.get("title") || !data.get("timestamp")) {
            setError({
              title: !data.get("title") ? "Title is required" : "",
              timestamp: !data.get("timestamp") ? "Date Time is required" : "",
            });

            return;
          }

          // Submit the form
          onSubmitModal(event);
        }}
      >
        {/* Text field for todo title */}
        <TextField
          margin="normal"
          fullWidth
          label="Todo"
          name="title"
          autoFocus
          defaultValue={dataEdit?.title}
          error={!!error.title}
          helperText={error.title}
        />

        {/* Date time picker for todo timestamp */}
        <DateTimePicker
          label="Date Time"
          sx={{ width: "100%" }}
          name="timestamp"
          disablePast={!isEdit}
          defaultValue={moment(dataEdit?.timestamp).add(.1, 'minutes')}
          slotProps={{
            textField: {
              helperText: error.timestamp,
            },
          }}
          css={
            error.timestamp &&
            css`
              .MuiOutlinedInput-notchedOutline {
                border-color: #d32f2f !important;
              }

              .MuiFormLabel-root,
              .MuiFormHelperText-root {
                color: #d32f2f !important;
              }
            `
          }
        />

        {/* Form actions */}
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <Button variant="outlined" onClick={() => onCloseModal()}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
