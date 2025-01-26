"use client"
import Sidebar from "@/components/sidebar";
import { NextUIProvider } from "@nextui-org/react";


export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Sidebar />
      {children}
    </NextUIProvider>
  )
}