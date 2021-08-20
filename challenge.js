"use strict"
/* globals _, engine */
window.initGame = function () {
  console.log("initgame")
  // you're really better off leaving this line alone, i promise.
  const command =
    "5 3 \n 1 1 s\n ffffff\n 2 1 w \n flfffffrrfffffff\n 0 3 w\n LLFFFLFLFL"

  // this function parses the input string so that we have useful names/parameters
  // to define the playfield and robots for subsequent steps
  const parseInput = (input) => {
    //
    // task #1
    //
    // replace the 'parsed' variable below to be the string 'command' parsed into an object we can pass to genworld();
    // genworld expects an input object in the form { 'bounds': [3, 8], 'robos': [{x: 2, y: 1, o: 'W', command: 'rlrlff'}]}
    // where bounds represents the southeast corner of the plane and each robos object represents the
    // x,y coordinates of a robot and o is a string representing their orientation. a sample object is provided below
    //

    // replace this with a correct object

    // I split on the new line, and will add values to the object that way
    let robotCreationArr = input.split("\n ")
    //remove the first index because it will always be the bounds
    const bounds = robotCreationArr.shift()
    const robos = []
    //loop through the rest of the array and see if a value has "r || l || f",
    robotCreationArr.forEach((val, i) => {
      if (
        val.toUpperCase().includes("R") ||
        val.toUpperCase().includes("L") | val.toUpperCase().includes("F")
      ) {
        robos.push({
          x: robotCreationArr[i - 1].split(" ")[0],
          y: robotCreationArr[i - 1].split(" ")[1],
          o: robotCreationArr[i - 1].split(" ")[2],
          command: val,
        })
      }
    })
    let parsed = {
      bounds: removeWhiteSpace(bounds),
      robos,
    }
    return parsed
  }

  const removeWhiteSpace = (robotValue) => {
    let parsed = robotValue.split(" ")
    //loop through arr and remove any whitespace
    let i = parsed.length
    while (i--) {
      if (parsed[i] === "") {
        parsed.splice(i, 1)
      }
    }
    return parsed
  }

  // this function replaces the robos after they complete one instruction
  // from their commandset
  const tickRobos = (robos) => {
    console.log("tickrobos")
    //
    // task #2
    //
    // in this function, write business logic to move robots around the playfield
    // the 'robos' input is an array of objects; each object has 4 parameters.
    // This function needs to edit each robot in the array so that its x/y coordinates
    // and orientation parameters match the robot state after 1 command has been completed.
    // Also, you need to remove the command the robot just completed from the command list.
    // example input:
    //
    // robos[0] = {x: 2, y: 2, o: 'N', command: 'frlrlrl'}
    //
    //                   - becomes -
    //
    // robos[0] = {x: 2, y: 1, o: 'N', command: 'rlrlrl'}
    //
    // if a robot leaves the bounds of the playfield, it should be removed from the robos
    // array. It should leave a 'scent' in it's place. If another robot–for the duration
    // of its commandset–encounters this 'scent', it should refuse any commands that would
    // cause it to leave the playfield.

    // write robot logic here

    // return the mutated robos object from the input to match the new state
    // return ???;

    //since the whole parsed object is not being passed i need to get the bounds again
    const bounds = command.split(" \n")[0].split(" ")

    const checkIfOutOfBounds = (
      boundsArr,
      robot,
      moveForward,
      mostRecentInstruction
    ) => {
      let { x, y, o } = robot
      //remove first instruction
      robot.command = robot.command.split("").splice(1).join("")

      switch (o.toUpperCase()) {
        case "N":
          if (moveForward) {
            if (y + 1 > boundsArr[1]) {
              return
            } else {
              return {
                ...robot,
                y: y + 1 + "",
              }
            }
          } else if (mostRecentInstruction === "R") {
            return {
              ...robot,
              o: "E",
            }
          } else {
            return {
              ...robot,
              o: "W",
            }
          }
        case "S":
          if (moveForward) {
            if (y - 1 < 0) {
              return
            } else {
              return {
                ...robot,
                y: y - 1 + "",
              }
            }
          } else if (mostRecentInstruction === "R") {
            return {
              ...robot,
              o: "W",
            }
          } else {
            return {
              ...robot,
              o: "E",
            }
          }
        case "E":
          if (moveForward) {
            if (x + 1 > boundsArr[0]) {
              return
            } else {
              return {
                ...robot,
                x: x + 1 + "",
              }
            }
          } else if (mostRecentInstruction === "R") {
            return {
              ...robot,
              o: "S",
            }
          } else {
            return {
              ...robot,
              o: "N",
            }
          }
        case "W":
          if (moveForward) {
            if (x - 1 < 0) {
              return
            } else {
              return {
                ...robot,
                x: x - 1 + "",
              }
            }
          } else if (mostRecentInstruction === "R") {
            return {
              ...robot,
              o: "N",
            }
          } else {
            return {
              ...robot,
              o: "S",
            }
          }
        default:
          return
      }
    }

    robos.forEach((robot) => {
      //convert all the instruction to an array
      const robotInstructions = robot.command.split("")
      //grab the first instruction
      const mostRecentInstruction = robotInstructions.shift()

      switch (mostRecentInstruction.toUpperCase()) {
        case "F":
          return checkIfOutOfBounds(bounds, robot, true, "F")
        case "L":
          return checkIfOutOfBounds(bounds, robot, false, "L")
        case "R":
          return checkIfOutOfBounds(bounds, robot, false, "R")
        default:
          return
      }
    })
  }
  // mission summary function
  const missionSummary = (robos) => {
    //
    // task #3
    //
    // summarize the mission and inject the results into the DOM elements referenced in readme.md
    //
    return
  }

  // leave this alone please
  return {
    parse: parseInput,
    tick: tickRobos,
    summary: missionSummary,
    command: command,
  }
}
