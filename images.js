async function createStableDiffusion(prompt, callback){
    var fs = require('fs');

    const engineId = 'stable-diffusion-v1-5'
    const apiHost = 'https://api.stability.ai';
    const apiKey = process.env.STABILITY_API_KEY

    if (!apiKey) throw new Error('Missing Stability API key.')

    const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
        text_prompts: [
            {
            text: prompt,
            },
        ],
        cfg_scale: 7,
        clip_guidance_preset: 'FAST_BLUE',
        height: 512,
        width: 512,
        samples: 1,
        steps: 30,
        }),
    }
    )

    if (!response.ok) {
        res.end({isFailed: true, error: `Non-200 response: ${await response.text()}`})
    }

    const responseJSON = (await response.json());
    var b64 = responseJSON.base64;

    responseJSON.artifacts.forEach((image, index) => {
        callback(image);
    });
}
async function requestStablehorde(model, input, callback) {
    // var TEST_PROMPT_1 = "masterpiece, best quality, illustration, beautiful detailed, finely detailed, dramatic light, intricate details, 1girl, brown hair, green eyes, colorful, autumn, cumulonimbus clouds, lighting, blue sky, falling leaves, garden";
    // var TEST_PROMPT_2 = "1girl, brown hair, green eyes, colorful, autumn, cumulonimbus clouds, lighting, blue sky, falling leaves, garden";

    var image = fetch('https://stablehorde.net/api/v2/generate/async', {
        method: 'POST',
        body: JSON.stringify({
            "prompt": input,
            "params": {
              "sampler_name": "k_lms",
              "toggles": [
                1,
                4
              ],
              "cfg_scale": 5,
              "denoising_strength": 0.75,
              "height": 512,
              "width": 512,
              "seed_variation": 1,
              "post_processing": [
                "GFPGAN"
              ],
              "karras": false,
              "tiling": false,
              "hires_fix": false,
              "clip_skip": 1,
              "control_type": "canny",
              "image_is_control": false,
              "return_control_map": false,
              "facefixer_strength": 0.75,
              "steps": 30,
              "n": 1
            },
            "nsfw": false,
            "trusted_workers": false,
            "slow_workers": true,
            "censor_nsfw": false,
            "models": [
              model
            ],
            "source_image": "none",
            "source_processing": "img2img",
            "r2": true,
            "shared": false,
            "replacement_filter": true
          }),
        headers: {'Content-Type': 'application/json', 'apikey': process.env.STABLEHORDE}
    }).then(res => res.json())
    .then(res => {console.log(res)});
    // callback(image);
}
function run(app) {
    app.use('/sdgen', (req, res) => {
        createStableDiffusion(req.body.prompt, (image) => {
            res.end(JSON.stringify(image));
        });
    });
    app.use('/anything', async (req, res) => {
        requestStablehorde("Anything v3", req.query.prompt, image => {
            res.end(image);
        });
    });
}
module.exports = run;