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
function generateAnything(input, callback) {
    // var TEST_PROMPT_1 = "masterpiece, best quality, illustration, beautiful detailed, finely detailed, dramatic light, intricate details, 1girl, brown hair, green eyes, colorful, autumn, cumulonimbus clouds, lighting, blue sky, falling leaves, garden";
    // var TEST_PROMPT_2 = "1girl, brown hair, green eyes, colorful, autumn, cumulonimbus clouds, lighting, blue sky, falling leaves, garden";

    var Replicate = require('replicate');
    var ai = new Replicate({ auth: process.env.REPLICATE_API_KEY });

    ai.run(
        "cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65",
        {
            input: {
                prompt: input
            }
        }
    )
    .then(result => {
        callback(result[0]);
    });
}
function run(app) {
    app.use('/sdgen', (req, res) => {
        createStableDiffusion(req.body.prompt, (image) => {
            res.end(JSON.stringify(image));
        });
    });
    app.use('/anything', async (req, res) => {
        generateAnything(req.query.prompt, image => {
            res.end(image);
        });
    });
}
module.exports = run;