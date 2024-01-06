export default function SectionContainer({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={`mx-auto w-full px-4 sm:px-6 md:w-[48rem] xl:w-[64rem] xl:px-0 ${className ?? ''}`}
    >
      {children}
    </section>
  )
}
