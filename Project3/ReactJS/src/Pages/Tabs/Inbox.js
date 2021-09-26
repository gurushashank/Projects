import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Container } from "./ItemListElements";
import Tabs from "../../Components/Tabs/Tabs";
import AddItem from "./AddItem";
import Items from "./Items";
import PerformOperations from "./PerformOperations";
import UserPool from "../../Pool/UserPool";
import Axios from "axios";
import { useCookies } from "react-cookie";

const Inbox = () => {
  const userId = UserPool.getCurrentUser().getUsername();
  const [cookies, setCookie] = useCookies(["email"]);
  const email = cookies.email;
  const [activeTab, setActiveTab] = useState(1);
  const [proceed, setProceed] = useState(false);

  const setTab = () => {
    setActiveTab(1);
  };

  const initialData = () => {
    let items = [];
    //Make Axios Call for fetching items
    Axios.get(
      "https://xldmshopc6.execute-api.us-east-1.amazonaws.com/production/lists?user_id=" +
        userId
    )
      .then((res) => {
        let object = Object.keys(res.data).map((key) => [
          Number(key),
          res.data[key],
        ]);

        for (let i = 0; i < object.length; i++) {
          if (object[i][1].title !== "") {
            items.push({
              id: object[i][1].task_id,
              user_id: object[i][1].user_id,
              title: object[i][1].title,
              date: object[i][1].due_date,
              description: object[i][1].description,
            });
          }
        }
        setProceed(true);
      })
      .catch((err) => {
        console.log(err);
      });
    if (proceed) {
      return items;
    } else {
      setTimeout(500);
      return items;
    }
  };

  //Operations handler
  const { items, setItems, completeItem, removeItem, updateItem } =
    PerformOperations([]);

  useEffect(() => {
    setProceed(false);
    setItems(initialData());
  }, []);

  const addItem = (item) => {
    if (!item.title || !item.description || !item.date) {
      alert("Please enter values for title, description and date!");
    } else {
      console.log(item);
      const newItems = [item, ...items];
      setItems(newItems);

      //Add Axios for adding task
      Axios.post(
        "https://xldmshopc6.execute-api.us-east-1.amazonaws.com/production/addtask",
        {
          user_id: userId,
          title: item.title,
          description: item.description,
          due_date: item.date,
          email: email,
          task_id: item.id,
        }
      )
        .then((res) => {
          console.log("Task added");
        })
        .catch((err) => {
          console.log("Error! Task not added");
        });
    }
  };

  return (
    <div>
      <Navbar />
      <Tabs activeTab={activeTab} setTab={setTab} />
      <Container>
        <AddItem onSubmit={addItem} />
        <Items
          items={items}
          completeItem={completeItem}
          removeItem={removeItem}
          updateItem={updateItem}
        />
      </Container>
    </div>
  );
};

export default Inbox;
