import * as ex from 'threads/worker';
import sharp from 'sharp';
import fs from 'fs';

function crop(name: string, width: any, height: any) {
    return new Promise(resolve => {
        let path = "../storage/croped" + name;
        try {
            sharp(name).resize({
                width: width,
                height: height
            })
            .toFile(path)
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
    async resi(name: string, width: any, height: any) {
        var response = await crop(name,width,height);
        return response;

    }
})