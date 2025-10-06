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
exports.id = "app/api/projects/project/[projectId]/route";
exports.ids = ["app/api/projects/project/[projectId]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/projects/project/[projectId]/route.js":
/*!*******************************************************!*\
  !*** ./app/api/projects/project/[projectId]/route.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _config_db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/db.js */ \"(rsc)/./config/db.js\");\n\n\nasync function GET(request, { params }) {\n    const { projectId } = await params;\n    try {\n        // Query 1: Main shoot details\n        const shootResult = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM shoots WHERE project_id = ?\", [\n            projectId\n        ]);\n        // Query 2: Photo crew by shoot_id\n        const deliverableResult = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM deliverables WHERE project_id = ?\", [\n            projectId\n        ]);\n        // Query 3: Video crew by shoot_id\n        const taskResult = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM tasks WHERE project_id = ?\", [\n            projectId\n        ]);\n        // Query 4: Video crew by shoot_id\n        const expenseResult = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM expenses WHERE project_id = ?\", [\n            projectId\n        ]);\n        // Query 5: Video crew by shoot_id\n        // const invoiceResult = await db.query(\n        //   \"SELECT * FROM invoices WHERE project_id = ?\",\n        //   [projectId]\n        // );\n        const [invoiceResult] = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`SELECT invoices.*, projects.name, projects.phone,projects.email,projects.cost,projects.client\n   FROM invoices\n   JOIN projects ON invoices.project_id = projects.id\n   WHERE invoices.project_id = ?`, [\n            projectId\n        ]);\n        // Query 6: Video crew by shoot_id\n        const paymentPaidResult = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM amounts WHERE project_id = ? AND status = 'paid' \", [\n            projectId\n        ]);\n        // Query 7: Video crew by shoot_id\n        const paymentUpcomingResult = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM amounts WHERE project_id = ? AND status = 'upcoming' \", [\n            projectId\n        ]);\n        // Query 8: Video crew by shoot_id\n        const projectResult = await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM projects WHERE id = ?\", [\n            projectId\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            shoot: shootResult[0] || null,\n            deliverable: deliverableResult[0] || null,\n            task: taskResult[0] || null,\n            expense: expenseResult[0] || null,\n            invoice: invoiceResult,\n            paymentpaid: paymentPaidResult[0] || null,\n            paymentupcoming: paymentUpcomingResult[0] || null,\n            projects: projectResult[0] || null\n        });\n    } catch (error) {\n        console.error(\"GET API Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request, { params }) {\n    try {\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"DELETE FROM shoots WHERE id = ?\", [\n            params.id\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({}, {\n            status: 204\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: error.message\n        });\n    }\n}\nasync function PUT(request, { params }) {\n    const { shootId, projectId } = await params;\n    const body = await request.json();\n    const { form1, form2, form3, form4 } = body;\n    try {\n        // 1. Update shoot info\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`UPDATE shoots SET type = ?, duration = ?, venue = ?, city = ?, reporting = ?, slot = ?, date = ?, status = ?, notes = ? WHERE id = ?`, [\n            form1.type,\n            form1.duration,\n            form1.venue,\n            form1.city,\n            form1.reporting,\n            form1.slot,\n            form1.date,\n            form1.status,\n            form1.notes,\n            shootId\n        ]);\n        // 2. Clear existing photo crew\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`DELETE FROM crews_photo WHERE shoot_id = ?`, [\n            shootId\n        ]);\n        // 3. Insert updated photo crew\n        for (const crew of form2){\n            await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"INSERT INTO crews_photo (project_id,shoot_id,photo_crew,photo_role) VALUES (?, ?, ?, ?)\", [\n                projectId,\n                shootId,\n                crew.photo_crew,\n                crew.photo_role\n            ]);\n        }\n        // 4. Clear existing video crew\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`DELETE FROM crews_video WHERE shoot_id = ?`, [\n            shootId\n        ]);\n        // 5. Insert updated video crew\n        for (const crew of form3){\n            await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"INSERT INTO crews_video (project_id,shoot_id,video_crew,video_role) VALUES (?, ?, ?, ?)\", [\n                projectId,\n                shootId,\n                crew.video_crew,\n                crew.video_role\n            ]);\n        }\n        // 4. Clear existing additional crew\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`DELETE FROM crews_additional WHERE shoot_id = ?`, [\n            shootId\n        ]);\n        // 5. Insert updated additional crew\n        for (const crew of form4){\n            await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"INSERT INTO crews_additional (project_id,shoot_id,additional_crew,additional_role) VALUES (?, ?, ?, ?)\", [\n                projectId,\n                shootId,\n                crew.additional_crew,\n                crew.additional_role\n            ]);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Updated successfully\"\n        });\n    } catch (error) {\n        console.error(\"Insert error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Insertion failed\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2plY3RzL3Byb2plY3QvW3Byb2plY3RJZF0vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDUDtBQUU3QixlQUFlRSxJQUFJQyxPQUFPLEVBQUUsRUFBRUMsTUFBTSxFQUFFO0lBQzNDLE1BQU0sRUFBRUMsU0FBUyxFQUFFLEdBQUcsTUFBTUQ7SUFFNUIsSUFBSTtRQUNGLDhCQUE4QjtRQUM5QixNQUFNRSxjQUFjLE1BQU1MLDZDQUFFQSxDQUFDTSxLQUFLLENBQ2hDLDZDQUNBO1lBQUNGO1NBQVU7UUFHYixrQ0FBa0M7UUFDbEMsTUFBTUcsb0JBQW9CLE1BQU1QLDZDQUFFQSxDQUFDTSxLQUFLLENBQ3RDLG1EQUNBO1lBQUNGO1NBQVU7UUFHYixrQ0FBa0M7UUFDbEMsTUFBTUksYUFBYSxNQUFNUiw2Q0FBRUEsQ0FBQ00sS0FBSyxDQUMvQiw0Q0FDQTtZQUFDRjtTQUFVO1FBR2Isa0NBQWtDO1FBQ2xDLE1BQU1LLGdCQUFnQixNQUFNVCw2Q0FBRUEsQ0FBQ00sS0FBSyxDQUNsQywrQ0FDQTtZQUFDRjtTQUFVO1FBR2Isa0NBQWtDO1FBQ2xDLHdDQUF3QztRQUN4QyxtREFBbUQ7UUFDbkQsZ0JBQWdCO1FBQ2hCLEtBQUs7UUFDTCxNQUFNLENBQUNNLGNBQWMsR0FBRyxNQUFNViw2Q0FBRUEsQ0FBQ00sS0FBSyxDQUNwQyxDQUFDOzs7Z0NBR3lCLENBQUMsRUFDM0I7WUFBQ0Y7U0FBVTtRQUdiLGtDQUFrQztRQUNsQyxNQUFNTyxvQkFBb0IsTUFBTVgsNkNBQUVBLENBQUNNLEtBQUssQ0FDdEMsbUVBQ0E7WUFBQ0Y7U0FBVTtRQUViLGtDQUFrQztRQUNsQyxNQUFNUSx3QkFBd0IsTUFBTVosNkNBQUVBLENBQUNNLEtBQUssQ0FDMUMsdUVBQ0E7WUFBQ0Y7U0FBVTtRQUdiLGtDQUFrQztRQUNsQyxNQUFNUyxnQkFBZ0IsTUFBTWIsNkNBQUVBLENBQUNNLEtBQUssQ0FDbEMsdUNBQ0E7WUFBQ0Y7U0FBVTtRQUdi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S0ssZUFBZTtnQkFBRUwsS0FBS00sZUFBZTthQUFDO1FBRXBFO1FBRUEsT0FBT25ELHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7WUFBRVcsU0FBUztRQUF1QjtJQUM3RCxFQUFFLE9BQU9GLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGlCQUFpQkE7UUFDL0IsT0FBT3hCLHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7WUFBRVMsT0FBTztRQUFtQixHQUFHO1lBQUVHLFFBQVE7UUFBSTtJQUN4RTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvbmF2ZWVua3VtYXIvRGV2ZWxvcGVyL05leHRKUy9DUk0vYXBwL2FwaS9wcm9qZWN0cy9wcm9qZWN0L1twcm9qZWN0SWRdL3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2NvbmZpZy9kYi5qc1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0LCB7IHBhcmFtcyB9KSB7XHJcbiAgY29uc3QgeyBwcm9qZWN0SWQgfSA9IGF3YWl0IHBhcmFtcztcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIFF1ZXJ5IDE6IE1haW4gc2hvb3QgZGV0YWlsc1xyXG4gICAgY29uc3Qgc2hvb3RSZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShcclxuICAgICAgXCJTRUxFQ1QgKiBGUk9NIHNob290cyBXSEVSRSBwcm9qZWN0X2lkID0gP1wiLFxyXG4gICAgICBbcHJvamVjdElkXVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBRdWVyeSAyOiBQaG90byBjcmV3IGJ5IHNob290X2lkXHJcbiAgICBjb25zdCBkZWxpdmVyYWJsZVJlc3VsdCA9IGF3YWl0IGRiLnF1ZXJ5KFxyXG4gICAgICBcIlNFTEVDVCAqIEZST00gZGVsaXZlcmFibGVzIFdIRVJFIHByb2plY3RfaWQgPSA/XCIsXHJcbiAgICAgIFtwcm9qZWN0SWRdXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFF1ZXJ5IDM6IFZpZGVvIGNyZXcgYnkgc2hvb3RfaWRcclxuICAgIGNvbnN0IHRhc2tSZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShcclxuICAgICAgXCJTRUxFQ1QgKiBGUk9NIHRhc2tzIFdIRVJFIHByb2plY3RfaWQgPSA/XCIsXHJcbiAgICAgIFtwcm9qZWN0SWRdXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFF1ZXJ5IDQ6IFZpZGVvIGNyZXcgYnkgc2hvb3RfaWRcclxuICAgIGNvbnN0IGV4cGVuc2VSZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShcclxuICAgICAgXCJTRUxFQ1QgKiBGUk9NIGV4cGVuc2VzIFdIRVJFIHByb2plY3RfaWQgPSA/XCIsXHJcbiAgICAgIFtwcm9qZWN0SWRdXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFF1ZXJ5IDU6IFZpZGVvIGNyZXcgYnkgc2hvb3RfaWRcclxuICAgIC8vIGNvbnN0IGludm9pY2VSZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShcclxuICAgIC8vICAgXCJTRUxFQ1QgKiBGUk9NIGludm9pY2VzIFdIRVJFIHByb2plY3RfaWQgPSA/XCIsXHJcbiAgICAvLyAgIFtwcm9qZWN0SWRdXHJcbiAgICAvLyApO1xyXG4gICAgY29uc3QgW2ludm9pY2VSZXN1bHRdID0gYXdhaXQgZGIucXVlcnkoXHJcbiAgICAgIGBTRUxFQ1QgaW52b2ljZXMuKiwgcHJvamVjdHMubmFtZSwgcHJvamVjdHMucGhvbmUscHJvamVjdHMuZW1haWwscHJvamVjdHMuY29zdCxwcm9qZWN0cy5jbGllbnRcclxuICAgRlJPTSBpbnZvaWNlc1xyXG4gICBKT0lOIHByb2plY3RzIE9OIGludm9pY2VzLnByb2plY3RfaWQgPSBwcm9qZWN0cy5pZFxyXG4gICBXSEVSRSBpbnZvaWNlcy5wcm9qZWN0X2lkID0gP2AsXHJcbiAgICAgIFtwcm9qZWN0SWRdXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFF1ZXJ5IDY6IFZpZGVvIGNyZXcgYnkgc2hvb3RfaWRcclxuICAgIGNvbnN0IHBheW1lbnRQYWlkUmVzdWx0ID0gYXdhaXQgZGIucXVlcnkoXHJcbiAgICAgIFwiU0VMRUNUICogRlJPTSBhbW91bnRzIFdIRVJFIHByb2plY3RfaWQgPSA/IEFORCBzdGF0dXMgPSAncGFpZCcgXCIsXHJcbiAgICAgIFtwcm9qZWN0SWRdXHJcbiAgICApO1xyXG4gICAgLy8gUXVlcnkgNzogVmlkZW8gY3JldyBieSBzaG9vdF9pZFxyXG4gICAgY29uc3QgcGF5bWVudFVwY29taW5nUmVzdWx0ID0gYXdhaXQgZGIucXVlcnkoXHJcbiAgICAgIFwiU0VMRUNUICogRlJPTSBhbW91bnRzIFdIRVJFIHByb2plY3RfaWQgPSA/IEFORCBzdGF0dXMgPSAndXBjb21pbmcnIFwiLFxyXG4gICAgICBbcHJvamVjdElkXVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBRdWVyeSA4OiBWaWRlbyBjcmV3IGJ5IHNob290X2lkXHJcbiAgICBjb25zdCBwcm9qZWN0UmVzdWx0ID0gYXdhaXQgZGIucXVlcnkoXHJcbiAgICAgIFwiU0VMRUNUICogRlJPTSBwcm9qZWN0cyBXSEVSRSBpZCA9ID9cIixcclxuICAgICAgW3Byb2plY3RJZF1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgc2hvb3Q6IHNob290UmVzdWx0WzBdIHx8IG51bGwsXHJcbiAgICAgIGRlbGl2ZXJhYmxlOiBkZWxpdmVyYWJsZVJlc3VsdFswXSB8fCBudWxsLFxyXG4gICAgICB0YXNrOiB0YXNrUmVzdWx0WzBdIHx8IG51bGwsXHJcbiAgICAgIGV4cGVuc2U6IGV4cGVuc2VSZXN1bHRbMF0gfHwgbnVsbCxcclxuICAgICAgaW52b2ljZTogaW52b2ljZVJlc3VsdCxcclxuICAgICAgcGF5bWVudHBhaWQ6IHBheW1lbnRQYWlkUmVzdWx0WzBdIHx8IG51bGwsXHJcbiAgICAgIHBheW1lbnR1cGNvbWluZzogcGF5bWVudFVwY29taW5nUmVzdWx0WzBdIHx8IG51bGwsXHJcbiAgICAgIHByb2plY3RzOiBwcm9qZWN0UmVzdWx0WzBdIHx8IG51bGwsXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkdFVCBBUEkgRXJyb3I6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURShyZXF1ZXN0LCB7IHBhcmFtcyB9KSB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGRiLnF1ZXJ5KFwiREVMRVRFIEZST00gc2hvb3RzIFdIRVJFIGlkID0gP1wiLCBbcGFyYW1zLmlkXSk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe30sIHsgc3RhdHVzOiAyMDQgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKHJlcXVlc3QsIHsgcGFyYW1zIH0pIHtcclxuICBjb25zdCB7IHNob290SWQsIHByb2plY3RJZCB9ID0gYXdhaXQgcGFyYW1zO1xyXG4gIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuXHJcbiAgY29uc3QgeyBmb3JtMSwgZm9ybTIsIGZvcm0zLCBmb3JtNCB9ID0gYm9keTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIDEuIFVwZGF0ZSBzaG9vdCBpbmZvXHJcbiAgICBhd2FpdCBkYi5xdWVyeShcclxuICAgICAgYFVQREFURSBzaG9vdHMgU0VUIHR5cGUgPSA/LCBkdXJhdGlvbiA9ID8sIHZlbnVlID0gPywgY2l0eSA9ID8sIHJlcG9ydGluZyA9ID8sIHNsb3QgPSA/LCBkYXRlID0gPywgc3RhdHVzID0gPywgbm90ZXMgPSA/IFdIRVJFIGlkID0gP2AsXHJcbiAgICAgIFtcclxuICAgICAgICBmb3JtMS50eXBlLFxyXG4gICAgICAgIGZvcm0xLmR1cmF0aW9uLFxyXG4gICAgICAgIGZvcm0xLnZlbnVlLFxyXG4gICAgICAgIGZvcm0xLmNpdHksXHJcbiAgICAgICAgZm9ybTEucmVwb3J0aW5nLFxyXG4gICAgICAgIGZvcm0xLnNsb3QsXHJcbiAgICAgICAgZm9ybTEuZGF0ZSxcclxuICAgICAgICBmb3JtMS5zdGF0dXMsXHJcbiAgICAgICAgZm9ybTEubm90ZXMsXHJcbiAgICAgICAgc2hvb3RJZCxcclxuICAgICAgXVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyAyLiBDbGVhciBleGlzdGluZyBwaG90byBjcmV3XHJcbiAgICBhd2FpdCBkYi5xdWVyeShgREVMRVRFIEZST00gY3Jld3NfcGhvdG8gV0hFUkUgc2hvb3RfaWQgPSA/YCwgW3Nob290SWRdKTtcclxuXHJcbiAgICAvLyAzLiBJbnNlcnQgdXBkYXRlZCBwaG90byBjcmV3XHJcbiAgICBmb3IgKGNvbnN0IGNyZXcgb2YgZm9ybTIpIHtcclxuICAgICAgYXdhaXQgZGIucXVlcnkoXHJcbiAgICAgICAgXCJJTlNFUlQgSU5UTyBjcmV3c19waG90byAocHJvamVjdF9pZCxzaG9vdF9pZCxwaG90b19jcmV3LHBob3RvX3JvbGUpIFZBTFVFUyAoPywgPywgPywgPylcIixcclxuICAgICAgICBbcHJvamVjdElkLCBzaG9vdElkLCBjcmV3LnBob3RvX2NyZXcsIGNyZXcucGhvdG9fcm9sZV1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA0LiBDbGVhciBleGlzdGluZyB2aWRlbyBjcmV3XHJcbiAgICBhd2FpdCBkYi5xdWVyeShgREVMRVRFIEZST00gY3Jld3NfdmlkZW8gV0hFUkUgc2hvb3RfaWQgPSA/YCwgW3Nob290SWRdKTtcclxuXHJcbiAgICAvLyA1LiBJbnNlcnQgdXBkYXRlZCB2aWRlbyBjcmV3XHJcbiAgICBmb3IgKGNvbnN0IGNyZXcgb2YgZm9ybTMpIHtcclxuICAgICAgYXdhaXQgZGIucXVlcnkoXHJcbiAgICAgICAgXCJJTlNFUlQgSU5UTyBjcmV3c192aWRlbyAocHJvamVjdF9pZCxzaG9vdF9pZCx2aWRlb19jcmV3LHZpZGVvX3JvbGUpIFZBTFVFUyAoPywgPywgPywgPylcIixcclxuICAgICAgICBbcHJvamVjdElkLCBzaG9vdElkLCBjcmV3LnZpZGVvX2NyZXcsIGNyZXcudmlkZW9fcm9sZV1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA0LiBDbGVhciBleGlzdGluZyBhZGRpdGlvbmFsIGNyZXdcclxuICAgIGF3YWl0IGRiLnF1ZXJ5KGBERUxFVEUgRlJPTSBjcmV3c19hZGRpdGlvbmFsIFdIRVJFIHNob290X2lkID0gP2AsIFtcclxuICAgICAgc2hvb3RJZCxcclxuICAgIF0pO1xyXG5cclxuICAgIC8vIDUuIEluc2VydCB1cGRhdGVkIGFkZGl0aW9uYWwgY3Jld1xyXG4gICAgZm9yIChjb25zdCBjcmV3IG9mIGZvcm00KSB7XHJcbiAgICAgIGF3YWl0IGRiLnF1ZXJ5KFxyXG4gICAgICAgIFwiSU5TRVJUIElOVE8gY3Jld3NfYWRkaXRpb25hbCAocHJvamVjdF9pZCxzaG9vdF9pZCxhZGRpdGlvbmFsX2NyZXcsYWRkaXRpb25hbF9yb2xlKSBWQUxVRVMgKD8sID8sID8sID8pXCIsXHJcbiAgICAgICAgW3Byb2plY3RJZCwgc2hvb3RJZCwgY3Jldy5hZGRpdGlvbmFsX2NyZXcsIGNyZXcuYWRkaXRpb25hbF9yb2xlXVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiVXBkYXRlZCBzdWNjZXNzZnVsbHlcIiB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkluc2VydCBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW5zZXJ0aW9uIGZhaWxlZFwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJkYiIsIkdFVCIsInJlcXVlc3QiLCJwYXJhbXMiLCJwcm9qZWN0SWQiLCJzaG9vdFJlc3VsdCIsInF1ZXJ5IiwiZGVsaXZlcmFibGVSZXN1bHQiLCJ0YXNrUmVzdWx0IiwiZXhwZW5zZVJlc3VsdCIsImludm9pY2VSZXN1bHQiLCJwYXltZW50UGFpZFJlc3VsdCIsInBheW1lbnRVcGNvbWluZ1Jlc3VsdCIsInByb2plY3RSZXN1bHQiLCJqc29uIiwic2hvb3QiLCJkZWxpdmVyYWJsZSIsInRhc2siLCJleHBlbnNlIiwiaW52b2ljZSIsInBheW1lbnRwYWlkIiwicGF5bWVudHVwY29taW5nIiwicHJvamVjdHMiLCJlcnJvciIsImNvbnNvbGUiLCJtZXNzYWdlIiwic3RhdHVzIiwiREVMRVRFIiwiaWQiLCJQVVQiLCJzaG9vdElkIiwiYm9keSIsImZvcm0xIiwiZm9ybTIiLCJmb3JtMyIsImZvcm00IiwidHlwZSIsImR1cmF0aW9uIiwidmVudWUiLCJjaXR5IiwicmVwb3J0aW5nIiwic2xvdCIsImRhdGUiLCJub3RlcyIsImNyZXciLCJwaG90b19jcmV3IiwicGhvdG9fcm9sZSIsInZpZGVvX2NyZXciLCJ2aWRlb19yb2xlIiwiYWRkaXRpb25hbF9jcmV3IiwiYWRkaXRpb25hbF9yb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/projects/project/[projectId]/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute&page=%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute&page=%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_naveenkumar_Developer_NextJS_CRM_app_api_projects_project_projectId_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/projects/project/[projectId]/route.js */ \"(rsc)/./app/api/projects/project/[projectId]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/projects/project/[projectId]/route\",\n        pathname: \"/api/projects/project/[projectId]\",\n        filename: \"route\",\n        bundlePath: \"app/api/projects/project/[projectId]/route\"\n    },\n    resolvedPagePath: \"/Users/naveenkumar/Developer/NextJS/CRM/app/api/projects/project/[projectId]/route.js\",\n    nextConfigOutput,\n    userland: _Users_naveenkumar_Developer_NextJS_CRM_app_api_projects_project_projectId_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9qZWN0cyUyRnByb2plY3QlMkYlNUJwcm9qZWN0SWQlNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnByb2plY3RzJTJGcHJvamVjdCUyRiU1QnByb2plY3RJZCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnByb2plY3RzJTJGcHJvamVjdCUyRiU1QnByb2plY3RJZCU1RCUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNxQztBQUNsSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25hdmVlbmt1bWFyL0RldmVsb3Blci9OZXh0SlMvQ1JNL2FwcC9hcGkvcHJvamVjdHMvcHJvamVjdC9bcHJvamVjdElkXS9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcHJvamVjdHMvcHJvamVjdC9bcHJvamVjdElkXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Byb2plY3RzL3Byb2plY3QvW3Byb2plY3RJZF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Byb2plY3RzL3Byb2plY3QvW3Byb2plY3RJZF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbmF2ZWVua3VtYXIvRGV2ZWxvcGVyL05leHRKUy9DUk0vYXBwL2FwaS9wcm9qZWN0cy9wcm9qZWN0L1twcm9qZWN0SWRdL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute&page=%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute&page=%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprojects%2Fproject%2F%5BprojectId%5D%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();