import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";
/* types */
import { Shop } from "../types/shop";
/* component */
import { Stars } from "./Stars";

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;
// ?ここの型定義の背景を掴み取る
// なぜ、Shopという型定義ではなく、Propsという型定義を使っているのか？
type Props = {
  shop: Shop;
  onPress: () => void;
};

// componentの型定義（特にprops）をどうやるのか
export const ShopReviewItem: React.FC<Props> = ({ shop, onPress }: Props) => {
  const { name, place, score, imageUrl } = shop;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image}></Image>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.placeText}>{place}</Text>
      <Stars score={score} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    padding: 16,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 0.7,
  },
  nameText: {
    fontSize: 16,
    color: "#000",
    marginTop: 8,
    fontWeight: "bold",
  },
  placeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
});
