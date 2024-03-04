import * as Popover from "@radix-ui/react-popover";
import { RowsIcon , Cross2Icon} from "@radix-ui/react-icons";

type Props = {
  children: React.ReactNode;
}


export const Popper = ({children}: Props) => (
  <Popover.Root>
    <Popover.Trigger>
      <button>
        <RowsIcon />
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
