import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMov } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMov,
    error: trendingMovErr,
    loading: trendingMovLod
  } = useFetch(getTrendingMov);

  const {
    data: movies,
    error: movieErr,
    loading: movieLoading,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto mb-15" />

        {movieLoading || trendingMovLod ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : movieErr || trendingMovErr ? (
            <Text className="text-white">Error: {movieErr?.message} ||{trendingMovErr?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <Searchbar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
                />

                {trendingMov && (
                  <View>
                    <Text className="text-lg text-white font-bold mt-4">Trending Movies</Text>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      ItemSeparatorComponent={() => <View className="w-6" />}
                      className="mb-4 mt-3"
                      data={trendingMov}
                      keyExtractor={(item) => item.movie_id.toString()}
                      renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                    />
                  </View>
                )}

                <Text className="text-lg text-white font-bold mt-3">Latest Movies</Text>
                <FlatList
                  data={movies}
                  renderItem={({ item }) => (
                    <MovieCard
                    {...item} //destructuring all properties from the item object and passing them as props to the MovieCard component.
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    marginLeft: 5,
                    marginBottom: 10,
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
