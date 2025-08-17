type TButton = {
    children: string,
    href: string
}

const Buttons = ({href, children} : TButton) => {
  return (
    <a href={href} role="button" className="hidden sm:flex md:text-md md:px-[25px] py-[10px] rounded-md bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] dark:text-[hsl(var(--background))] dark:hover:text-[hsl(var(--foreground))] transition-all capitalize font-bold">{children}</a>
  )
}

export default Buttons