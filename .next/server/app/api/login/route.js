/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/login/route";
exports.ids = ["app/api/login/route"];
exports.modules = {

/***/ "(rsc)/./app/api/login/route.js":
/*!********************************!*\
  !*** ./app/api/login/route.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _config_db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/db.js */ \"(rsc)/./config/db.js\");\n\n\n// GET /api/login?id=123  -> fetch one user by id\nasync function GET(req) {\n    try {\n        const { searchParams } = new URL(req.url);\n        const id = searchParams.get(\"id\");\n        if (!id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"id is required\"\n            }, {\n                status: 400\n            });\n        }\n        const [rows] = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT id, name, role, mobile, email, password, address FROM team_members WHERE id = ? LIMIT 1\", [\n            id\n        ]);\n        if (rows.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User not found\"\n            }, {\n                status: 404\n            });\n        }\n        // You asked for plain password; returning it here as well\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: rows[0]\n        }, {\n            status: 200\n        });\n    } catch (err) {\n        console.error(\"GET /api/login error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n/** LOGIN (plain password) */ async function POST(req) {\n    try {\n        const { email, password } = await req.json();\n        if (!email || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Email and password are required\"\n            }, {\n                status: 400\n            });\n        }\n        const [rows] = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT id, name,mobile, email, password, role, address FROM team_members WHERE email = ? LIMIT 1\", [\n            email\n        ]);\n        if (rows.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User not found\"\n            }, {\n                status: 401\n            });\n        }\n        const user = rows[0];\n        // ❗ Plain-text comparison (as requested)\n        if (user.password !== password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid password\"\n            }, {\n                status: 401\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: {\n                id: user.id,\n                name: user.name,\n                mobile: user.mobile,\n                email: user.email,\n                password: user.password,\n                role: user.role,\n                address: user.address\n            }\n        });\n    } catch (err) {\n        console.error(\"Login API error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n// PUT /api/login  -> update profile by id (only your 6 fields)\nasync function PUT(req) {\n    try {\n        const { id, name, role, mobile, email, password, address } = await req.json();\n        if (!id || !name || !email) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"id, name and email are required\"\n            }, {\n                status: 400\n            });\n        }\n        // Build SET list only for provided fields\n        const sets = [];\n        const vals = [];\n        sets.push(\"name = ?\");\n        vals.push(name);\n        sets.push(\"role = ?\");\n        vals.push(role ?? null);\n        sets.push(\"mobile = ?\");\n        vals.push(mobile ?? null);\n        sets.push(\"email = ?\");\n        vals.push(email);\n        sets.push(\"address = ?\");\n        vals.push(address ?? null);\n        if (password) {\n            sets.push(\"password = ?\");\n            vals.push(password);\n        } // plain\n        const sql = `UPDATE team_members SET ${sets.join(\", \")} WHERE id = ? LIMIT 1`;\n        vals.push(id);\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(sql, vals);\n        // Return fresh record (including password since you want it)\n        const [rows] = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT id, name, role, mobile, email, password, address FROM team_members WHERE id = ? LIMIT 1\", [\n            id\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: rows[0]\n        }, {\n            status: 200\n        });\n    } catch (err) {\n        console.error(\"PUT /api/login error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU9NLEtBQUs7UUFDWkMsUUFBUVIsS0FBSyxDQUFDLHlCQUF5Qk87UUFDdkMsT0FBT2pCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3BFO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9uYXZlZW5rdW1hci9EZXZlbG9wZXIvTmV4dEpTL0NSTS9hcHAvYXBpL2xvZ2luL3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9jb25maWcvZGIuanNcIjtcblxuLy8gR0VUIC9hcGkvbG9naW4/aWQ9MTIzICAtPiBmZXRjaCBvbmUgdXNlciBieSBpZFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXEpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXEudXJsKTtcbiAgICBjb25zdCBpZCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJpZFwiKTtcbiAgICBpZiAoIWlkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJpZCBpcyByZXF1aXJlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgW3Jvd3NdID0gYXdhaXQgZGIucXVlcnkoXG4gICAgICBcIlNFTEVDVCBpZCwgbmFtZSwgcm9sZSwgbW9iaWxlLCBlbWFpbCwgcGFzc3dvcmQsIGFkZHJlc3MgRlJPTSB0ZWFtX21lbWJlcnMgV0hFUkUgaWQgPSA/IExJTUlUIDFcIixcbiAgICAgIFtpZF1cbiAgICApO1xuXG4gICAgaWYgKHJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVc2VyIG5vdCBmb3VuZFwiIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgfVxuXG4gICAgLy8gWW91IGFza2VkIGZvciBwbGFpbiBwYXNzd29yZDsgcmV0dXJuaW5nIGl0IGhlcmUgYXMgd2VsbFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHVzZXI6IHJvd3NbMF0gfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkdFVCAvYXBpL2xvZ2luIGVycm9yOlwiLCBlcnIpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlNlcnZlciBlcnJvclwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cblxuLyoqIExPR0lOIChwbGFpbiBwYXNzd29yZCkgKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSBhd2FpdCByZXEuanNvbigpO1xuICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiRW1haWwgYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZFwiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBbcm93c10gPSBhd2FpdCBkYi5xdWVyeShcbiAgICAgIFwiU0VMRUNUIGlkLCBuYW1lLG1vYmlsZSwgZW1haWwsIHBhc3N3b3JkLCByb2xlLCBhZGRyZXNzIEZST00gdGVhbV9tZW1iZXJzIFdIRVJFIGVtYWlsID0gPyBMSU1JVCAxXCIsXG4gICAgICBbZW1haWxdXG4gICAgKTtcblxuICAgIGlmIChyb3dzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVXNlciBub3QgZm91bmRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSByb3dzWzBdO1xuXG4gICAgLy8g4p2XIFBsYWluLXRleHQgY29tcGFyaXNvbiAoYXMgcmVxdWVzdGVkKVxuICAgIGlmICh1c2VyLnBhc3N3b3JkICE9PSBwYXNzd29yZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW52YWxpZCBwYXNzd29yZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgIG1vYmlsZTogdXNlci5tb2JpbGUsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZCxcbiAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICBhZGRyZXNzOiB1c2VyLmFkZHJlc3MsXG4gICAgICAgIC8vIHBhc3N3b3JkIGlzIE5PVCByZXR1cm5lZCBieSBkZWZhdWx0IGZvciBzYWZldHk7IGFkZCBpZiB5b3UgcmVhbGx5IG5lZWQgaXRcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJMb2dpbiBBUEkgZXJyb3I6XCIsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiU2VydmVyIGVycm9yXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG4vLyBQVVQgL2FwaS9sb2dpbiAgLT4gdXBkYXRlIHByb2ZpbGUgYnkgaWQgKG9ubHkgeW91ciA2IGZpZWxkcylcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQVVQocmVxKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCwgbmFtZSwgcm9sZSwgbW9iaWxlLCBlbWFpbCwgcGFzc3dvcmQsIGFkZHJlc3MgfSA9XG4gICAgICBhd2FpdCByZXEuanNvbigpO1xuXG4gICAgaWYgKCFpZCB8fCAhbmFtZSB8fCAhZW1haWwpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCJpZCwgbmFtZSBhbmQgZW1haWwgYXJlIHJlcXVpcmVkXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIFNFVCBsaXN0IG9ubHkgZm9yIHByb3ZpZGVkIGZpZWxkc1xuICAgIGNvbnN0IHNldHMgPSBbXTtcbiAgICBjb25zdCB2YWxzID0gW107XG5cbiAgICBzZXRzLnB1c2goXCJuYW1lID0gP1wiKTtcbiAgICB2YWxzLnB1c2gobmFtZSk7XG4gICAgc2V0cy5wdXNoKFwicm9sZSA9ID9cIik7XG4gICAgdmFscy5wdXNoKHJvbGUgPz8gbnVsbCk7XG4gICAgc2V0cy5wdXNoKFwibW9iaWxlID0gP1wiKTtcbiAgICB2YWxzLnB1c2gobW9iaWxlID8/IG51bGwpO1xuICAgIHNldHMucHVzaChcImVtYWlsID0gP1wiKTtcbiAgICB2YWxzLnB1c2goZW1haWwpO1xuICAgIHNldHMucHVzaChcImFkZHJlc3MgPSA/XCIpO1xuICAgIHZhbHMucHVzaChhZGRyZXNzID8/IG51bGwpO1xuICAgIGlmIChwYXNzd29yZCkge1xuICAgICAgc2V0cy5wdXNoKFwicGFzc3dvcmQgPSA/XCIpO1xuICAgICAgdmFscy5wdXNoKHBhc3N3b3JkKTtcbiAgICB9IC8vIHBsYWluXG5cbiAgICBjb25zdCBzcWwgPSBgVVBEQVRFIHRlYW1fbWVtYmVycyBTRVQgJHtzZXRzLmpvaW4oXG4gICAgICBcIiwgXCJcbiAgICApfSBXSEVSRSBpZCA9ID8gTElNSVQgMWA7XG4gICAgdmFscy5wdXNoKGlkKTtcblxuICAgIGF3YWl0IGRiLnF1ZXJ5KHNxbCwgdmFscyk7XG5cbiAgICAvLyBSZXR1cm4gZnJlc2ggcmVjb3JkIChpbmNsdWRpbmcgcGFzc3dvcmQgc2luY2UgeW91IHdhbnQgaXQpXG4gICAgY29uc3QgW3Jvd3NdID0gYXdhaXQgZGIucXVlcnkoXG4gICAgICBcIlNFTEVDVCBpZCwgbmFtZSwgcm9sZSwgbW9iaWxlLCBlbWFpbCwgcGFzc3dvcmQsIGFkZHJlc3MgRlJPTSB0ZWFtX21lbWJlcnMgV0hFUkUgaWQgPSA/IExJTUlUIDFcIixcbiAgICAgIFtpZF1cbiAgICApO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdXNlcjogcm93c1swXSB9LCB7IHN0YXR1czogMjAwIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiUFVUIC9hcGkvbG9naW4gZXJyb3I6XCIsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiU2VydmVyIGVycm9yXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiIiwiR0VUIiwicmVxIiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwiaWQiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJyb3dzIiwicXVlcnkiLCJsZW5ndGgiLCJzdWNjZXNzIiwidXNlciIsImVyciIsImNvbnNvbGUiLCJQT1NUIiwiZW1haWwiLCJwYXNzd29yZCIsIm5hbWUiLCJtb2JpbGUiLCJyb2xlIiwiYWRkcmVzcyIsIlBVVCIsInNldHMiLCJ2YWxzIiwicHVzaCIsInNxbCIsImpvaW4iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/login/route.js\n");

