/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/oidc-token-hash";
exports.ids = ["vendor-chunks/oidc-token-hash"];
exports.modules = {

/***/ "(rsc)/./node_modules/oidc-token-hash/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/oidc-token-hash/lib/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { strict: assert } = __webpack_require__(/*! assert */ \"assert\");\nconst { createHash } = __webpack_require__(/*! crypto */ \"crypto\");\nconst { format } = __webpack_require__(/*! util */ \"util\");\n\nconst shake256 = __webpack_require__(/*! ./shake256 */ \"(rsc)/./node_modules/oidc-token-hash/lib/shake256.js\");\n\nlet encode;\nif (Buffer.isEncoding('base64url')) {\n  encode = (input) => input.toString('base64url');\n} else {\n  const fromBase64 = (base64) => base64.replace(/=/g, '').replace(/\\+/g, '-').replace(/\\//g, '_');\n  encode = (input) => fromBase64(input.toString('base64'));\n}\n\n/** SPECIFICATION\n * Its (_hash) value is the base64url encoding of the left-most half of the hash of the octets of\n * the ASCII representation of the token value, where the hash algorithm used is the hash algorithm\n * used in the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is\n * RS256, hash the token value with SHA-256, then take the left-most 128 bits and base64url encode\n * them. The _hash value is a case sensitive string.\n */\n\n/**\n * @name getHash\n * @api private\n *\n * returns the sha length based off the JOSE alg heade value, defaults to sha256\n *\n * @param token {String} token value to generate the hash from\n * @param alg {String} ID Token JOSE header alg value (i.e. RS256, HS384, ES512, PS256)\n * @param [crv] {String} For EdDSA the curve decides what hash algorithm is used. Required for EdDSA\n */\nfunction getHash(alg, crv) {\n  switch (alg) {\n    case 'HS256':\n    case 'RS256':\n    case 'PS256':\n    case 'ES256':\n    case 'ES256K':\n      return createHash('sha256');\n\n    case 'HS384':\n    case 'RS384':\n    case 'PS384':\n    case 'ES384':\n      return createHash('sha384');\n\n    case 'HS512':\n    case 'RS512':\n    case 'PS512':\n    case 'ES512':\n      return createHash('sha512');\n\n    case 'EdDSA':\n      switch (crv) {\n        case 'Ed25519':\n          return createHash('sha512');\n        case 'Ed448':\n          if (!shake256) {\n            throw new TypeError('Ed448 *_hash calculation is not supported in your Node.js runtime version');\n          }\n\n          return createHash('shake256', { outputLength: 114 });\n        default:\n          throw new TypeError('unrecognized or invalid EdDSA curve provided');\n      }\n\n    default:\n      throw new TypeError('unrecognized or invalid JWS algorithm provided');\n  }\n}\n\nfunction generate(token, alg, crv) {\n  const digest = getHash(alg, crv).update(token).digest();\n  return encode(digest.slice(0, digest.length / 2));\n}\n\nfunction validate(names, actual, source, alg, crv) {\n  if (typeof names.claim !== 'string' || !names.claim) {\n    throw new TypeError('names.claim must be a non-empty string');\n  }\n\n  if (typeof names.source !== 'string' || !names.source) {\n    throw new TypeError('names.source must be a non-empty string');\n  }\n\n  assert(typeof actual === 'string' && actual, `${names.claim} must be a non-empty string`);\n  assert(typeof source === 'string' && source, `${names.source} must be a non-empty string`);\n\n  let expected;\n  let msg;\n  try {\n    expected = generate(source, alg, crv);\n  } catch (err) {\n    msg = format('%s could not be validated (%s)', names.claim, err.message);\n  }\n\n  msg = msg || format('%s mismatch, expected %s, got: %s', names.claim, expected, actual);\n\n  assert.equal(expected, actual, msg);\n}\n\nmodule.exports = {\n  validate,\n  generate,\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvb2lkYy10b2tlbi1oYXNoL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQSxRQUFRLGlCQUFpQixFQUFFLG1CQUFPLENBQUMsc0JBQVE7QUFDM0MsUUFBUSxhQUFhLEVBQUUsbUJBQU8sQ0FBQyxzQkFBUTtBQUN2QyxRQUFRLFNBQVMsRUFBRSxtQkFBTyxDQUFDLGtCQUFNOztBQUVqQyxpQkFBaUIsbUJBQU8sQ0FBQyx3RUFBWTs7QUFFckM7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QixlQUFlLFFBQVE7QUFDdkIsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDQUEwQyxtQkFBbUI7QUFDN0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0QsYUFBYTtBQUMvRCxrREFBa0QsY0FBYzs7QUFFaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGF0ZXJkb2cvLi9ub2RlX21vZHVsZXMvb2lkYy10b2tlbi1oYXNoL2xpYi9pbmRleC5qcz80NGI4Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgc3RyaWN0OiBhc3NlcnQgfSA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xuY29uc3QgeyBjcmVhdGVIYXNoIH0gPSByZXF1aXJlKCdjcnlwdG8nKTtcbmNvbnN0IHsgZm9ybWF0IH0gPSByZXF1aXJlKCd1dGlsJyk7XG5cbmNvbnN0IHNoYWtlMjU2ID0gcmVxdWlyZSgnLi9zaGFrZTI1NicpO1xuXG5sZXQgZW5jb2RlO1xuaWYgKEJ1ZmZlci5pc0VuY29kaW5nKCdiYXNlNjR1cmwnKSkge1xuICBlbmNvZGUgPSAoaW5wdXQpID0+IGlucHV0LnRvU3RyaW5nKCdiYXNlNjR1cmwnKTtcbn0gZWxzZSB7XG4gIGNvbnN0IGZyb21CYXNlNjQgPSAoYmFzZTY0KSA9PiBiYXNlNjQucmVwbGFjZSgvPS9nLCAnJykucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJyk7XG4gIGVuY29kZSA9IChpbnB1dCkgPT4gZnJvbUJhc2U2NChpbnB1dC50b1N0cmluZygnYmFzZTY0JykpO1xufVxuXG4vKiogU1BFQ0lGSUNBVElPTlxuICogSXRzIChfaGFzaCkgdmFsdWUgaXMgdGhlIGJhc2U2NHVybCBlbmNvZGluZyBvZiB0aGUgbGVmdC1tb3N0IGhhbGYgb2YgdGhlIGhhc2ggb2YgdGhlIG9jdGV0cyBvZlxuICogdGhlIEFTQ0lJIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0b2tlbiB2YWx1ZSwgd2hlcmUgdGhlIGhhc2ggYWxnb3JpdGhtIHVzZWQgaXMgdGhlIGhhc2ggYWxnb3JpdGhtXG4gKiB1c2VkIGluIHRoZSBhbGcgSGVhZGVyIFBhcmFtZXRlciBvZiB0aGUgSUQgVG9rZW4ncyBKT1NFIEhlYWRlci4gRm9yIGluc3RhbmNlLCBpZiB0aGUgYWxnIGlzXG4gKiBSUzI1NiwgaGFzaCB0aGUgdG9rZW4gdmFsdWUgd2l0aCBTSEEtMjU2LCB0aGVuIHRha2UgdGhlIGxlZnQtbW9zdCAxMjggYml0cyBhbmQgYmFzZTY0dXJsIGVuY29kZVxuICogdGhlbS4gVGhlIF9oYXNoIHZhbHVlIGlzIGEgY2FzZSBzZW5zaXRpdmUgc3RyaW5nLlxuICovXG5cbi8qKlxuICogQG5hbWUgZ2V0SGFzaFxuICogQGFwaSBwcml2YXRlXG4gKlxuICogcmV0dXJucyB0aGUgc2hhIGxlbmd0aCBiYXNlZCBvZmYgdGhlIEpPU0UgYWxnIGhlYWRlIHZhbHVlLCBkZWZhdWx0cyB0byBzaGEyNTZcbiAqXG4gKiBAcGFyYW0gdG9rZW4ge1N0cmluZ30gdG9rZW4gdmFsdWUgdG8gZ2VuZXJhdGUgdGhlIGhhc2ggZnJvbVxuICogQHBhcmFtIGFsZyB7U3RyaW5nfSBJRCBUb2tlbiBKT1NFIGhlYWRlciBhbGcgdmFsdWUgKGkuZS4gUlMyNTYsIEhTMzg0LCBFUzUxMiwgUFMyNTYpXG4gKiBAcGFyYW0gW2Nydl0ge1N0cmluZ30gRm9yIEVkRFNBIHRoZSBjdXJ2ZSBkZWNpZGVzIHdoYXQgaGFzaCBhbGdvcml0aG0gaXMgdXNlZC4gUmVxdWlyZWQgZm9yIEVkRFNBXG4gKi9cbmZ1bmN0aW9uIGdldEhhc2goYWxnLCBjcnYpIHtcbiAgc3dpdGNoIChhbGcpIHtcbiAgICBjYXNlICdIUzI1Nic6XG4gICAgY2FzZSAnUlMyNTYnOlxuICAgIGNhc2UgJ1BTMjU2JzpcbiAgICBjYXNlICdFUzI1Nic6XG4gICAgY2FzZSAnRVMyNTZLJzpcbiAgICAgIHJldHVybiBjcmVhdGVIYXNoKCdzaGEyNTYnKTtcblxuICAgIGNhc2UgJ0hTMzg0JzpcbiAgICBjYXNlICdSUzM4NCc6XG4gICAgY2FzZSAnUFMzODQnOlxuICAgIGNhc2UgJ0VTMzg0JzpcbiAgICAgIHJldHVybiBjcmVhdGVIYXNoKCdzaGEzODQnKTtcblxuICAgIGNhc2UgJ0hTNTEyJzpcbiAgICBjYXNlICdSUzUxMic6XG4gICAgY2FzZSAnUFM1MTInOlxuICAgIGNhc2UgJ0VTNTEyJzpcbiAgICAgIHJldHVybiBjcmVhdGVIYXNoKCdzaGE1MTInKTtcblxuICAgIGNhc2UgJ0VkRFNBJzpcbiAgICAgIHN3aXRjaCAoY3J2KSB7XG4gICAgICAgIGNhc2UgJ0VkMjU1MTknOlxuICAgICAgICAgIHJldHVybiBjcmVhdGVIYXNoKCdzaGE1MTInKTtcbiAgICAgICAgY2FzZSAnRWQ0NDgnOlxuICAgICAgICAgIGlmICghc2hha2UyNTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VkNDQ4ICpfaGFzaCBjYWxjdWxhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGluIHlvdXIgTm9kZS5qcyBydW50aW1lIHZlcnNpb24nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gY3JlYXRlSGFzaCgnc2hha2UyNTYnLCB7IG91dHB1dExlbmd0aDogMTE0IH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3VucmVjb2duaXplZCBvciBpbnZhbGlkIEVkRFNBIGN1cnZlIHByb3ZpZGVkJyk7XG4gICAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndW5yZWNvZ25pemVkIG9yIGludmFsaWQgSldTIGFsZ29yaXRobSBwcm92aWRlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlKHRva2VuLCBhbGcsIGNydikge1xuICBjb25zdCBkaWdlc3QgPSBnZXRIYXNoKGFsZywgY3J2KS51cGRhdGUodG9rZW4pLmRpZ2VzdCgpO1xuICByZXR1cm4gZW5jb2RlKGRpZ2VzdC5zbGljZSgwLCBkaWdlc3QubGVuZ3RoIC8gMikpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZShuYW1lcywgYWN0dWFsLCBzb3VyY2UsIGFsZywgY3J2KSB7XG4gIGlmICh0eXBlb2YgbmFtZXMuY2xhaW0gIT09ICdzdHJpbmcnIHx8ICFuYW1lcy5jbGFpbSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25hbWVzLmNsYWltIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIG5hbWVzLnNvdXJjZSAhPT0gJ3N0cmluZycgfHwgIW5hbWVzLnNvdXJjZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25hbWVzLnNvdXJjZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiBhY3R1YWwgPT09ICdzdHJpbmcnICYmIGFjdHVhbCwgYCR7bmFtZXMuY2xhaW19IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nYCk7XG4gIGFzc2VydCh0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJyAmJiBzb3VyY2UsIGAke25hbWVzLnNvdXJjZX0gbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmdgKTtcblxuICBsZXQgZXhwZWN0ZWQ7XG4gIGxldCBtc2c7XG4gIHRyeSB7XG4gICAgZXhwZWN0ZWQgPSBnZW5lcmF0ZShzb3VyY2UsIGFsZywgY3J2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbXNnID0gZm9ybWF0KCclcyBjb3VsZCBub3QgYmUgdmFsaWRhdGVkICglcyknLCBuYW1lcy5jbGFpbSwgZXJyLm1lc3NhZ2UpO1xuICB9XG5cbiAgbXNnID0gbXNnIHx8IGZvcm1hdCgnJXMgbWlzbWF0Y2gsIGV4cGVjdGVkICVzLCBnb3Q6ICVzJywgbmFtZXMuY2xhaW0sIGV4cGVjdGVkLCBhY3R1YWwpO1xuXG4gIGFzc2VydC5lcXVhbChleHBlY3RlZCwgYWN0dWFsLCBtc2cpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmFsaWRhdGUsXG4gIGdlbmVyYXRlLFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/oidc-token-hash/lib/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/oidc-token-hash/lib/shake256.js":
/*!******************************************************!*\
  !*** ./node_modules/oidc-token-hash/lib/shake256.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\nconst [major, minor] = process.version.substring(1).split('.').map((x) => parseInt(x, 10));\nconst xofOutputLength = major > 12 || (major === 12 && minor >= 8);\nconst shake256 = xofOutputLength && crypto.getHashes().includes('shake256');\n\nmodule.exports = shake256;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvb2lkYy10b2tlbi1oYXNoL2xpYi9zaGFrZTI1Ni5qcyIsIm1hcHBpbmdzIjoiQUFBQSxlQUFlLG1CQUFPLENBQUMsc0JBQVE7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2xhdGVyZG9nLy4vbm9kZV9tb2R1bGVzL29pZGMtdG9rZW4taGFzaC9saWIvc2hha2UyNTYuanM/OTA3YSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblxuY29uc3QgW21ham9yLCBtaW5vcl0gPSBwcm9jZXNzLnZlcnNpb24uc3Vic3RyaW5nKDEpLnNwbGl0KCcuJykubWFwKCh4KSA9PiBwYXJzZUludCh4LCAxMCkpO1xuY29uc3QgeG9mT3V0cHV0TGVuZ3RoID0gbWFqb3IgPiAxMiB8fCAobWFqb3IgPT09IDEyICYmIG1pbm9yID49IDgpO1xuY29uc3Qgc2hha2UyNTYgPSB4b2ZPdXRwdXRMZW5ndGggJiYgY3J5cHRvLmdldEhhc2hlcygpLmluY2x1ZGVzKCdzaGFrZTI1NicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYWtlMjU2O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/oidc-token-hash/lib/shake256.js\n");

/***/ })

};
;