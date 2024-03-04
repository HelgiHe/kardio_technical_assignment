import "./App.css";
import { useListStore } from "./stores/listStore";
import { TextComponent } from "./components/Text";
import { MainListItem } from "./components/MainListItem";
import { Popper } from "./components/Popper";
import { useForm, Resolver } from "react-hook-form";

type FormValues = {
  title: string;
  subtitle: string;
};

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const { listItems, addItem } = useListStore();
  console.log(listItems);
  const onSubmitAdd = handleSubmit((data) => {
    const { title, subtitle } = data;
    const thumbnail = title[0].toUpperCase();
    addItem({ title, subtitle, thumbnail });
  });

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
        <div className="flex items-center justify-center pt-2">
          <Popper>
            <div>
              {/* Add item */}
              <form
                onSubmit={onSubmitAdd}
                className="flex flex-col justify-start"
              >
                <input
                  className="py-2 pl-2 border border-sand-500 bg-sand-900 rounded-md mt-3 mb-1"
                  {...register("title")}
                  placeholder="Title"
                />
                {errors?.title && (
                  <TextComponent
                    className="text-red-500"
                    as="span"
                    variant="caption"
                  >
                    {errors.title.message}
                  </TextComponent>
                )}

                <input
                  className="py-2 pl-2 border border-sand-500 bg-sand-900 rounded-md mt-3 mb-1"
                  {...register("subtitle")}
                  placeholder="Subtitle"
                />
                {errors?.subtitle && (
                  <TextComponent
                    className="text-red-500"
                    as="span"
                    variant="caption"
                  >
                    {errors.subtitle.message}
                  </TextComponent>
                )}

                <input
                  type="submit"
                  value="Add Item"
                  className="py-2 border pl-2 border-sand-500 w-fit bg-sand-700 text-sand-900 rounded-md mt-3 mb-1 text-left"
                />
              </form>
              {/* Search */}
            </div>
          </Popper>
        </div>
      </div>
    </main>
  );
}

export default App;
