'use client'

import { Input, Select, SelectItem, Button, Card } from "@nextui-org/react"
import { Search, UserPlus } from "lucide-react"
import { MasseursTable } from "./masseurs-table"
import { useState, useMemo } from "react"
import { 
  mockMasseurs, 
  searchFields, 
  specialtyOptions, 
  experienceRanges 
} from "@/mocks/masseurs"

export function MasseursClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchField, setSearchField] = useState("fullName")
  const [specialty, setSpecialty] = useState("all")
  const [experience, setExperience] = useState("all")

  const filteredMasseurs = useMemo(() => {
    return mockMasseurs.filter(masseur => {
      const searchMatch = searchQuery
        ? String(masseur[searchField as keyof typeof masseur])
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true

      const specialtyMatch = specialty === "all" 
        ? true 
        : masseur.specialties.includes(
            specialtyOptions.find(s => s.value === specialty)?.label || ""
          )

      const experienceMatch = experience === "all"
        ? true
        : experience === "5+"
        ? masseur.yearsOfExperience >= 5
        : experience === "3-5"
        ? masseur.yearsOfExperience >= 3 && masseur.yearsOfExperience < 5
        : masseur.yearsOfExperience >= 1 && masseur.yearsOfExperience < 3

      return searchMatch && specialtyMatch && experienceMatch
    })
  }, [searchQuery, searchField, specialty, experience])

  return (
    <div className="space-y-6">
      {/* 标题栏 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">按摩师管理</h2>
          <p className="text-sm text-gray-500 mt-1">
            共 {filteredMasseurs.length} 条结果
          </p>
        </div>
        <Button 
          color="primary"
          startContent={<UserPlus className="w-4 h-4" />}
        >
          新增按摩师
        </Button>
      </div>

      {/* 搜索卡片 */}
      <Card className="p-4 shadow-sm">
        <div className="flex items-center gap-3">
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

          <Select 
            className="w-40"
            placeholder="专长类型"
            size="sm"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            classNames={{
              trigger: "bg-white"
            }}
          >
            {specialtyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Select 
            className="w-40"
            placeholder="工作经验"
            size="sm"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            classNames={{
              trigger: "bg-white"
            }}
          >
            {experienceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button
              color="primary"
              size="sm"
              className="px-8"
            >
              搜索
            </Button>

            <Button
              color="danger"
              variant="light"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSearchField("fullName")
                setSpecialty("all")
                setExperience("all")
              }}
            >
              重置
            </Button>
          </div>
        </div>
      </Card>

      {/* 按摩师列表 */}
      <Card className="p-4">
        <MasseursTable masseurs={filteredMasseurs} />
      </Card>
    </div>
  )
} 