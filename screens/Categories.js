import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SafeScreen from "../components/SafeScreen";
import { AntDesign } from "@expo/vector-icons";
import { getCategories } from "../utilty/catUtility";

function Category({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Function to toggle the expansion of a main category
  const toggleCategoryExpansion = (mainCategory) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [mainCategory]: !prev[mainCategory],
    }));
  };

  // Function to group categories by their main category
  const groupCategoriesByMainCategory = () => {
    const groupedCategories = {};
    categories.forEach((category) => {
      if (!groupedCategories[category.mainCategory]) {
        groupedCategories[category.mainCategory] = [];
      }
      groupedCategories[category.mainCategory].push(category);
    });
    return groupedCategories;
  };

  return (
    <SafeScreen style={{ paddingTop: 50 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logo}>Define Category</AppText>
            <AppText style={styles.subText}>
              Define Categories of products
            </AppText>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("addcat", { subcat: null })}
          style={styles.category}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <AppText style={styles.categoryText}>
                Define a new Category
              </AppText>
            </View>
            <AntDesign name="arrowright" size={22} color="white" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 15,
            marginBottom: 10,
            alignSelf: "flex-start",
            paddingHorizontal: 10,
          }}
        >
          <AppText style={{ fontSize: 26, fontWeight: "bold" }}>
            Added Categories
          </AppText>
        </View>
        {Object.entries(groupCategoriesByMainCategory()).map(
          ([mainCategory, subcategories], index) => (
            <View key={index} style={styles.categorySection}>
              <TouchableOpacity
                onPress={() => toggleCategoryExpansion(mainCategory)}
                style={styles.categoryHeader}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <AppText style={styles.categoryHeaderText}>
                    {mainCategory}
                  </AppText>
                  <AntDesign
                    name={
                      expandedCategories[mainCategory] ? "arrowup" : "arrowdown"
                    }
                    size={22}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
              {expandedCategories[mainCategory] &&
                subcategories.map((subcategory, subIndex) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("addcat", {
                        subcat: subcategory.subCategory,
                      })
                    }
                    style={styles.categoryContainer}
                    key={subIndex}
                  >
                    <AppText>{subcategory.subCategory}</AppText>
                  </TouchableOpacity>
                ))}
            </View>
          )
        )}
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
  },
  innerContainer: {
    width: "80%",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  logo: {
    color: colors.dark,
    fontSize: 35,
    fontWeight: "bold",
  },
  subText: {
    color: colors.medium,
    fontSize: 16,
    textAlign: "center",
  },
  categorySection: {
    marginBottom: 20,
    width: "90%",
  },
  categoryHeader: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: "90%",
  },
  categoryHeaderText: {
    color: colors.white,
    fontWeight: "bold",
    marginRight: 10,
  },
  categoryContainer: {
    backgroundColor: colors.white,
    width: "60%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    marginRight: 20,
    marginLeft: "auto",
  },
  category: {
    backgroundColor: colors.primary,
    width: "90%",
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    padding: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  categoryText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default Category;
