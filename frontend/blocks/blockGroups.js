let mainGroup = null;
let groupList = [];

function removeMainGroup()
{
    canvas.removeChild(mainGroup);
    mainGroup = null;
}

function getMainGroup()
{
    return mainGroup;
}

function getGroupList()
{
    return groupList;
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

    groupList.forEach(group => 
    {
        if(group.contains(block))
            return index;

        index++;
    });

    return -1;
}