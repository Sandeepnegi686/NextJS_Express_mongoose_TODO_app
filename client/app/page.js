"use client";
import { FieldInput } from "@/components/FieldInput";
import List from "@/components/List";
import { useEffect, useState } from "react";

export default function Home() {
  const [allTodos, setAllTodos] = useState([]);
  const [edit, setEdit] = useState({ editId: -1, editTodo: false, value: "" });

  useEffect(function () {
    async function getTodos() {
      const res = await fetch("/api/todo/get");
      const { success, data } = await res.json();
      if (success) {
        setAllTodos(data);
        localStorage.setItem("todos", JSON.stringify(data));
      } else {
        localStorage.setItem("todos", JSON.stringify([]));
        setAllTodos([]);
      }
    }
    getTodos();
  }, []);

  return (
    <main className="max-w-md mx-auto mt-[100px]">
      <FieldInput
        setAllTodos={setAllTodos}
        allTodos={allTodos}
        edit={edit}
        setEdit={setEdit}
      />
      <div className="h-px bg-gray-400 my-10"></div>
      <List
        allTodos={allTodos}
        setAllTodos={setAllTodos}
        edit={edit}
        setEdit={setEdit}
      />
    </main>
  );
}
