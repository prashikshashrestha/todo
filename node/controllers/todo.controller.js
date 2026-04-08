export const createTodoHandler=async(req,res)=>{
try{
	const {todoTitle,todoDescription}=req.body;
	 if(!todoTitle||todoDescription) throw new Error("empty fields are not accepted")

	 const [result] = await db.query(
		"INSERT INTO todos (todoTitle, todoDescription) VALUES (?, ?)",
		[todoTitle, todoDescription]
	);

     if(!result) throw new Error("Unable to create todo , Internal server Error")

     return res.status(200).json({
	     success:true,
	     messsage:"todo created successfully",
	     data:result
     })
}catch(error){
	console.log("error")
	console.error(error)
	return res.status(500).json({
		success:true,
	     messsage:"todo created successfully"
	})
}

}
export const updateTodoHandler=async(req,res)=>{
try{
	const {todoTitle,todoDescription,status}=req.body;
	 if(!todoTitle||!todoDescription||!status) throw new Error("empty fields are not accepted")

	 const [result] = await db.query(  
		"INSERT INTO users (todoTitle, todoDescription,status) VALUES (?, ?)",  
		[todoTitle, todoDescription,status]  
	);

     if(!result) throw new Error("Unable to update todo , Internal server Error")

     return res.status(200).json({
	     success:true,
	     messsage:"todo updated successfully",
	     data:result
     })
}catch(error){
	console.log("error")
	console.error(error)
	return res.status(500).json({
		success:true,
	     messsage:"todo updated successfully"
	})
}
}
export const deleteTodoHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM todos WHERE id=?",
      [id]
    );

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