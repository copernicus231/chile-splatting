import * as SPLAT from "gsplat";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const progressDialog = document.getElementById("progress-dialog") as HTMLDialogElement;
const progressIndicator = document.getElementById("progress-indicator") as HTMLProgressElement;

const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

async function main() {
    const url = "molino-7k.splat";
    await SPLAT.Loader.LoadAsync(url, scene, (progress) => (progressIndicator.value = progress * 100));
    progressDialog.close();

    // Transform it
    const rotation = new SPLAT.Vector3(-0.9,-0.4 , 0);
    const translation = new SPLAT.Vector3(-2, -2, -3);
    const scaling = new SPLAT.Vector3(1, 1, 1);
    const limitSize = 4.0;
    scene.rotate(SPLAT.Quaternion.FromEuler(rotation));
    scene.translate(translation);
    scene.scale(scaling);
    scene.limitBox(-limitSize, limitSize, -limitSize, limitSize, -limitSize, limitSize);

    const handleResize = () => {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    const frame = () => {
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(frame);
    };
    const canvasResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('load', canvasResize);
    window.addEventListener('resize', canvasResize);
    canvasResize();
    handleResize();
    window.addEventListener("resize", handleResize);

    requestAnimationFrame(frame);
}

main();
