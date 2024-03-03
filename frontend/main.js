let clickedOnBlock = null;
let isStartBlock = false;

const startBlockID_Name = 'startBlock';

function drag(event, id = null) 
{
    if(id === startBlockID_Name && !isStartBlock)
    {    
        isStartBlock = true;
        setStartBlock_to(false);
    }

    clickedOnBlock = event.target;
    
    if(id !== null)
        clickedOnBlock.htmlID = id;
}

function dragCanvas(event)
{
    clickedOnBlock = event.target;
}

function allowDrop(event) 
{
    event.preventDefault();
}

function drop(event) 
{
    if(isInCanvasOrGroup(clickedOnBlock)) 
    {
        dropFromCanvas(event);
    }
    else
    {
        dropFromMenu(event);
    }
}

function dropFromCanvas(event)
{
    const position = getBlockPostition(event);

    setBlock(event, clickedOnBlock.htmlID, position);

    ifClickedBlockInCanvasDelete();
}

function dropFromMenu(event)
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