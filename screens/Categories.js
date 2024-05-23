import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SafeScreen from "../components/SafeScreen";
import { AntDesign } from "@expo/vector-icons";
import { getCategories } from "../utilty/catUtility";
import { useIsFocused } from "@react-navigation/native";

function Category({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
      fetchCategories();
    }
  }, [isFocused]);

  const fetchCategories = async () => {
    try {
      const result = await getCategories();
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to toggle the expansion of a main category
  const toggleCategoryExpansion = (mainCategory) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [mainCategory]: !prev[mainCategory],
    }));
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
          onPress={() => navigation.navigate("addcat", { category_id: null })}
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
          <AppText style={{ fontSize: 26, fontFamily: "Poppins" }}>
            Added Categories
          </AppText>
        </View>
        {categories.length > 0 && 
          categories.map((category, index) => (
          <View key={index} style={styles.categorySection}>
            <TouchableOpacity
              onPress={() => toggleCategoryExpansion(category.name)}
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
                  {category.name} - {category.sku}
                </AppText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <AntDesign
                    name={"arrowright"}
                    size={22}
                    color="white"
                    onPress={() => navigation.navigate("addcat", { category_id: category._id })}
                  />
                  <AntDesign
                    name={
                      expandedCategories[category.name] ? "arrowup" : "arrowdown"
                    }
                    size={22}
                    color="white"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {expandedCategories[category.name] && (
              <View>
                {category.subCategories.map((subcategory, subIndex) => (
                  <View
                    style={styles.categoryContainer}
                    key={subIndex}
                  >
                    <AppText 
                      style={{
                        fontSize: 14,
                        width: "100%"
                      }}
                    >{subcategory.name} - {subcategory.sku}</AppText>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
  },
  logoContainer: {
    marginBottom: 5,
    alignItems: "flex-start",
  },
  logo: {
    color: colors.dark,
    fontSize: 30,
    fontWeight: "Bold",
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
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "90%",
  },
  categoryHeaderText: {
    color: colors.white,
    fontWeight: "Bold",
    marginRight: 10,
  },
  categoryContainer: {
    backgroundColor: colors.white,
    width: "80%",
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginLeft: "auto",
  },
  category: {
    backgroundColor: colors.primary,
    width: "90%",
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: colors.white,
    fontFamily: "Poppins"
  },
});

export default Category;
