import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
    console.log(todos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let idx = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[idx].isCompleted = !newTodos[idx].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const toggleFinished = (e) => {
    setShowFinished(!ShowFinished);
  };

  return (
    <>
      <NavBar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-300 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-2xl ">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-4 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-md px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-slate-700 disabled:bg-slate-600 hover:bg-slate-800 p-3 py-1 text-sm font-bold text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex gap-2 my-2">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={ShowFinished}
            id="show"
          />
          <label htmlFor="shov">Show Finished</label>
        </div>
        <div className="h-[1px] mx-auto bg-black opacity-20 w-[90%] my-2"></div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (ShowFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-slate-700 hover:bg-slate-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-slate-700 hover:bg-slate-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
