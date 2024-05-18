export function Loader() {
  return (
    <div data-testid="loader" className="absolute left-[50%] top-[45%]">
      <div className="border-gray-100 h-12 w-12 animate-spin rounded-full border-2 border-t-black" />
    </div>
  )
}
