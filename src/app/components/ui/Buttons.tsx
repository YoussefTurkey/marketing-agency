type TButton = {
  children: React.ReactNode;
  href?: string;
  style?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' 
  disabled?: boolean
};

const Buttons = ({ href, children, style, onClick, type, disabled }: TButton) => {
  return (
    <>
      {onClick || type ? (
        <button
          onClick={onClick}
          type={type}
          disabled={disabled}
          className={`${style} cursor-pointer md:text-md md:px-[25px] py-[10px] rounded-md bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] dark:text-[hsl(var(--background))] dark:hover:text-[hsl(var(--foreground))] transition-all capitalize font-bold`}
        >
          {children}
        </button>
      ) : (
        <a
          href={href}
          role="button"
          className={`${style} md:text-md md:px-[25px] py-[10px] rounded-md bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] dark:text-[hsl(var(--background))] dark:hover:text-[hsl(var(--foreground))] transition-all capitalize font-bold`}
        >
          {children}
        </a>
      )}
    </>
  );
};

export default Buttons;
