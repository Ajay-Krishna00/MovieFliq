import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import Searchbar from "@/components/Searchbar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: movies,
    error: movieErr,
    loading: movieLoading,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({ query: searchTerm }),false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchTerm.trim()) {
        await loadMovies();
      }
      else {
        reset()
      }
    }, 500)
    return () => { clearTimeout(timeout) }
  }, [searchTerm]);
  
  useEffect(() => {
    if (movies?.length > 0 && movies?.[0])
      updateSearchCount(searchTerm, movies[0]);
  },[movies])

  return (
    <View className="flex-1 bg-primary relative">
      <Image source={images.bg} className="flex-1 absolute z-0 w-full" resizeMode="cover" />
      <FlatList data={movies} renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100}}
        ListHeaderComponent={
          <>
            <View className="flex-row items-center justify-center w-full mt-16">
              <Image source={icons.logo} className="w-12 h-10 "/>
            </View>
            <View className="my-4">
              <Searchbar
                value={searchTerm}
                onChangeText={(term:string)=>setSearchTerm(term)}
                placeholder="Search movies..."
              />
            </View>
            {movieLoading && (
              <ActivityIndicator size={"large"} color="#0000ff" className="mt-10 self-center" />
            )}
            {movieErr && <Text className="text-white text-center">Error: {movieErr.message}</Text>}
            {!movieLoading && !movieErr && searchTerm.trim() && movies?.length>0 && (
              <Text className="text-xl text-white">
                Search Results for{' '}
                <Text className="text-accent">"{searchTerm}"</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !movieLoading && !movieErr ? (
            <View className="px-5 mt-10">
              <Text className="text-center text-sm text-gray-500">{searchTerm.trim() ? "No Movies Found" : "Search for a Movie"}</Text>
              {/* or include an Image */}
              </View>
          ):null
        }
      />
    </View>
  );
};

export default Search;
