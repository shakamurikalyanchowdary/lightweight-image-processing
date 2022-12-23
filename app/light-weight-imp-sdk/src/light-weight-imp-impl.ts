import thread from 'threads';
import { ILightWeightImp } from 'light-weight-imp-abstract'
import zx from 'zx';
import axios from 'axios';
import fs from 'fs'

export class LWII {
    async getlist(): Promise<[]> {
        let data: any = await zx.$`cd ../storage && ls`
        let fileList: [] = data['stdout'].split('\n')
        return fileList
    }
    async upload(data: any) {
        try {
            if (data.flagUrl) {
                let url = data.url
                let response = await axios({
                    url,
                    method: 'GET',
                    responseType: 'arraybuffer',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'image/jpeg' // <-- declare the file format in s3
                    }
                });
                await fs.writeFileSync(`../storage/${data.name}`, response.data);
                return { success: true, filename: data.name }
            }
            else {
                await fs.writeFileSync(`../storage/${data.name}`, data.data);
                return { success: true, filename: data.name }
            }
        }
        catch (e: any) {
            return { success: false, error: e }
        }
    }
    async getImage(name: String) {
        try {
            let data: any = await fs.readFileSync(`../storage/${name}`)
            return { success: true, data: data }
        } catch (e: any) {
            return { success: false, error: e }
        }
    }
    async delete(name: String) {
        try {
            await zx.$`cd ../storage && rm -rf ${name}`
            return { success: true }
        } catch (e: any) {
            return { success: false }
        }
    }
    async crop(name: any, width: any, height: any, left: any, top: any) {
        return new Promise(async resolve => {
            const crp = await thread.spawn(new thread.Worker("crop.js"))
            const x = await crp.cro(name, width, height, left, top)
            if (x == 1) {
                resolve(x);
            }
            else {
                resolve("0");
            }
        })
    }
    async resize(name: string, width: any, height: any) {
        return new Promise(async (resolve) => {
            const resiz = await thread.spawn(new thread.Worker("resize.js"));
            const x = await resiz.resi(name, width, height);
            //console.log("##",x)
            if (x == 1) {
                resolve(1);
            } else {
                resolve(0);
            }
        });
    }
}