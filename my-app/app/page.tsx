import { AddForm } from "@/components/add-form";
import { AddFormSimple } from "../components/add-form-simple";
import { DeleteForm } from "@/components/delete-form";

import { sql } from "@vercel/postgres";

// await sql`CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );`;

export default async function Home() {
  let { rows: todos } = await sql`SELECT * FROM todos`;

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddFormSimple />
      {/* <AddForm /> */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <DeleteForm id={todo.id} todo={todo.text} />
          </li>
        ))}
      </ul>
    </main>
  );
}
