function checkIfMoreThenOneChar(input) 
{
    if (input.value.length > 1) {
        input.value = input.value.slice(0, 1);
    }
}