import { useEffect, useRef } from 'react'

const ZimRandomGlyphsClient = ({ glyphsList, amount = 5, zIndex = 2, minSize = 50, maxSize = 250}) => {
  const didMountRef = useRef(false);
  let frame;
  useEffect(()=> {
    if(didMountRef.current) {
      //don't rerender
    }
    else {
      const scaling = "full"; // this will resize to fit inside the screen dimensions
      const width = 1024;
      const height = 768;
      const color = clear; // ZIM colors like green, blue, pink, faint, clear, etc.
      const outerColor = dark; // any HTML colors like "violet", "#333", etc. are fine to use

      frame = new Frame(scaling, width, height, color, outerColor);
      frame.on("ready", () => { // ES6 Arrow Function - like function(){}
        frame.canvas.style.zIndex = zIndex;
        const stage = frame.stage;
        let stageW = frame.width;
        let stageH = frame.height;
        stage.update();
        var emitter = new zim.Emitter({
          obj: [new Label("💩")],
          force: 11,
          gravity: .2
        })
          .centerReg()
          .sca(7)

        /*emitter.x = mouse.cursor.x
        emitter.y = mouse.cursor.y
        emitter.drag()
        emitter.dragStarter()*/
        stage.addChild(emitter)
        new MotionController(emitter, "mousemove", 200); 
        for(let i = 0;i < amount;i++) {
          let randomGlyph = glyphsList[Math.floor(Math.random() * glyphsList.length)];
          let glyph = new Label(randomGlyph)
          glyph.x = Math.floor(Math.random() * width);
          glyph.y = Math.floor(Math.random() * height);
          glyph.size = maxSize * Math.random() + minSize;
          glyph.rotation = Math.floor(Math.random() * 360);
          stage.addChild(glyph);
          glyph.wiggle("y", glyph.y, 10, 30, 3, 1);
          glyph.drag({slide:true})
          glyph.addEventListener("slidestart", (e) => {glyph.pauseAnimate()})
          glyph.addEventListener('slidestop', (e) => {glyph.wiggle("y", glyph.y, 10, 30, 3, 1);})
        }
      }, 2200)
      didMountRef.current = true;
    }
    return function cleanup() {
      //frame.dispose();
      //clearInterval(interval)
    }
  });
  return null;
}

export default ZimRandomGlyphsClient;