let taskList = []; 

async function sendBlockCodeToServer()
{
    const jsonString = encodeBlocksToJson();
    const debugText = document.getElementById("debug");


    const rawResponse = await fetch
    (
        "https://localhost:8080/api/sendArduinoCode", 
        {
            method: "POST", 
            headers: 
            {
                'Content-Type': "application/json"
            },
            body: jsonString,
            mode: "no-cors"
        }
    )
    //.then(debugText.innerHTML = "success")
    .catch(err => console.error(err));

    console.log(rawResponse);

    const status =  rawResponse.statusCode

    if(status >= 400 && status <= 499)
        debugText.innerHTML = rawResponse.message;
}

function encodeBlocksToJson()
{
    taskList = [];
    let index = 0;

    const mainGroup = getMainGroup();
    
    NodeList.prototype.forEach = Array.prototype.forEach
    var children = mainGroup.childNodes;

    children.forEach(block => 
    {
        if(fillTaskList(block, index))
            index++;
    });

    const jsonObject = 
    {
        projectID: 1,
        Tasks: taskList
    }

    console.log(JSON.stringify(jsonObject));

    return JSON.stringify(jsonObject);
}

function fillTaskList(block, index)
{
    const htmlID = block.htmlID;

    if(htmlID === 'startBlock')
        return false;

    const task = getJsonBlockInfo(htmlID, index);

    taskList.push(task);
    return true;
}

function getJsonBlockInfo(htmlID, index)
{
    switch(htmlID)
    {
        case 'delayBlock':
            return delay = 
            {
                ID: index,
                TaskID: "timer",
                TaskType: "delay",
                Value: getInputValue(htmlID),
            }  
            
        case 'set_pinBlock':
            return setPin = 
            {
                ID: index,
                TaskID: "pin",
                TaskType: getSelectorTaskType(htmlID),
                Value: getSelectorValue(htmlID),
            }   
                
        case 'print_pinBlock':
            return printPin = 
            {
                ID: index,
                TaskID: "print",
                TaskType: "pin",
                Value: getSelectorValue(htmlID),
            }  
    }
}

function getInputValue(htmlID)
{
    return document.querySelector('#'+htmlID+' .valueInput').value;
}

function getSelectorTaskType(htmlID)
{
    return document.querySelector('#'+htmlID+' .typeSelector').value;
}

function getSelectorValue(htmlID)
{
    return document.querySelector('#'+htmlID+' .valueSelector').value;
}