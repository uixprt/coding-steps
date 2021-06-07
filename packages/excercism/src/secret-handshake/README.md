---
title: Secret Handshake
description: Given a decimal number, convert it to the appropriate sequence of events for a secret handshake.
origin: https://github.com/exercism/typescript/tree/main/exercises/practice/secret-handshake
license: https://github.com/exercism/typescript/blob/main/LICENSE
---

# Secret Handshake

Given a decimal number, translate it to the related composing binary numbers.

1 = wink
10 = double blink
100 = close your eyes
1000 = jump
10000 = reverse the order of the operations in the secret handshake

Example:

- Given the input 3, the function would return the array ["wink", "double blink"] because 3 is 11 in binary.

- Given the input 19, the function would return the array ["double blink", "wink"] because 19 is 10011 in binary. Notice that the addition of 16 (10000 in binary) has caused the array to be reversed.