/***/ }),

/***/ "(rsc)/./config/db.js":
/*!**********************!*\
  !*** ./config/db.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n// import mysql from \"mysql2/promise\";\n// // mysql.createConnection()\n// export const db = mysql.createPool({\n//   host: process.env.MYSQL_HOST,\n//   database: process.env.MYSQL_DB,\n//   user: process.env.MYSQL_USERNAME,\n//   password: process.env.MYSQL_PASSWORD,\n//   waitForConnections: true,\n//   connectionLimit: 5, // small per-instance pool\n//   queueLimit: 0,\n// });\n// try {\n//   const connection = await db.getConnection();\n//   //   console.log(\"✅ Database connected successfully.\");\n//   connection.release(); // important to release back to pool\n// } catch (err) {\n//   console.error(\"❌ Database connection failed:\", err);\n//   process.exit(1); // optional: stop server if DB is essential\n// }\n// lib/db.js\n\nconst config = {\n    host: process.env.MYSQL_HOST,\n    database: process.env.MYSQL_DB,\n    user: process.env.MYSQL_USERNAME,\n    password: process.env.MYSQL_PASSWORD,\n    waitForConnections: true,\n    connectionLimit: Number(process.env.MYSQL_POOL_LIMIT) || 2,\n    queueLimit: 0\n};\n// Ensure single pool across hot reloads / multiple imports (Node.js)\nif (!global.__mysqlPool) {\n    global.__mysqlPool = mysql2_promise__WEBPACK_IMPORTED_MODULE_0__.createPool(config);\n}\nconst db = global.__mysqlPool;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWcvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsOEJBQThCO0FBQzlCLHVDQUF1QztBQUN2QyxrQ0FBa0M7QUFDbEMsb0NBQW9DO0FBQ3BDLHNDQUFzQztBQUN0QywwQ0FBMEM7QUFDMUMsOEJBQThCO0FBQzlCLG1EQUFtRDtBQUNuRCxtQkFBbUI7QUFDbkIsTUFBTTtBQUVOLFFBQVE7QUFDUixpREFBaUQ7QUFDakQsNERBQTREO0FBQzVELCtEQUErRDtBQUMvRCxrQkFBa0I7QUFDbEIseURBQXlEO0FBQ3pELGlFQUFpRTtBQUNqRSxJQUFJO0FBQ0osWUFBWTtBQUN1QjtBQUVuQyxNQUFNQyxTQUFTO0lBQ2JDLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVTtJQUM1QkMsVUFBVUgsUUFBUUMsR0FBRyxDQUFDRyxRQUFRO0lBQzlCQyxNQUFNTCxRQUFRQyxHQUFHLENBQUNLLGNBQWM7SUFDaENDLFVBQVVQLFFBQVFDLEdBQUcsQ0FBQ08sY0FBYztJQUNwQ0Msb0JBQW9CO0lBQ3BCQyxpQkFBaUJDLE9BQU9YLFFBQVFDLEdBQUcsQ0FBQ1csZ0JBQWdCLEtBQUs7SUFDekRDLFlBQVk7QUFFZDtBQUVBLHFFQUFxRTtBQUNyRSxJQUFJLENBQUNDLE9BQU9DLFdBQVcsRUFBRTtJQUN2QkQsT0FBT0MsV0FBVyxHQUFHbEIsc0RBQWdCLENBQUNDO0FBQ3hDO0FBRU8sTUFBTW1CLEtBQUtILE9BQU9DLFdBQVcsQ0FBQyIsInNvdXJjZXMiOlsiL1VzZXJzL25hdmVlbmt1bWFyL0RldmVsb3Blci9OZXh0SlMvQ1JNL2NvbmZpZy9kYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgbXlzcWwgZnJvbSBcIm15c3FsMi9wcm9taXNlXCI7XG5cbi8vIC8vIG15c3FsLmNyZWF0ZUNvbm5lY3Rpb24oKVxuLy8gZXhwb3J0IGNvbnN0IGRiID0gbXlzcWwuY3JlYXRlUG9vbCh7XG4vLyAgIGhvc3Q6IHByb2Nlc3MuZW52Lk1ZU1FMX0hPU1QsXG4vLyAgIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5NWVNRTF9EQixcbi8vICAgdXNlcjogcHJvY2Vzcy5lbnYuTVlTUUxfVVNFUk5BTUUsXG4vLyAgIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5NWVNRTF9QQVNTV09SRCxcbi8vICAgd2FpdEZvckNvbm5lY3Rpb25zOiB0cnVlLFxuLy8gICBjb25uZWN0aW9uTGltaXQ6IDUsIC8vIHNtYWxsIHBlci1pbnN0YW5jZSBwb29sXG4vLyAgIHF1ZXVlTGltaXQ6IDAsXG4vLyB9KTtcblxuLy8gdHJ5IHtcbi8vICAgY29uc3QgY29ubmVjdGlvbiA9IGF3YWl0IGRiLmdldENvbm5lY3Rpb24oKTtcbi8vICAgLy8gICBjb25zb2xlLmxvZyhcIuKchSBEYXRhYmFzZSBjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5LlwiKTtcbi8vICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7IC8vIGltcG9ydGFudCB0byByZWxlYXNlIGJhY2sgdG8gcG9vbFxuLy8gfSBjYXRjaCAoZXJyKSB7XG4vLyAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRGF0YWJhc2UgY29ubmVjdGlvbiBmYWlsZWQ6XCIsIGVycik7XG4vLyAgIHByb2Nlc3MuZXhpdCgxKTsgLy8gb3B0aW9uYWw6IHN0b3Agc2VydmVyIGlmIERCIGlzwqBlc3NlbnRpYWxcbi8vIH1cbi8vIGxpYi9kYi5qc1xuaW1wb3J0IG15c3FsIGZyb20gXCJteXNxbDIvcHJvbWlzZVwiO1xuXG5jb25zdCBjb25maWcgPSB7XG4gIGhvc3Q6IHByb2Nlc3MuZW52Lk1ZU1FMX0hPU1QsXG4gIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5NWVNRTF9EQixcbiAgdXNlcjogcHJvY2Vzcy5lbnYuTVlTUUxfVVNFUk5BTUUsXG4gIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5NWVNRTF9QQVNTV09SRCxcbiAgd2FpdEZvckNvbm5lY3Rpb25zOiB0cnVlLFxuICBjb25uZWN0aW9uTGltaXQ6IE51bWJlcihwcm9jZXNzLmVudi5NWVNRTF9QT09MX0xJTUlUKSB8fCAyLCAvLyBzYWZlIGRlZmF1bHRcbiAgcXVldWVMaW1pdDogMCxcbiAgLy8gY29ubmVjdFRpbWVvdXQ6IDEwMDAwLCAvLyBvcHRpb25hbFxufTtcblxuLy8gRW5zdXJlIHNpbmdsZSBwb29sIGFjcm9zcyBob3QgcmVsb2FkcyAvIG11bHRpcGxlIGltcG9ydHMgKE5vZGUuanMpXG5pZiAoIWdsb2JhbC5fX215c3FsUG9vbCkge1xuICBnbG9iYWwuX19teXNxbFBvb2wgPSBteXNxbC5jcmVhdGVQb29sKGNvbmZpZyk7XG59XG5cbmV4cG9ydCBjb25zdCBkYiA9IGdsb2JhbC5fX215c3FsUG9vbDtcbiJdLCJuYW1lcyI6WyJteXNxbCIsImNvbmZpZyIsImhvc3QiLCJwcm9jZXNzIiwiZW52IiwiTVlTUUxfSE9TVCIsImRhdGFiYXNlIiwiTVlTUUxfREIiLCJ1c2VyIiwiTVlTUUxfVVNFUk5BTUUiLCJwYXNzd29yZCIsIk1ZU1FMX1BBU1NXT1JEIiwid2FpdEZvckNvbm5lY3Rpb25zIiwiY29ubmVjdGlvbkxpbWl0IiwiTnVtYmVyIiwiTVlTUUxfUE9PTF9MSU1JVCIsInF1ZXVlTGltaXQiLCJnbG9iYWwiLCJfX215c3FsUG9vbCIsImNyZWF0ZVBvb2wiLCJkYiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./config/db.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$":
/*!****************************************************!*\
  !*** ./node_modules/mysql2/lib/ sync ^cardinal.*$ ***!
  \****************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_naveenkumar_Developer_NextJS_CRM_app_api_login_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/login/route.js */ \"(rsc)/./app/api/login/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/login/route\",\n        pathname: \"/api/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/login/route\"\n    },\n    resolvedPagePath: \"/Users/naveenkumar/Developer/NextJS/CRM/app/api/login/route.js\",\n    nextConfigOutput,\n    userland: _Users_naveenkumar_Developer_NextJS_CRM_app_api_login_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsb2dpbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbG9naW4lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsb2dpbiUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNjO0FBQzNGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbmF2ZWVua3VtYXIvRGV2ZWxvcGVyL05leHRKUy9DUk0vYXBwL2FwaS9sb2dpbi9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbG9naW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbG9naW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbmF2ZWVua3VtYXIvRGV2ZWxvcGVyL05leHRKUy9DUk0vYXBwL2FwaS9sb2dpbi9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Froute&page=%2Fapi%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();