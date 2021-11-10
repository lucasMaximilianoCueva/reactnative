import Layout from "../components/Layout";
import React from "react";
import TaskList from "../components/TasksList";

const HomeScreen = () => {
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
};

export default HomeScreen;
