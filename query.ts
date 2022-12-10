import { Toast } from "native-base";
import { useQuery } from "react-query"; // for my API fetching AND caching needs.
import create from "zustand"; // for my UI state and general component communication needs. NO CONTEXT, REDUX, etc.
const moment = require("moment");

type PHOTO_URLS = {
  full: string;
  small: string;
  thumb: string;
  regular: string;
};

type UNSPLASH_USER = {
  bio: string;
  first_name: string;
  id: string;
  last_name: string;
  profile_image: {
    large: string;
    medium: string;
    small: string;
  };
};

export type UNSPLASH_PHOTO = {
  alt_description: string;
  created_at: string;
  id: string;
  likes: number;
  updated_at: string;
  width: number;
  height: number;
  description: string;
  urls: PHOTO_URLS;
  user: UNSPLASH_USER;
};

interface AppStore {
  displayedPhotos: UNSPLASH_PHOTO[] | [];
  setDisplayedPhotos: Function;

  favoritePhotos: UNSPLASH_PHOTO[];
  updateFavoritesPhotos: Function;

  searchedPhotos: UNSPLASH_PHOTO[] | [];
  updateSearchedPhotos: Function;

  page: number;
  setPage: Function;

  searchQuery: string;
  setSearchQuery: Function;

  selectedCard: number;
  setSelectedCard: Function;

  sortPreference: string;
  setSortPreference: Function;

  showModal: boolean;
  setShowModal: Function;
}

export const useStore = create<AppStore>((set) => ({
  displayedPhotos: [],
  setDisplayedPhotos: (photos: UNSPLASH_PHOTO[]) => {
    set((state) => {
      if (state.sortPreference?.length > 0) {
        const copy: UNSPLASH_PHOTO[] = Object.assign([], photos);
        if (state.sortPreference === "Newest") {
          copy?.sort((a, b) =>
            moment.utc(b.created_at).diff(moment.utc(a.created_at))
          );
        } else {
          copy?.sort((a, b) => {
            if (a.likes < b.likes) return 1;
            if (a.likes > b.likes) return -1;
            return 0;
          });
        }

        return { displayedPhotos: copy };
      }

      return { displayedPhotos: photos };
    });
  },

  searchedPhotos: [],
  updateSearchedPhotos: (photos: UNSPLASH_PHOTO[]) => {
    set(() => ({
      searchedPhotos: photos,
    }));
  },

  favoritePhotos: [],
  updateFavoritesPhotos: (photo: UNSPLASH_PHOTO) =>
    set((state) => {
      let currentPhotos = state.favoritePhotos;
      const index = currentPhotos?.findIndex((item) => item.id === photo?.id);

      if (index === -1) {
        // photo not found, so add it
        currentPhotos?.push(photo);
        Toast.show({
          description: "Photo added to favorites!",
          backgroundColor: "black",
          duration: 3000,
        });
      } else {
        currentPhotos = currentPhotos?.filter((item) => item.id != photo?.id);
        Toast.show({
          description: "Photo removed from favorites.",
          backgroundColor: "black",
          duration: 3000,
        });
      }

      return {
        favoritePhotos: currentPhotos,
      };
    }),

  page: 1,
  setPage: (page: number) => set(() => ({ page })),

  searchQuery: "",
  setSearchQuery: (query: string) => set(() => ({ searchQuery: query })),

  selectedCard: -1,
  setSelectedCard: (index: number) =>
    set(() => ({
      selectedCard: index,
    })),

  sortPreference: "",
  setSortPreference: (preference: string) =>
    set((state) => {
      const copy: UNSPLASH_PHOTO[] = Object.assign([], state.displayedPhotos);
      if (preference === "Newest") {
        copy?.sort((a, b) =>
          moment.utc(b.created_at).diff(moment.utc(a.created_at))
        );
      } else {
        copy?.sort((a, b) => {
          if (a.likes < b.likes) return 1;
          if (a.likes > b.likes) return -1;
          return 0;
        });
      }

      return {
        sortPreference: preference,
        displayedPhotos: copy,
      };
    }),

  showModal: false,
  setShowModal: (show: boolean) => set(() => ({ showModal: show })),
}));

export const useSearchForPhotos = (searchPhrase: string, page: number) => {
  console.log("search", searchPhrase);
  const SearchPhotos = async () => {
    const results = await fetch(
      `https://api.unsplash.com/search/photos?client_id=2dj2v7k4BkTZ3l9wH3uNO0lEI462mnEQIYdflynxp2k&count=10&page=${page}&query=${searchPhrase}`
    );
    return (await results.json()).results as UNSPLASH_PHOTO[];
  };

  return useQuery<UNSPLASH_PHOTO[], Error>(
    ["searched_photos", searchPhrase, page],
    SearchPhotos
  );
};
