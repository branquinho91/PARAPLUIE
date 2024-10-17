import { View, Image, StyleSheet, Text } from "react-native";

type UserHeaderProps = {
  name: string;
};

const UserHeader = ({name}: UserHeaderProps) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/BIG_BOSS.png")} style={styles.image} />
      <Text style={styles.headerText}>Olá, {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ccc",
    width: "90%",
    height: 80,
    marginBottom: 40,
    marginTop: 20,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginRight: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default UserHeader;
