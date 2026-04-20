import db from "../config/db.js";
export const createTodoHandler = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) throw new Error("empty fields are not accepted");
    const [result] = await db.query(
      "INSERT INTO todos (title, description) VALUES (?, ?)",
      [title, description],
    );
    if (!result)
      throw new Error("Unable to create todo , Internal server Error");

    return res.status(200).json({
      success: true,
      messsage: "todo created successfully",
      data: result,
    });
  } catch (error) {
    console.log("error");
    console.error(error);
    return res.status(500).json({
      success: false,
      messsage: "err while creating todo",
      error,
    });
  }
};
export const updateTodoHandler = async (req, res) => {
  try {
    // console.log(req);
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description)
      throw new Error("empty fields are not accepted");

    const [result] = await db.query(
      "UPDATE todos SET title = ?, description = ? WHERE id = ?",
      [title, description, id],
    );
    if (!result)
      throw new Error("Unable to update todo , Internal server Error");

    return res.status(200).json({
      success: true,
      messsage: "todo updated successfully",
      data: result,
    });
} catch (error) {
    console.error("Error in updateTodoHandler:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating todo",
      error: error.message
    });
  }
};
export const deleteTodoHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM todos WHERE id=?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTodosHandler = async (req, res) => {
  try {
    const [todos] = await db.query("SELECT * FROM todos");

    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};






// export const createTodo = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     if ((title == "")) throw new Error("title empty");
//     const [result] = await db.query(
//       "INSERT INTO todos (title, description) VALUES (?, ?)",
//       [title, description],
//     );
//     if(!result){throw new Error("unable to create todo")}
//     return res.status(200).json({
//         sucess:true,
//         messege:"todo created sucessfully",
//         data:result,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//         sucess:false,
//         messege:"failed",
//     });
//   }
// };
