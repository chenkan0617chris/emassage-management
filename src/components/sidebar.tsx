'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, 
  Store, 
  ShoppingBag, 
  Settings, 
  UserCheck,
  Calendar,
  BarChart4,
  Megaphone
} from 'lucide-react'
import { Button } from '@nextui-org/react'

const menuItems = [
  {
    category: '核心管理',
    items: [
      {
        label: '用户管理',
        icon: Users,
        href: '/users',
      },
      {
        label: '按摩师管理',
        icon: UserCheck,
        href: '/masseurs',
      },
      {
        label: '商家管理',
        icon: Store,
        href: '/stores',
      },
    ]
  },
  {
    category: '业务管理',
    items: [
      {
        label: '订单管理',
        icon: ShoppingBag,
        href: '/orders',
      },
      {
        label: '服务管理',
        icon: Calendar,
        href: '/services',
      },
    ]
  },
  {
    category: '运营管理',
    items: [
      {
        label: '数据分析',
        icon: BarChart4,
        href: '/analytics',
      },
      {
        label: '营销工具',
        icon: Megaphone,
        href: '/marketing',
      },
      {
        label: '站点设置',
        icon: Settings,
        href: '/settings',
      },
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`
      fixed left-0 h-screen 
      bg-gray-50/80 backdrop-blur-xl 
      border-r border-gray-200
      transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center min-h-[80px]">
          {!isCollapsed && (
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-6">
              按摩管理系统
            </h1>
          )}
          <div className="flex justify-center w-full">
            <Button
              isIconOnly
              variant="light"
              className="w-14 h-14 rounded-lg hover:bg-gray-100"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <span className="text-gray-500">
                {isCollapsed ? '→' : '←'}
              </span>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-6">
              {!isCollapsed && (
                <h2 className="px-4 mb-2 text-xs font-semibold text-gray-500">
                  {section.category}
                </h2>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} className="flex justify-center">
                    <Button
                      variant="light"
                      className={`
                        mb-1
                        ${isCollapsed ? 'w-14 min-w-14 p-0 flex justify-center' : 'w-[90%] px-4 justify-start'}
                        ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}
                        hover:bg-gray-100
                        transition-colors
                        rounded-lg
                      `}
                    >
                      <item.icon className={`
                        w-5 h-5
                        ${isCollapsed ? '' : 'mr-3'}
                      `} />
                      {!isCollapsed && item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="flex justify-center min-h-[80px] border-t border-gray-200">
          <Button
            variant="light"
            className="w-14 h-14 rounded-lg hover:bg-gray-100 my-auto"
          >
            <Settings className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  )
} 