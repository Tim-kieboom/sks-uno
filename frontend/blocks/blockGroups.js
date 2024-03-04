let mainGroup = null;
let groupList = [];

function removeMainGroup()
{
    canvas.removeChild(mainGroup);
    mainGroup = null;
}

function removeGroup_byGroupID(groupID)
{
    const index = getIndexOfGroup_byGroupID(groupID);

    blockList.splice(index-1, 1);
}

function removeblockFromGroup(index, block)
{
    getGroup(index).removeChild(block);
}

function makeMainGroup(position)
{
    mainGroup = document.createElement('div');
    mainGroup.setAttribute('class', 'blockGroup');
    mainGroup.setAttribute('id', 'mainGroup');
    mainGroup.id = 'mainGroup';
    
    mainGroup.style.position = 'absolute'; 
    mainGroup.style.left = position.x + 'px';
    mainGroup.style.top = position.y + 'px';
    mainGroup.setAttribute('draggable', true);
    mainGroup.addEventListener('dragstart', drag);
    
    document.getElementById('canvas').appendChild(mainGroup);
}

function checkIfBlockInAGroup(block)
{
    let index = 0;
    
    if(block.parentNode === mainGroup)
        return 0;

    groupList.forEach(group => 
    {
        if(group.contains(block))
            return index+1;
        
        index++;
    });

    return -1;
}

function getMainGroup()
{
    if(mainGroup === null)
        return null;

    return mainGroup;
}

function getAmountGroup()
{
    return groupList.length+1;
}

function getIndexOfGroup_byGroupID(groupID)
{
    groupList.forEach(group => 
        {
            if(group.id === groupID)
                return index+1;
        }); 
}

function getGroup_byGroupID(groupID)
{
    const index = getIndexOfGroup_byGroupID(groupID);
    return getGroup(index);
}

function getGroup(index)
{
    if(index === 0)
        return mainGroup;

    return groupList[index-1];
}