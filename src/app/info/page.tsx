
"use client"
import { User } from "@/interface/user";
import { listUsers } from "@/service/user";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useEffect, useState } from "react";

export default function Home() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    listUsers().then((users: User[]) => {
      setUsers(users);
    });

  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
}
