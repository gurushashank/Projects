const express = require("express");
const path = require("path");
const http = require("http");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const port = process.env.PORT || "3046";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`React  Running on localhost:${port}`));

// Email - Process
const axios = require("axios");
var AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

let queue = new AWS.SQS({ apiVersion: "2012-11-05" });

const getTasksList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://xldmshopc6.execute-api.us-east-1.amazonaws.com/prod/tasks")
      .then((d) => {
        resolve(d.data.lists);
      })
      .catch((e) => {
        reject(e.message);
      });
  });
};

const sendToSQS = (sendingList10) => {
  var params = {
    DelaySeconds: 10,
    MessageBody: JSON.stringify(sendingList10),
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/957337905513/EmailQueue",
  };
  return new Promise((resolve, reject) => {
    console.log("Sending to SQS" + JSON.stringify(sendingList10, null, 4));
    queue.sendMessage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.MessageId);
      }
    });
  });
};

const handler = async (event) => {
  let emailSet = new Set();
  let sendingList10 = [];
  let tasksList;

  const today = new Date().toISOString().slice(0, 10);

  await getTasksList()
    .then((data) => {
      data.map((e) => emailSet.add(e.email));
      tasksList = data;
    })
    .catch((e) => {
      console.error(e);
    });

  const emailList = [...emailSet];

  for (let i = 0; i < emailList.length; i++) {
    let userTaskList = tasksList.flatMap((e) => {
      if (e.email === emailList[i] && e.due_date === today) {
        return e;
      }
      return [];
    });

    if (userTaskList.length > 0) {
      sendingList10.push({ email: emailList[i], tasks: userTaskList });
    }

    if (sendingList10.length % 10 == 0) {
      await sendToSQS(sendingList10)
        .then((e) => console.log(e))
        .catch((e) => console.error(e));
      sendingList10 = [];
    }
  }
  if (sendingList10.length > 0) {
    sendToSQS(sendingList10);
  }
};

exports.handler = handler;
