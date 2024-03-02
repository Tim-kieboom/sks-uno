let clickedOnBlock = null;
let isStartBlock = false;

const startBlockID_Name = 'startBlock';

function drag(event, id) 
{
    if(id === startBlockID_Name && !isStartBlock)
        isStartBlock = true;

    clickedOnBlock = event.target;
    clickedOnBlock.htmlID = id;

    if(isStartBlock)
    {
        setStartBlock_to(false);
    }
}

function allowDrop(event) 
{
    event.preventDefault();
}

function drop(event) 
{
    const position = getBlockPostition(event);

    if(getMainGroup() === null && clickedOnBlock.htmlID === startBlockID_Name)
    {
        makeMainGroup(position);
    }
    
    setBlock(event, clickedOnBlock.htmlID, position);
}


function setStartBlock_to(isEnable)
{
    const transparency = (isEnable) ? 1 : 0.3;
    const cssVariable = getCssVariable(startBlockID_Name);

    document.getElementById(startBlockID_Name).draggable = isEnable;
    setTransparency(cssVariable, transparency);
}

function getClickOnBlock()
{
    return clickedOnBlock;
}