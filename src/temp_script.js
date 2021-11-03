let source = `
;; cond takes a sequence of lists that themselves contain a test and an action

(let x 1)
(cond ((> x -10) "x is greater than -10")
  (else "else clause hit"))
`;

export default source;
