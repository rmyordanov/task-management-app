import { rdb } from "./firebase-config";
import { remove, set, update, get } from "firebase/database";
import { ref } from "firebase/database";

import { v4 as uuidv4 } from "uuid";

//-------EMPLOYEES--------//

export async function getEmployees() {
  const path = ref(rdb, `employees`);
  const snapshot = await get(path);
  const employees = snapshot.val();

  return employees;
}

export async function getEmployee(id) {
  const path = ref(rdb, `employees/${id}`);
  const snapshot = await get(path);
  const employee = snapshot.val();

  return employee;
}

export function createEmployee(data) {
  const id = uuidv4();
  const path = ref(rdb, `employees/${id}`);

  set(path, { ...data, _id: id });
}

export function editEmployee(id, data) {
  const path = ref(rdb, `employees/${id}`);

  update(path, data);
}

export function deleteEmployee(id) {
  const path = ref(rdb, `employees/${id}`);

  remove(path);
}

//-------------TASKS-------------------//

export async function getTasks() {
  const path = ref(rdb, `tasks`);
  const snapshot = await get(path);
  const tasks = snapshot.val();

  return tasks;
}

export function createTask(data) {
  const id = uuidv4();
  const path = ref(rdb, `tasks/${id}`);

  set(path, { ...data, _id: id });
}

export function editTask(id, data) {
  const path = ref(rdb, `tasks/${id}`);

  update(path, data);
}

export function deleteTask(id) {
  const path = ref(rdb, `tasks/${id}`);

  remove(path);
}
