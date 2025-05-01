import FilterBuilder from "@/components/filter-builder"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Filter Builder Demo</h1>
        <FilterBuilder />
      </div>
    </main>
  )
}
