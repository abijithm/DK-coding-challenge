# DK-coding-challenge
Diamond Kinetics Swing Data Coding Challenge

Angular/Typescript project

Compile project with: tsc src/app/analysis.ts src/app/operations.services.ts

Run project with: node src/app/analysis.js


Bonus Question:

Index at which contact happens is 875. As shown by data, the gx column drastically changes from negative to positive for 3 consecutive indices,
then goes back to being negative. This indicates that the angular velocity in the x direction as measured by the gyroscope faces an opposing force in the ball.
Hence causing a momentary negative displacement in angular position of the bat, which renders the change in gx from indices 875-878.
Furthermore, at index 878, the gy column also has a drastic shift in data values going from positive to negative for several indices, 
which means that the angular velocity in the y direction faces an opposing force. 
