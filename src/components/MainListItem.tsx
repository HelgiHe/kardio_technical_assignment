import { TextComponent } from "./Text";

export type ListItemProps = {
  title: string;
  subtitle: string;
  thumbnail: string;
};

export const MainListItem = ({ title, subtitle, thumbnail }: ListItemProps) => {
  return (
    <div className="flex flex-row px-4 py-2 my-2 rounded-md border border-sand-500 items-center">
      <div className="w-1/6">
        <TextComponent as="span" variant="h1">
          {thumbnail}
        </TextComponent>
      </div>
      <div className="w-5/6 flex flex-col">
        <TextComponent as="h3">{title}</TextComponent>
        <TextComponent as="p">{subtitle}</TextComponent>
      </div>
    </div>
  );
};
