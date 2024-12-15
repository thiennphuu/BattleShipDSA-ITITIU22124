// Using DFS with a number of island blocks being customizable to generate the random island

var generateIslands = function (islandsCount) {
    var stack = {first: [], second: []};
    var visited = new Set();

    var startX = floor(random(0, 10));
    var startY = floor(random(0, 10));
    stack.first.push(startX);
    stack.second.push(startY);
    visited.add(`${startX},${startY}`);

    while (islandsCount > 0) {
        var nodeX = stack.first.pop();
        var nodeY = stack.second.pop();

        if (randomMap[nodeX][nodeY] !== ISLAND) {
            randomMap[nodeX][nodeY] = ISLAND;
            islandsCount--;
        }

        var neighbors = [];
        if (nodeX + 1 < 10 && !visited.has(`${nodeX + 1},${nodeY}`)) neighbors.push([nodeX + 1, nodeY]);
        if (nodeY + 1 < 10 && !visited.has(`${nodeX},${nodeY + 1}`)) neighbors.push([nodeX, nodeY + 1]);
        if (nodeX - 1 >= 0 && !visited.has(`${nodeX - 1},${nodeY}`)) neighbors.push([nodeX - 1, nodeY]);
        if (nodeY - 1 >= 0 && !visited.has(`${nodeX},${nodeY - 1}`)) neighbors.push([nodeX, nodeY - 1]);

        if (neighbors.length > 0) {
            var [nextX, nextY] = neighbors[floor(random(0, neighbors.length))];
            stack.first.push(nextX);
            stack.second.push(nextY);
            visited.add(`${nextX},${nextY}`);
        } else if (stack.first.length === 0 && islandsCount > 0) {
            do {
                nodeX = floor(random(0, 10));
                nodeY = floor(random(0, 10));
            } while (visited.has(`${nodeX},${nodeY}`));
            stack.first.push(nodeX);
            stack.second.push(nodeY);
            visited.add(`${nodeX},${nodeY}`);
        }
    }
};
var drawGeneratedMap = function (randomMap) {
    var indent = 770;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            fill(237, 237, 245);
            if (randomMap[i][j] !== ISLAND) {
                rect(indent + 50 + 30 * i, 100 + 30 * j, 30, 30);
            } else {
                fill(255, 212, 128);
                rect(indent + 50 + 30 * i, 100 + 30 * j, 30, 30);
            }
        }
    }
};

var islandsCount = 0;

var newMapState = function () {

    var backButton = new button("      Back", 590, 550);
    var newMapButton = new button("   New map", 870, 550);
    var startButton = new button("      Start", 1150, 550);

    var islandX = 1000, islandY = 450;
    var islandsCountButton = new button("      " + islandsCount, islandX, islandY, 120, 40);
    var leftArrow = new button(" <", islandX , islandY + 5, 30, 30);
    var rightArrow = new button(" >", islandX + 120 - 35, islandY + 5, 30, 30);

    fill(255, 255, 255);
    text("Island Blocks:", islandX - 200, islandY + 15, 200, 40);

    backButton.draw();
    startButton.draw();
    newMapButton.draw();
    islandsCountButton.draw();
    leftArrow.draw();
    rightArrow.draw();

    drawGeneratedMap(randomMap);

    if (leftArrow.insideButton()) {

        if (!mouseIsPressed) {

            leftArrow.lightUpButton();
        } else {
            if (islandsCount > 0) {
                islandsCount--;
            }
            mouseIsPressed = false;
        }
    }

    if (rightArrow.insideButton()) {

        if (!mouseIsPressed) {

            rightArrow.lightUpButton();
        } else {
            if (islandsCount < 25) {
                islandsCount++;
                mouseIsPressed = false;
            }
        }
    }

    if (startButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            startButton.lightUpButton();
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            makeNewMap = false;

            if (singlePlayer === true) {
                createNewSinglePlayerObject();
            } else {
                createNewMultiPlayerObject();
            }
            mouseIsPressed = false;
        }
    }

    if (newMapButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            newMapButton.lightUpButton();
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    randomMap[i][j] = 0;
                }
            }
            generateIslands(islandsCount);
            mouseIsPressed = false;
        }
    }
    // back button  - common for both the players
    if (backButton.insideButton()) {
        //check to see if the mouse is pressed
        if (!mouseIsPressed) {
            //if mouse is not pressed then light up button
            backButton.lightUpButton();
        }
        if (mouseIsPressed) {
            //if mouse is pressed go to menu
            makeNewMap = false;
            singlePlayer = false;
            multiPlayerOffline = false;
            menu = true;
            mouseIsPressed = false;
        }
    }
};