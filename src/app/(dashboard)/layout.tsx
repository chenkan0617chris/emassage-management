
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
       <div className="ml-64 transition-all duration-300 ease-in-out">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 