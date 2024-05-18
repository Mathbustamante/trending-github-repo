export function ErrorMessage({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-center text-red-600">{error.message}</p>
    </div>
  )
}
