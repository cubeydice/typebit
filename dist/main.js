/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/background */ \"./src/scripts/background.js\");\n/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/game */ \"./src/scripts/game.js\");\n\n\nconst canvas = document.getElementById('canvas');\n// const dimensions = { width: canvas.width, height: canvas.height };\n// const context = canvas.getContext(\"2d\");\nconst mobileError = document.getElementById('mobile-error');\nconst retry = document.getElementById(\"retry\");\nconst mute = document.getElementById(\"bg-mute\");\nconst audio = document.getElementById(\"bg-music\");\n\n//check if user is using mobile device\nwindow.mobileCheck = function () {\n  let check = false;\n  (function (a) {\n    if (/(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-/i.test(a.substr(0, 4))) check = true;\n  })(navigator.userAgent || navigator.vendor || window.opera);\n  return check;\n};\n\n//only show game if not on mobile device\nif (window.mobileCheck()) {\n  mobileError.innerText = \"sorry, typebit is not compatible with mobile devices 🥺\";\n} else {\n  // Play Game\n  const game = new _scripts_game__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas);\n  game.play();\n\n  //Restart Game\n  const restart = e => {\n    e.preventDefault();\n    game.restart();\n  };\n  retry.addEventListener(\"click\", restart);\n\n  // Music\n  const muteAudio = e => {\n    e.preventDefault();\n    if (!audio.muted) {\n      audio.muted = true;\n      mute.src = \"assets/icons/mute.png\";\n    } else {\n      audio.muted = false;\n      mute.src = \"assets/icons/speaker.png\";\n    }\n  };\n  mute.addEventListener(\"click\", muteAudio);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7O0FBQThDO0FBQ1Q7QUFFckMsTUFBTUUsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxRQUFRLENBQUM7QUFDaEQ7QUFDQTtBQUNBLE1BQU1DLFdBQVcsR0FBR0YsUUFBUSxDQUFDQyxjQUFjLENBQUMsY0FBYyxDQUFDO0FBQzNELE1BQU1FLEtBQUssR0FBR0gsUUFBUSxDQUFDQyxjQUFjLENBQUMsT0FBTyxDQUFDO0FBQzlDLE1BQU1HLElBQUksR0FBR0osUUFBUSxDQUFDQyxjQUFjLENBQUMsU0FBUyxDQUFDO0FBQy9DLE1BQU1JLEtBQUssR0FBR0wsUUFBUSxDQUFDQyxjQUFjLENBQUMsVUFBVSxDQUFDOztBQUVqRDtBQUNBSyxNQUFNLENBQUNDLFdBQVcsR0FBRyxZQUFXO0VBQzlCLElBQUlDLEtBQUssR0FBRyxLQUFLO0VBQ2pCLENBQUMsVUFBU0MsQ0FBQyxFQUFDO0lBQUMsSUFBRywwVEFBMFQsQ0FBQ0MsSUFBSSxDQUFDRCxDQUFDLENBQUMsSUFBRSx5a0RBQXlrRCxDQUFDQyxJQUFJLENBQUNELENBQUMsQ0FBQ0UsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFSCxLQUFLLEdBQUcsSUFBSTtFQUFDLENBQUMsRUFBRUksU0FBUyxDQUFDQyxTQUFTLElBQUVELFNBQVMsQ0FBQ0UsTUFBTSxJQUFFUixNQUFNLENBQUNTLEtBQUssQ0FBQztFQUN2L0QsT0FBT1AsS0FBSztBQUNkLENBQUM7O0FBRUQ7QUFDQSxJQUFJRixNQUFNLENBQUNDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7RUFDeEJMLFdBQVcsQ0FBQ2MsU0FBUyxHQUFHLHlEQUF5RDtBQUNuRixDQUFDLE1BQU07RUFDTDtFQUNBLE1BQU1DLElBQUksR0FBRyxJQUFJbkIscURBQU8sQ0FBQ0MsTUFBTSxDQUFDO0VBQ2hDa0IsSUFBSSxDQUFDQyxJQUFJLENBQUMsQ0FBQzs7RUFFWDtFQUNBLE1BQU1DLE9BQU8sR0FBSUMsQ0FBQyxJQUFLO0lBQ3JCQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCSixJQUFJLENBQUNFLE9BQU8sQ0FBQyxDQUFDO0VBQ2hCLENBQUM7RUFDRGhCLEtBQUssQ0FBQ21CLGdCQUFnQixDQUFDLE9BQU8sRUFBRUgsT0FBTyxDQUFDOztFQUV4QztFQUNBLE1BQU1JLFNBQVMsR0FBSUgsQ0FBQyxJQUFLO0lBQ3ZCQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBRWxCLElBQUksQ0FBQ2hCLEtBQUssQ0FBQ21CLEtBQUssRUFBRTtNQUNoQm5CLEtBQUssQ0FBQ21CLEtBQUssR0FBRyxJQUFJO01BQ2xCcEIsSUFBSSxDQUFDcUIsR0FBRyxHQUFHLHVCQUF1QjtJQUNwQyxDQUFDLE1BQU07TUFDTHBCLEtBQUssQ0FBQ21CLEtBQUssR0FBRyxLQUFLO01BQ25CcEIsSUFBSSxDQUFDcUIsR0FBRyxHQUFHLDBCQUEwQjtJQUN2QztFQUNGLENBQUM7RUFFRHJCLElBQUksQ0FBQ2tCLGdCQUFnQixDQUFDLE9BQU8sRUFBRUMsU0FBUyxDQUFDO0FBQzNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tncm91bmQgZnJvbSBcIi4vc2NyaXB0cy9iYWNrZ3JvdW5kXCI7XG5pbXBvcnQgVHlwZUJpdCBmcm9tIFwiLi9zY3JpcHRzL2dhbWVcIjtcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuLy8gY29uc3QgZGltZW5zaW9ucyA9IHsgd2lkdGg6IGNhbnZhcy53aWR0aCwgaGVpZ2h0OiBjYW52YXMuaGVpZ2h0IH07XG4vLyBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmNvbnN0IG1vYmlsZUVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vYmlsZS1lcnJvcicpO1xuY29uc3QgcmV0cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJldHJ5XCIpXG5jb25zdCBtdXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiZy1tdXRlXCIpXG5jb25zdCBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmctbXVzaWNcIilcblxuLy9jaGVjayBpZiB1c2VyIGlzIHVzaW5nIG1vYmlsZSBkZXZpY2VcbndpbmRvdy5tb2JpbGVDaGVjayA9IGZ1bmN0aW9uKCkge1xuICBsZXQgY2hlY2sgPSBmYWxzZTtcbiAgKGZ1bmN0aW9uKGEpe2lmKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSBjaGVjayA9IHRydWU7fSkobmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8d2luZG93Lm9wZXJhKTtcbiAgcmV0dXJuIGNoZWNrO1xufTtcblxuLy9vbmx5IHNob3cgZ2FtZSBpZiBub3Qgb24gbW9iaWxlIGRldmljZVxuaWYgKHdpbmRvdy5tb2JpbGVDaGVjaygpKSB7XG4gIG1vYmlsZUVycm9yLmlubmVyVGV4dCA9IFwic29ycnksIHR5cGViaXQgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBtb2JpbGUgZGV2aWNlcyDwn6W6XCJcbn0gZWxzZSB7XG4gIC8vIFBsYXkgR2FtZVxuICBjb25zdCBnYW1lID0gbmV3IFR5cGVCaXQoY2FudmFzKTtcbiAgZ2FtZS5wbGF5KCk7XG5cbiAgLy9SZXN0YXJ0IEdhbWVcbiAgY29uc3QgcmVzdGFydCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGdhbWUucmVzdGFydCgpO1xuICB9XG4gIHJldHJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXN0YXJ0KVxuXG4gIC8vIE11c2ljXG4gIGNvbnN0IG11dGVBdWRpbyA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCFhdWRpby5tdXRlZCkge1xuICAgICAgYXVkaW8ubXV0ZWQgPSB0cnVlO1xuICAgICAgbXV0ZS5zcmMgPSBcImFzc2V0cy9pY29ucy9tdXRlLnBuZ1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICBhdWRpby5tdXRlZCA9IGZhbHNlO1xuICAgICAgbXV0ZS5zcmMgPSBcImFzc2V0cy9pY29ucy9zcGVha2VyLnBuZ1wiO1xuICAgIH1cbiAgfVxuXG4gIG11dGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG11dGVBdWRpbylcbn1cblxuIl0sIm5hbWVzIjpbIkJhY2tncm91bmQiLCJUeXBlQml0IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm1vYmlsZUVycm9yIiwicmV0cnkiLCJtdXRlIiwiYXVkaW8iLCJ3aW5kb3ciLCJtb2JpbGVDaGVjayIsImNoZWNrIiwiYSIsInRlc3QiLCJzdWJzdHIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ2ZW5kb3IiLCJvcGVyYSIsImlubmVyVGV4dCIsImdhbWUiLCJwbGF5IiwicmVzdGFydCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtdXRlQXVkaW8iLCJtdXRlZCIsInNyYyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/background.js":
/*!***********************************!*\
  !*** ./src/scripts/background.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Background; }\n/* harmony export */ });\nconst CONSTANTS = {\n  GAME_SPEED: 2,\n  GAME_FRAME: 0,\n  SPEED_MODS: [0, 0.5, 0.7, 0.9],\n  WIDTH: 1152,\n  HEIGHT: 576\n};\nclass Background {\n  constructor(ctx) {\n    // this.createImage = this.createImage.bind(this)\n    this.ctx = ctx;\n    this.bg = ['assets/game/background/nature_2/1.png', 'assets/game/background/nature_2/2.png', 'assets/game/background/nature_2/3.png', 'assets/game/background/nature_2/4.png'];\n    this.layers = [];\n    let i = 0;\n    this.bg.forEach(img => {\n      const image = new Image();\n      image.src = img;\n      this.layers.push(new Layer(image, this.ctx, CONSTANTS.SPEED_MODS[i]));\n      i++;\n    });\n  }\n  animate(ctx, dimensions) {\n    ctx.clearRect(0, 0, dimensions.width, dimensions.height);\n    this.layers.forEach(layer => {\n      layer.update();\n      layer.draw();\n    });\n    CONSTANTS.GAME_FRAME--;\n    requestAnimationFrame(this.animate.bind(this, ctx, dimensions));\n  }\n}\nclass Layer {\n  constructor(img, ctx, speedMod) {\n    this.x = 0;\n    this.y = 0;\n    this.ctx = ctx;\n    this.width = CONSTANTS.WIDTH;\n    this.height = CONSTANTS.HEIGHT;\n    this.img = img;\n    this.speedMod = speedMod;\n    this.speed = CONSTANTS.GAME_SPEED * this.speedMod;\n    this.draw = this.draw.bind(this);\n  }\n  update() {\n    this.speed = CONSTANTS.GAME_SPEED * this.speedMod;\n    this.x = CONSTANTS.GAME_FRAME * this.speed % this.width;\n  }\n  draw() {\n    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);\n    this.ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSUEsQ0FBQSxFQUFHO0lBQ0wsSUFBSSxDQUFDbEIsR0FBRyxDQUFDeUIsU0FBUyxDQUFDLElBQUksQ0FBQ3BCLEdBQUcsRUFBRSxJQUFJLENBQUNpQixDQUFDLEVBQUUsSUFBSSxDQUFDQyxDQUFDLEVBQUUsSUFBSSxDQUFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDQyxNQUFNLENBQUM7SUFDckUsSUFBSSxDQUFDZixHQUFHLENBQUN5QixTQUFTLENBQUMsSUFBSSxDQUFDcEIsR0FBRyxFQUFFLElBQUksQ0FBQ2lCLENBQUMsR0FBRyxJQUFJLENBQUNSLEtBQUssRUFBRSxJQUFJLENBQUNTLENBQUMsRUFBRSxJQUFJLENBQUNULEtBQUssRUFBRSxJQUFJLENBQUNDLE1BQU0sQ0FBQztFQUNwRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1wcm9qZWN0Ly4vc3JjL3NjcmlwdHMvYmFja2dyb3VuZC5qcz80YmJjIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENPTlNUQU5UUyA9IHtcbiAgR0FNRV9TUEVFRDogMixcbiAgR0FNRV9GUkFNRTogMCxcbiAgU1BFRURfTU9EUzogWzAsIDAuNSwgMC43LCAwLjldLFxuICBXSURUSDogMTE1MixcbiAgSEVJR0hUOiA1NzYsXG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrZ3JvdW5kIHtcbiAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgLy8gdGhpcy5jcmVhdGVJbWFnZSA9IHRoaXMuY3JlYXRlSW1hZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuYmcgPSBbJ2Fzc2V0cy9nYW1lL2JhY2tncm91bmQvbmF0dXJlXzIvMS5wbmcnLFxuICAgICAgICAgICdhc3NldHMvZ2FtZS9iYWNrZ3JvdW5kL25hdHVyZV8yLzIucG5nJyxcbiAgICAgICAgICAnYXNzZXRzL2dhbWUvYmFja2dyb3VuZC9uYXR1cmVfMi8zLnBuZycsXG4gICAgICAgICAgJ2Fzc2V0cy9nYW1lL2JhY2tncm91bmQvbmF0dXJlXzIvNC5wbmcnIF07XG4gICAgdGhpcy5sYXllcnMgPSBbXTtcblxuICAgIGxldCBpID0gMFxuICAgIHRoaXMuYmcuZm9yRWFjaChpbWcgPT4ge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLnNyYyA9IGltZztcbiAgICAgIHRoaXMubGF5ZXJzLnB1c2gobmV3IExheWVyKGltYWdlLCB0aGlzLmN0eCwgQ09OU1RBTlRTLlNQRUVEX01PRFNbaV0pKTtcbiAgICAgIGkrKztcbiAgICB9KVxuICB9XG5cbiAgYW5pbWF0ZShjdHgsIGRpbWVuc2lvbnMpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGRpbWVuc2lvbnMud2lkdGgsIGRpbWVuc2lvbnMuaGVpZ2h0KTtcblxuICAgIHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiB7XG4gICAgICBsYXllci51cGRhdGUoKTtcbiAgICAgIGxheWVyLmRyYXcoKTtcbiAgICB9KVxuXG4gICAgQ09OU1RBTlRTLkdBTUVfRlJBTUUtLVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMsIGN0eCwgZGltZW5zaW9ucykpO1xuICB9XG59XG5jbGFzcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKGltZywgY3R4LCBzcGVlZE1vZCkge1xuICAgIHRoaXMueCA9IDA7XG4gICAgdGhpcy55ID0gMDtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLndpZHRoID0gQ09OU1RBTlRTLldJRFRIO1xuICAgIHRoaXMuaGVpZ2h0ID0gQ09OU1RBTlRTLkhFSUdIVDtcbiAgICB0aGlzLmltZyA9IGltZztcbiAgICB0aGlzLnNwZWVkTW9kID0gc3BlZWRNb2Q7XG4gICAgdGhpcy5zcGVlZCA9IENPTlNUQU5UUy5HQU1FX1NQRUVEICogdGhpcy5zcGVlZE1vZFxuICAgIHRoaXMuZHJhdyA9IHRoaXMuZHJhdy5iaW5kKHRoaXMpXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5zcGVlZCA9IENPTlNUQU5UUy5HQU1FX1NQRUVEICogdGhpcy5zcGVlZE1vZFxuICAgIHRoaXMueCA9IENPTlNUQU5UUy5HQU1FX0ZSQU1FICogdGhpcy5zcGVlZCAlICh0aGlzLndpZHRoKTtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLnggKyB0aGlzLndpZHRoLCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICB9XG59Il0sIm5hbWVzIjpbIkNPTlNUQU5UUyIsIkdBTUVfU1BFRUQiLCJHQU1FX0ZSQU1FIiwiU1BFRURfTU9EUyIsIldJRFRIIiwiSEVJR0hUIiwiQmFja2dyb3VuZCIsImNvbnN0cnVjdG9yIiwiY3R4IiwiYmciLCJsYXllcnMiLCJpIiwiZm9yRWFjaCIsImltZyIsImltYWdlIiwiSW1hZ2UiLCJzcmMiLCJwdXNoIiwiTGF5ZXIiLCJhbmltYXRlIiwiZGltZW5zaW9ucyIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwibGF5ZXIiLCJ1cGRhdGUiLCJkcmF3IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYmluZCIsInNwZWVkTW9kIiwieCIsInkiLCJzcGVlZCIsImRyYXdJbWFnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/scripts/background.js\n");

/***/ }),

