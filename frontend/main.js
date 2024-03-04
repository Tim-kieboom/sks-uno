let clickedOnBlock = null;
let isStartBlock = false;

const startBlockID_Name = 'startBlock';

function drag(event, id = null) 
{
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
    if(clickedOnBlock.htmlID === startBlockID_Name && !isStartBlock)
    {    
        isStartBlock = true;
        setStartBlock_to(false);
    }

    if(!isInCanvasOrGroup(clickedOnBlock)) 
    {
        dropFromMenu(event);
        return;
    }

    dropFromCanvas(event);
}

function dropFromCanvas(event)
{
    const position = getBlockPostition(event);

    removePosition(clickedOnBlock);

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

    const draggable = (isEnable) ? 'true' : 'false';
    document.getElementById(startBlockID_Name).setAttribute('draggeble', draggable);

    setTransparency(cssVariable, transparency);
}

function getClickOnBlock()
{
    return clickedOnBlock;
}