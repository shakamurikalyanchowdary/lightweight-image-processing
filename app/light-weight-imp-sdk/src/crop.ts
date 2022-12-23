import * as ex from 'threads/worker';
import sharp from 'sharp';
import fs from 'fs';

function crop(name: any, width: any, height: any, left: any, top: any) {
    return new Promise(resolve => {
        let path = "../storage/croped" + name;
        try {
            sharp(name).extract({ width: Number(width), height: Number(height), left: Number(left), top: Number(top) }).toFile(path);
        }
        catch (e) {
            resolve(0);
        }
        fs.exists(path, function (isExist: any) {
            if (isExist) {
                resolve(1);
            } else {
                resolve(0)
            }
        });

    })
}
ex.expose({
    async cro(name: any, width: any, height: any, left: any, top: any) {
        var response = await crop(name, width, height, left, top);
        return response;

    }
})