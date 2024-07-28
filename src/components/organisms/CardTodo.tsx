import { Box, Card, CardContent, Typography } from "@mui/material";
import { DataTodoType } from "../../types/storage";
import { checkDateStatus, sortTasks } from "../../libs/helpers";
import { DATE_FORMAT } from "../../libs/consts";
import moment from "moment";
import CardTodoItem from "../molecules/CardTodoItem";
import Empty from "../atoms/Empty";

type CardTodoType = {
  type: "checked" | "unchecked";
  list: DataTodoType[];
  onChecked: (id: string) => void;
  onDeleteTodo: (id: string, title: string) => void;
  onOpenEdit: (id: string) => void;
  onAddSubTodo: (id: string) => void;
  onInputSubTodo: (id: string, idSubtask: string, value: string) => void;
  onCheckSubTodo: (id: string, idSubtask: string) => void;
  onDeleteSubTodo: (id: string, idSubtask: string, title: string) => void;
};

/**
 * CardTodo component displays a card with a list of todos.
 * The type of todos displayed is determined by the type prop.
 * The list of todos is filtered based on the type prop and sorted based on the completion status and date.
 * If there are no todos, an Empty component is rendered.
 *
 * @param type - The type of todos to display. It can be either "checked" or "unchecked".
 * @param list - The list of todos to display.
 * @param onChecked - The function to call when a todo is checked.
 * @param onDeleteTodo - The function to call when a todo is deleted.
 * @param onOpenEdit - The function to call when the edit button of a todo is clicked.
 * @param onAddSubTodo - The function to call when the add sub-todo button of a todo is clicked.
 * @param onInputSubTodo - The function to call when the input of a sub-todo is changed.
 * @param onCheckSubTodo - The function to call when a sub-todo is checked.
 * @param onDeleteSubTodo - The function to call when a sub-todo is deleted.
 */
export default function CardTodo({
  type,
  list,
  onChecked,
  onDeleteTodo,
  onOpenEdit,
  onAddSubTodo,
  onInputSubTodo,
  onCheckSubTodo,
  onDeleteSubTodo,
}: CardTodoType) {
  // Filter and sort the list of todos based on the type prop
  const data = sortTasks(
    list.filter((item) =>
      type === "checked" ? item.completed : !item.completed
    ),
    type === "checked"
  );

  return (
    // Render a card with a outlined variant and border radius of 16px
    <Card variant="outlined" sx={{ flex: 1, borderRadius: "16px" }}>
      <CardContent>
        <Typography variant="h6">
          {/* Display the title of the card based on the type prop */}
          {type === "checked" ? "Checked" : "Not Checked"}
        </Typography>
        <Box display="flex" gap={3} flexDirection="column" marginTop={4}>
          {/* Render the list of todos */}
          {data.length > 0 ? (
            data.map((item, index) => {
              let textDate = "";
              const dateStatus = checkDateStatus(item.timestamp);

              switch (dateStatus) {
                case "today":
                  textDate = "Today";
                  break;

                case "yesterday":
                  textDate = `Overdue - ${moment(item.timestamp).format(
                    DATE_FORMAT
                  )}`;
                  break;

                case "future":
                  textDate = moment(item.timestamp).format(DATE_FORMAT);
                  break;

                default:
                  break;
              }

              const props = {
                ...item,
                type,
                status: type === "unchecked" ? dateStatus : "future",
                timestamp:
                  type === "checked"
                    ? moment(item.timestamp).format(DATE_FORMAT)
                    : textDate,
              };

              return (
                // Render a CardTodoItem component for each todo
                <CardTodoItem
                  key={`todo-checked-${index}`}
                  onChecked={() => onChecked(item.id)}
                  onAddSubTodo={() => onAddSubTodo(item.id)}
                  onDeleteTodo={() => onDeleteTodo(item.id, item.title)}
                  onDeleteSubTodo={(idSubtask, title) =>
                    onDeleteSubTodo(item.id, idSubtask, title)
                  }
                  onCheckSubTodo={(idSubtask) =>
                    onCheckSubTodo(item.id, idSubtask)
                  }
                  onInputSubTodo={(idSubtask, value) =>
                    onInputSubTodo(item.id, idSubtask, value)
                  }
                  onOpenEdit={() => onOpenEdit(item.id)}
                  {...props}
                />
              );
            })
          ) : (
            // Render an Empty component if there are no todos
            <Empty
              title={
                type === "checked"
                  ? "No Checked Todos yet"
                  : "No Unchecked Todos yet"
              }
              size="50vh"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
