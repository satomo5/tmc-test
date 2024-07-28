import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DataTodoType, DataUserTodoType } from "../../types/storage";
import { createID } from "../../libs/helpers";
import { getStorageData, updateStorageData } from "../../libs/storage";
import ModalAddTodo from "../molecules/ModalAddTodo";
import CardTodo from "../organisms/CardTodo";
import ModalDeleteTodo from "../molecules/ModalDelete";
import { useAuth } from "../../contexts/Auth";
import Empty from "../atoms/Empty";

const MODAL_INIT = {
  add_edit_todo: false,
  delete_todo: false,
  delete_subtodo: false,
};

const DELETE_INIT = {
  title: "",
  id: "",
  id_sub: "",
};

export default function Todos() {
  const [openModal, setOpenModal] = useState(MODAL_INIT);
  const [storeDelete, setStoreDelete] = useState(DELETE_INIT);
  const [todo, setTodo] = useState<DataTodoType[]>([]);
  const [edit, setEdit] = useState<DataTodoType | undefined>(undefined);
  const { email } = useAuth();

  useEffect(() => {
    const storage = getStorageData("todos") as DataUserTodoType[];
    const data = storage?.find((item) => item.user === email) || null;

    setTodo(data?.data || []);
  }, [email]);

  // Update todos in local storage
  const updateTodo = (todo: DataTodoType[]) => {
    const storage = getStorageData("todos") as DataUserTodoType[];
    const findUser = storage?.find((item) => item.user === email);

    const data = storage
      ? findUser
        ? storage?.map((item) =>
            item.user === email ? { ...item, data: todo } : item
          )
        : [...storage, { user: email, data: todo }]
      : [
          {
            user: email,
            data: todo,
          },
        ];

    setTodo(todo);
    updateStorageData("todos", data);
  };

  // Handle modal submit add
  const handleSubmitAdd = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const value = [
      ...todo,
      {
        id: createID(),
        title: data.get("title") as string,
        timestamp: data.get("timestamp") as string,
        completed: false,
        subtasks: [],
      },
    ];

    updateTodo(value);
    setOpenModal(MODAL_INIT);
  };

  // Handle modal submit edit
  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const value = todo.map((item) => {
      if (item.id === edit?.id)
        return {
          ...item,
          title: data.get("title") as string,
          timestamp: data.get("timestamp") as string,
        };
      return item;
    });

    updateTodo(value);
    setOpenModal(MODAL_INIT);
    setEdit(undefined);
  };

  // Handle check todo
  const handleCheckTodo = (id: string) => {
    const value = todo.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
          subtasks: item.subtasks.map((subtask) => ({
            ...subtask,
            completed: item.completed ? false : true,
          })),
        };
      }
      return item;
    });

    updateTodo(value);
  };

  // Handle add subtodo
  const handleAddSubTodo = (id: string) => {
    const value = todo.map((item) => {
      if (item.id === id)
        return {
          ...item,
          subtasks: [
            ...item.subtasks,
            { id: createID(), title: "", completed: false },
          ],
        };

      return item;
    });

    updateTodo(value);
  };

  // Handle delete todo
  const handleDeleteTodo = (id: string) => {
    const value = todo.filter((item) => item.id !== id);

    updateTodo(value);
    setOpenModal(MODAL_INIT);
  };

  // Handle delete subtodo
  const handleCheckSubTodo = (id: string, idSubtask: string) => {
    const value = todo.map((item) => {
      if (item.id === id) {
        const dataSub = item.subtasks.map((subtask) =>
          subtask.id === idSubtask
            ? { ...subtask, completed: !subtask.completed }
            : subtask
        );

        return {
          ...item,
          completed:
            dataSub.filter((subtask) => subtask.completed).length ===
            item.subtasks.length,
          subtasks: dataSub,
        };
      }

      return item;
    });

    updateTodo(value);
  };

  // Handle input subtodo
  const handleInputSubTodo = (
    id: string,
    idSubtask: string,
    valueInput: string
  ) => {
    const value = todo.map((item) => {
      if (item.id === id)
        return {
          ...item,
          subtasks: item.subtasks.map((subtask) =>
            subtask.id === idSubtask
              ? { ...subtask, title: valueInput }
              : subtask
          ),
        };

      return item;
    });

    updateTodo(value);
  };

  // Handle delete subtodo
  const handleDeleteSubTodo = (id: string, idSubtask: string) => {
    const value = todo.map((item) => {
      if (item.id === id)
        return {
          ...item,
          subtasks: item.subtasks.filter((subtask) => subtask.id !== idSubtask),
        };

      return item;
    });

    updateTodo(value);
    setOpenModal(MODAL_INIT);
  };

  const propsTodo = {
    onChecked: handleCheckTodo,
    onAddSubTodo: handleAddSubTodo,
    onDeleteTodo: (id: string, title: string) => {
      setStoreDelete({ ...storeDelete, id, title });
      setOpenModal({ ...openModal, delete_todo: true });
    },
    onOpenEdit: (id: string) => {
      const data = todo.find((item) => item.id === id);

      setEdit(data);
      setOpenModal({ ...openModal, add_edit_todo: true });
    },
    onInputSubTodo: handleInputSubTodo,
    onCheckSubTodo: handleCheckSubTodo,
    onDeleteSubTodo: (id: string, id_sub: string, title: string) => {
      setStoreDelete({ id, id_sub, title });
      setOpenModal({ ...openModal, delete_subtodo: true });
    },
    list: todo,
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={3}>
        <Typography component="h1" variant="h4">
          📝 Todos
        </Typography>
        <Button
          variant="outlined"
          sx={{ display: "flex", justifyContent: "space-between", gap: 5 }}
          onClick={() => setOpenModal({ ...openModal, add_edit_todo: true })}
        >
          <span>Create Todo</span>
          <span>+</span>
        </Button>
      </Box>
      {todo.length > 0 ? (
        <Box
          display="flex"
          minHeight="70vh"
          gap={6}
          marginTop={6}
          sx={{ flexDirection: { xs: "column", xl: "row" } }}
        >
          <CardTodo type="unchecked" {...propsTodo} />
          <CardTodo type="checked" {...propsTodo} />
        </Box>
      ) : (
        <Empty />
      )}

      <ModalAddTodo
        isEdit={!!edit}
        dataEdit={edit}
        isOpen={openModal.add_edit_todo}
        onCloseModal={() => setOpenModal(MODAL_INIT)}
        onSubmitModal={edit ? handleSubmitEdit : handleSubmitAdd}
      />

      <ModalDeleteTodo
        title={storeDelete.title}
        isOpen={openModal.delete_todo || openModal.delete_subtodo}
        isSubTodo={openModal.delete_subtodo}
        onCloseModal={() => {
          setStoreDelete(DELETE_INIT);
          setOpenModal(MODAL_INIT);
        }}
        onSubmitModal={() =>
          openModal.delete_todo
            ? handleDeleteTodo(storeDelete.id)
            : openModal.delete_subtodo
            ? handleDeleteSubTodo(storeDelete.id, storeDelete.id_sub)
            : null
        }
      />
    </>
  );
}
