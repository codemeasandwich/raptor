/*█░ ██ ▓█████  ██▀███  ▓█████     ▄▄▄▄   ▓█████    ▓█████▄  ██▀███   ▄▄▄        ▄████  ▒█████   ███▄    █   ██████ 
▓██░ ██▒▓█   ▀ ▓██ ▒ ██▒▓█   ▀    ▓█████▄ ▓█   ▀    ▒██▀ ██▌▓██ ▒ ██▒▒████▄     ██▒ ▀█▒▒██▒  ██▒ ██ ▀█   █ ▒██    ▒ 
▒██▀▀██░▒███   ▓██ ░▄█ ▒▒███      ▒██▒ ▄██▒███      ░██   █▌▓██ ░▄█ ▒▒██  ▀█▄  ▒██░▄▄▄░▒██░  ██▒▓██  ▀█ ██▒░ ▓██▄   
░▓█ ░██ ▒▓█  ▄ ▒██▀▀█▄  ▒▓█  ▄    ▒██░█▀  ▒▓█  ▄    ░▓█▄   ▌▒██▀▀█▄  ░██▄▄▄▄██ ░▓█  ██▓▒██   ██░▓██▒  ▐▌██▒  ▒   ██▒
░▓█▒░██▓░▒████▒░██▓ ▒██▒░▒████▒   ░▓█  ▀█▓░▒████▒   ░▒████▓ ░██▓ ▒██▒ ▓█   ▓██▒░▒▓███▀▒░ ████▓▒░▒██░   ▓██░▒██████▒▒
 ▒ ░░▒░▒░░ ▒░ ░░ ▒▓ ░▒▓░░░ ▒░ ░   ░▒▓███▀▒░░ ▒░ ░    ▒▒▓  ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░ ░▒   ▒ ░ ▒░▒░▒░ ░ ▒░   ▒ ▒ ▒ ▒▓▒ ▒ ░
 ▒ ░▒░ ░ ░ ░  ░  ░▒ ░ ▒░ ░ ░  ░   ▒░▒   ░  ░ ░  ░    ░ ▒  ▒   ░▒ ░ ▒░  ▒   ▒▒ ░  ░   ░   ░ ▒ ▒░ ░ ░░   ░ ▒░░ ░▒  ░ ░
 ░  ░░ ░   ░     ░░   ░    ░       ░    ░    ░       ░ ░  ░   ░░   ░   ░   ▒   ░ ░   ░ ░ ░ ░ ▒     ░   ░ ░ ░  ░  ░  
 ░  ░  ░   ░  ░   ░        ░  ░    ░         ░  ░      ░       ░           ░  ░      ░     ░ ░           ░       ░  
                                        ░            ░                                                           */

import { useState, createContext, useContext } from "react";
import React from "react";

let brian = {};
// @ts-ignore
const req = require.context("./", true, /^(?!.*\.test\.(tsx|jsx|ts|js)$).*\.(tsx|jsx|ts|js)$/);
//console.log(req)
//const req = require.context('./', true, /^(?!.*\.test\.js$).*$/);
const rootFns = {};
const loading = {};
const stateTypes = {};
let changeAppState = (shannon) => {};
const InnerContext = createContext({});

function codeMeASandwich() {
  //Record<string, null | any[] | {[key: string]: any;}>
  const appState = useContext(InnerContext);
  //console.log("appState",appState)
  return new Proxy(appState, {
    get: (t, prop) => {
      prop = String(prop);
      if ("loading" === prop) {
        return loading;
      }
      if (prop in appState) {
        if (metaDataForStore.deferers[prop]) {
          metaDataForStore.deferers[prop]();
        }
        return appState[prop];
      } else {
        //debugger
        console.error(prop, appState);
        throw new Error(`State has not root property called "${prop}"`);
      }
    },
    set: (target, prop, value) => {
      throw new Error("Sorry, can't rewrite state at Run time 🫠");
    },
  }); // END proxy
} // END codeMeASandwich

const metaDataForStore = { deferers: {} };

