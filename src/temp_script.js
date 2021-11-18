let example_one = `
;; simple canvas api operations
;; variables and math
(set-fillStyle "green")
(fillRect 10 10 250 250)

(let color "yellow")
(set-fillStyle color)
(fillRect 10 300 250 250)

`;

let better = `
(set-fillStyle "white")
(set-strokeStyle "grey")
(fillRect 25 25 100 100)
(clearRect 45 45 60 60)
(strokeRect 50 50 50 50)
`;

let house = `
(set-context "grid" 25)
(set-fillStyle "green")
(set-strokeStyle "white")

;; base
(fillRect 200 200 100 100)
;; roof
(set-fillStyle "white")
(beginPath)
(moveTo 200 200)
(lineTo 250 150)
(lineTo 300 200)
(fill)
(closePath)

;; door

(set-fillStyle "red")
(fillRect 225 260 25 40)

;; windows 
(set-fillStyle "blue")
(fillRect 270 250 25 25)
`;

let source = house;

export default source;
