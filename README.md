# strangeb

The strangest thing happens when you rotate Bezier control points: [Result](https://anvaka.github.io/strangeb/)/[Video](https://www.youtube.com/watch?v=g19QQaGQFUA)

Inspired by this tweet from Rune Madsen: https://twitter.com/runemadsen/status/726200375909474304

# What do I see and how is it done?

Let's start by saying that the demo has 10 [Cubic Bezier curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
rendered around a circle.

## What is a Bezier Curve?

It's a nice way to describe a smooth line (a curve) without having to specify
every single pixel. To render a Bezier curve we need to tell only four points, and
computer does the rest:

* `(x0, y0)` - where curve starts;
* `(x3, y3)` - where curve ends;
* `(x1, y1)` and `(x2, y2)` are first and second control points

Here is how computer then renders a cubic Bezier curve:

![bezier curve rendering](https://upload.wikimedia.org/wikipedia/commons/d/db/B%C3%A9zier_3_big.gif)

Luckily we don't need to implement this from scratch, since SVG already
has built in support for bezier curves.

All we need to do is construct a value for a `path`'s data attribute (called `d`).

Here is an example that data attribute value and corresponding result:

![data examples](http://i.imgur.com/P9P6dcH.png)

You can also [read more about bezier curves on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves).

## How does the nice picture appear?

That's the fun part! I just keep `(x0, y0)` and `(x3, y3)` points static, so that
curve always starts and ends at the same position. Then on each frame I move control
points `(x1, y1)` and `(x2, y2)` around the circle.

By adjusting control points we also change the shape of the curve. And since there
are ten of them - a nice pattern emerges ([Interactive](https://anvaka.github.io/strangeb/)/[Video](https://www.youtube.com/watch?v=g19QQaGQFUA)).

# license

MIT
