import { Popper } from "./Popper";
import { Pencil1Icon } from "@radix-ui/react-icons";

import { TextComponent } from "./Text";

export type ListItemProps = {
  title: string;
  subtitle: string;
  thumbnail: string;  
};

type ListItemActions = {
  onRemovePress: (title: string) => void;
};

type Props = ListItemProps & ListItemActions;

export const MainListItem = ({ title, subtitle, thumbnail, onRemovePress }: Props) => {
  return (
    <div className="flex text-left flex-row px-4 py-2 my-2 rounded-md border border-sand-500 items-center w-full">
      <div className="w-1/6">
        <TextComponent as="span" variant="h1">
          {thumbnail}
        </TextComponent>
      </div>
      <div className="w-4/6 flex flex-col">
        <TextComponent as="h3">{title}</TextComponent>
        <TextComponent as="p">{subtitle}</TextComponent>
      </div>
      <div className="w-1/6 text-right">
        <Popper triggerIcon={<Pencil1Icon />}>
          <TextComponent className="py-2" as="h3">{title}</TextComponent>
          <TextComponent className="py-2" as="p">{subtitle}</TextComponent>
          <button className="border py-2 px-4 rounded-md my-2 border-red-500 text-red-500" onClick={() => onRemovePress(title)}>Delete</button>
        </Popper>
      </div>
    </div>
  );
};
