'use client'

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip
} from "@nextui-org/react"

interface User {
  id: string
  name: string
  phone: string
  email: string
  memberLevel: string
  points: number
  registerDate: string
  status: string
}

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <Table aria-label="用户列表">
      <TableHeader>
        <TableColumn>姓名</TableColumn>
        <TableColumn>手机号</TableColumn>
        <TableColumn>邮箱</TableColumn>
        <TableColumn>会员等级</TableColumn>
        <TableColumn>积分</TableColumn>
        <TableColumn>注册日期</TableColumn>
        <TableColumn>状态</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.memberLevel}</TableCell>
            <TableCell>{user.points}</TableCell>
            <TableCell>{user.registerDate}</TableCell>
            <TableCell>
              <Chip
                color={user.status === 'active' ? 'success' : 'danger'}
                variant="flat"
              >
                {user.status === 'active' ? '正常' : '禁用'}
              </Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 