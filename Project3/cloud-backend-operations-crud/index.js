const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'ToDoList';
const healthPath = '/health';
const addTask = '/addtask';
const updateTask = '/updatetask';
const deleteTask = '/deletetask';
const lists = '/lists';
const tasks = '/tasks';
const taskstoday = '/gettaskstoday ';
const dynamodbApi = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async function(event) {
  console.log('Request event: ', event);
  let response;
  switch(true) {
    case event.httpMethod === 'GET' && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === 'GET' && event.path === lists:
      response = await getList(event.queryStringParameters.user_id);
      break;
    case event.httpMethod === 'GET' && event.path === taskstoday:
        response = await getTasksToday(event.queryStringParameters.user_id);
        break;
    case event.httpMethod === 'GET' && event.path === tasks:
      response = await getLists();
      console.log(response);
      break;
    case event.httpMethod === 'POST' && event.path === addTask:
      response = await saveList(JSON.parse(event.body));
      break;
    case event.httpMethod === 'PATCH' && event.path === updateTask:
      const requestBody = JSON.parse(event.body);
      console.log(requestBody.user_id, requestBody.task_id, requestBody.updateKey, requestBody.updateValue);
      response = await modifyList(requestBody.user_id, requestBody.task_id, requestBody.updateKey, requestBody.updateValue);
      break;
    case event.httpMethod === 'DELETE' && event.path === deleteTask:
      response = await deleteList(JSON.parse(event.body).user_id, JSON.parse(event.body).task_id);
      break;
    default:
      response = buildResponse(404, '404 Not Found');
  }
  return response;
}

async function getList(userId) {
  let params = {
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': userId
            },
            TableName: dynamodbTableName
        };

  return await dynamodb.query(params).promise()
  .then((response) => {
    console.log(params)
    console.log(response.Items)
    return buildResponse(200, response.Items);
  }, (error) => {
    console.error('Fetching to do list failed: ', error);
  });
}

async function getTasksToday(userId)  {
  let params = {
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': userId
            },
            TableName: dynamodbTableName
        };

  return await dynamodb.query(params).promise()
  .then((response) => {
    console.log(params)
    console.log(response.Items)
    return buildResponse(200, response.Items);
  }, (error) => {
    console.error('Fetching to do list failed: ', error);
  });
}


async function getLists() {
  const params = {
    TableName: dynamodbTableName
  }
  const allLists = await scanDynamoRecords(params, []);
  const body = {
    lists: allLists
  }
  return buildResponse(200, body);
}

async function count() {
  const params = {
    TableName: dynamodbTableName
  }
  const all = await scanDynamoRecords(params, []);
  let total = Object.keys(all).length;
  return total;
  
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch(error) {
    console.error('Scanning Dynamo Records Failed: ', error);
  }
}

async function saveList(requestBody) {
  
  let dISO = new Date().toISOString();
  
  let total = await count();
  
  total = total+1;
  total = total.toString()
  
  let  newProperty = requestBody
  newProperty = { ...newProperty, task_id: total, creation_date: dISO};
  
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody
  }
  
  console.log(params)
  
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Adding data failed: ', error);
  })
}

async function saveList2(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody
  }
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Posting data failed: ', error);
  })
}


async function modifyList(userId, taskId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'user_id': userId,
      'task_id': taskId
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await dynamodb.update(params).promise().then((response) => {
    console.log(params)
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    }
    
    return buildResponse(200, body);
  }, (error) => {
    console.error('Modifying data failed: ', error);
  })
}

async function deleteList(userId, taskId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'user_id': userId,
      'task_id': taskId
    },
    ReturnValues: 'ALL_OLD'
  }
  return await dynamodb.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Deletion of Tod do list failed: ', error);
  })
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "OPTIONS,POST,DELETE,GET,PUT,",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "*"

    },
    body: JSON.stringify(body)
  }
}
