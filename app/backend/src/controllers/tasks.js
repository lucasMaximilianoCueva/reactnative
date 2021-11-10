import { connect } from "../database";

let DB = []; // --- (server memory)

let _id = 0; // --- (server memory)

export const getTasks = async (req, res) => {
  // const connection = await connect();
  // const [rows] = await connection.execute("SELECT * FROM tasks");
  // res.json(rows);
  res.json(DB); // --- (server memory)
};

export const saveTask = async (req, res) => {
  // try {
  //   const connection = await connect();
  //   const [results] = await connection.execute(
  //     "INSERT INTO tasks(title, description) VALUES (?, ?)",
  //     [req.body.title, req.body.description]
  //   );

  //   const newUser = {
  //     id: results.insertId,
  //     ...req.body,
  //   };
  //   res.json(newUser);
  // } catch (error) {
  //   console.error(error);
  // }

  const newTask = {  // --- (server memory)
    id: ++_id,
    title: req.body.title,
    description: req.body.description
  }
  DB.push(newTask)
  res.json(newTask)  // --- (server memory)
};

export const getTask = async (req, res) => {
  // const connection = await connect();
  // const rows = await connection.execute("SELECT * FROM tasks WHERE id = ?", [
  //   req.params.id,
  // ]);
  // res.json(rows[0][0]);

  const reqP = DB.find(  // --- (server memory)
    (task) => task.id == req.params.id
  );
  res.json(reqP)         // --- (server memory)
};

export const deleteTask = async (req, res) => {
  // const connection = await connect();
  // const result = await connection.execute("DELETE FROM tasks WHERE id = ?", [
  //   req.params.id,
  // ]);
  // console.log(result);

  // res.sendStatus(204);

  const delTask = DB.filter(  // --- (server memory)
    (task) => task.id == req.params.id
  );
  DB = DB.filter(
    (task) => task.id !== Number(req.params.id)
  )
  res.json(delTask);
  console.log(delTask)        // --- (server memory)
};

export const updateTask = async (req, res) => {
  // const connection = await connect();
  // await connection.query("UPDATE tasks SET ? WHERE id = ?", [
  //   req.body,
  //   req.params.id,
  // ]);
  // res.sendStatus(204);

  DB = DB.map((task) => {   // --- (server memory)
    if(task.id == req.params.id) {
      task.title = req.body.title,
      task.description = req.body.description
    }
    return task
  })
  res.sendStatus(204);
  res.json(DB)              // --- (server memory)
};

export const getTasksCount = async (req, res) => {
  // const connection = await connect();
  // const [rows] = await connection.execute("SELECT COUNT(*) FROM tasks");
  // res.json(rows[0]["COUNT(*)"]);
  
  res.json(DB.length);    // --- (server memory)
};
