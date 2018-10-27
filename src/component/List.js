import React from "react";
import Loader from "./LoaderHOC";
import ListItem from "../component/ListItem";

const List = ({ data, updateToDo, filterText, showEdit, deleteToDo }) => {
  const filterData = data.filter(
    item => item.name.toLowerCase().indexOf(filterText) !== -1
  );

  return (
    <div className="d-flex flex-column col m-2">
      {filterData.map(item => (
        <ListItem
          item={item}
          updateToDo={updateToDo}
          showEdit={showEdit}
          deleteToDo={deleteToDo}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default Loader("loading")(List);