// ============================
// ============================
function checkIfHasActions(fileName, init) {
  const { action, pending, fulfilled, rejected } = init;
  if (!action) {
    throw new Error("./" + fileName + " has no action");
  }
  if ("function" !== typeof action) {
    throw new Error("./" + fileName + " action is not a function");
  }
  if (!pending) {
    throw new Error("./" + fileName + " has no pending");
  }
  if ("function" !== typeof pending) {
    throw new Error("./" + fileName + " pending is not a function");
  }
  if (!fulfilled) {
    throw new Error("./" + fileName + " has no fulfilled");
  }
  if ("function" !== typeof fulfilled) {
    throw new Error("./" + fileName + " fulfilled is not a function");
  }
  return init;
} // END checkIfHasActions
function getParentOfLastProp(obj, propArray) {
  if (!Array.isArray(propArray) || propArray.length === 0) {
    return null;
  }

  let current = obj;
  let parent = obj;

  for (let i = 0; i < propArray.length; i++) {
    const pathItem = propArray[i].split(".")[0];
    if (current[pathItem] === undefined) {
      return current; // Property path is broken
    }
    parent = current;
    current = current[pathItem];
  } // END for

  return parent;
} // END getParentOfLastProp

const turnActionFn = ({ action, pending, fulfilled, rejected }, filePath, payload) => {
  const rootName = filePath[0];

  const useLocalCache = typeof localStorage !== "undefined" && 2 < pending.length;
  const localStorageKey = useLocalCache ? JSON.stringify(["Context-Auto", rootName]) : "";

  const onlyFileName = filePath[filePath.length - 1].split(".")[0];
  payload = payload || Object.freeze({});
  const actionoutput = action({});
  const update = (result, fnThingCalled) => {
    //debugger
    checkStatePropertyType(result, stateTypes[rootName], rootName);
    const nextState = {
      [rootName]: result,
    };
    for (const otherName in rootFns) {
      if (otherName !== rootName) {
        const output = rootFns[otherName](brian[otherName], payload, fnThingCalled);
        checkStatePropertyType(output, stateTypes[otherName], otherName);
        nextState[otherName] = output;
      }
    } // END for
    brian = nextState;
    changeAppState(nextState);
  }; // END update

  if (actionoutput?.then) {
    const parent = getParentOfLastProp(loading, filePath);

    parent[onlyFileName] = true;
    let cache; // = undefined;
    if (useLocalCache) {
      const cacheFromDisk = localStorage.getItem(localStorageKey);
      if (cacheFromDisk) {
        try {
          cache = JSON.parse(cacheFromDisk);
        } catch (e) {
          console.error(e);
          localStorage.removeItem(localStorageKey);
        } // END catch
      } // END if
    } // END if useLocalCache

    update(pending(brian[rootName], payload, cache), pending);

    actionoutput
      .catch((error) => {
        parent[onlyFileName] = error;
        update(rejected(brian[rootName], payload, error), rejected);
      })
      .then((response) => {
        parent[onlyFileName] = false;
        //console.log("response",response)
        update(fulfilled(brian[rootName], payload, response), fulfilled);
        if (useLocalCache) {
          localStorage.setItem(localStorageKey, JSON.stringify(response));
        } // END if
      }); // END actionoutput.then

    return;
  } else if (undefined !== actionoutput) {
    throw new Error("./" + filePath + " action must return a promise or cancel with undefined");
  }
}; // END turnActionFn

