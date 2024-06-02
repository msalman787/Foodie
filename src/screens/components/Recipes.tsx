import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import CachedImage from "../../helpers/CachedImage";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";

const RecipeCard = ({ item, index }: any) => {
  let isEven = index % 3 === 0;
  const navigation: any = useNavigation();
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(500)
        .springify()
        .damping(12)}
    >
      <Pressable
        className="flex justify-center mb-4 space-y-1"
        style={{
          width: "100%",
          paddingLeft: isEven ? 6 : 8,
          paddingRight: isEven ? 8 : 6,
        }}
        onPress={() => {
          navigation.navigate("RecipeDetail", { ...item });
        }}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: isEven ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />
        {/* <CachedImage
          uri={item.strMealThumb }
          style={{
            width: "100%",
            height: index % 2 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        /> */}
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0.2) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const Recipes = ({ searchValue, mealsData }: any) => {
  const filteredCategories = searchValue && mealsData.meals.filter((category: any) =>
    category?.strMeal?.toLowerCase().includes(searchValue?.toLowerCase())
  );
// console.log(mealsData?.meals?.length)
  return (
    <View className="mx-4 space-y-3 ">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {!mealsData?.meals?.length ? (
          <Loading size="large" color="text-neutral-600" className="mt-20" />
        ) : (
          <MasonryList
            data={!!filteredCategories ? filteredCategories : mealsData.meals}
            keyExtractor={(item: any) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }: any) => (
              <RecipeCard item={item} index={i} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

export default Recipes;