/***/ "./src/scripts/enemy.js":
/*!******************************!*\
  !*** ./src/scripts/enemy.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Enemy; }\n/* harmony export */ });\nconst CONSTANTS = {\n  ENEMY_SPEED: 0\n};\nclass Enemy {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n  }\n  animate(ctx) {}\n  move() {\n    //animation for movement\n  }\n  destroy() {\n    //animation and logic for when enemy is destroyed\n  }\n  words() {\n    //quote to be displayed above enemy head\n    //if all typed, then enemy is destroyed\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9lbmVteS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBUyxHQUFHO0VBQ2hCQyxXQUFXLEVBQUU7QUFDZixDQUFDO0FBQ2MsTUFBTUMsS0FBSyxDQUFDO0VBQ3pCQyxXQUFXQSxDQUFDQyxVQUFVLEVBQUU7SUFDdEIsSUFBSSxDQUFDQSxVQUFVLEdBQUdBLFVBQVU7RUFDOUI7RUFFQUMsT0FBT0EsQ0FBQ0MsR0FBRyxFQUFFLENBRWI7RUFFQUMsSUFBSUEsQ0FBQSxFQUFHO0lBQ0w7RUFBQTtFQUdGQyxPQUFPQSxDQUFBLEVBQUc7SUFDUjtFQUFBO0VBR0ZDLEtBQUtBLENBQUEsRUFBRztJQUNOO0lBQ0E7RUFBQTtBQUVKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1wcm9qZWN0Ly4vc3JjL3NjcmlwdHMvZW5lbXkuanM/ZTM2MSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDT05TVEFOVFMgPSB7XG4gIEVORU1ZX1NQRUVEOiAwXG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteSB7XG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbnMpIHtcbiAgICB0aGlzLmRpbWVuc2lvbnMgPSBkaW1lbnNpb25zO1xuICB9XG5cbiAgYW5pbWF0ZShjdHgpIHtcblxuICB9XG5cbiAgbW92ZSgpIHtcbiAgICAvL2FuaW1hdGlvbiBmb3IgbW92ZW1lbnRcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy9hbmltYXRpb24gYW5kIGxvZ2ljIGZvciB3aGVuIGVuZW15IGlzIGRlc3Ryb3llZFxuICB9XG5cbiAgd29yZHMoKSB7XG4gICAgLy9xdW90ZSB0byBiZSBkaXNwbGF5ZWQgYWJvdmUgZW5lbXkgaGVhZFxuICAgIC8vaWYgYWxsIHR5cGVkLCB0aGVuIGVuZW15IGlzIGRlc3Ryb3llZFxuICB9XG59Il0sIm5hbWVzIjpbIkNPTlNUQU5UUyIsIkVORU1ZX1NQRUVEIiwiRW5lbXkiLCJjb25zdHJ1Y3RvciIsImRpbWVuc2lvbnMiLCJhbmltYXRlIiwiY3R4IiwibW92ZSIsImRlc3Ryb3kiLCJ3b3JkcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/scripts/enemy.js\n");

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ TypeBit; }\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/scripts/player.js\");\n/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy */ \"./src/scripts/enemy.js\");\n/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background */ \"./src/scripts/background.js\");\n\n\n\nclass TypeBit {\n  constructor(canvas) {\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = {\n      width: canvas.width,\n      height: canvas.height\n    };\n  }\n  play() {\n    this.running = true;\n    this.bg = new _background__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctx);\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n    this.animate();\n  }\n  restart() {\n    //need to add restart functionality to restart button\n    this.running = false;\n    this.score = 0;\n    this.bg = new _background__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctx);\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n  }\n  gameOver() {\n    //game over if player runs out of health\n  }\n  animate() {\n    this.bg.animate(this.ctx, this.dimensions);\n    this.player.animate(this.ctx);\n  }\n\n  // registerEvents() {\n  //   this.boundClickHandler = this.click.bind(this);\n  //   this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n  // }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9nYW1lLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEI7QUFDRjtBQUNVO0FBQ3ZCLE1BQU1HLE9BQU8sQ0FBQztFQUMzQkMsV0FBV0EsQ0FBQ0MsTUFBTSxFQUFFO0lBQ2xCLElBQUksQ0FBQ0MsR0FBRyxHQUFHRCxNQUFNLENBQUNFLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDbEMsSUFBSSxDQUFDQyxVQUFVLEdBQUc7TUFDaEJDLEtBQUssRUFBRUosTUFBTSxDQUFDSSxLQUFLO01BQ25CQyxNQUFNLEVBQUVMLE1BQU0sQ0FBQ0s7SUFDakIsQ0FBQztFQUNIO0VBRUFDLElBQUlBLENBQUEsRUFBRztJQUNMLElBQUksQ0FBQ0MsT0FBTyxHQUFHLElBQUk7SUFDbkIsSUFBSSxDQUFDQyxFQUFFLEdBQUcsSUFBSVgsbURBQVUsQ0FBQyxJQUFJLENBQUNJLEdBQUcsQ0FBQztJQUNsQyxJQUFJLENBQUNRLE1BQU0sR0FBRyxJQUFJZCwrQ0FBTSxDQUFDLElBQUksQ0FBQ1EsVUFBVSxDQUFDO0lBQ3pDLElBQUksQ0FBQ08sT0FBTyxDQUFDLENBQUM7RUFDaEI7RUFFQUMsT0FBT0EsQ0FBQSxFQUFHO0lBQ1I7SUFDQSxJQUFJLENBQUNKLE9BQU8sR0FBRyxLQUFLO0lBQ3BCLElBQUksQ0FBQ0ssS0FBSyxHQUFHLENBQUM7SUFDZCxJQUFJLENBQUNKLEVBQUUsR0FBRyxJQUFJWCxtREFBVSxDQUFDLElBQUksQ0FBQ0ksR0FBRyxDQUFDO0lBQ2xDLElBQUksQ0FBQ1EsTUFBTSxHQUFHLElBQUlkLCtDQUFNLENBQUMsSUFBSSxDQUFDUSxVQUFVLENBQUM7RUFDM0M7RUFFQVUsUUFBUUEsQ0FBQSxFQUFHO0lBQ1Q7RUFBQTtFQUdGSCxPQUFPQSxDQUFBLEVBQUc7SUFDUixJQUFJLENBQUNGLEVBQUUsQ0FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQ1QsR0FBRyxFQUFFLElBQUksQ0FBQ0UsVUFBVSxDQUFDO0lBQzFDLElBQUksQ0FBQ00sTUFBTSxDQUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDVCxHQUFHLENBQUM7RUFDL0I7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2phdmFzY3JpcHQtcHJvamVjdC8uL3NyYy9zY3JpcHRzL2dhbWUuanM/Y2RjMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IEVuZW15IGZyb20gXCIuL2VuZW15XCI7XG5pbXBvcnQgQmFja2dyb3VuZCBmcm9tIFwiLi9iYWNrZ3JvdW5kXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUeXBlQml0IHtcbiAgY29uc3RydWN0b3IoY2FudmFzKSB7XG4gICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuZGltZW5zaW9ucyA9IHtcbiAgICAgIHdpZHRoOiBjYW52YXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IGNhbnZhcy5oZWlnaHRcbiAgICB9O1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXG4gICAgdGhpcy5iZyA9IG5ldyBCYWNrZ3JvdW5kKHRoaXMuY3R4KTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5kaW1lbnNpb25zKVxuICAgIHRoaXMuYW5pbWF0ZSgpXG4gIH1cblxuICByZXN0YXJ0KCkge1xuICAgIC8vbmVlZCB0byBhZGQgcmVzdGFydCBmdW5jdGlvbmFsaXR5IHRvIHJlc3RhcnQgYnV0dG9uXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5iZyA9IG5ldyBCYWNrZ3JvdW5kKHRoaXMuY3R4KTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5kaW1lbnNpb25zKTtcbiAgfVxuXG4gIGdhbWVPdmVyKCkge1xuICAgIC8vZ2FtZSBvdmVyIGlmIHBsYXllciBydW5zIG91dCBvZiBoZWFsdGhcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgdGhpcy5iZy5hbmltYXRlKHRoaXMuY3R4LCB0aGlzLmRpbWVuc2lvbnMpXG4gICAgdGhpcy5wbGF5ZXIuYW5pbWF0ZSh0aGlzLmN0eClcbiAgfVxuXG4gIC8vIHJlZ2lzdGVyRXZlbnRzKCkge1xuICAvLyAgIHRoaXMuYm91bmRDbGlja0hhbmRsZXIgPSB0aGlzLmNsaWNrLmJpbmQodGhpcyk7XG4gIC8vICAgdGhpcy5jdHguY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5ib3VuZENsaWNrSGFuZGxlcik7XG4gIC8vIH1cbn0iXSwibmFtZXMiOlsiUGxheWVyIiwiRW5lbXkiLCJCYWNrZ3JvdW5kIiwiVHlwZUJpdCIsImNvbnN0cnVjdG9yIiwiY2FudmFzIiwiY3R4IiwiZ2V0Q29udGV4dCIsImRpbWVuc2lvbnMiLCJ3aWR0aCIsImhlaWdodCIsInBsYXkiLCJydW5uaW5nIiwiYmciLCJwbGF5ZXIiLCJhbmltYXRlIiwicmVzdGFydCIsInNjb3JlIiwiZ2FtZU92ZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/scripts/game.js\n");

