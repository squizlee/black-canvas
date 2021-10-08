-   AST -> Evaluation
    -   Func adds function to environment
    -   Let binds a value to a variable, add to env if global and not part of a parent list
    -   In a function evaluate each body one by one
    -   In a compound expression evaluate operator, evaluate arguments and appy operator to arguments

# Canvas API Implement

## Drawing rectangles

-   clearRect(x y w h): (clearRect x y w h)
-   fillRect(x y w h): (fillRect x y w h)
-   strokeRect(x y w h): (strokeRect x y w h)

```
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.fillRect(30, 30, 50, 50);
```

In Blisp

```

(fillStyle (rgb 200 0 0))
(fillRect 10 10 50 50)
(fillRect 30 30 50 50)
```
