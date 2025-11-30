import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function FieldInput({ setAllTodos, allTodos, edit, setEdit }) {
  const [todo, setTodo] = useState("");

  async function addTodo(e) {
    e.preventDefault();
    if (!todo) return;
    const res = await fetch("/api/todo/create", {
      method: "POST",
      body: JSON.stringify({ title: todo }),
      headers: { "Content-Type": "application/json" },
    });
    const { success, data } = await res.json();
    if (success) {
      const todos = [...allTodos, data];
      localStorage.setItem("todos", JSON.stringify(todos));
      setAllTodos(todos);
      console.log("todo added");
    } else {
      console.log("todo not added");
    }
  }

  async function handleEditTodo(e) {
    e.preventDefault();
    const res = await fetch(`/api/todo/edit/${edit.editId}`, {
      method: "PATCH",
      body: JSON.stringify({ title: edit.value }),
      headers: { "Content-Type": "application/json" },
    });
    const { success, message } = await res.json();
    if (success) {
      const todos = allTodos.map((todo) => {
        if (todo._id == edit.editId) {
          todo.title = edit.value;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(todos));
      setAllTodos(todos);
    }
    console.log(message);
    setEdit({ editId: -1, editTodo: false, value: "" });
  }

  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="todo">Todo</FieldLabel>
            {edit.editTodo ? (
              <Input
                id="todo"
                type="text"
                placeholder="Eg. Apple"
                value={edit.value}
                onChange={(e) =>
                  setEdit((edit) => {
                    return { ...edit, value: e.target.value };
                  })
                }
              />
            ) : (
              <Input
                id="todo"
                type="text"
                placeholder="Eg. Apple"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
            )}
          </Field>
          {edit?.editTodo ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Edit Todo</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Edit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={(e) => handleEditTodo(e)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button variant="outline" onClick={(e) => addTodo(e)}>
              Add Todo
            </Button>
          )}
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
