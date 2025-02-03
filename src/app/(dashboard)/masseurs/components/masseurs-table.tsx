'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
} from "@nextui-org/react"
import { Edit2, Trash2, Star, Clock } from "lucide-react"

interface Masseur {
  id: string
  fullName: string
  profilePhoto: string
  yearsOfExperience: number
  certifications: string[]
  specialties: string[]
  rating: number
  reviewCount: number
  availability: string
  status: string
}

interface MasseursTableProps {
  masseurs: Masseur[]
}

export function MasseursTable({ masseurs }: MasseursTableProps) {
  const columns = [
    { name: "按摩师", uid: "masseur" },
    { name: "专长", uid: "specialties" },
    { name: "证书", uid: "certifications" },
    { name: "评分", uid: "rating" },
    { name: "最早可约", uid: "availability" },
    { name: "操作", uid: "actions" },
  ]

  const renderCell = (masseur: Masseur, columnKey: React.Key) => {
    switch (columnKey) {
      case "masseur":
        return (
          <User
            name={masseur.fullName}
            description={`${masseur.yearsOfExperience} 年经验`}
            avatarProps={{
              src: masseur.profilePhoto,
              className: "w-12 h-12"
            }}
          />
        )
      case "specialties":
        return (
          <div className="flex flex-wrap gap-1">
            {masseur.specialties.map((specialty, index) => (
              <Chip 
                key={index} 
                size="sm" 
                variant="flat" 
                color="warning"
              >
                {specialty}
              </Chip>
            ))}
          </div>
        )
      case "certifications":
        return (
          <div className="flex flex-wrap gap-1">
            {masseur.certifications.map((cert, index) => (
              <Chip 
                key={index} 
                size="sm" 
                variant="flat" 
                color="success"
              >
                {cert}
              </Chip>
            ))}
          </div>
        )
      case "rating":
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-semibold">{masseur.rating}</span>
            </div>
            <span className="text-gray-500 text-sm">
              ({masseur.reviewCount} 条评价)
            </span>
          </div>
        )
      case "availability":
        return (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>
              {new Date(masseur.availability).toLocaleString('zh-CN', {
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </span>
          </div>
        )
      case "actions":
        return (
          <div className="flex gap-2">
            <Tooltip content="编辑信息">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => console.log("编辑", masseur.id)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content="删除" color="danger">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onPress={() => console.log("删除", masseur.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Table aria-label="按摩师列表">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn 
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={masseurs}>
        {(masseur) => (
          <TableRow key={masseur.id}>
            {(columnKey) => (
              <TableCell>{renderCell(masseur, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
} 