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
exports.id = "app/api/dashboard/route";
exports.ids = ["app/api/dashboard/route"];
exports.modules = {

/***/ "(rsc)/./app/api/dashboard/route.js":
/*!************************************!*\
  !*** ./app/api/dashboard/route.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _config_db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/db.js */ \"(rsc)/./config/db.js\");\n\n\nasync function GET() {\n    try {\n        const [[vendors], [expenses], [invoices], [paymentPaid], [paymentUpcoming], [projects]] = await Promise.all([\n            _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM photo\"),\n            _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM expenses\"),\n            _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`\n        SELECT\n          invoices.*,\n          projects.name   AS project_name,\n          projects.phone  AS project_phone,\n          projects.email  AS project_email,\n          projects.cost   AS project_cost,\n          projects.client AS project_client\n        FROM invoices\n        JOIN projects ON invoices.project_id = projects.id\n      `),\n            _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`SELECT \n      amounts.*, \n      projects.name   AS project_name, \n      projects.client AS project_client, \n      projects.phone  AS project_phone, \n      projects.email  AS project_email, \n      projects.cost   AS project_cost\n   FROM amounts\n   JOIN projects ON amounts.project_id = projects.id\n   `),\n            _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM amounts WHERE status = 'upcoming'\"),\n            _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"SELECT * FROM projects\")\n        ]);\n        // Always return arrays (even if empty) so the frontend can map safely.\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            photo: vendors,\n            expense: expenses,\n            invoice: invoices,\n            paymentpaid: paymentPaid ?? [],\n            paymentupcoming: paymentUpcoming,\n            projects: projects\n        });\n    } catch (error) {\n        console.error(\"GET API Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request, { params }) {\n    try {\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"DELETE FROM shoots WHERE id = ?\", [\n            params.id\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({}, {\n            status: 204\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: error.message\n        });\n    }\n}\nasync function PUT(request, { params }) {\n    const { shootId, projectId } = await params;\n    const body = await request.json();\n    const { form1, form2, form3, form4 } = body;\n    try {\n        // 1. Update shoot info\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`UPDATE shoots SET type = ?, duration = ?, venue = ?, city = ?, reporting = ?, slot = ?, date = ?, status = ?, notes = ? WHERE id = ?`, [\n            form1.type,\n            form1.duration,\n            form1.venue,\n            form1.city,\n            form1.reporting,\n            form1.slot,\n            form1.date,\n            form1.status,\n            form1.notes,\n            shootId\n        ]);\n        // 2. Clear existing photo crew\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`DELETE FROM crews_photo WHERE shoot_id = ?`, [\n            shootId\n        ]);\n        // 3. Insert updated photo crew\n        for (const crew of form2){\n            await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"INSERT INTO crews_photo (project_id,shoot_id,photo_crew,photo_role) VALUES (?, ?, ?, ?)\", [\n                projectId,\n                shootId,\n                crew.photo_crew,\n                crew.photo_role\n            ]);\n        }\n        // 4. Clear existing video crew\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`DELETE FROM crews_video WHERE shoot_id = ?`, [\n            shootId\n        ]);\n        // 5. Insert updated video crew\n        for (const crew of form3){\n            await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"INSERT INTO crews_video (project_id,shoot_id,video_crew,video_role) VALUES (?, ?, ?, ?)\", [\n                projectId,\n                shootId,\n                crew.video_crew,\n                crew.video_role\n            ]);\n        }\n        // 4. Clear existing additional crew\n        await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(`DELETE FROM crews_additional WHERE shoot_id = ?`, [\n            shootId\n        ]);\n        // 5. Insert updated additional crew\n        for (const crew of form4){\n            await _config_db_js__WEBPACK_IMPORTED_MODULE_1__.db.query(\"INSERT INTO crews_additional (project_id,shoot_id,additional_crew,additional_role) VALUES (?, ?, ?, ?)\", [\n                projectId,\n                shootId,\n                crew.additional_crew,\n                crew.additional_role\n            ]);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Updated successfully\"\n        });\n    } catch (error) {\n        console.error(\"Insert error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Insertion failed\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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K0I7UUFDL0IsS0FBSyxNQUFNZSxRQUFRVixNQUFPO1lBQ3hCLE1BQU0vQiw2Q0FBRUEsQ0FBQ1UsS0FBSyxDQUNaLDJGQUNBO2dCQUFDaUI7Z0JBQVdEO2dCQUFTZSxLQUFLRyxVQUFVO2dCQUFFSCxLQUFLSSxVQUFVO2FBQUM7UUFFMUQ7UUFFQSxvQ0FBb0M7UUFDcEMsTUFBTTdDLDZDQUFFQSxDQUFDVSxLQUFLLENBQUMsQ0FBQywrQ0FBK0MsQ0FBQyxFQUFFO1lBQ2hFZ0I7U0FDRDtRQUVELG9DQUFvQztRQUNwQyxLQUFLLE1BQU1lLFFBQVFULE1BQU87WUFDeEIsTUFBTWhDLDZDQUFFQSxDQUFDVSxLQUFLLENBQ1osMEdBQ0E7Z0JBQUNpQjtnQkFBV0Q7Z0JBQVNlLEtBQUtLLGVBQWU7Z0JBQUVMLEtBQUtNLGVBQWU7YUFBQztRQUVwRTtRQUVBLE9BQU9oRCxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVRLFNBQVM7UUFBdUI7SUFDN0QsRUFBRSxPQUFPRixPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxpQkFBaUJBO1FBQy9CLE9BQU9sQixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVNLE9BQU87UUFBbUIsR0FBRztZQUFFRyxRQUFRO1FBQUk7SUFDeEU7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL25hdmVlbmt1bWFyL0RldmVsb3Blci9OZXh0SlMvQ1JNL2FwcC9hcGkvZGFzaGJvYXJkL3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2NvbmZpZy9kYi5qc1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgW1xyXG4gICAgICBbdmVuZG9yc10sXHJcbiAgICAgIFtleHBlbnNlc10sXHJcbiAgICAgIFtpbnZvaWNlc10sIC8vIGFscmVhZHkganVzdCByb3dzXHJcbiAgICAgIFtwYXltZW50UGFpZF0sXHJcbiAgICAgIFtwYXltZW50VXBjb21pbmddLFxyXG4gICAgICBbcHJvamVjdHNdLFxyXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgZGIucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIHBob3RvXCIpLFxyXG4gICAgICBkYi5xdWVyeShcIlNFTEVDVCAqIEZST00gZXhwZW5zZXNcIiksXHJcbiAgICAgIGRiLnF1ZXJ5KGBcclxuICAgICAgICBTRUxFQ1RcclxuICAgICAgICAgIGludm9pY2VzLiosXHJcbiAgICAgICAgICBwcm9qZWN0cy5uYW1lICAgQVMgcHJvamVjdF9uYW1lLFxyXG4gICAgICAgICAgcHJvamVjdHMucGhvbmUgIEFTIHByb2plY3RfcGhvbmUsXHJcbiAgICAgICAgICBwcm9qZWN0cy5lbWFpbCAgQVMgcHJvamVjdF9lbWFpbCxcclxuICAgICAgICAgIHByb2plY3RzLmNvc3QgICBBUyBwcm9qZWN0X2Nvc3QsXHJcbiAgICAgICAgICBwcm9qZWN0cy5jbGllbnQgQVMgcHJvamVjdF9jbGllbnRcclxuICAgICAgICBGUk9NIGludm9pY2VzXHJcbiAgICAgICAgSk9JTiBwcm9qZWN0cyBPTiBpbnZvaWNlcy5wcm9qZWN0X2lkID0gcHJvamVjdHMuaWRcclxuICAgICAgYCksXHJcbiAgICAgIGRiLnF1ZXJ5KGBTRUxFQ1QgXHJcbiAgICAgIGFtb3VudHMuKiwgXHJcbiAgICAgIHByb2plY3RzLm5hbWUgICBBUyBwcm9qZWN0X25hbWUsIFxyXG4gICAgICBwcm9qZWN0cy5jbGllbnQgQVMgcHJvamVjdF9jbGllbnQsIFxyXG4gICAgICBwcm9qZWN0cy5waG9uZSAgQVMgcHJvamVjdF9waG9uZSwgXHJcbiAgICAgIHByb2plY3RzLmVtYWlsICBBUyBwcm9qZWN0X2VtYWlsLCBcclxuICAgICAgcHJvamVjdHMuY29zdCAgIEFTIHByb2plY3RfY29zdFxyXG4gICBGUk9NIGFtb3VudHNcclxuICAgSk9JTiBwcm9qZWN0cyBPTiBhbW91bnRzLnByb2plY3RfaWQgPSBwcm9qZWN0cy5pZFxyXG4gICBgKSxcclxuICAgICAgZGIucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIGFtb3VudHMgV0hFUkUgc3RhdHVzID0gJ3VwY29taW5nJ1wiKSxcclxuICAgICAgZGIucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIHByb2plY3RzXCIpLFxyXG4gICAgXSk7XHJcblxyXG4gICAgLy8gQWx3YXlzIHJldHVybiBhcnJheXMgKGV2ZW4gaWYgZW1wdHkpIHNvIHRoZSBmcm9udGVuZCBjYW4gbWFwIHNhZmVseS5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIHBob3RvOiB2ZW5kb3JzLFxyXG4gICAgICBleHBlbnNlOiBleHBlbnNlcyxcclxuICAgICAgaW52b2ljZTogaW52b2ljZXMsXHJcbiAgICAgIHBheW1lbnRwYWlkOiBwYXltZW50UGFpZCA/PyBbXSxcclxuICAgICAgcGF5bWVudHVwY29taW5nOiBwYXltZW50VXBjb21pbmcsXHJcbiAgICAgIHByb2plY3RzOiBwcm9qZWN0cyxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiR0VUIEFQSSBFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcXVlc3QsIHsgcGFyYW1zIH0pIHtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgZGIucXVlcnkoXCJERUxFVEUgRlJPTSBzaG9vdHMgV0hFUkUgaWQgPSA/XCIsIFtwYXJhbXMuaWRdKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7fSwgeyBzdGF0dXM6IDIwNCB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQVVQocmVxdWVzdCwgeyBwYXJhbXMgfSkge1xyXG4gIGNvbnN0IHsgc2hvb3RJZCwgcHJvamVjdElkIH0gPSBhd2FpdCBwYXJhbXM7XHJcbiAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG5cclxuICBjb25zdCB7IGZvcm0xLCBmb3JtMiwgZm9ybTMsIGZvcm00IH0gPSBib2R5O1xyXG5cclxuICB0cnkge1xyXG4gICAgLy8gMS4gVXBkYXRlIHNob290IGluZm9cclxuICAgIGF3YWl0IGRiLnF1ZXJ5KFxyXG4gICAgICBgVVBEQVRFIHNob290cyBTRVQgdHlwZSA9ID8sIGR1cmF0aW9uID0gPywgdmVudWUgPSA/LCBjaXR5ID0gPywgcmVwb3J0aW5nID0gPywgc2xvdCA9ID8sIGRhdGUgPSA/LCBzdGF0dXMgPSA/LCBub3RlcyA9ID8gV0hFUkUgaWQgPSA/YCxcclxuICAgICAgW1xyXG4gICAgICAgIGZvcm0xLnR5cGUsXHJcbiAgICAgICAgZm9ybTEuZHVyYXRpb24sXHJcbiAgICAgICAgZm9ybTEudmVudWUsXHJcbiAgICAgICAgZm9ybTEuY2l0eSxcclxuICAgICAgICBmb3JtMS5yZXBvcnRpbmcsXHJcbiAgICAgICAgZm9ybTEuc2xvdCxcclxuICAgICAgICBmb3JtMS5kYXRlLFxyXG4gICAgICAgIGZvcm0xLnN0YXR1cyxcclxuICAgICAgICBmb3JtMS5ub3RlcyxcclxuICAgICAgICBzaG9vdElkLFxyXG4gICAgICBdXHJcbiAgICApO1xyXG5cclxuICAgIC8vIDIuIENsZWFyIGV4aXN0aW5nIHBob3RvIGNyZXdcclxuICAgIGF3YWl0IGRiLnF1ZXJ5KGBERUxFVEUgRlJPTSBjcmV3c19waG90byBXSEVSRSBzaG9vdF9pZCA9ID9gLCBbc2hvb3RJZF0pO1xyXG5cclxuICAgIC8vIDMuIEluc2VydCB1cGRhdGVkIHBob3RvIGNyZXdcclxuICAgIGZvciAoY29uc3QgY3JldyBvZiBmb3JtMikge1xyXG4gICAgICBhd2FpdCBkYi5xdWVyeShcclxuICAgICAgICBcIklOU0VSVCBJTlRPIGNyZXdzX3Bob3RvIChwcm9qZWN0X2lkLHNob290X2lkLHBob3RvX2NyZXcscGhvdG9fcm9sZSkgVkFMVUVTICg/LCA/LCA/LCA/KVwiLFxyXG4gICAgICAgIFtwcm9qZWN0SWQsIHNob290SWQsIGNyZXcucGhvdG9fY3JldywgY3Jldy5waG90b19yb2xlXVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDQuIENsZWFyIGV4aXN0aW5nIHZpZGVvIGNyZXdcclxuICAgIGF3YWl0IGRiLnF1ZXJ5KGBERUxFVEUgRlJPTSBjcmV3c192aWRlbyBXSEVSRSBzaG9vdF9pZCA9ID9gLCBbc2hvb3RJZF0pO1xyXG5cclxuICAgIC8vIDUuIEluc2VydCB1cGRhdGVkIHZpZGVvIGNyZXdcclxuICAgIGZvciAoY29uc3QgY3JldyBvZiBmb3JtMykge1xyXG4gICAgICBhd2FpdCBkYi5xdWVyeShcclxuICAgICAgICBcIklOU0VSVCBJTlRPIGNyZXdzX3ZpZGVvIChwcm9qZWN0X2lkLHNob290X2lkLHZpZGVvX2NyZXcsdmlkZW9fcm9sZSkgVkFMVUVTICg/LCA/LCA/LCA/KVwiLFxyXG4gICAgICAgIFtwcm9qZWN0SWQsIHNob290SWQsIGNyZXcudmlkZW9fY3JldywgY3Jldy52aWRlb19yb2xlXVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDQuIENsZWFyIGV4aXN0aW5nIGFkZGl0aW9uYWwgY3Jld1xyXG4gICAgYXdhaXQgZGIucXVlcnkoYERFTEVURSBGUk9NIGNyZXdzX2FkZGl0aW9uYWwgV0hFUkUgc2hvb3RfaWQgPSA/YCwgW1xyXG4gICAgICBzaG9vdElkLFxyXG4gICAgXSk7XHJcblxyXG4gICAgLy8gNS4gSW5zZXJ0IHVwZGF0ZWQgYWRkaXRpb25hbCBjcmV3XHJcbiAgICBmb3IgKGNvbnN0IGNyZXcgb2YgZm9ybTQpIHtcclxuICAgICAgYXdhaXQgZGIucXVlcnkoXHJcbiAgICAgICAgXCJJTlNFUlQgSU5UTyBjcmV3c19hZGRpdGlvbmFsIChwcm9qZWN0X2lkLHNob290X2lkLGFkZGl0aW9uYWxfY3JldyxhZGRpdGlvbmFsX3JvbGUpIFZBTFVFUyAoPywgPywgPywgPylcIixcclxuICAgICAgICBbcHJvamVjdElkLCBzaG9vdElkLCBjcmV3LmFkZGl0aW9uYWxfY3JldywgY3Jldy5hZGRpdGlvbmFsX3JvbGVdXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJVcGRhdGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiSW5zZXJ0IGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnNlcnRpb24gZmFpbGVkXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiIiwiR0VUIiwidmVuZG9ycyIsImV4cGVuc2VzIiwiaW52b2ljZXMiLCJwYXltZW50UGFpZCIsInBheW1lbnRVcGNvbWluZyIsInByb2plY3RzIiwiUHJvbWlzZSIsImFsbCIsInF1ZXJ5IiwianNvbiIsInBob3RvIiwiZXhwZW5zZSIsImludm9pY2UiLCJwYXltZW50cGFpZCIsInBheW1lbnR1cGNvbWluZyIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJERUxFVEUiLCJyZXF1ZXN0IiwicGFyYW1zIiwiaWQiLCJQVVQiLCJzaG9vdElkIiwicHJvamVjdElkIiwiYm9keSIsImZvcm0xIiwiZm9ybTIiLCJmb3JtMyIsImZvcm00IiwidHlwZSIsImR1cmF0aW9uIiwidmVudWUiLCJjaXR5IiwicmVwb3J0aW5nIiwic2xvdCIsImRhdGUiLCJub3RlcyIsImNyZXciLCJwaG90b19jcmV3IiwicGhvdG9fcm9sZSIsInZpZGVvX2NyZXciLCJ2aWRlb19yb2xlIiwiYWRkaXRpb25hbF9jcmV3IiwiYWRkaXRpb25hbF9yb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/dashboard/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdashboard%2Froute&page=%2Fapi%2Fdashboard%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdashboard%2Froute&page=%2Fapi%2Fdashboard%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_naveenkumar_Developer_NextJS_CRM_app_api_dashboard_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/dashboard/route.js */ \"(rsc)/./app/api/dashboard/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/dashboard/route\",\n        pathname: \"/api/dashboard\",\n        filename: \"route\",\n        bundlePath: \"app/api/dashboard/route\"\n    },\n    resolvedPagePath: \"/Users/naveenkumar/Developer/NextJS/CRM/app/api/dashboard/route.js\",\n    nextConfigOutput,\n    userland: _Users_naveenkumar_Developer_NextJS_CRM_app_api_dashboard_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZkYXNoYm9hcmQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmRhc2hib2FyZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmRhc2hib2FyZCUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm5hdmVlbmt1bWFyJTJGRGV2ZWxvcGVyJTJGTmV4dEpTJTJGQ1JNJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrQjtBQUMvRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25hdmVlbmt1bWFyL0RldmVsb3Blci9OZXh0SlMvQ1JNL2FwcC9hcGkvZGFzaGJvYXJkL3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9kYXNoYm9hcmQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9kYXNoYm9hcmRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2Rhc2hib2FyZC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9uYXZlZW5rdW1hci9EZXZlbG9wZXIvTmV4dEpTL0NSTS9hcHAvYXBpL2Rhc2hib2FyZC9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdashboard%2Froute&page=%2Fapi%2Fdashboard%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdashboard%2Froute&page=%2Fapi%2Fdashboard%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Froute.js&appDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnaveenkumar%2FDeveloper%2FNextJS%2FCRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();