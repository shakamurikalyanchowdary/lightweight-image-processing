import { LWII } from "./light-weight-imp-impl";
import express from 'express';
const app = express();
export async function LWIISTART(port: any) {
    try {
        let lwii = new LWII();
        app.post("/upload", async function (req, res) {
            req.on("data", async function (data: any, resp: any) {
                try {
                    resp = res;
                    let out: any = JSON.parse(data);
                    let response: any;
                    if (out['flagUrl']) {
                        response = await lwii.upload({ flagUrl: out['flagUrl'], url: out['url'], name: out['name'] })
                    }
                    else {
                        response = await lwii.upload({ flagUrl: out['flagUrl'], data: out['data'], name: out['name'] })
                    }
                    resp.status(200).json(response);

                } catch (e) {
                    resp.status(404).json({ success: false, message: "wrong format" });
                    console.log(e);
                }
            });
        });
        app.post("/getImage", async function (req, res) {
            req.on("data", async function (data: any, resp: any) {
                try {
                    resp = res;
                    let out: any = JSON.parse(data);
                    let response: any;
                    response = await lwii.getImage(out['name'])
                    resp.status(200).json(response);

                } catch (e) {
                    resp.status(404).json({ success: false, message: "wrong format" });
                    console.log(e);
                }
            });
        });
        app.post("/delete", async function (req, res) {
            req.on("data", async function (data: any, resp: any) {
                try {
                    resp = res;
                    let out: any = JSON.parse(data);
                    let response: any;
                    response = await lwii.delete(out['name'])
                    resp.status(200).json(response);

                } catch (e) {
                    resp.status(404).json({ success: false, message: "wrong format" });
                    console.log(e);
                }
            });
        });
        app.post("/crop", async function (req, res) {
            req.on("data", async function (data: any, resp: any) {
                try {
                    resp = res;
                    let out: any = JSON.parse(data);
                    let response: any;
                    response = await lwii.crop(out['name'], out['width'], out['height'], out['left'], out['top'])
                    resp.status(200).json(response);
                } catch (e) {
                    resp.status(404).json({ success: false, message: "wrong format" });
                    console.log(e);
                }
            });
        });
        app.post("/resize", async function (req, res) {
            req.on("data", async function (data: any, resp: any) {
                try {
                    resp = res;
                    let out: any = JSON.parse(data);
                    let response: any;
                    response = await lwii.resize(out['name'], out['width'], out['height'])
                    resp.status(200).json(response);
                } catch (e) {
                    resp.status(404).json({ success: false, message: "wrong format" });
                    console.log(e);
                }
            });
        });
        app.listen(port, () => {
            console.log('server is lsitening on port ', port)
        })
    } catch (e: any) {
        console.log(e)
    }
}