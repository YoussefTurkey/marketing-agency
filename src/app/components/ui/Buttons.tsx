type TButton = {
  children: string;
  href: string;
  style: string
};

const Buttons = ({ href, children, style }: TButton) => {
  return (
    <a
      href={href}
      role="button"
      className={`${style} md:text-md md:px-[25px] py-[10px] rounded-md bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] dark:text-[hsl(var(--background))] dark:hover:text-[hsl(var(--foreground))] transition-all capitalize font-bold`}
    >
      {children}
    </a>
  );
};

export default Buttons;