const processPath = (metaData, fileName, pathParts, obj, first) => {
  //console.log(metaData, fileName, pathParts, obj, first)
  let inAnOtherFn = false;
  const currentPart = pathParts[0];
  const onlyFileName = currentPart.split(".")[0];
  // Skip 'index.js' files for nested directories

  if (pathParts.length === 2 && first) {
    if (pathParts[1].startsWith("INDEX.")) {
      rootFns[onlyFileName] = req("./" + fileName).default;
      brian[onlyFileName] = rootFns[onlyFileName](undefined,{});
      stateTypes[onlyFileName] = Array.isArray(brian[onlyFileName]) ? "ARR" : "OBJ";
      checkStatePropertyType(brian[onlyFileName], stateTypes[onlyFileName], onlyFileName);
      return;
    } else if (pathParts[1].startsWith("INIT.")) {
      turnActionFn(checkIfHasActions(fileName, req("./" + fileName)), metaData.hops, false);
      return;
    } else if (pathParts[1].startsWith("DEFER.")) {
      metaData.addDeferer(() => {
        turnActionFn(checkIfHasActions(fileName, req("./" + fileName)), metaData.hops, false);
      });
      return;
    } // END if
  } // END if

  if (pathParts.length === 1) {
    const logic = req("./" + fileName);

    const fn = logic.default;
    //if("function" === typeof logic.action){
    // fn = (currentState,arg) => turnActionFn(checkIfHasActions(fileName,logic),metaData.hops,arg)
    // }
    if ("function" !== typeof fn && "function" !== typeof logic.action) {
      throw new Error(`File ${fileName} is not a function/action!`);
    }

    obj[onlyFileName] = (arg) => {
      if (inAnOtherFn) {
        throw new Error("Cant change state while in the middle of another state change");
      }
      inAnOtherFn = metaData;
      try {
        const { rootName, otherNames } = metaData;

        if ("function" === typeof logic.action) {
          //fn(brian[rootName],arg)
          turnActionFn(checkIfHasActions(fileName, logic), metaData.hops, arg);
          inAnOtherFn = false;
          return;
        }

        const output = fn(brian[rootName], arg);
        checkStatePropertyType(output, stateTypes[rootName], rootName);

        const shannon = otherNames.reduce(
          (shannon, otherName) => {
            shannon[otherName] = rootFns[otherName /*onlyFileName*/](brian[rootName], arg, obj[onlyFileName]);
            return shannon;
          },{
            [rootName]: output, //fn(brian[rootName],arg)
          });

        brian = shannon;
        changeAppState(brian);
        inAnOtherFn = false;
      } catch (err) {
        inAnOtherFn = false;
        throw err;
      }
    }; // END obj[onlyFileName]

    obj[onlyFileName].toString = () => metaData.filePath;
  } else if (pathParts.length > 1) {
    // Create a nested object if it doesn't exist
    obj[currentPart] = obj[currentPart] || {};
    // Recursively process the remaining parts
    processPath(metaData, fileName, pathParts.slice(1), obj[currentPart], false);
  }
}; // END processPath

req
  .keys()
  //.filter(fileName=> !fileName.startsWith("./") || ! fileName.startsWith("./index."))
  .filter((path) => {
    if (!path.startsWith("./")) {
      return false;
    }
    // Check if the path ends with '.tsx' or '.js'
    const isJSorTSX = path.endsWith(".tsx") || path.endsWith(".jsx") || path.endsWith(".ts") || path.endsWith(".js");

    // Check if the path contains a subdirectory (more than one '/')
    const isInSubdirectory = (path.match(/\//g) || []).length > 1;
    //console.log(path,{isJSorTSX,isInSubdirectory})
    return isJSorTSX && isInSubdirectory;
  })
  .forEach((filePath, index, arr) => {
    filePath = filePath.replace("./", "");
    const hops = filePath.split("/");
    const rootName = hops[0];
    const otherNames = arr.map((path) => path.split("/")[1]).filter((item, i, s) => s.lastIndexOf(item) == i && item != rootName);
    hops.reduce((loading, pathPart, index) => {
      pathPart = pathPart.split(".")[0];
      if (index !== hops.length - 1) {
        loading[pathPart] = loading[pathPart] || {};
      }
      return loading[pathPart];
    }, loading);
    //console.log(fileName,{a,b,c})
    processPath(
      {
        rootName,
        otherNames,
        filePath,
        hops,
        addDeferer: (defer) => {
          metaDataForStore.deferers[rootName] = () => {
            defer();
            metaDataForStore.deferers[rootName] = false;
          };
        },
      },
      filePath,
      hops,
      codeMeASandwich,
      true,
    );
  });

export default codeMeASandwich;

function checkStatePropertyType(newProp, typeEnum, nameProp) {
  if ("OBJ" === typeEnum) {
    if ("object" !== typeof newProp || Array.isArray(newProp)) {
      throw new Error(`State property "${nameProp}" must be an object or null`);
    }
  } else if ("ARR" === typeEnum) {
    if (!Array.isArray(newProp)) {
      throw new Error(`State property "${nameProp}" must be an Array`);
    }
  } else {
    //if(shouldThrow){
    //debugger
    throw new Error("Unknown type argument:" + typeEnum);
    // }
  } /*
    if("object" !== typeof newProp
        || !Array.isArray(newProp)){
        if(shouldThrow){
            throw new Error("State property must be an object, null or an array!!")
        }
        return false
    }*/
  return true;
} // END checkStatePropertyType

const StateProvider = ({ children }) => {
  const [appState, setAppState] = useState(brian);
  changeAppState = setAppState; //nextState =>  checkStatePropertyType(nextState) && setAppState(nextState)
  return <InnerContext.Provider value={appState}>{children}</InnerContext.Provider>;
};

export { StateProvider };
