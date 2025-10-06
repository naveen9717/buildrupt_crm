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
exports.id = "app/api/calendars/route";
exports.ids = ["app/api/calendars/route"];
exports.modules = {

/***/ "(rsc)/./app/api/calendars/route.js":
/*!************************************!*\
  !*** ./app/api/calendars/route.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _config_db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/db.js */ \"(rsc)/./config/db.js\");\n\n\nasync function GET() {\n    try {\n        // Note: adjust fields in JSON_OBJECT(...) to match your actual column names\n        const [rows] = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`\n      SELECT \n        p.id   AS project_id, p.name AS project_name, p.cost, p.client, p.relation,\n        p.phone, p.email,\n        s.id   AS shoot_id, s.status, s.reporting, s.slot, s.type, s.city,\n        s.duration, s.venue, s.date, s.notes,\n        cp.id  AS photo_id, cp.photo_crew AS photo_crew, cp.photo_role AS photo_role,\n        cv.id  AS video_id, cv.video_crew AS video_crew, cv.video_role AS video_role\n      FROM projects p\n      LEFT JOIN shoots s       ON p.id = s.project_id\n      LEFT JOIN crews_photo cp ON s.id = cp.shoot_id\n      LEFT JOIN crews_video cv ON s.id = cv.shoot_id\n      ORDER BY p.id, s.id\n      `);\n        const projectsMap = new Map();\n        for (const row of rows){\n            // project\n            if (!projectsMap.has(row.project_id)) {\n                projectsMap.set(row.project_id, {\n                    id: row.project_id,\n                    name: row.project_name,\n                    cost: row.cost,\n                    client: row.client,\n                    relation: row.relation,\n                    phone: row.phone,\n                    email: row.email,\n                    shoots: []\n                });\n            }\n            const project = projectsMap.get(row.project_id);\n            // shoot\n            if (row.shoot_id) {\n                let shoot = project.shoots.find((s)=>s.id === row.shoot_id);\n                if (!shoot) {\n                    shoot = {\n                        id: row.shoot_id,\n                        status: row.status,\n                        reporting: row.reporting,\n                        slot: row.slot,\n                        type: row.type,\n                        city: row.city,\n                        duration: row.duration,\n                        venue: row.venue,\n                        date: row.date,\n                        notes: row.notes,\n                        photos: [],\n                        videos: []\n                    };\n                    project.shoots.push(shoot);\n                }\n                // photo\n                if (row.photo_id) {\n                    if (!shoot.photos.find((p)=>p.id === row.photo_id)) {\n                        shoot.photos.push({\n                            id: row.photo_id,\n                            photo_crew: row.photo_crew,\n                            photo_role: row.photo_role\n                        });\n                    }\n                }\n                // video\n                if (row.video_id) {\n                    if (!shoot.videos.find((v)=>v.id === row.video_id)) {\n                        shoot.videos.push({\n                            id: row.video_id,\n                            video_crew: row.video_crew,\n                            video_role: row.video_role\n                        });\n                    }\n                }\n            }\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            projects: Array.from(projectsMap.values())\n        });\n    } catch (error) {\n        console.error(\"API error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PUT(request) {\n    const body = await request.json();\n    const { form } = body;\n    try {\n        // 1. Update shoot info\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`UPDATE shoots SET type = ?, venue = ?, reporting = ?, slot = ?, date = ? WHERE id = ?`, [\n            form.type,\n            form.venue,\n            form.reporting,\n            form.slot,\n            form.date,\n            form.id\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Updated successfully\"\n        });\n    } catch (error) {\n        console.error(\"Insert error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Insertion failed\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request, { params }) {\n    try {\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"DELETE FROM shoots WHERE id = ?\", [\n            params.id\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({}, {\n            status: 204\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: error.message\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Uk0vYXBwL2FwaS9jYWxlbmRhcnMvcm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2NvbmZpZy9kYi5qc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIC8vIE5vdGU6IGFkanVzdCBmaWVsZHMgaW4gSlNPTl9PQkpFQ1QoLi4uKSB0byBtYXRjaCB5b3VyIGFjdHVhbCBjb2x1bW4gbmFtZXNcbiAgICBjb25zdCBbcm93c10gPSBhd2FpdCBkYi5xdWVyeShcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBcbiAgICAgICAgcC5pZCAgIEFTIHByb2plY3RfaWQsIHAubmFtZSBBUyBwcm9qZWN0X25hbWUsIHAuY29zdCwgcC5jbGllbnQsIHAucmVsYXRpb24sXG4gICAgICAgIHAucGhvbmUsIHAuZW1haWwsXG4gICAgICAgIHMuaWQgICBBUyBzaG9vdF9pZCwgcy5zdGF0dXMsIHMucmVwb3J0aW5nLCBzLnNsb3QsIHMudHlwZSwgcy5jaXR5LFxuICAgICAgICBzLmR1cmF0aW9uLCBzLnZlbnVlLCBzLmRhdGUsIHMubm90ZXMsXG4gICAgICAgIGNwLmlkICBBUyBwaG90b19pZCwgY3AucGhvdG9fY3JldyBBUyBwaG90b19jcmV3LCBjcC5waG90b19yb2xlIEFTIHBob3RvX3JvbGUsXG4gICAgICAgIGN2LmlkICBBUyB2aWRlb19pZCwgY3YudmlkZW9fY3JldyBBUyB2aWRlb19jcmV3LCBjdi52aWRlb19yb2xlIEFTIHZpZGVvX3JvbGVcbiAgICAgIEZST00gcHJvamVjdHMgcFxuICAgICAgTEVGVCBKT0lOIHNob290cyBzICAgICAgIE9OIHAuaWQgPSBzLnByb2plY3RfaWRcbiAgICAgIExFRlQgSk9JTiBjcmV3c19waG90byBjcCBPTiBzLmlkID0gY3Auc2hvb3RfaWRcbiAgICAgIExFRlQgSk9JTiBjcmV3c192aWRlbyBjdiBPTiBzLmlkID0gY3Yuc2hvb3RfaWRcbiAgICAgIE9SREVSIEJZIHAuaWQsIHMuaWRcbiAgICAgIGBcbiAgICApO1xuXG4gICAgY29uc3QgcHJvamVjdHNNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBmb3IgKGNvbnN0IHJvdyBvZiByb3dzKSB7XG4gICAgICAvLyBwcm9qZWN0XG4gICAgICBpZiAoIXByb2plY3RzTWFwLmhhcyhyb3cucHJvamVjdF9pZCkpIHtcbiAgICAgICAgcHJvamVjdHNNYXAuc2V0KHJvdy5wcm9qZWN0X2lkLCB7XG4gICAgICAgICAgaWQ6IHJvdy5wcm9qZWN0X2lkLFxuICAgICAgICAgIG5hbWU6IHJvdy5wcm9qZWN0X25hbWUsXG4gICAgICAgICAgY29zdDogcm93LmNvc3QsXG4gICAgICAgICAgY2xpZW50OiByb3cuY2xpZW50LFxuICAgICAgICAgIHJlbGF0aW9uOiByb3cucmVsYXRpb24sXG4gICAgICAgICAgcGhvbmU6IHJvdy5waG9uZSxcbiAgICAgICAgICBlbWFpbDogcm93LmVtYWlsLFxuICAgICAgICAgIHNob290czogW10sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzTWFwLmdldChyb3cucHJvamVjdF9pZCk7XG5cbiAgICAgIC8vIHNob290XG4gICAgICBpZiAocm93LnNob290X2lkKSB7XG4gICAgICAgIGxldCBzaG9vdCA9IHByb2plY3Quc2hvb3RzLmZpbmQoKHMpID0+IHMuaWQgPT09IHJvdy5zaG9vdF9pZCk7XG4gICAgICAgIGlmICghc2hvb3QpIHtcbiAgICAgICAgICBzaG9vdCA9IHtcbiAgICAgICAgICAgIGlkOiByb3cuc2hvb3RfaWQsXG4gICAgICAgICAgICBzdGF0dXM6IHJvdy5zdGF0dXMsXG4gICAgICAgICAgICByZXBvcnRpbmc6IHJvdy5yZXBvcnRpbmcsXG4gICAgICAgICAgICBzbG90OiByb3cuc2xvdCxcbiAgICAgICAgICAgIHR5cGU6IHJvdy50eXBlLFxuICAgICAgICAgICAgY2l0eTogcm93LmNpdHksXG4gICAgICAgICAgICBkdXJhdGlvbjogcm93LmR1cmF0aW9uLFxuICAgICAgICAgICAgdmVudWU6IHJvdy52ZW51ZSxcbiAgICAgICAgICAgIGRhdGU6IHJvdy5kYXRlLFxuICAgICAgICAgICAgbm90ZXM6IHJvdy5ub3RlcyxcbiAgICAgICAgICAgIHBob3RvczogW10sXG4gICAgICAgICAgICB2aWRlb3M6IFtdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcHJvamVjdC5zaG9vdHMucHVzaChzaG9vdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwaG90b1xuICAgICAgICBpZiAocm93LnBob3RvX2lkKSB7XG4gICAgICAgICAgaWYgKCFzaG9vdC5waG90b3MuZmluZCgocCkgPT4gcC5pZCA9PT0gcm93LnBob3RvX2lkKSkge1xuICAgICAgICAgICAgc2hvb3QucGhvdG9zLnB1c2goe1xuICAgICAgICAgICAgICBpZDogcm93LnBob3RvX2lkLFxuICAgICAgICAgICAgICBwaG90b19jcmV3OiByb3cucGhvdG9fY3JldyxcbiAgICAgICAgICAgICAgcGhvdG9fcm9sZTogcm93LnBob3RvX3JvbGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB2aWRlb1xuICAgICAgICBpZiAocm93LnZpZGVvX2lkKSB7XG4gICAgICAgICAgaWYgKCFzaG9vdC52aWRlb3MuZmluZCgodikgPT4gdi5pZCA9PT0gcm93LnZpZGVvX2lkKSkge1xuICAgICAgICAgICAgc2hvb3QudmlkZW9zLnB1c2goe1xuICAgICAgICAgICAgICBpZDogcm93LnZpZGVvX2lkLFxuICAgICAgICAgICAgICB2aWRlb19jcmV3OiByb3cudmlkZW9fY3JldyxcbiAgICAgICAgICAgICAgdmlkZW9fcm9sZTogcm93LnZpZGVvX3JvbGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBwcm9qZWN0czogQXJyYXkuZnJvbShwcm9qZWN0c01hcC52YWx1ZXMoKSkgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkFQSSBlcnJvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBVVChyZXF1ZXN0KSB7XG4gIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcblxuICBjb25zdCB7IGZvcm0gfSA9IGJvZHk7XG5cbiAgdHJ5IHtcbiAgICAvLyAxLiBVcGRhdGUgc2hvb3QgaW5mb1xuICAgIGF3YWl0IGRiLnF1ZXJ5KFxuICAgICAgYFVQREFURSBzaG9vdHMgU0VUIHR5cGUgPSA/LCB2ZW51ZSA9ID8sIHJlcG9ydGluZyA9ID8sIHNsb3QgPSA/LCBkYXRlID0gPyBXSEVSRSBpZCA9ID9gLFxuICAgICAgW2Zvcm0udHlwZSwgZm9ybS52ZW51ZSwgZm9ybS5yZXBvcnRpbmcsIGZvcm0uc2xvdCwgZm9ybS5kYXRlLCBmb3JtLmlkXVxuICAgICk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIlVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkluc2VydCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkluc2VydGlvbiBmYWlsZWRcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxdWVzdCwgeyBwYXJhbXMgfSkge1xuICB0cnkge1xuICAgIGF3YWl0IGRiLnF1ZXJ5KFwiREVMRVRFIEZST00gc2hvb3RzIFdIRVJFIGlkID0gP1wiLCBbcGFyYW1zLmlkXSk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHt9LCB7IHN0YXR1czogMjA0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJkYiIsIkdFVCIsInJvd3MiLCJxdWVyeSIsInByb2plY3RzTWFwIiwiTWFwIiwicm93IiwiaGFzIiwicHJvamVjdF9pZCIsInNldCIsImlkIiwibmFtZSIsInByb2plY3RfbmFtZSIsImNvc3QiLCJjbGllbnQiLCJyZWxhdGlvbiIsInBob25lIiwiZW1haWwiLCJzaG9vdHMiLCJwcm9qZWN0IiwiZ2V0Iiwic2hvb3RfaWQiLCJzaG9vdCIsImZpbmQiLCJzIiwic3RhdHVzIiwicmVwb3J0aW5nIiwic2xvdCIsInR5cGUiLCJjaXR5IiwiZHVyYXRpb24iLCJ2ZW51ZSIsImRhdGUiLCJub3RlcyIsInBob3RvcyIsInZpZGVvcyIsInB1c2giLCJwaG90b19pZCIsInAiLCJwaG90b19jcmV3IiwicGhvdG9fcm9sZSIsInZpZGVvX2lkIiwidiIsInZpZGVvX2NyZXciLCJ2aWRlb19yb2xlIiwianNvbiIsInByb2plY3RzIiwiQXJyYXkiLCJmcm9tIiwidmFsdWVzIiwiZXJyb3IiLCJjb25zb2xlIiwiUFVUIiwicmVxdWVzdCIsImJvZHkiLCJmb3JtIiwibWVzc2FnZSIsIkRFTEVURSIsInBhcmFtcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/calendars/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcalendars%2Froute&page=%2Fapi%2Fcalendars%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcalendars%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcalendars%2Froute&page=%2Fapi%2Fcalendars%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcalendars%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_naveenkumar_Developer_NextJS_CRM_app_api_calendars_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/calendars/route.js */ \"(rsc)/./app/api/calendars/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/calendars/route\",\n        pathname: \"/api/calendars\",\n        filename: \"route\",\n        bundlePath: \"app/api/calendars/route\"\n    },\n    resolvedPagePath: \"/Users/naveenkumar/Developer/NextJS/CRM/app/api/calendars/route.js\",\n    nextConfigOutput,\n    userland: _Users_naveenkumar_Developer_NextJS_CRM_app_api_calendars_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjYWxlbmRhcnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNhbGVuZGFycyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNhbGVuZGFycyUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrQjtBQUMvRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25hdmVlbmt1bWFyL0RldmVsb3Blci9OZXh0SlMvQ1JNL2FwcC9hcGkvY2FsZW5kYXJzL3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jYWxlbmRhcnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jYWxlbmRhcnNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NhbGVuZGFycy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9uYXZlZW5rdW1hci9EZXZlbG9wZXIvTmV4dEpTL0NSTS9hcHAvYXBpL2NhbGVuZGFycy9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcalendars%2Froute&page=%2Fapi%2Fcalendars%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcalendars%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcalendars%2Froute&page=%2Fapi%2Fcalendars%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcalendars%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();