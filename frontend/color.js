export function getRGB(cssVariableName) 
{
    const cssColorValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName);

    const tempElement = document.createElement('div');
    tempElement.style.color = cssColorValue;

    document.body.appendChild(tempElement);
    const rgbValue = getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);

    return parseRGBColor(rgbValue);
}

function parseRGBColor(cssColor) 
{
    const match = cssColor.match(/rgba?\((\d+), (\d+), (\d+)(?:, [\d.]+)?\)/);

    if (match) 
    {
      return RGB =
      {
        R: parseInt(match[1], 10),
        G: parseInt(match[2], 10),
        B: parseInt(match[3], 10),
      };
    }
    return null;
}