// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU5PNVFHcE82VUZxRzF2QUo3QlEyL0hWSnlrcFc2YTIzemxrdEFWOFlGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXowaUMydUhtb0xValVEWDBjVU1tL2t4ck9xMWUwZVNRTHFUUk9MQ1AzMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTExwWmMrREFISU15MEVsakFoU1Z5ZTdEdFZvRy9kdVhEaWpsVENYMm1vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSWQvbDJUK04yYTRoTkMrRUNHUmp1TWsxay9BdkhXbGZQWjMwOWp2OG5rPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlFUjRYSGdDdUxHS3RobW5JWU5zVEF6b0pLQWhkUnM2S0JZZmZOOTV6M1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldySml3ZnBJZ1hHbnlHZzV6d2NCRUw0T1F5ZkxQTjQzTGt6OER4V2JqeDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUpsc1NQM2xPK0pDUUpHWEdQNHMzVFExYUZTSEVsT1hQUVk0OWtvL1UxND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUxEbmlRUG9yeE9Dc0lEMTdQY1UwbTM0Sy9xcFZRU2FTejBHTkFEWDZIbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNWT3kyVkVlRUgydlVFNjcvSXk5dzRER3dOUHBCYnNpbzdPTUgyeGhmR1F2aklpcXRhV25EUTd3dlBQeFRRSWlmb1FVMHpPOXB2K1h0T0kzYTZ4RmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMsImFkdlNlY3JldEtleSI6Ik5WU1BNNDJ3RVRMUkN3bVk2bUxmMi81STI0cG1FdEJOYXFCSXFtNExBM2M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjA2dThhTXpmU1ZpWng2U0F4aFZGeEEiLCJwaG9uZUlkIjoiZTFjZTk1ODUtYzY4Ni00NWE4LWJiOGUtMWRmZjVmYTAxN2Q3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZJNmw5MG96RHRWaitCd2VuNFJSdWtDRndhVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuRVY4eWtoV3h4Z0duNEZqbWdjREQzMW0rejQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR1JHQjNDRlQiLCJtZSI6eyJpZCI6IjUwOTQxMTgwOTk3OjIxQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNWEN0NHNIRU0vbGpMZ0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIyN2dheUlPSXBXb1kzeUZPUFg0bkdncWkvS2RKbTU3RVp6Ti8vVXVKZ1FRPSIsImFjY291bnRTaWduYXR1cmUiOiJWVmgrOFI0WldLVHZzM1dJd0NhUndGb2RBd3lrdFp3RFlOQzNRYThlbXNaY01tMmNoYjVCdUdlS1hjR3dtemdwYTlNSmoxLzE4V21YYUJaSTNDV0dEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOUlSRk0vMFhyWlNrbk9jcWczSVArNEU2OUU1d2V4SGFDZy9ydElzTE1RNk0wbzhaR3pTQm4yVnJod0dNSGJuc09QWGVGNGdXVHJKK1ltMmZTNklOaVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDk0MTE4MDk5NzoyMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkdTRHc2lEaUtWcUdOOGhUajErSnhvS292eW5TWnVleEdjemYvMUxpWUVFIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4MjYyODc3fQ==",
  PREFIX: process.env.PREFIX || '♪',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©kevee Bega",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "50941180997",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
