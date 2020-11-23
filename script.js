window.onload = ()=>{
    const video = document.getElementById("video");
    const media = navigator.mediaDevices.getUserMedia({
        video: {facingMode: "user"},
        audio: false
    });
    media.then((stream) => {
        video.srcObject = stream;
    });
    const tracker = new clm.tracker();
    tracker.init(pModel);
    tracker.start(video);

    const s = Snap("#svg");
    function drawLine(x1, y1, x2, y2) {
        s.line(x1, y1, x2, y2).attr({stroke:"#000", strokeWidth:1});
    }
    function loop(){
        const positions = tracker.getCurrentPosition();
        s.clear();
        if (positions.length) {
            pModel.path.normal.forEach(pathArr => {
                for (let i = 1; i < pathArr.length; i++) {
                    const pre = pathArr[i - 1];
                    const cur = pathArr[i];
                    const x1 = 532 - positions[pre][0];
                    const y1 = positions[pre][1];
                    const x2 = 532 - positions[cur][0];
                    const y2 = positions[cur][1];                    
                    drawLine(x1, y1, x2, y2);
                }
            });
        } else {
            drawLine(230, 120, 290, 180);
            drawLine(230, 180, 290, 120);
        }
        requestAnimationFrame(loop);
    }
    loop();
}

function toggleVideo(){
    const dom = document.getElementById("video");
    if (dom.getAttribute("style").indexOf("hidden") < 0) {
        dom.setAttribute("style", "visibility: hidden;transform: scaleX(-1);");
    } else {
        dom.setAttribute("style", "visibility: visible;transform: scaleX(-1);");
    }
}