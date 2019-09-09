#!/usr/bin/env bash

P5_VERSION=0.5.14

curl -L --create-dirs https://github.com/processing/p5.js/releases/download/${P5_VERSION}/p5.js -o lib/p5/p5.js
curl -L --create-dirs https://github.com/processing/p5.js/releases/download/${P5_VERSION}/p5.sound.js -o lib/p5/addons/p5.sound.js
curl -L --create-dirs https://github.com/processing/p5.js/releases/download/${P5_VERSION}/p5.dom.js -o lib/p5/addons/p5.dom.js
