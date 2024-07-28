/** @jsxImportSource @emotion/react */
import {
  Box,
  Card,
  Checkbox,
  css,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DataTodoType } from "../../types/storage";
import Dropdown from "../atoms/Dropdown";
import Iconify from "../atoms/Iconify";
import { sortSubtasks } from "../../libs/helpers";

/**
 * CardTodoItem component
 *
 * Component for displaying a single todo item with its subtasks
 *
 * @param {DataTodoType & {
 *  type?: "checked" | "unchecked";
 *  status: "yesterday" | "today" | "future";
 *  onChecked: () => void;
 *  onAddSubTodo: () => void;
 *  onOpenEdit: () => void;
 *  onDeleteTodo: () => void;
 *  onInputSubTodo: (id: string, value: string) => void;
 *  onCheckSubTodo: (id: string) => void;
 *  onDeleteSubTodo: (id: string, title: string) => void;
 * }} props - The props for the component
 * @return {JSX.Element} The rendered CardTodoItem component
 */
export default function CardTodoItem(
  props: DataTodoType & {
    type?: "checked" | "unchecked";
    status: "yesterday" | "today" | "future";
    onChecked: () => void;
    onAddSubTodo: () => void;
    onOpenEdit: () => void;
    onDeleteTodo: () => void;
    onInputSubTodo: (id: string, value: string) => void;
    onCheckSubTodo: (id: string) => void;
    onDeleteSubTodo: (id: string, title: string) => void;
  }
): JSX.Element {
  // Sort the subtasks based on their completion status
  const sortedSubtask = sortSubtasks(props.subtasks);

  return (
    <Card variant="outlined" sx={{ flex: 1, borderRadius: "16px" }}>
      {/* Render the header of the todo item */}
      <Box
        padding="9px 20px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => props.onChecked()}
                checked={props.completed}
                color="success"
              />
            }
            label={
              <>
                {/* Render the title of the todo item */}
                {props.title}
                <Typography
                  color={
                    props.status === "yesterday"
                      ? "red"
                      : props.status === "today"
                      ? "green"
                      : ""
                  }
                  fontSize="13px"
                  sx={{ display: { xs: "block", sm: "none" } }}
                >
                  {props.timestamp}
                </Typography>
              </>
            }
            css={
              props.completed &&
              css`
                .MuiTypography-root {
                  text-decoration: line-through;
                }
              `
            }
          />
        </FormGroup>
        {/* Render the dropdown menu for the todo item */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            color={
              props.status === "yesterday"
                ? "red"
                : props.status === "today"
                ? "green"
                : ""
            }
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {props.timestamp}
          </Typography>
          <Dropdown
            trigger={
              <Box padding="6px 8px">
                <Iconify icon="tabler:dots-vertical" />
              </Box>
            }
            options={[
              { label: "Edit", onClick: () => props.onOpenEdit() },
              { label: "Delete", onClick: () => props.onDeleteTodo() },
              { label: "Create Sub Todo", onClick: () => props.onAddSubTodo() },
            ]}
          />
        </Box>
      </Box>
      {/* Render the subtasks of the todo item */}
      {sortedSubtask.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          marginBottom={5}
          marginTop={2}
        >
          {sortedSubtask.map((item) => (
            <Box key={item.id} padding="0 20px">
              <Box
                padding="9px 20px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                boxShadow="0px 4px 10px 0px #00000021"
                borderRadius="16px"
                overflow="hidden"
                gap={2}
              >
                <Box display="flex" alignItems="center" flex={1}>
                  <Checkbox
                    checked={item.completed}
                    color="success"
                    onChange={() => props.onCheckSubTodo(item.id)}
                  />
                  <TextField
                    hiddenLabel
                    defaultValue={item.title}
                    placeholder="Sub Todo"
                    variant="filled"
                    size="small"
                    disabled={item.completed}
                    css={[
                      css`
                        flex: 1;
                        input {
                          background: #fff;
                        }

                        .MuiInputBase-root::before {
                          display: none;
                        }
                      `,
                      item.completed &&
                        css`
                          input {
                            text-decoration: line-through;
                          }
                        `,
                    ]}
                    onChange={(e) =>
                      props.onInputSubTodo(item.id, e.target.value)
                    }
                  />
                </Box>
                <div
                  css={css`
                    cursor: pointer;
                  `}
                  onClick={() => props.onDeleteSubTodo(item.id, item.title)}
                >
                  <Iconify icon="iconoir:trash" />
                </div>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
}
