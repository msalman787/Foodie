import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { Categories, Recipes } from "./components";
import { useQuery } from "react-query";
import { useDebounce } from "../hooks";

const fetchCategories = async () => {
  const response = await fetch(
    "https://themealdb.com/api/json/v1/1/categories.php"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchMealsByCategory = async (category: string) => {
  const response = await fetch(
    `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue);
  
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery("categories", fetchCategories);

  const {
    data: mealsData,
    isLoading: isLoadingMeals,
    isError: isErrorMeals,
  } = useQuery(
    ["meals", activeCategory],
    () => fetchMealsByCategory(activeCategory),
    { enabled: !!activeCategory } // This ensures the query only runs if selectedCategory is not null/undefined
  );
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-10"
      >
        <View className="mx-4 flex-row justify-between items-center">
          <Image
            source={require("../../assets/logo.jpg")}
            style={{ width: hp(5), height: hp(5) }}
            className="rounded-full"
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greeting and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Salman!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at{" "}
            <Text style={{ fontSize: hp(3.8) }} className="text-amber-500">
              home
            </Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base pl-3 mb-1 tracking-wider"
            placeholderTextColor="gray"
            cursorColor="gray"
            value={searchValue}
            onChangeText={setSearchValue}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            className="bg-white rounded-full p-3"
          >
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        {/* categories */}
        <View>
          {categoriesData?.categories && (
            <Categories
              setActiveCategory={setActiveCategory}
              activeCategory={activeCategory}
              categories={categoriesData?.categories}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes searchValue={debouncedValue} mealsData={mealsData} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
