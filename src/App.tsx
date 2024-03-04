import "./App.css";
import { useListStore } from "./stores/listStore";
import { TextComponent } from "./components/Text";
import { MainListItem } from "./components/MainListItem";

function App() {
  const { listItems } = useListStore();
  return (
    <main className="bg-sand-900 min-h-screen min-w-screen">
      <div className="max-w-6xl m-auto px-4 xl:px-0">
      <TextComponent className="pt-20 pb-24" as="h1">Awesome app</TextComponent>
      <div>
        <TextComponent as="h2" className="pb-2">The List</TextComponent>
        {listItems.length > 0 ? (
          <ul>
            {listItems.map((item) => {
              const { title, subtitle, thumbnail } = item;
              return (
                <MainListItem
                  title={title}
                  subtitle={subtitle}
                  thumbnail={thumbnail}
                />
              );
            })}
          </ul>
        ) : null}
      </div>
      </div>
    </main>
  );
}

export default App;
