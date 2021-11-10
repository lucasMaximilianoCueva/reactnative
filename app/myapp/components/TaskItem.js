import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ task, handleDelete }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TaskFormScreen", { id: task.id })}
      >
        <Text style={styles.itemTitle}>{task.title}</Text>
        <Text style={{ color: "#8395a7" }}>{task.description}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#ee5253", padding: 7, borderRadius: 5 }}
        onPress={() => handleDelete(task.id)}
      >
        <Text style={{ color: "#fff" }}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333333",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  itemTitle: {
    color: "#ffffff",
  },
});
export default TaskItem;
