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
exports.id = "app/api/login/team-member/route";
exports.ids = ["app/api/login/team-member/route"];
exports.modules = {

/***/ "(rsc)/./app/api/login/team-member/route.js":
/*!********************************************!*\
  !*** ./app/api/login/team-member/route.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _config_db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/db.js */ \"(rsc)/./config/db.js\");\n\n\nasync function GET() {\n    try {\n        const [rows] = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM team_members\");\n        return new Response(JSON.stringify(rows), {\n            status: 200\n        });\n    } catch (error) {\n        return new Response(JSON.stringify({\n            error: error.message\n        }), {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request) {\n    try {\n        const { id } = await request.json(); // ✅ read id from body\n        if (!id) {\n            return new Response(JSON.stringify({\n                error: \"ID is required\"\n            }), {\n                status: 400\n            });\n        }\n        const [result] = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"DELETE FROM team_members WHERE id = ?\", [\n            id\n        ]);\n        if (result.affectedRows === 0) {\n            return new Response(JSON.stringify({\n                error: \"Member not found\"\n            }), {\n                status: 404\n            });\n        }\n        return new Response(JSON.stringify({\n            message: \"Member deleted successfully\"\n        }), {\n            status: 200\n        });\n    } catch (error) {\n        return new Response(JSON.stringify({\n            error: error.message\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xvZ2luL3RlYW0tbWVtYmVyL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDUDtBQUU3QixlQUFlRTtJQUNwQixJQUFJO1FBQ0YsTUFBTSxDQUFDQyxLQUFLLEdBQUcsTUFBTUYsNkNBQUVBLENBQUNHLEtBQUssQ0FBQztRQUM5QixPQUFPLElBQUlDLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQ0osT0FBTztZQUFFSyxRQUFRO1FBQUk7SUFDMUQsRUFBRSxPQUFPQyxPQUFPO1FBQ2QsT0FBTyxJQUFJSixTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRUUsT0FBT0EsTUFBTUMsT0FBTztRQUFDLElBQUk7WUFDNURGLFFBQVE7UUFDVjtJQUNGO0FBQ0Y7QUFFTyxlQUFlRyxPQUFPQyxPQUFPO0lBQ2xDLElBQUk7UUFDRixNQUFNLEVBQUVDLEVBQUUsRUFBRSxHQUFHLE1BQU1ELFFBQVFFLElBQUksSUFBSSxzQkFBc0I7UUFFM0QsSUFBSSxDQUFDRCxJQUFJO1lBQ1AsT0FBTyxJQUFJUixTQUFTQyxLQUFLQyxTQUFTLENBQUM7Z0JBQUVFLE9BQU87WUFBaUIsSUFBSTtnQkFDL0RELFFBQVE7WUFDVjtRQUNGO1FBRUEsTUFBTSxDQUFDTyxPQUFPLEdBQUcsTUFBTWQsNkNBQUVBLENBQUNHLEtBQUssQ0FBQyx5Q0FBeUM7WUFDdkVTO1NBQ0Q7UUFFRCxJQUFJRSxPQUFPQyxZQUFZLEtBQUssR0FBRztZQUM3QixPQUFPLElBQUlYLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQztnQkFBRUUsT0FBTztZQUFtQixJQUFJO2dCQUNqRUQsUUFBUTtZQUNWO1FBQ0Y7UUFFQSxPQUFPLElBQUlILFNBQ1RDLEtBQUtDLFNBQVMsQ0FBQztZQUFFRyxTQUFTO1FBQThCLElBQ3hEO1lBQUVGLFFBQVE7UUFBSTtJQUVsQixFQUFFLE9BQU9DLE9BQU87UUFDZCxPQUFPLElBQUlKLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQztZQUFFRSxPQUFPQSxNQUFNQyxPQUFPO1FBQUMsSUFBSTtZQUM1REYsUUFBUTtRQUNWO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL25hdmVlbmt1bWFyL0RldmVsb3Blci9OZXh0SlMvQ1JNL2FwcC9hcGkvbG9naW4vdGVhbS1tZW1iZXIvcm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2NvbmZpZy9kYi5qc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IFtyb3dzXSA9IGF3YWl0IGRiLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSB0ZWFtX21lbWJlcnNcIik7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeShyb3dzKSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSksIHtcbiAgICAgIHN0YXR1czogNTAwLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpOyAvLyDinIUgcmVhZCBpZCBmcm9tIGJvZHlcblxuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJJRCBpcyByZXF1aXJlZFwiIH0pLCB7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgW3Jlc3VsdF0gPSBhd2FpdCBkYi5xdWVyeShcIkRFTEVURSBGUk9NIHRlYW1fbWVtYmVycyBXSEVSRSBpZCA9ID9cIiwgW1xuICAgICAgaWQsXG4gICAgXSk7XG5cbiAgICBpZiAocmVzdWx0LmFmZmVjdGVkUm93cyA9PT0gMCkge1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBcIk1lbWJlciBub3QgZm91bmRcIiB9KSwge1xuICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXG4gICAgICBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IFwiTWVtYmVyIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5XCIgfSksXG4gICAgICB7IHN0YXR1czogMjAwIH1cbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9KSwge1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJkYiIsIkdFVCIsInJvd3MiLCJxdWVyeSIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsInN0YXR1cyIsImVycm9yIiwibWVzc2FnZSIsIkRFTEVURSIsInJlcXVlc3QiLCJpZCIsImpzb24iLCJyZXN1bHQiLCJhZmZlY3RlZFJvd3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/login/team-member/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Fteam-member%2Froute&page=%2Fapi%2Flogin%2Fteam-member%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Fteam-member%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Fteam-member%2Froute&page=%2Fapi%2Flogin%2Fteam-member%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Fteam-member%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_naveenkumar_Developer_NextJS_CRM_app_api_login_team_member_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/login/team-member/route.js */ \"(rsc)/./app/api/login/team-member/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/login/team-member/route\",\n        pathname: \"/api/login/team-member\",\n        filename: \"route\",\n        bundlePath: \"app/api/login/team-member/route\"\n    },\n    resolvedPagePath: \"/Users/naveenkumar/Developer/NextJS/CRM/app/api/login/team-member/route.js\",\n    nextConfigOutput,\n    userland: _Users_naveenkumar_Developer_NextJS_CRM_app_api_login_team_member_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsb2dpbiUyRnRlYW0tbWVtYmVyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZsb2dpbiUyRnRlYW0tbWVtYmVyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGbG9naW4lMkZ0ZWFtLW1lbWJlciUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUMwQjtBQUN2RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25hdmVlbmt1bWFyL0RldmVsb3Blci9OZXh0SlMvQ1JNL2FwcC9hcGkvbG9naW4vdGVhbS1tZW1iZXIvcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2xvZ2luL3RlYW0tbWVtYmVyL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvbG9naW4vdGVhbS1tZW1iZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2xvZ2luL3RlYW0tbWVtYmVyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL25hdmVlbmt1bWFyL0RldmVsb3Blci9OZXh0SlMvQ1JNL2FwcC9hcGkvbG9naW4vdGVhbS1tZW1iZXIvcm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Fteam-member%2Froute&page=%2Fapi%2Flogin%2Fteam-member%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Fteam-member%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flogin%2Fteam-member%2Froute&page=%2Fapi%2Flogin%2Fteam-member%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flogin%2Fteam-member%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();