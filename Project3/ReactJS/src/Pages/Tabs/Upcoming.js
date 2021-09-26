import React from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Tabs from "../../Components/Tabs/Tabs";
import { Container } from "./ItemListElements";
import Items from "./Items";
import { currentDate } from "./CurrentDate";
import PerformOperations from "./PerformOperations";
import UserPool from "../../Pool/UserPool";
import Axios from "axios";

const Upcoming = () => {
  const userId = UserPool.getCurrentUser().getUsername();
  const [activeTab, setActiveTab] = useState(3);
  const [proceed, setProceed] = useState(false);

  const setTab = () => {
    setActiveTab(3);
  };

  const initialData = () => {
    //Make Axios Call for fetching items
    let items = [];

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
          if (
            object[i][1].due_date > currentDate() &&
            object[i][1].title !== ""
          ) {
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
    PerformOperations(initialData());

  return (
    <div>
      <Navbar />
      <Tabs activeTab={activeTab} setTab={setTab} />
      <Container>
        <br />
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

export default Upcoming;
