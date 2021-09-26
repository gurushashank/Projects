import { useState } from "react";
import Axios from "axios";
import UserPool from "../../Pool/UserPool";

const PerformOperations = (initialData) => {
  const userId = UserPool.getCurrentUser().getUsername();
  const [items, setItems] = useState(initialData);

  const completeItem = (id) => {
    let newItems = items.map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setItems(newItems);
  };

  const removeItem = (id) => {
    const newItems = [...items].filter((item) => item.id !== id);
    setItems(newItems);

    //Make Axios Calls for Delete Item
    Axios.patch(
      "https://xldmshopc6.execute-api.us-east-1.amazonaws.com/production/updatetask",
      {
        user_id: userId,
        task_id: id,
        updateKey: "title",
        updateValue: "",
      }
    )
      .then((res) => {
        console.log("Delete Item");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateItem = (id, value) => {
    if (!value.title || !value.description || !value.date) {
      alert("Please enter values for title, description and date!");
    } else {
      let newItems = items.map((item) => {
        if (item.id === id) {
          item.title = value.title;
          item.date = value.date;
          item.description = value.description;
        }
        console.log(item);

        //Make Axios Calls for Update Item
        Axios.patch(
          "https://xldmshopc6.execute-api.us-east-1.amazonaws.com/production/updatetask",
          {
            user_id: userId,
            task_id: id,
            updateKey: "title",
            updateValue: value.title,
          }
        )
          .then((res) => {
            console.log("Update Title");
          })
          .catch((err) => {
            console.log(err);
          });
        Axios.patch(
          "https://xldmshopc6.execute-api.us-east-1.amazonaws.com/production/updatetask",
          {
            user_id: userId,
            task_id: id,
            updateKey: "due_date",
            updateValue: value.date,
          }
        )
          .then((res) => {
            console.log("Update Due Date");
          })
          .catch((err) => {
            console.log(err);
          });
        Axios.patch(
          "https://xldmshopc6.execute-api.us-east-1.amazonaws.com/production/updatetask",
          {
            user_id: userId,
            task_id: id,
            updateKey: "description",
            updateValue: value.description,
          }
        )
          .then((res) => {
            console.log("Update Description");
          })
          .catch((err) => {
            console.log(err);
          });
        return item;
      });
      setItems(newItems);
    }
  };

  return { items, setItems, completeItem, removeItem, updateItem };
};

export default PerformOperations;
