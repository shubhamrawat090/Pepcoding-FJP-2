import React from "react";
import { Link } from "react-router-dom";

function InputBox(props) {
  let [searchText, setSearchText] = React.useState("");
  let [numberOfItems, setNumberOfItems] = React.useState(9);

  const handleText = (e) => {
    //local input change krta hai -> UI
    setSearchText(e.target.value);
    //send to parent
    props.setGlobalSearchText(e.target.value);
  };

  const handleCount = (e) => {
    setNumberOfItems(e.target.value);
    //send to parent
    props.setGlobalMoviesCount(e.target.value);
  };

  return (
    <>
      {/* i will work on later */}
      <button className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 mx-2 rounded font-bold">
        <Link to="/new">New</Link>
      </button>
      <input
        className="border rounded py-1 px-1 mx-2 font-bold"
        type="text"
        value={searchText}
        onChange={handleText}
      ></input>
      <input
        className="border rounded py-1 px-1 mx-2 font-bold"
        type="number"
        value={numberOfItems}
        onChange={handleCount}
      ></input>
    </>
  );
}

export default InputBox;
