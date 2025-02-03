'use client'

import { Input, Select, SelectItem, Button, Card } from "@nextui-org/react"
import { Search, UserPlus } from "lucide-react"
import { UsersTable } from "./users-table"
import { useState, useMemo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { User } from "@/interface/user"
import { REDUX_STATUS } from "@/constant"
import { getUsers } from "@/service/user"
import { AppDispatch } from "@/redux/store/store"

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { users, apiStatus } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(apiStatus === REDUX_STATUS.IDLE && users.length === 0) {
      dispatch(getUsers());
    }
  }, [apiStatus, dispatch, users.length]);

  // 使用 useMemo 来缓存过滤后的结果
  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => {
      // 1. 搜索字段匹配
      const searchMatch = searchQuery
        ? user[searchField as keyof typeof user]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;

      // 2. 会员等级匹配
      const levelMatch = memberLevel === "all" 
        ? true 
        : user.memberLevel === memberLevels.find(l => l.value === memberLevel)?.label;

      // 3. 状态匹配
      const statusMatch = status === "all"
        ? true
        : user.status === status;

      // 所有条件都满足才返回 true
      return searchMatch && levelMatch && statusMatch
    })
  }, [users, searchQuery, searchField, memberLevel, status])

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
              aria-label="reset"
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