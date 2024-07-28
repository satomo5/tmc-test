import moment from "moment";
import { DataSubTodoType, DataTodoType } from "../types/storage";

type DateStatus = "yesterday" | "today" | "future";

export function checkDateStatus(dateString: string): DateStatus {
  const date = moment(dateString); // Parse the input date
  const today = moment(); // Get today's date

  if (date.isSame(today, "day")) {
    return "today";
  } else if (date.isBefore(today, "day")) {
    return "yesterday";
  } else {
    return "future";
  }
}

export function createID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function sortTasks(tasks: DataTodoType[], sortByNewest?: boolean) {
  return tasks.sort((a, b) => {
    // 1. Sort by completion status (completed first)
    if (a.completed !== b.completed) {
      return a.completed ? -1 : 1;
    }

    // 2. Sort by date
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);

    if (sortByNewest) {
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
    } else {
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
    }

    // If all criteria are the same, maintain original order
    return 0;
  });
}

export function sortSubtasks(subtasks: DataSubTodoType[]) {
  return subtasks.sort((a, b) => {
    // Sort completed subtasks first
    if (a.completed !== b.completed) {
      return a.completed ? -1 : 1;
    }
    return 0; // Maintain original order if completion status is the same
  });
}
