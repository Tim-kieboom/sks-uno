let lastBlockID = 0;
let blockList = [];

function setBlock(event, id, position)
{
    const block = makeBlock(id);
    const mainGroup = getMainGroup();
    let group;

    if(mainGroup !== null)
        group = getGroupOverCurser(event);

    if(group !== null)  
    {
        group.appendChild(block);
        return;
    }

    setElementAtPosition(block, position);
    document.getElementById('canvas').appendChild(block);
}

function makeBlock(id)
{
    let draggable = true;
    const block = document.getElementById(id).cloneNode(true);
    block.htmlID = id;

    if(id === 'startBlock')
        draggable = false;

    return setBlockPropertys(block, draggable);
}

function setBlockPropertys(block, draggable)
{
    block.setAttribute('draggable', draggable);
    block.addEventListener('dragstart', drag);
    block.blockID = lastBlockID;
    blockList.push(block);

    lastBlockID++;
    return block;
}

function ifClickedBlockInCanvasDelete()  
{
    const clickedOnBlock = getClickOnBlock();

    if(!isInCanvasOrGroup(clickedOnBlock)) 
        return;

    if(clickedOnBlock === getMainGroup())
        setStartBlock_to(true);

    const groupIndex = checkIfBlockInAGroup(clickedOnBlock);
    removeBlockFromBlockList(clickedOnBlock);
    let element = clickedOnBlock;

    if(isInCanvas(element)) 
    {
        document.getElementById('canvas').removeChild(element);
    }
    else if(isInGroup(element))
    {
        removeblockFromGroup(groupIndex, element);
    }
}

function removeBlockFromBlockList()
{
    console.log(blockList.length);
    const blockIndex = blockList.findIndex(bl => bl.blockID === getClickOnBlock().blockID);
        
    if (blockIndex === -1) 
        return false; 
        
    blockList.splice(blockIndex, 1); // Remove the block from the blockList array

    if(blockList.length === 0 && getMainGroup() !== null)
    {    
        removeMainGroup();
        setStartBlock_to(true);
    }

    return true;
}

function isInGroup(block)
{
    const groupIndex = checkIfBlockInAGroup(block);

    return (groupIndex !== -1);
}

function isInCanvas(block)
{
    const canvas = document.getElementById('canvas');

    return (block.parentNode === canvas);
}

function isInCanvasOrGroup(block)
{
    const canvas = document.getElementById('canvas');

    return isInCanvas(block) || isInGroup(block);
}
