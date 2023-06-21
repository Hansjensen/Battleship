"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["listeners"],{

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   targetListener: () => (/* binding */ targetListener)
/* harmony export */ });


function targetListener(computer, player) {

    const targets = document.querySelectorAll('.targets')
    console.log('targetsnpm start')
    targets.forEach(item => {
        item.addEventListener('click', event => {
            let square = event.target.id
            let id = square.slice(1, 4)
            let user = square.slice(0,1)
            if (user = 'c') {
                computer.gameboard.recieveAttack(id)
            }
        })
    })

}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/listeners.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGVuZXJzLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saXN0ZW5lcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmZ1bmN0aW9uIHRhcmdldExpc3RlbmVyKGNvbXB1dGVyLCBwbGF5ZXIpIHtcblxuICAgIGNvbnN0IHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFyZ2V0cycpXG4gICAgY29uc29sZS5sb2coJ3RhcmdldHNucG0gc3RhcnQnKVxuICAgIHRhcmdldHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBzcXVhcmUgPSBldmVudC50YXJnZXQuaWRcbiAgICAgICAgICAgIGxldCBpZCA9IHNxdWFyZS5zbGljZSgxLCA0KVxuICAgICAgICAgICAgbGV0IHVzZXIgPSBzcXVhcmUuc2xpY2UoMCwxKVxuICAgICAgICAgICAgaWYgKHVzZXIgPSAnYycpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlci5nYW1lYm9hcmQucmVjaWV2ZUF0dGFjayhpZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbmV4cG9ydCB7dGFyZ2V0TGlzdGVuZXJ9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9