/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Player; }\n/* harmony export */ });\nconst CONSTANTS = {\n  PLAYER_SPEED: 0,\n  PLAYER_HEALTH: 100,\n  PLAYER_WIDTH: 64,\n  PLAYER_HEIGHT: 64,\n  SPRITE_WALK: 'assets/game/player/walk.png',\n  SPRITE_RUN: 'assets/game/player/run.png',\n  SPRITE_RUN: 'assets/game/player/attack.png',\n  SPRITE_FRAME: 0,\n  STAGGER_FRAME: 5,\n  SPRITE_X: 32,\n  SPRITE_Y: 32,\n  SPRITE_POS_X: 100,\n  SPRITE_POS_Y: 400\n};\nclass Player {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.x = CONSTANTS.PLAYER_WIDTH;\n    this.y = CONSTANTS.PLAYER_HEIGHT;\n    this.speed = CONSTANTS.PLAYER_SPEED;\n    this.health = CONSTANTS.PLAYER_HEALTH;\n    this.playerImg = new Image();\n    this.playerImg.src = CONSTANTS.SPRITE_WALK;\n  }\n  walk(ctx) {\n    //animation for slow typing speed\n  }\n  run(ctx) {\n    //animation for moderate typing speed\n  }\n  sprint(ctx) {\n    //animation for fast typing speed\n  }\n  hurt(ctx) {\n    //animation and decrease in health for when inaccurate typing is detected\n    CONSTANTS.PLAYER_HEALTH -= 10;\n  }\n  animate(ctx) {\n    // ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)\n    ctx.drawImage(this.playerImg, CONSTANTS.SPRITE_X * CONSTANTS.SPRITE_FRAME, 0, CONSTANTS.SPRITE_X, CONSTANTS.SPRITE_Y, CONSTANTS.SPRITE_POS_X, CONSTANTS.SPRITE_POS_Y, this.x, this.y);\n    if (CONSTANTS.SPRITE_FRAME % CONSTANTS.STAGGER_FRAME == 0) {\n      if (CONSTANTS.SPRITE_FRAME < 5) CONSTANTS.SPRITE_FRAME++;else CONSTANTS.SPRITE_FRAME = 0;\n    }\n    requestAnimationFrame(this.animate.bind(this, ctx));\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFNBQVMsR0FBRztFQUNoQkMsWUFBWSxFQUFFLENBQUM7RUFDZkMsYUFBYSxFQUFFLEdBQUc7RUFDbEJDLFlBQVksRUFBRSxFQUFFO0VBQ2hCQyxhQUFhLEVBQUUsRUFBRTtFQUNqQkMsV0FBVyxFQUFFLDZCQUE2QjtFQUMxQ0MsVUFBVSxFQUFFLDRCQUE0QjtFQUN4Q0EsVUFBVSxFQUFFLCtCQUErQjtFQUMzQ0MsWUFBWSxFQUFFLENBQUM7RUFDZkMsYUFBYSxFQUFFLENBQUM7RUFDaEJDLFFBQVEsRUFBRSxFQUFFO0VBQ1pDLFFBQVEsRUFBRSxFQUFFO0VBQ1pDLFlBQVksRUFBRSxHQUFHO0VBQ2pCQyxZQUFZLEVBQUU7QUFDaEIsQ0FBQztBQUVjLE1BQU1DLE1BQU0sQ0FBQztFQUMxQkMsV0FBV0EsQ0FBQ0MsVUFBVSxFQUFFO0lBQ3RCLElBQUksQ0FBQ0EsVUFBVSxHQUFHQSxVQUFVO0lBQzVCLElBQUksQ0FBQ0MsQ0FBQyxHQUFHaEIsU0FBUyxDQUFDRyxZQUFZO0lBQy9CLElBQUksQ0FBQ2MsQ0FBQyxHQUFHakIsU0FBUyxDQUFDSSxhQUFhO0lBQ2hDLElBQUksQ0FBQ2MsS0FBSyxHQUFHbEIsU0FBUyxDQUFDQyxZQUFZO0lBQ25DLElBQUksQ0FBQ2tCLE1BQU0sR0FBR25CLFNBQVMsQ0FBQ0UsYUFBYTtJQUNyQyxJQUFJLENBQUNrQixTQUFTLEdBQUcsSUFBSUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsSUFBSSxDQUFDRCxTQUFTLENBQUNFLEdBQUcsR0FBR3RCLFNBQVMsQ0FBQ0ssV0FBVztFQUM1QztFQUVBa0IsSUFBSUEsQ0FBQ0MsR0FBRyxFQUFFO0lBQ1I7RUFBQTtFQUdGQyxHQUFHQSxDQUFDRCxHQUFHLEVBQUU7SUFDUDtFQUFBO0VBR0ZFLE1BQU1BLENBQUNGLEdBQUcsRUFBRTtJQUNWO0VBQUE7RUFHRkcsSUFBSUEsQ0FBQ0gsR0FBRyxFQUFFO0lBQ1I7SUFDQXhCLFNBQVMsQ0FBQ0UsYUFBYSxJQUFJLEVBQUU7RUFDL0I7RUFFQTBCLE9BQU9BLENBQUNKLEdBQUcsRUFBRTtJQUNYO0lBQ0FBLEdBQUcsQ0FBQ0ssU0FBUyxDQUFDLElBQUksQ0FBQ1QsU0FBUyxFQUFFcEIsU0FBUyxDQUFDUyxRQUFRLEdBQUdULFNBQVMsQ0FBQ08sWUFBWSxFQUFFLENBQUMsRUFBRVAsU0FBUyxDQUFDUyxRQUFRLEVBQUVULFNBQVMsQ0FBQ1UsUUFBUSxFQUFFVixTQUFTLENBQUNXLFlBQVksRUFBRVgsU0FBUyxDQUFDWSxZQUFZLEVBQUUsSUFBSSxDQUFDSSxDQUFDLEVBQUUsSUFBSSxDQUFDQyxDQUFDLENBQUM7SUFFckwsSUFBSWpCLFNBQVMsQ0FBQ08sWUFBWSxHQUFHUCxTQUFTLENBQUNRLGFBQWEsSUFBSSxDQUFDLEVBQUU7TUFDekQsSUFBSVIsU0FBUyxDQUFDTyxZQUFZLEdBQUcsQ0FBQyxFQUFFUCxTQUFTLENBQUNPLFlBQVksRUFBRSxNQUNuRFAsU0FBUyxDQUFDTyxZQUFZLEdBQUcsQ0FBQztJQUNqQztJQUNBdUIscUJBQXFCLENBQUMsSUFBSSxDQUFDRixPQUFPLENBQUNHLElBQUksQ0FBQyxJQUFJLEVBQUVQLEdBQUcsQ0FBQyxDQUFDO0VBQ3JEO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXByb2plY3QvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanM/NjQ3MSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDT05TVEFOVFMgPSB7XG4gIFBMQVlFUl9TUEVFRDogMCxcbiAgUExBWUVSX0hFQUxUSDogMTAwLFxuICBQTEFZRVJfV0lEVEg6IDY0LFxuICBQTEFZRVJfSEVJR0hUOiA2NCxcbiAgU1BSSVRFX1dBTEs6ICdhc3NldHMvZ2FtZS9wbGF5ZXIvd2Fsay5wbmcnLFxuICBTUFJJVEVfUlVOOiAnYXNzZXRzL2dhbWUvcGxheWVyL3J1bi5wbmcnLFxuICBTUFJJVEVfUlVOOiAnYXNzZXRzL2dhbWUvcGxheWVyL2F0dGFjay5wbmcnLFxuICBTUFJJVEVfRlJBTUU6IDAsXG4gIFNUQUdHRVJfRlJBTUU6IDUsXG4gIFNQUklURV9YOiAzMixcbiAgU1BSSVRFX1k6IDMyLFxuICBTUFJJVEVfUE9TX1g6IDEwMCxcbiAgU1BSSVRFX1BPU19ZOiA0MDAsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbnMpIHtcbiAgICB0aGlzLmRpbWVuc2lvbnMgPSBkaW1lbnNpb25zO1xuICAgIHRoaXMueCA9IENPTlNUQU5UUy5QTEFZRVJfV0lEVEg7XG4gICAgdGhpcy55ID0gQ09OU1RBTlRTLlBMQVlFUl9IRUlHSFQ7XG4gICAgdGhpcy5zcGVlZCA9IENPTlNUQU5UUy5QTEFZRVJfU1BFRUQ7XG4gICAgdGhpcy5oZWFsdGggPSBDT05TVEFOVFMuUExBWUVSX0hFQUxUSDtcbiAgICB0aGlzLnBsYXllckltZyA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMucGxheWVySW1nLnNyYyA9IENPTlNUQU5UUy5TUFJJVEVfV0FMSztcbiAgfVxuXG4gIHdhbGsoY3R4KSB7XG4gICAgLy9hbmltYXRpb24gZm9yIHNsb3cgdHlwaW5nIHNwZWVkXG4gIH1cblxuICBydW4oY3R4KSB7XG4gICAgLy9hbmltYXRpb24gZm9yIG1vZGVyYXRlIHR5cGluZyBzcGVlZFxuICB9XG5cbiAgc3ByaW50KGN0eCkge1xuICAgIC8vYW5pbWF0aW9uIGZvciBmYXN0IHR5cGluZyBzcGVlZFxuICB9XG5cbiAgaHVydChjdHgpIHtcbiAgICAvL2FuaW1hdGlvbiBhbmQgZGVjcmVhc2UgaW4gaGVhbHRoIGZvciB3aGVuIGluYWNjdXJhdGUgdHlwaW5nIGlzIGRldGVjdGVkXG4gICAgQ09OU1RBTlRTLlBMQVlFUl9IRUFMVEggLT0gMTA7XG4gIH1cblxuICBhbmltYXRlKGN0eCkge1xuICAgIC8vIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5kaW1lbnNpb25zLndpZHRoLCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KVxuICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5wbGF5ZXJJbWcsIENPTlNUQU5UUy5TUFJJVEVfWCAqIENPTlNUQU5UUy5TUFJJVEVfRlJBTUUsIDAsIENPTlNUQU5UUy5TUFJJVEVfWCwgQ09OU1RBTlRTLlNQUklURV9ZLCBDT05TVEFOVFMuU1BSSVRFX1BPU19YLCBDT05TVEFOVFMuU1BSSVRFX1BPU19ZLCB0aGlzLngsIHRoaXMueSlcblxuICAgIGlmIChDT05TVEFOVFMuU1BSSVRFX0ZSQU1FICUgQ09OU1RBTlRTLlNUQUdHRVJfRlJBTUUgPT0gMCkge1xuICAgICAgaWYgKENPTlNUQU5UUy5TUFJJVEVfRlJBTUUgPCA1KSBDT05TVEFOVFMuU1BSSVRFX0ZSQU1FKytcbiAgICAgIGVsc2UgQ09OU1RBTlRTLlNQUklURV9GUkFNRSA9IDA7XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzLCBjdHgpKVxuICB9XG59Il0sIm5hbWVzIjpbIkNPTlNUQU5UUyIsIlBMQVlFUl9TUEVFRCIsIlBMQVlFUl9IRUFMVEgiLCJQTEFZRVJfV0lEVEgiLCJQTEFZRVJfSEVJR0hUIiwiU1BSSVRFX1dBTEsiLCJTUFJJVEVfUlVOIiwiU1BSSVRFX0ZSQU1FIiwiU1RBR0dFUl9GUkFNRSIsIlNQUklURV9YIiwiU1BSSVRFX1kiLCJTUFJJVEVfUE9TX1giLCJTUFJJVEVfUE9TX1kiLCJQbGF5ZXIiLCJjb25zdHJ1Y3RvciIsImRpbWVuc2lvbnMiLCJ4IiwieSIsInNwZWVkIiwiaGVhbHRoIiwicGxheWVySW1nIiwiSW1hZ2UiLCJzcmMiLCJ3YWxrIiwiY3R4IiwicnVuIiwic3ByaW50IiwiaHVydCIsImFuaW1hdGUiLCJkcmF3SW1hZ2UiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJiaW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/player.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXByb2plY3QvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;