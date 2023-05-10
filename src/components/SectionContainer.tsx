export default function SectionContainer({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={`w-full md:w-[48rem] px-4 mx-auto sm:px-6 xl:w-[64rem] xl:px-0 ${className ?? ''}`}
    >
      {children}
    </section>
  )
}
