import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  const favoriteRecipes = useSelector((state) => state.favorites.favoriteRecipes); // fixed selector
  const favoriteRecipesList = favoriteRecipes || [];

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#2563EB",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            width: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: hp(3.8),
          marginTop: hp(4),
          marginLeft: 20,
          fontWeight: "600",
          color: "#4B5563",
        }}
      >
        My Favorite Recipes
      </Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#2563EB",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: 100,
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        <Text style={{ color: "#fff" }}>Go back</Text>
      </TouchableOpacity>

      <FlatList
        data={favoriteRecipesList}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={(item) => item.recipeId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("RecipeDetail", item)}
          >
            <Image
              source={{ uri: item.recipeImage }}
              style={styles.recipeImage}
            />
            <Text style={styles.recipeTitle}>
              {item.recipeName.length > 20
                ? `${item.recipeName.slice(0, 20)}...`
                : item.recipeName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
});
