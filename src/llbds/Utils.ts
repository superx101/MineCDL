export class LLBDSTag {
    private _defValue: string = "";

    public map: { [key: string]: string } = {};

    constructor(tag: string) {
        tag = tag.trim();
        if (tag === "")
            return;
        const arr = tag.split(",");
        for (const param of arr) {
            const parr = param.trim().split("=");
            const key = parr[0];
            const value = parr[1];
            this.map[key] = value.trim();
        }
    }

    public def(defaultValue: string) {
        this._defValue = defaultValue;
        return this;
    }

    public get(key: string): string {
        const res = this.map[key];
        if (res != undefined)
            return res;
        return this._defValue;
    }

    public gets(keys: string[], defaultValues: string[]): any[] {
        if (keys.length > defaultValues.length)
            return [];

        let firstDefault = -1;
        let omit = true;
        const values = [];
        for (let i = 0; i < keys.length; ++i) {
            let res = this.map[keys[i]];
            if (res == undefined) {
                if (firstDefault < 0)
                    firstDefault = i;
                res = defaultValues[i];
            }
            else if (firstDefault >= 0) {
                omit = false;
            }
            values.push(res);
        }
        if (omit && firstDefault >= 0)
            values.splice(firstDefault);
        return values;
    }
}