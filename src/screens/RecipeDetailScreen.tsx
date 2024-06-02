import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { Loading } from "./components";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown } from "react-native-reanimated";

const fetchMealById = async (mealId: string) => {
  const response = await fetch(
    `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const RecipeDetailScreen = ({ route }: any) => {
  const { strMealThumb, idMeal } = route.params;
  const [IsFavourite, setIsFavourite] = useState(false);
  const navigation: any = useNavigation();

  const { data, isLoading, isError } = useQuery(
    ["mealData", idMeal],
    () => fetchMealById(idMeal),
    { enabled: !!idMeal }
  );
  const ingredientsIndexes = (meal: any) => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(meal[`strIngredient${i}`]);
      }
    }
    return ingredients;
  };

  const getYoutubeVideoId = (url: any) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-white flex-1"
    >
      <StatusBar style="light" />

      {/* recipe Image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: strMealThumb }}
          style={{
            width: wp(100),
            height: hp(50),
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        />
      </View>

      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="p-2 bg-white rounded-full ml-4"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsFavourite(!IsFavourite);
          }}
          className="p-2 bg-white rounded-full mr-4"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={IsFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="mx-4 flex justify-between space-y-4 pt-6">
          {/* name & area */}
          <Animated.View
            entering={FadeInDown.duration(500).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              style={{
                fontSize: hp(3),
              }}
              className="font-bold flex-1 text-neutral-700"
            >
              {data.meals[0].strMeal}
            </Text>
            <Text
              style={{
                fontSize: hp(2),
              }}
              className="font-medium flex-1 text-neutral-500"
            >
              {data.meals[0].strArea}
            </Text>
          </Animated.View>

          {/* mics */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="flex-row justify-around"
          >
            {/* Minutes */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  width: hp(6.5),
                  height: hp(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{
                    fontSize: hp(2),
                  }}
                  className=" text-neutral-700 font-bold"
                >
                  35
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                  }}
                  className=" text-neutral-700 font-bold"
                >
                  Mins
                </Text>
              </View>
            </View>
            {/* Servings */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  width: hp(6.5),
                  height: hp(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UserIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{
                    fontSize: hp(2),
                  }}
                  className=" text-neutral-700 font-bold"
                >
                  03
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                  }}
                  className=" text-neutral-700 font-bold"
                >
                  Servings
                </Text>
              </View>
            </View>
            {/* Calories */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  width: hp(6.5),
                  height: hp(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{
                    fontSize: hp(2),
                  }}
                  className=" text-neutral-700 font-bold"
                >
                  103
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                  }}
                  className=" text-neutral-700 font-bold"
                >
                  Calories
                </Text>
              </View>
            </View>
            {/* Calories */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  width: hp(6.5),
                  height: hp(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{
                    fontSize: hp(2),
                  }}
                  className=" text-neutral-700 font-bold"
                >
                  100%
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                  }}
                  className=" text-neutral-700 font-bold"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients */}
          <Animated.View
            entering={FadeInDown.duration(500).springify().damping(12)} className="space-y-4">
            <Text
              style={{
                fontSize: hp(2.5),
              }}
              className="flex-1 text-neutral-700 font-bold"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3 items-center">
              {ingredientsIndexes(data.meals[0]).map((ingredient, index) => {
                return (
                  <View key={index} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />

                    <Text
                      style={{
                        fontSize: hp(2),
                      }}
                      className="flex-1 text-neutral-700 font-bold"
                    >
                      {ingredient}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* Instruction */}

          <Animated.View
            entering={FadeInDown.duration(500).springify().damping(12)} className="space-y-4">
            <Text
              style={{
                fontSize: hp(2.5),
              }}
              className="flex-1 text-neutral-700 font-bold"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {data.meals[0].strInstructions}
            </Text>
          </Animated.View>
          {/* Recipe Videos*/}
          <Animated.View
            entering={FadeInDown.duration(500).springify().damping(12)} className="space-y-4">
            <Text
              style={{
                fontSize: hp(2.5),
              }}
              className="flex-1 text-neutral-700 font-bold"
            >
              Recipe Video
            </Text>
            <View>
              {!!data.meals[0].strYoutube && (
                <YoutubeIframe
                  videoId={getYoutubeVideoId(data.meals[0].strYoutube)}
                  height={hp(30)}
                />
              )}
            </View>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailScreen;
