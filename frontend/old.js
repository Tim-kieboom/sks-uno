let lastBlockID = 0;
let blockGroup = null;
let clickedOnBlock = null;

let isStartInCanvas = false;

let isCurserOverBlock = false;
let overBlockPosistion = {x: 0, y: 0};

const blockList = [];

function drag(event, id = null) 
{
    clickedOnBlock = event.target;

    if(id !== null)
        clickedOnBlock.id = id;
    
    event.dataTransfer.setData('text/plain', 'move_forward');
}

function allowDrop(event) 
{
    event.preventDefault();
}

function drop(event) 
{
    const position = getBlockPostition(event);

    if(blockGroup === null && clickedOnBlock.id === 'startBlock')
    {
        setBlockGroup(position); 
        const startBlock = document.getElementById('startBlock');

        startBlock.draggable = false;
        const rgb = getRGB('--startBlock-color');
        console.log(rgb);
        document.documentElement.style.setProperty('--startBlock-color', 'rgba(${rgb.R}, &{rgb.G}, &{rgb.B}, 0.3)');
    }

    if(CurserOverBlock(blockGroup, event))
    {    
        setBlockInGroup(position, blockGroup);
        ifClickedBlockInCanvasDelete();
        return;
    }

    setBlockInCanvas(clickedOnBlock.id);
    ifClickedBlockInCanvasDelete();
}

function getBlockPostition(event)
{
    return position = 
    {
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop
    };
}

function ifClickedBlockInCanvasDelete()  
{
    const canvas = document.getElementById('canvas');

    if (clickedOnBlock.parentNode === canvas || clickedOnBlock.parentNode === blockGroup) 
    {
        removeBlockFromBlockList();
        canvas.removeChild(clickedOnBlock);
    }
}

function removeBlockFromBlockList()
{
    const blockIndex = blockList.findIndex(bl => bl.blockID === clickedOnBlock.blockID);
        
    if (blockIndex !== -1) 
    {
        blockList.splice(blockIndex, 1); // Remove the block from the blockList array
    }

    if(blockList.length === 0 && blockGroup !== null)
    {
        canvas.removeChild(blockGroup);
        blockGroup = null;
    }
}

function setBlockGroup(positionXY)
{
    blockGroup = document.createElement('div');
    blockGroup.id = 'blockGroup';
    
    blockGroup.style.position = 'absolute'; 
    blockGroup.style.left = positionXY.x + 'px';
    blockGroup.style.top = positionXY.y + 'px';
    blockGroup.setAttribute('draggable', true);
    blockGroup.addEventListener('dragstart', drag);
}

function setBlock(blockName)
{
    // if id == 'startBlock' then draggable = false
    const draggable = (blockName !== 'startBlock');

    const block = document.getElementById(blockName).cloneNode(true);
    block.setAttribute('draggable', draggable);
    block.addEventListener('dragstart', drag);
    block.blockID = lastBlockID;
    block.id = blockName;

    document.getElementById('canvas').appendChild(block);
}

function setBlockInCanvas(blockName)
{
    const block = setBlock(blockName);

    block.style.position = 'absolute';
    block.style.left = positionXY.x + 'px';
    block.style.top = positionXY.y + 'px';

    lastBlockID++;
    blockList.push(block);
}

function setBlockInGroup(blockName, group)
{
    const block = setBlock(blockName);

    group.appendChild(block);
    document.getElementById('canvas').appendChild(group);

    lastBlockID++;
    blockList.push(block);
}

function CurserOverBlock(block, event)
{
    rect = block.getBoundingClientRect();
    
    const deltaX = Math.abs(event.clientX - rect.left);
    const deltaY = Math.abs(event.clientY - rect.top);
    
    const delta = {x: deltaX, y: deltaY};
    
    document.getElementById("debug1").innerHTML = "x:" + overBlockPosistion.x + ", y:" + overBlockPosistion.y;
    
    if(isOverBlock(delta, rect))
    {
        console.log("blockOver");
        isCurserOverBlock = true;
        overBlockPosistion = {x: rect.left, y: rect.top};
        return true;
    }
    isCurserOverBlock = false;
    return false;
}



function isOverBlock(delta, rect)
{
    return (delta.x <= rect.width && delta.y <= rect.height);
}