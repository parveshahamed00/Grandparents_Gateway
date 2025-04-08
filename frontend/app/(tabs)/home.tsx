import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("window");

const categories = [
  {
    title: "Doctors",
    image: require("../../assets/images/doctor.jpg"),
  },

  {
    title: "Physiotherapists",
    image: require("../../assets/images/physio.jpg"),
  },
  {
    title: "Nurses",
    image: require("../../assets/images/nurse.jpg"),
  },
  {
    title: "Care Takers",
    image: require("../../assets/images/care-taker.jpg"),
  },
  {
    title: "Dentist",
    image: require("../../assets/images/dentist.jpg"),
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
<Text style={styles.heading}>
  🌟 Embrace Care & Comfort at  Grandparents Gateway  Your Wellness, Our Mission 💖
</Text>
      <View style={styles.grid}>
        {categories.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <ImageBackground source={item.image} style={styles.image} imageStyle={styles.imageStyle}>
              <LinearGradient
                colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.1)"]}
                style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:35,
    backgroundColor: "#AFDDFF",
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 20,
    color: "#006A71",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    width: width * 0.44,
    height: 180,
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 20,
  },
  overlay: {
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
