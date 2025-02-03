'use client'

import { Input, Select, SelectItem, Button, Card } from "@nextui-org/react"
import { Search, UserPlus } from "lucide-react"
import { UsersTable } from "./users-table"
import { useState, useMemo } from "react"

const mockUsers = [
  {
    id: "1",
    name: "张三",
    phone: "13800138000",
    email: "zhangsan@example.com",
    memberLevel: "黄金会员",
    points: 1000,
    registerDate: "2024-03-01",
    status: "active"
  },
  {
    id: "2",
    name: "李四",
    phone: "13800138001",
    email: "lisi@example.com",
    memberLevel: "钻石会员",
    points: 2500,
    registerDate: "2024-02-15",
    status: "active"
  },
  {
    id: "3",
    name: "王五",
    phone: "13800138002",
    email: "wangwu@example.com",
    memberLevel: "普通会员",
    points: 500,
    registerDate: "2024-03-10",
    status: "disabled"
  },
  {
    id: "4",
    name: "赵六",
    phone: "13800138003",
    email: "zhaoliu@example.com",
    memberLevel: "黄金会员",
    points: 1200,
    registerDate: "2024-01-20",
    status: "active"
  },
  {
    id: "5",
    name: "陈七",
    phone: "13800138004",
    email: "chenqi@example.com",
    memberLevel: "钻石会员",
    points: 3000,
    registerDate: "2023-12-25",
    status: "active"
  },
  {
    id: "6",
    name: "杨八",
    phone: "13800138005",
    email: "yangba@example.com",
    memberLevel: "普通会员",
    points: 300,
    registerDate: "2024-03-15",
    status: "active"
  },
  {
    id: "7",
    name: "周九",
    phone: "13800138006",
    email: "zhoujiu@example.com",
    memberLevel: "黄金会员",
    points: 1500,
    registerDate: "2024-02-01",
    status: "disabled"
  },
  {
    id: "8",
    name: "吴十",
    phone: "13800138007",
    email: "wushi@example.com",
    memberLevel: "钻石会员",
    points: 3500,
    registerDate: "2024-01-10",
    status: "active"
  },
  {
    id: "9",
    name: "郑十一",
    phone: "13800138008",
    email: "zhengshiyi@example.com",
    memberLevel: "普通会员",
    points: 400,
    registerDate: "2024-03-05",
    status: "active"
  },
  {
    id: "10",
    name: "孙十二",
    phone: "13800138009",
    email: "sunshier@example.com",
    memberLevel: "黄金会员",
    points: 1800,
    registerDate: "2023-12-15",
    status: "active"
  },
  {
    id: "11",
    name: "马十三",
    phone: "13800138010",
    email: "mashisan@example.com",
    memberLevel: "钻石会员",
    points: 4000,
    registerDate: "2024-02-20",
    status: "disabled"
  },
  {
    id: "12",
    name: "胡十四",
    phone: "13800138011",
    email: "hushisi@example.com",
    memberLevel: "普通会员",
    points: 200,
    registerDate: "2024-03-18",
    status: "active"
  },
  {
    id: "13",
    name: "林十五",
    phone: "13800138012",
    email: "linshiwu@example.com",
    memberLevel: "黄金会员",
    points: 1600,
    registerDate: "2024-01-05",
    status: "active"
  },
  {
    id: "14",
    name: "朱十六",
    phone: "13800138013",
    email: "zhushiliu@example.com",
    memberLevel: "钻石会员",
    points: 2800,
    registerDate: "2023-12-30",
    status: "active"
  },
  {
    id: "15",
    name: "高十七",
    phone: "13800138014",
    email: "gaoshiqi@example.com",
    memberLevel: "普通会员",
    points: 600,
    registerDate: "2024-03-12",
    status: "disabled"
  }
]

const searchFields = [
  { label: "用户名", value: "name" },
  { label: "手机号", value: "phone" },
  { label: "邮箱", value: "email" },
]

const memberLevels = [
  { label: "全部等级", value: "all" },
  { label: "普通会员", value: "normal" },
  { label: "黄金会员", value: "gold" },
  { label: "钻石会员", value: "diamond" },
]

const userStatus = [
  { label: "全部状态", value: "all" },
  { label: "正常", value: "active" },
  { label: "禁用", value: "disabled" },
]

export function UsersClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchField, setSearchField] = useState("name")
  const [memberLevel, setMemberLevel] = useState("all")
  const [status, setStatus] = useState("all")

  // 使用 useMemo 来缓存过滤后的结果
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      // 1. 搜索字段匹配
      const searchMatch = searchQuery
        ? user[searchField as keyof typeof user]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true

      // 2. 会员等级匹配
      const levelMatch = memberLevel === "all" 
        ? true 
        : user.memberLevel === memberLevels.find(l => l.value === memberLevel)?.label

      // 3. 状态匹配
      const statusMatch = status === "all"
        ? true
        : user.status === status

      // 所有条件都满足才返回 true
      return searchMatch && levelMatch && statusMatch
    })
  }, [searchQuery, searchField, memberLevel, status])

  const handleSearch = () => {
    // 搜索按钮点击时的额外操作（如有需要）
    console.log("执行搜索:", {
      searchQuery,
      searchField,
      memberLevel,
      status
    })
  }

  const handleReset = () => {
    setSearchQuery("")
    setSearchField("name")
    setMemberLevel("all")
    setStatus("all")
  }

  return (
    <div className="space-y-6">
      {/* 标题栏 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">用户管理</h2>
          <p className="text-sm text-gray-500 mt-1">
            共 {filteredUsers.length} 条结果
          </p>
        </div>
        <Button 
          color="primary"
          startContent={<UserPlus className="w-4 h-4" />}
        >
          新增用户
        </Button>
      </div>

      {/* 搜索卡片 */}
      <Card className="p-4 shadow-sm">
        <div className="flex items-center gap-3">
          {/* 搜索字段选择 */}
          <Select 
            className="w-32"
            size="sm"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            classNames={{
              trigger: "bg-white"
            }}
          >
            {searchFields.map((field) => (
              <SelectItem key={field.value} value={field.value}>
                {field.label}
              </SelectItem>
            ))}
          </Select>

          {/* 搜索输入框 */}
          <Input
            placeholder={`搜索${searchFields.find(f => f.value === searchField)?.label}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            className="w-64"
            size="sm"
            classNames={{
              input: "bg-white"
            }}
          />

          {/* 会员等级筛选 */}
          <Select 
            className="w-40"
            placeholder="会员等级"
            size="sm"
            value={memberLevel}
            onChange={(e) => setMemberLevel(e.target.value)}
            classNames={{
              trigger: "bg-white"
            }}
          >
            {memberLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </Select>

          {/* 用户状态筛选 */}
          <Select 
            className="w-40"
            placeholder="用户状态"
            size="sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            classNames={{
              trigger: "bg-white"
            }}
          >
            {userStatus.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </Select>

          {/* 操作按钮 */}
          <div className="flex gap-2 ml-auto">
            <Button
              color="primary"
              size="sm"
              onPress={handleSearch}
              className="px-8"
            >
              搜索
            </Button>

            <Button
              color="danger"
              variant="light"
              size="sm"
              onPress={handleReset}
            >
              重置
            </Button>
          </div>
        </div>
      </Card>

      {/* 用户列表 */}
      <Card className="p-4">
        <UsersTable users={filteredUsers} />
      </Card>
    </div>
  )
} 