/**
 * Class for parsing and giving access to the VCAP service bindings and config.
 */
export class VcapServices {
    private vcapServices: any;

    private serviceCredentials: {} = {};

    constructor(vcapServicesString: string) {
        this.parseVcapServices(vcapServicesString);
    }

    private parseVcapServices(vcapServicesString: string) {
        this.vcapServices = JSON.parse(vcapServicesString);

        let serviceName;
        for (let service of this.vcapServices["user-provided"]) {
            serviceName = service["name"];
            console.info("Found service binding: " + serviceName);
            this.serviceCredentials[serviceName] = service;
        }
    }

    public getSsAssetUrl(): any {
        return this.serviceCredentials["ss-asset"]["credentials"]["url"] || null;
    }

    public getSsAdvisoryUrl(): any {
        return this.serviceCredentials["ss-advisory"]["credentials"]["url"] || null;
    }

    public getSsJobUrl(): any {
        let url = this.serviceCredentials["ss-job"]["credentials"]["url"] || null;
        url = url.substring(0, url.lastIndexOf("/jobs"));
        return url;
    }
}