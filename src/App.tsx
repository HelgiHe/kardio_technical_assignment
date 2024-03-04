import "./App.css";
import { useState } from "react";
import { useListStore } from "./stores/listStore";
import { TextComponent } from "./components/Text";
import { ListItemProps, MainListItem } from "./components/MainListItem";
import { Popper } from "./components/Popper";
import { useForm, Resolver } from "react-hook-form";
import { useDebounce } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

type FormValues = {
  title: string;
  subtitle: string;
};

type SearchResultsState = ListItemProps[];

const resolver: Resolver<FormValues> = async (values) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.title) {
    errors.title = {
      type: "required",
      message: "Title can not be empty",
    };
  }

  // Validate subtitle
  if (!values.subtitle) {
    errors.subtitle = {
      type: "required",
      message: "Subtitle can not be empty",
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors: errors,
  };
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultsState>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const { listItems, addItem } = useListStore();

  const displayList = searchTerm ? searchResults : listItems;

  const onSubmitAdd = handleSubmit((data) => {
    const { title, subtitle } = data;
    const thumbnail = title[0].toUpperCase();
    addItem({ title, subtitle, thumbnail });
  });

  const [, cancel] = useDebounce(
    () => {
      if (searchTerm) {
        const searchTermRegex = new RegExp(searchTerm, "i");

        const results = listItems.filter((listItem) =>
          searchTermRegex.test(listItem.title)
        );
        setSearchResults(results);
      } else {
        setSearchResults(listItems);
      }
    },
    900,
    [searchTerm]
  );

  return (
    <main className="bg-sand-900 min-h-screen min-w-screen">
      <div className="max-w-6xl m-auto px-4 xl:px-0">
        <TextComponent className="pt-20 pb-24" as="h1">
          Awesome app
        </TextComponent>
        <div>
          <TextComponent as="h2" className="pb-2">
            The List
          </TextComponent>
          <AnimatePresence mode="popLayout">
            {displayList.length > 0 ? (
              <ul>
                {displayList.map((item, index) => {
                  const { title, subtitle, thumbnail } = item;
                  return (
                    <motion.li
                      key={`${item.title}-${index}`}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.6, type: "tween" }}
                    >
                      <MainListItem
                        title={title}
                        subtitle={subtitle}
                        thumbnail={thumbnail}
                      />
                    </motion.li>
                  );
                })}
              </ul>
            ) : (
              <div className="w-full h-60 border flex justify-center items-center border-sand-500 rounded-md">
                <TextComponent as="p" variant="h1">
                  Nothing here
                </TextComponent>
              </div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center pt-2">
          <Popper>
            <div className="flex flex-row flex-wrap">
              <div className="mr-2">
                <TextComponent as="h4">Add</TextComponent>
                <form
                  onSubmit={onSubmitAdd}
                  className="flex flex-col justify-start"
                >
                  <input
                    className="p-2 border border-sand-500 bg-sand-900 rounded-md mt-3 mb-1"
                    {...register("title")}
                    placeholder="Title"
                  />
                  {errors?.title && (
                    <TextComponent as="span" variant="warning">
                      {errors.title.message}
                    </TextComponent>
                  )}

                  <input
                    className="p-2 border border-sand-500 bg-sand-900 rounded-md mt-3 mb-1"
                    {...register("subtitle")}
                    placeholder="Subtitle"
                  />
                  {errors?.subtitle && (
                    <TextComponent as="span" variant="warning">
                      {errors.subtitle.message}
                    </TextComponent>
                  )}

                  <input
                    type="submit"
                    value="Add Item"
                    className="p-2 border border-sand-500 w-fit bg-sand-700 text-sand-900 rounded-md mt-3 mb-1 text-left"
                  />
                </form>
              </div>
              <div>
                <TextComponent as="h4">Search</TextComponent>
                <input
                  type="text"
                  className="p-2 border border-sand-500 bg-sand-900 rounded-md mt-3 mb-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </Popper>
        </div>
      </div>
    </main>
  );
}

export default App;
