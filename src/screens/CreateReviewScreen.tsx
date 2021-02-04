import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Image, Alert } from "react-native";
/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import firebase from "firebase";
import { createReviewRef, uploadImage } from "../lib/firebase";
/*contexts*/
import { UserContext } from "../context/UserContext";
import { ReviewsContext } from "../context/ReviewsContext";
/* lib */
import { pickImage } from "../lib/image-picker";
/* util */
import { getExtention } from "../utils/file";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Review } from "../types/review";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { reviews, setReviews } = useContext(ReviewsContext);

  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton onPress={() => navigation.goBack()} name="x" />
      ),
    });
  }, [navigation, shop]);

  const onSubmit = async () => {
    if (!text || !imageUri) {
      Alert.alert("レビューまたは画像がありません。");
      return;
    }
    setLoading(true);

    // documentのidを先に取得
    const reviewDocRef = await createReviewRef(shop.id);
    // storageのpathを決定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    // 画像をstorageにアップロード
    const downloadUrl = await uploadImage(imageUri, storagePath); // TODO:await外すとエラーが外れる理由を考える
    // firestoreに保存する
    const review = {
      id: reviewDocRef.id,
      user: {
        name: user.name,
      },
      shop: {
        name: shop.name,
      },
      text,
      score,
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await reviewDocRef.set(review);
    // レビュー一覧に即時反映
    setReviews([review, ...reviews]);

    setLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri);
  };

  return (
    <SafeAreaView>
      <StarInput
        score={score}
        onChangeScore={(value) => {
          setScore(value);
        }}
      />
      <TextArea
        value={text}
        onChangeText={(value) => setText(value)}
        label="レビュー"
        placeholder="レビューを書いて下さい"
      />
      <View style={styles.photoContainer}>
        <IconButton name="camera" color="#ccc" onPress={onPickImage} />
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      <Button text="レビューを投稿する" onPress={onSubmit} />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});
