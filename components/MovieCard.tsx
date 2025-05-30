import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({id,poster_path,title,vote_average,release_date}:Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity
        className="w-[30%]"
        style={{ elevation: 5 }}
      >
        <Image source={{
          uri:
            poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` :
            'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=No+Poster'
        }}
          className='w-full h-40 rounded-lg mb-2'
          resizeMode='cover'
        />
        <Text className='text-white font-bold text-sm mb-1' numberOfLines={1}>{title} </Text>
        <View className='flex flex-row items-center justify-start gap-x-1'>
          <Image source={icons.star} className='w-4 h-4' />
          <Text className='text-white text-xs font-semibold uppercase'>
            {vote_average.toFixed(1)}
          </Text>
        </View>
        <View className='flex flex-row items-center justify-between'>
          <Text className='text-gray-400 text-xs mt-1'>
            {/* {new Date(release_date).getFullYear()} */}
            {release_date.split("-")[0]}
          </Text>
          <Text className='text-gray-400 text-xs font-medium uppercase'>Movie </Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard