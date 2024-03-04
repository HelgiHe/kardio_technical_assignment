import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";

type Props = {
  children: React.ReactNode;
  triggerIcon?: React.ReactElement;
}


export const Popper = ({children, triggerIcon}: Props) => (
  <Popover.Root>
    <Popover.Trigger>
      <button>
        {triggerIcon}
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="bg-white border border-sand-500 rounded-md p-5 w-fit max-w-screen min-h-36">
        <Popover.Close>
          <Cross2Icon />
          </Popover.Close>
        <Popover.Arrow />
        {children}
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);
