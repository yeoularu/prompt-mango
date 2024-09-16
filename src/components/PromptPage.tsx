export default function PromptPage({
  category,
  name
}: Readonly<{
  category?: string
  name?: string
}>) {
  return (
    <div>
      <h3>{category}</h3>
      <h2>{name}</h2>
    </div>
  )
}
