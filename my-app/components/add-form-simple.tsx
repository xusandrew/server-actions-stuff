// "use client"; // cannot use 'use client' when defining a server action in file

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export function AddFormSimple() {
  // Server action
  async function createTodo(data: FormData) {
    "use server";

    const todoName = data.get("todo") as string;

    try {
      await sql`
        INSERT INTO todos (text)
        VALUES (${todoName})
      `;
      revalidatePath("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form action={createTodo}>
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" required />
      <button type="submit">Add</button>
    </form>
  );
}
