let lastBlockID = 0;
let blockList = [];

function setBlock(event, id, position)
{
    const block = makeBlock(id);
    const mainGroup = getMainGroup();
    let intersectPosition = null;
    
    if(mainGroup !== null)
        intersectPosition = getCurserOverElementPosition(event, mainGroup);

    //if curser is over mainGroup
    if(intersectPosition !== null) 
    {
        mainGroup.appendChild(block);
        return;
    }

    setElementAtPosition(block, position);
    document.getElementById('canvas').appendChild(block);
}

function makeBlock(id)
{
    const draggable = true;
    const block = document.getElementById(id).cloneNode(true);
    block.htmlID = id;

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
    const canvas = document.getElementById('canvas');
    const clickedOnBlock = getClickOnBlock();
    const groupIndex = checkIfBlockInAGroup(clickedOnBlock);

    removeBlockFromBlockList(clickedOnBlock);

    if(isInCanvas(clickedOnBlock)) 
    {
        canvas.removeChild(clickedOnBlock);
    }
    else if(isInGroup(clickedOnBlock))
    {
        removeblockFromGroup(groupIndex);
    }
}

function removeBlockFromBlockList()
{
    console.log(blockList.length);
    const blockIndex = blockList.findIndex(bl => bl.blockID === getClickOnBlock().blockID);
        
    if (blockIndex !== -1) 
        blockList.splice(blockIndex, 1); // Remove the block from the blockList array

    if(blockList.length === 0 && getMainGroup() !== null)
    {    
        removeMainGroup();
        setStartBlock_to(true);
    }
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
