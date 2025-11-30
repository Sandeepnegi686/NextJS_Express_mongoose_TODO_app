import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
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

import { Trash2, Pencil } from "lucide-react";

export default function List({ allTodos, setAllTodos, edit, setEdit }) {
  async function handleDelete(id) {
    const res = await fetch(`http://localhost:3000/api/todo/delete/${id}`, {
      method: "DELETE",
    });
    const { success } = await res.json();
    if (success) {
      const filteredTodos = allTodos.filter((todo) => todo._id != id);
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      setAllTodos(filteredTodos);
      console.log("todo deleted");
    } else {
      console.log("todo not deleted");
    }
  }

  return (
    <div className="flex flex-col">
      {allTodos.map((todo) => (
        <Item key={todo._id}>
          <ItemContent>
            <ItemTitle>{todo?.title}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <p></p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEdit(() => ({
                  value: todo.title,
                  editId: todo._id,
                  editTodo: true,
                }));
                console.log(edit);
              }}
            >
              <Pencil />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm delete?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(todo._id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
