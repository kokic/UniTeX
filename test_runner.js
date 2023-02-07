"use strict";

import fs from "fs";
import { UniTeX } from "./unitex.js";
const { exec } = require("child_process");

const ignoreTestNames = [];

const testDir = "./test/";
const testDirContents = fs.readdirSync(testDir);
const testSrc = testDirContents.filter((fileName) =>
  fileName.split(".").pop() == "tex"
);
const testNames = testDirContents.filter((fileName) =>
  fileName.split(".").pop() == "tex"
).map((fileName) => fileName.split(".")[0]);
const enableApplyCalcResults = process.env["TEST_APPLY_RESULTS"] == "1";

console.log("testSrc = ", testSrc);
console.log("will run tests: ", testNames);
console.log(
  "will " + (enableApplyCalcResults ? "" : "not ") +
    "write test results to `.out` files",
);

const runTest = (
  testName,
) => {
  const rawTeX = fs.readFileSync(testName + ".tex");
  const calcOut = UniTeX.parse(rawTeX);
  if (enableApplyCalcResults) {
    fs.writeFileSync(testDir + testName + ".out", calcOut);
  } else {
    const rawOut = fs.readFileSync(testDir + testName + ".out");
    fs.writeFileSync(testDir + testName + ".out" + ".tmp", calcOut);
    exec(
      "diff -u " + testDir + testName + ".out" + " " + testDir + testName +
        ".out" + ".tmp",
      (err, stdout, stderr) => {},
    );
  }
};
